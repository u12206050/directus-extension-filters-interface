<script setup lang="ts">
import { clone, get } from 'lodash-es';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import IntlInfo from '../intl';
import { fieldToFilter, getComparator, getField } from '../utils';
import InputComponent from './input-component.vue';
import Nodes from './nodes.vue';

const props = defineProps({
	field: {
		type: Object,
		required: true,
	},
	tree: Object,
});

const { t } = useI18n();

const emit = defineEmits(['update:field']);

const fieldInfo = computed(() => {
	return get(props.tree, getField(props.field));
});

const nestedTree = computed(() => {
	const fieldPath = getField(props.field);
	const relatedFieldInfo = get(props.tree, fieldPath);
	// For relationship fields, return the nested properties
	if (relatedFieldInfo && typeof relatedFieldInfo === 'object' && !relatedFieldInfo.type) {
		return relatedFieldInfo;
	}
	return {};
});

const nestedBranches = computed(() => {
	// Convert nested tree to branches format (similar to interface.vue)
	const tree = nestedTree.value;
	if (!tree || Object.keys(tree).length === 0) return [];

	return Object.keys(tree)
		.map(key => {
			const value = tree[key];
			if (typeof value === 'object' && value.name) {
				return {
					key,
					name: value.name || key,
				};
			}
			return {
				key,
				name: key,
			};
		})
		.filter(Boolean);
});

const nestedValue = computed({
	get() {
		const fieldPath = getField(props.field);
		const comparator = getComparator(props.field);
		const value = get(props.field, `${fieldPath}.${comparator}`);

		if (['_some', '_none'].includes(comparator)) {
			// Handle _some/_none nested filter structure
			if (value && typeof value === 'object' && '_and' in value) {
				return value._and;
			} else if (value && typeof value === 'object' && '_or' in value) {
				return value._or;
			} else if (Array.isArray(value)) {
				return value;
			}
			return [];
		}
		return value;
	},
	set(newVal) {
		const fieldPath = getField(props.field);
		const comparator = getComparator(props.field);

		if (['_some', '_none'].includes(comparator)) {
			// Wrap nested filters in _and if there are multiple, or unwrap if single
			let wrappedValue;
			if (Array.isArray(newVal)) {
				if (newVal.length === 0) {
					wrappedValue = { _and: [] };
				} else if (newVal.length === 1) {
					wrappedValue = newVal[0];
				} else {
					wrappedValue = { _and: newVal };
				}
			} else {
				wrappedValue = newVal;
			}
			emit('update:field', fieldToFilter(fieldPath, comparator, wrappedValue));
		} else {
			emit('update:field', fieldToFilter(fieldPath, comparator, newVal));
		}
	},
});

const continents = {
	AF: 'Africa',
	AN: 'Antarctica',
	AS: 'Asia',
	EU: 'Europe',
	NA: 'North America',
	OC: 'Oceania',
	SA: 'South America',
};

const inputTypes = {
	bigInteger: 'input',
	binary: 'input',
	boolean: 'boolean',
	date: 'datetime',
	dateTime: 'datetime',
	decimal: 'input',
	float: 'input',
	integer: 'input',
	json: 'input-code',
	string: 'input',
	text: 'input-multiline',
	time: 'datetime',
	timestamp: 'datetime',
	uuid: 'input',
	csv: 'input',
	hash: 'input-hash',
	geometry: 'map',
};

const { countries, languages } = IntlInfo(navigator.language, false);

const fieldInterface = computed(() => {
	const dynamic = {
		is: 'interface-input',
		type: fieldInfo.value?.type ?? 'unknown',
		inputProps: { ...fieldInfo.value },
	};

	delete dynamic.inputProps.type;

	if (fieldInfo.value?.choices) {
		delete dynamic.inputProps.choices;

		dynamic.is = 'select';
		let items = fieldInfo.value?.choices;
		if (typeof items === 'string') {
			switch (items) {
				case '$COUNTRIES':
					items = Object.entries(countries).map(([k, v]) => ({
						text: v,
						value: k,
					}));
					break;
				case '$CONTINENTS':
					items = Object.entries(continents).map(([k, v]) => ({
						text: v,
						value: k,
					}));
					break;
				case '$LANGUAGES':
					items = Object.entries(languages).map(([k, v]) => ({
						text: v,
						value: k,
					}));
					break;
			}
		}
		dynamic.inputProps.items = items;
	} else if (fieldInfo.value?.interface) {
		delete dynamic.inputProps.interface;
		dynamic.is = 'interface-' + fieldInfo.value?.interface;
	} else {
		dynamic.is = 'interface-' + inputTypes[(fieldInfo.value?.type || 'string') as keyof typeof inputTypes];
	}

	return dynamic;
});

const value = computed({
	get() {
		const fieldPath = getField(props.field);
		const comparator = getComparator(props.field);

		const value = get(props.field, `${fieldPath}.${comparator}`);
		if (['_in', '_nin'].includes(getComparator(props.field))) {
			return [...value.filter((val: any) => val !== null && val !== ''), null];
		} else {
			return value;
		}
	},
	set(newVal) {
		const fieldPath = getField(props.field);
		const comparator = getComparator(props.field);

		let value;

		if (['_in', '_nin'].includes(comparator)) {
			value = newVal.filter((val: any) => val !== null && val !== '');
		} else {
			value = newVal;
		}
		emit('update:field', fieldToFilter(fieldPath, comparator, value));
	},
});

function setValueAt(index: number, newVal: any) {
	let newArray = Array.isArray(value.value) ? clone(value.value) : new Array(index + 1);
	newArray[index] = newVal;
	value.value = newArray;
}
</script>

<template>
	<template v-if="['_some', '_none'].includes(getComparator(field))">
		<div class="nested-filter">
			<nodes
				:filter="nestedValue"
				:depth="1"
				:tree="nestedTree"
				:branches="nestedBranches"
				:inline="false"
				@update:filter="nestedValue = $event"
				@change="nestedValue = nestedValue"
				@remove-node="() => {}"
			/>
		</div>
	</template>
	<template
		v-else-if="
			['_contains', '_ncontains', '_starts_with', '_nstarts_with', '_ends_with', '_nends_with'].includes(
				getComparator(field)
			)
		"
	>
		<input-component is="interface-input" :value="value" @input="value = $event" />
	</template>
	<template v-else-if="['_eq', '_neq', '_lt', '_gt', '_lte', '_gte'].includes(getComparator(field))">
		<input-component v-bind="fieldInterface" :value="value" @input="value = $event" />
	</template>

	<div
		v-else-if="['_in', '_nin'].includes(getComparator(field))"
		class="list"
		:class="{ moveComma: fieldInterface.is === 'interface-input' }"
	>
		<div v-for="(val, index) in value" :key="index" class="value">
			<input-component v-bind="fieldInterface" :value="val" :focus="false" @input="setValueAt(index, $event)" />
		</div>
	</div>

	<template v-else-if="['_between', '_nbetween'].includes(getComparator(field))" class="between">
		<input-component v-bind="fieldInterface" :value="value[0]" @input="setValueAt(0, $event)" />
		<div class="and">{{ t('interfaces.filter.and') }}</div>
		<input-component v-bind="fieldInterface" :value="value[1]" @input="setValueAt(1, $event)" />
	</template>
</template>

<script></script>

<style lang="scss" scoped>
.nested-filter {
	margin-left: -8px;
	padding: 8px;
	background-color: var(--background-subdued);
	border-radius: 6px;

	:deep(.group) {
		margin-left: 0;
		padding-left: 0;
		border-left: none;
	}
}

.value {
	display: flex;
	align-items: center;

	.v-icon {
		margin-right: 8px;
		margin-left: 12px;
		color: var(--filter-subdued);
		cursor: pointer;

		&:hover {
			color: var(--danger);
		}
	}
}

.list {
	display: flex;

	.value:not(:last-child)::after {
		margin-right: 6px;
		content: ',';
	}

	&.moveComma .value:not(:last-child)::after {
		margin: 0 8px 0 -6px;
	}
}

.and {
	margin: 0px 8px;
}
</style>
