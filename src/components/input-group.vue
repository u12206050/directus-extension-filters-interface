<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import _clone from 'lodash.clone';
import _get from 'lodash.get';
import InputComponent from './input-component.vue';
import { fieldToFilter, getComparator, getField } from '../utils';
import IntlInfo from "../intl";

const props = defineProps({
	field: {
		type: Object,
		required: true,
	},
	tree: Object
})


const { t } = useI18n();

const emit = defineEmits(['update:field']);

const fieldInfo = computed(() => {
	return _get(props.tree, getField(props.field));
});

const continents = { AF: "Africa", AN: "Antarctica", AS: "Asia", EU: "Europe", NA: "North America", OC: "Oceania", SA: "South America" }

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

const { countries, languages } = IntlInfo(navigator.language, false)

const fieldInterface = computed(() => {
	const dynamic = {
		is: 'interface-input',
		type: fieldInfo.value?.type ?? 'unknown',
		inputProps: { ...fieldInfo.value }
	}

	delete (dynamic.inputProps.type)

	if (fieldInfo.value?.choices) {
		delete (dynamic.inputProps.choices)

		dynamic.is = 'select'
		let items = fieldInfo.value?.choices
		if (typeof items === 'string') {
			switch (items) {
				case '$COUNTRIES':

					items = Object.entries(countries).map(([k, v]) => ({
						text: v,
						value: k
					}));
					break;
				case '$CONTINENTS':
					items = Object.entries(continents).map(([k, v]) => ({
						text: v,
						value: k
					}));
					break;
				case '$LANGUAGES':
					items = Object.entries(languages).map(([k, v]) => ({
						text: v,
						value: k
					}));
					break;
			}
		}
		dynamic.inputProps.items = items
	} else if (fieldInfo.value?.interface) {
		delete (dynamic.inputProps.interface)
		dynamic.is = 'interface-' + fieldInfo.value?.interface
	} else {
		dynamic.is = 'interface-' + inputTypes[(fieldInfo.value?.type || 'string') as keyof typeof inputTypes]
	}

	return dynamic
});

const value = computed({
	get() {
		const fieldPath = getField(props.field);
		const comparator = getComparator(props.field);

		const value = _get(props.field, `${fieldPath}.${comparator}`);
		if (['_in', '_nin'].includes(getComparator(props.field))) {
			return [...(value).filter((val: any) => val !== null && val !== ''), null];
		} else {
			return value;
		}
	},
	set(newVal) {
		const fieldPath = getField(props.field);
		const comparator = getComparator(props.field);

		let value;

		if (['_in', '_nin'].includes(comparator)) {
			value = (newVal).filter((val: any) => val !== null && val !== '');
		} else {
			value = newVal;
		}
		emit('update:field', fieldToFilter(fieldPath, comparator, value));
	},
});

function setValueAt(index: number, newVal: any) {
	let newArray = Array.isArray(value.value) ? _clone(value.value) : new Array(index + 1);
	newArray[index] = newVal;
	value.value = newArray;
}
</script>

<template>
	<template v-if="[
		'_eq',
		'_neq',
		'_lt',
		'_gt',
		'_lte',
		'_gte',
		'_contains',
		'_ncontains',
		'_starts_with',
		'_nstarts_with',
		'_ends_with',
		'_nends_with',
	].includes(getComparator(field))">
		<input-component v-bind="fieldInterface" :value="value" @input="value = $event" />
	</template>

	<div v-else-if="['_in', '_nin'].includes(getComparator(field))" class="list"
		:class="{ moveComma: fieldInterface.is === 'interface-input' }">
		<div v-for="(val, index) in value" :key="index" class="value">
			<input-component v-bind="fieldInterface" :value="val" :focus="false" @input="setValueAt(index, $event)" />
		</div>
	</div>

	<template v-else-if="['_between', '_nbetween'].includes(getComparator(field))" class="between">
		<input-component v-bind="fieldInterface"
			:value="value[0]"
			@input="setValueAt(0, $event)"
		/>
		<div class="and">{{ t('interfaces.filter.and') }}</div>
		<input-component v-bind="fieldInterface"
			:value="value[1]"
			@input="setValueAt(1, $event)"
		/>
	</template>
</template>

<script>

</script>

<style lang="scss" scoped>
.value {
	display: flex;
	align-items: center;

	.v-icon {
		margin-right: 8px;
		margin-left: 12px;
		color: var(--foreground-subdued);
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