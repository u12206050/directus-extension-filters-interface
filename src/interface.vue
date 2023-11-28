<script setup lang="ts">
import { cloneDeep, get, isEmpty, set } from "lodash-es";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import Nodes from "./components/nodes.vue";
import { getNodeName } from "./utils";

const props = defineProps({
	value: {
		type: Object,
		default: null,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	properties: {
		type: String,
		default: null,
	},
	inline: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['input']);
const { t } = useI18n();

const innerValue = computed({
	get() {
		if (!props.value || isEmpty(props.value)) return [];

		const name = getNodeName(props.value);

		if (name === '_and') {
			return cloneDeep(props.value['_and']);
		} else {
			return cloneDeep([props.value]);
		}
	},
	set(newVal) {
		switch (newVal.length) {
			case 0:
				emit('input', null);
				break;
			case 1:
				emit('input', newVal[0]);
				break;
			default:
				emit('input', { _and: newVal });
				break;
		}
	},
});

const tree = ref<any>(null);
const branches = ref<Array<any>>([]);
try {
	tree.value = typeof props.properties === 'string' ? JSON.parse(props.properties) : props.properties;
	branches.value = objectToTree(tree.value);
} catch (e) {
	console.error(e);
}

const fieldOptions = computed(() => {
	return [{ key: '$group', name: t('interfaces.filter.add_group') }, { divider: true }, ...(branches.value || [])];
});

function objectToTree(obj, prefix = '') {
	return Object.keys(obj)
		.map(k => {
			const propValue = obj[k];
			const key = [prefix, k].filter(Boolean).join('.');
			if (typeof propValue === 'string') {
				obj[k] = {
					name: k,
					type: propValue,
				};
				if (propValue === 'dateTime' || propValue === 'timestamp') {
					const intervals = ['year', 'month', 'day', 'hour', 'minute', 'second'];
					const children = [{ key, name: 'raw' }];

					intervals.forEach(interval => {
						const fn = `${interval}(${k})`;
						const key = [prefix, fn].filter(Boolean).join('.');
						obj[fn] = { key, name: interval, type: 'integer' };
						children.push(obj[fn]);
					});

					return {
						key,
						name: k,
						selectable: true,
						children,
					};
				}

				return {
					key,
					name: k,
				};
			}

			if (typeof propValue === 'object') {
				if (typeof propValue.type === 'string') {
					return {
						key,
						name: propValue.name || k,
					};
				} else {
					return {
						key,
						name: k,
						children: objectToTree(propValue, key),
					};
				}
			}

			return null;
		})
		.filter(Boolean) as Array<{
			name: string;
			key: string;
			selectable?: boolean;
			type?: string;
			children?: Array<any>;
		}>;
}

function emitValue() {
	if (innerValue.value.length === 0) {
		emit('input', null);
	} else {
		emit('input', { _and: innerValue.value });
	}
}

function addNode(key) {
	if (key === '$group') {
		innerValue.value = innerValue.value.concat({ _and: [] });
	} else {
		const node = set({}, key, { ['_eq']: null });
		innerValue.value = innerValue.value.concat(node);
	}
}

function removeNode(ids) {
	const id = ids.pop();

	if (ids.length === 0) {
		innerValue.value = innerValue.value.filter((node, index) => index !== Number(id));
		return;
	}

	let list = get(innerValue.value, ids.join('.'));

	list = list.filter((node, index) => index !== Number(id));

	innerValue.value = set(innerValue.value, ids.join('.'), list);
}
</script>

<template>
	<v-notice v-if="!tree" type="warning"> Properties not setup correctly! </v-notice>

	<div v-else class="rules-filter-interface" :class="{ inline, disabled, empty: innerValue.length === 0 }">
		<v-notice v-if="innerValue.length === 0" type="info">
			{{ t('interfaces.filter.no_rules') }}

			<div class="buttons">
				<v-select
					:inline="!inline"
					item-text="name"
					item-value="key"
					placement="bottom-start"
					class="add-filter"
					:placeholder="t('interfaces.filter.add_filter')"
					:full-width="inline"
					:model-value="null"
					:items="fieldOptions"
					:mandatory="false"
					:groups-clickable="true"
					@update:modelValue="addNode($event)"
				>
					<template v-if="inline" #prepend>
						<v-icon name="add" small />
					</template>
				</v-select>
			</div>
		</v-notice>
		
		<v-list v-else :mandatory="true">			
			<nodes
				v-model:filter="innerValue"
				:depth="1"
				:tree="tree"
				:branches="branches"
				:inline="inline"
				:disabled="disabled"
				@remove-node="removeNode($event)"
				@change="emitValue"
			/>
			<div class="buttons">
				<v-select
					:inline="!inline"
					item-text="name"
					item-value="key"
					placement="bottom-start"
					class="add-filter"
					:placeholder="t('interfaces.filter.add_filter')"
					:full-width="inline"
					:model-value="null"
					:items="fieldOptions"
					:mandatory="false"
					:groups-clickable="true"
					@update:modelValue="addNode($event)"
				>
					<template v-if="inline" #prepend>
						<v-icon name="add" small />
					</template>
				</v-select>
			</div>
		</v-list>
	</div>
</template>

<style>
.v-list.list {
	--v-list-min-width: 148px;
}
.rules-filter-interface {
	--filter-background: var(--theme--background);
	--filter-color: var(--theme--foreground);
	--filter-subdued: var(--theme--foreground-subdued);
	--filter-border-width: var(--theme--border-width);
	--filter-border-color: var(--theme--form--field--input--border-color);
	--filter-border--hover: var(--theme--form--field--input--border-color-hover);
	--filter-padding: var(--theme--form--field--input--padding, 8px);
}
</style>

<style lang="scss" scoped>
.rules-filter-interface {
	:deep(ul),
	:deep(li) {
		list-style: none;
	}

	:deep(.group) {
		margin-left: 18px;
		padding-left: 10px;
		border-left: var(--filter-border-width) solid var(--filter-border-color);
	}

	.v-list {
		margin: 0px 0px 10px;
		padding: var(--filter-padding);
		border: var(--filter-border-width) solid var(--filter-border-color);

		& > :deep(.group) {
			margin-left: 0px;
			padding-left: 0px;
			border-left: none;
		}
	}

	.buttons {
		padding: 0 10px;
		font-weight: 600;
	}

	.add-filter {
		--v-select-placeholder-color: var(--primary);
	}

	&.inline {
		.v-list {
			margin: 0;
			padding: 0;
			border: 0;
		}

		&.empty .v-list {
			display: none;
		}

		.buttons {
			margin: 0;
			padding: 0;
		}

		.add-filter {
			width: 100%;

			:deep(.v-input) {
				position: relative;
				width: 100%;
				height: 30px;
				padding: 0;
				background-color: var(--theme--background);
				color: var(--theme--forground);
				border: var(--filter-border-width) solid var(--filter-border-color);
				border-radius: 100px;
				transition: border-color var(--fast) var(--transition);

				.input {
					padding-right: 5px;
					padding-left: 6px;
					background: transparent;
					border: 0;

					.prepend {
						margin-right: 4px;
					}
				}
			}
		}
	}

	&.disabled {
		.buttons {
			display: none;
		}
	}
}
</style>
