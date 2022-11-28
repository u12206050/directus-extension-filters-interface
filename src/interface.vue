<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import _get from 'lodash.get';
import _set from 'lodash.set';
import _isEmpty from 'lodash.isempty';
import _cloneDeep from 'lodash.clonedeep';
import Nodes from './components/nodes.vue';
import { getNodeName } from './utils';


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
})

const emit = defineEmits(['input'])
const { t } = useI18n();

const innerValue = computed({
	get() {
		if (!props.value || _isEmpty(props.value)) return [];

		const name = getNodeName(props.value);

		if (name === '_and') {
			return _cloneDeep(props.value['_and']);
		} else {
			return _cloneDeep([props.value]);
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

const tree = ref<any>(null)
const branches = ref<Array<any>>([])
try {
	tree.value = typeof props.properties === 'string' ? JSON.parse(props.properties) : props.properties
	branches.value = objectToTree(tree.value)
} catch (e) {
	console.error(e)
}

const fieldOptions = computed(() => {
	return [{ key: '$group', name: t('interfaces.filter.add_group') }, { divider: true }, ...(branches.value || [])];
});

function objectToTree(obj, prefix = '') {
	return Object.keys(obj).map((k) => {
		const propValue = obj[k]
		if (typeof propValue === 'string') {
			obj[k] = {
				name: k,
				type: propValue
			}
			return {
				key: [prefix, k].filter(s => s).join('.'),
				name: k,
				type: propValue
			}
		}

		if (typeof propValue === 'object') {
			if (typeof propValue.type === 'string') {
				return {
					key: [prefix, k].filter(s => s).join('.'),
					name: propValue.name || k,
					type: propValue.type || 'string'
				}
			} else {
				return {
					key: [prefix, k].filter(s => s).join('.'),
					name: k,
					children: objectToTree(propValue, k)
				}
			}
		}

		return null
	}).filter(b => !!b)
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
		const node = _set({}, key, { ['_eq']: null });
		innerValue.value = innerValue.value.concat(node);
	}
}

function removeNode(ids) {
	const id = ids.pop();

	if (ids.length === 0) {
		innerValue.value = innerValue.value.filter((node, index) => index !== Number(id));
		return;
	}

	let list = _get(innerValue.value, ids.join('.'))

	list = list.filter((node, index) => index !== Number(id));

	innerValue.value = _set(innerValue.value, ids.join('.'), list);
}
</script>
  
<template>
	<v-notice v-if="!tree" type="warning">
	  Properties not setup correctly!
	</v-notice>
  
	<div v-else class="system-filter" :class="{ inline, empty: innerValue.length === 0 }">
	  <v-list :mandatory="true">
		<div v-if="innerValue.length === 0" class="no-rules">
		  {{ t('interfaces.filter.no_rules') }}
		</div>
		<nodes
			v-else
			v-model:filter="innerValue"
			:depth="1"
			:tree="tree"
			:branches="branches"
			@remove-node="removeNode($event)"
			@change="emitValue"
		/>
	  </v-list>
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
	</div>
  </template>
  
  <style lang="scss" scoped>
  .system-filter {
	:deep(ul),
	:deep(li) {
	  list-style: none;
	}
  
	:deep(.group) {
	  margin-left: 18px;
	  padding-left: 10px;
	  border-left: var(--border-width) solid var(--border-subdued);
	}
  
	.v-list {
	  margin: 0px 0px 10px;
	  padding: 20px 20px 12px;
	  border: var(--border-width) solid var(--border-subdued);
  
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
  
	&.empty {
	  .v-list {
		display: flex;
		align-items: center;
		height: var(--input-height);
		padding-top: 0;
		padding-bottom: 0;
	  }
  
	  .no-rules {
		color: var(--foreground-subdued);
		font-family: var(--family-monospace);
	  }
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
		  background-color: var(--background-page);
		  border: var(--border-width) solid var(--border-subdued);
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
  }
  </style>