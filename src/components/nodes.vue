<template>
	<draggable
		tag="ul"
		draggable=".row"
		handle=".drag-handle"
		class="group"
		:list="filterSync"
		:disabled="disabled"
		:group="{ name: 'g1' }"
		:item-key="getIndex"
		:swap-threshold="0.3"
		:force-fallback="true"
		@change="$emit('change')"
	>
		<template #item="{ element, index }">
			<li class="row" :class="{ disabled }">
				<div v-if="filterInfo[index].isField" block class="node field">
					<div class="node-content" :class="{ inline }">
						<v-icon name="drag_indicator" class="drag-handle" small></v-icon>
						<v-select
							inline
							class="name"
							item-text="name"
							item-value="key"
							placement="bottom-start"
							:full-width="false"
							:model-value="filterInfo[index].field"
							:items="branches"
							:mandatory="false"
							:groups-clickable="true"
							@update:modelValue="updateField(index, $event)"
						>
							<template #preview>{{ getFieldPreview(element) }}</template>
						</v-select>
						<v-select
							inline
							class="comparator"
							placement="bottom-start"
							:model-value="filterInfo[index].comparator"
							:items="getCompareOptions(filterInfo[index].field)"
							@update:modelValue="updateComparator(index, $event)"
						/>
						<input-group :field="element" :tree="tree" @update:field="replaceNode(index, $event)" />
						<span class="delete">
							<v-icon
								v-tooltip="t('delete_label')"
								name="close"
								small
								clickable
								@click="$emit('remove-node', [index])"
							/>
						</span>
					</div>
				</div>

				<div v-else class="node logic">
					<div class="node-content" :class="{ inline }">
						<v-icon name="drag_indicator" class="drag-handle" small />
						<div
							class="logic-type"
							:class="{
								or: filterInfo[index].name === '_or',
								none: filterInfo[index].isNone,
							}"
						>
							<span class="key" @click="toggleLogic(index)">
								{{ getLogicLabel(filterInfo[index]) }}
							</span>
							<span class="text">
								{{ t('interfaces.filter.of_the_following') }}
								<b>{{ relationshipDisplayName(filterInfo[index]) }}</b>
							</span>
						</div>
						<span class="delete">
							<v-icon
								v-tooltip="t('delete_label')"
								name="close"
								small
								clickable
								@click="$emit('remove-node', [index])"
							/>
						</span>

						<!-- Add Filter button for _none groups -->
						<div v-if="filterInfo[index].isNone" class="add-sub-filter">
							<v-select
								inline
								item-text="name"
								item-value="key"
								placement="bottom-start"
								class="add-filter"
								:placeholder="t('interfaces.filter.add_filter')"
								:model-value="null"
								:items="[
									{ key: '$group', name: t('interfaces.filter.add_group') },
									{ divider: true },
									...getNoneGroupBranches(filterInfo[index]),
								]"
								:mandatory="false"
								:groups-clickable="true"
								@update:modelValue="addNoneGroupFilter(index, filterInfo[index], $event)"
							>
							</v-select>
						</div>
					</div>
					<nodes
						:filter="getNoneGroupFilters(element, filterInfo[index])"
						:depth="depth + 1"
						:inline="inline"
						:tree="getNoneGroupTree(filterInfo[index])"
						:branches="getNoneGroupBranches(filterInfo[index])"
						@change="$emit('change')"
						@remove-node="
							$emit('remove-node', [
								`${index}.${filterInfo[index].isNone ? filterInfo[index].name + '._none' : filterInfo[index].name}`,
								...$event,
							])
						"
						@update:filter="updateNoneGroup(index, filterInfo[index], $event)"
					/>
				</div>
			</li>
		</template>
	</draggable>
</template>

<script lang="ts" setup>
import { getFilterOperatorsForType, toArray } from '@directus/utils';
import { get, set } from 'lodash-es';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Draggable from 'vuedraggable';
import { fieldToFilter, getComparator, getField, getNodeName } from '../utils';
import InputGroup from './input-group.vue';

const { t } = useI18n();

const props = defineProps({
	filter: {
		type: Object,
		required: true,
	},
	tree: Object,
	branches: Array,
	depth: {
		type: Number,
		default: 1,
	},
	inline: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['remove-node', 'update:filter', 'change']);

const filterSync = computed({
	get() {
		return props.filter;
	},
	set(newVal) {
		emit(`update:filter` as const, newVal);
	},
});

const filterInfo = computed({
	get() {
		return props.filter.map((node, id) => {
			const name = getNodeName(node);
			const isField = name.startsWith('_') === false;

			// Check if this is a _none group (special case: field with _none operator)
			if (isField) {
				const fieldValue = node[name];
				if (fieldValue && typeof fieldValue === 'object' && '_none' in fieldValue) {
					// This is a _none group - treat it as a logical group
					return {
						id,
						name,
						isField: false,
						isNone: true,
						relationshipField: name,
						node,
					};
				}
			}

			return isField
				? {
						id,
						isField,
						name,
						field: getField(node),
						comparator: getComparator(node),
						node,
				  }
				: { id, name, isField, node };
		});
	},
	set(newVal) {
		emit(
			'update:filter',
			newVal.map(val => val.node)
		);
	},
});

function getFieldPreview(node) {
	const fieldKey = getField(node);

	// Handle function syntax like count(field)
	const functionMatch = fieldKey.match(/^(\w+)\((.+)\)$/);
	if (functionMatch && functionMatch[1] && functionMatch[2]) {
		const funcName = functionMatch[1];
		const fieldPath = functionMatch[2];
		console.log(fieldPath);
		return `${funcName.charAt(0).toUpperCase() + funcName.slice(1)} (${prettyPath(fieldPath)})`;
	}

	return prettyPath(fieldKey);
}

function prettyPath(path: string) {
	const fieldParts = path.split('.');

	const fieldNames = fieldParts.map((fieldKey, index) => {
		const pathPrefix = fieldParts.slice(0, index);
		const field = get(props.tree, [...pathPrefix, fieldKey].join('.'));
		return (field?.__displayName || field?.name) ?? fieldKey;
	});

	return fieldNames.join(' -> ');
}

function getIndex(item) {
	return props.filter.findIndex(filter => filter === item);
}

function getLogicLabel(nodeInfo: any): string {
	if (nodeInfo.isNone) {
		return `None`;
	} else if (nodeInfo.name === '_and') {
		return t('interfaces.filter.all');
	} else if (nodeInfo.name === '_or') {
		return t('interfaces.filter.any');
	}
	return nodeInfo.name;
}

function relationshipDisplayName(nodeInfo: any): string {
	const relationshipTree = get(props.tree, nodeInfo.relationshipField);
	return relationshipTree?.__displayName || relationshipTree?.name || nodeInfo.relationshipField;
}

function stripRelationshipPrefix(filters: any[], relationshipField: string): any[] {
	// Strip the relationship field prefix from nested filters
	return filters.map(filter => {
		const name = getNodeName(filter);

		// If it's a logical group, recursively process its contents
		if (['_and', '_or', '_none'].includes(name)) {
			return {
				[name]: stripRelationshipPrefix(filter[name], relationshipField),
			};
		}

		// If the field starts with the relationship prefix, strip it
		if (name.startsWith(relationshipField + '.')) {
			const strippedField = name.substring(relationshipField.length + 1);
			return {
				[strippedField]: filter[name],
			};
		}

		// Field doesn't have the prefix (already stripped or invalid)
		return filter;
	});
}

function addRelationshipPrefix(filters: any[], relationshipField: string): any[] {
	// Add the relationship field prefix to nested filters
	return filters.map(filter => {
		const name = getNodeName(filter);

		// If it's a logical group, recursively process its contents
		if (['_and', '_or', '_none'].includes(name)) {
			return {
				[name]: addRelationshipPrefix(filter[name], relationshipField),
			};
		}

		// Add the relationship prefix if it doesn't already have it
		if (!name.startsWith(relationshipField + '.')) {
			return {
				[relationshipField + '.' + name]: filter[name],
			};
		}

		// Already has prefix
		return filter;
	});
}

function getNoneGroupFilters(element: any, nodeInfo: any) {
	if (nodeInfo.isNone) {
		const rawFilters = element[nodeInfo.name]._none || [];
		// Strip the relationship prefix from displayed filters
		return stripRelationshipPrefix(Array.isArray(rawFilters) ? rawFilters : [rawFilters], nodeInfo.relationshipField);
	}
	return element[nodeInfo.name];
}

function getNoneGroupTree(nodeInfo: any) {
	if (nodeInfo.isNone) {
		// Get the nested tree for the relationship field
		const relationshipTree = get(props.tree, nodeInfo.relationshipField);
		if (relationshipTree && typeof relationshipTree === 'object' && !relationshipTree.type) {
			const tree = { ...relationshipTree };
			delete tree.__displayName;
			delete tree.__isMultipleRelationship;
			return tree;
		}
		return {};
	}
	return props.tree;
}

function getNoneGroupBranches(nodeInfo: any) {
	if (nodeInfo.isNone) {
		// Build branches from the relationship tree
		const relationshipTree = get(props.tree, nodeInfo.relationshipField);
		if (relationshipTree && typeof relationshipTree === 'object' && !relationshipTree.type) {
			const tree = { ...relationshipTree };
			delete tree.__displayName;
			delete tree.__isMultipleRelationship;
			return objectToTree(tree);
		}
		return [];
	}
	return props.branches;
}

function objectToTree(obj: any, prefix = ''): any[] {
	return Object.keys(obj)
		.map(k => {
			const propValue = obj[k];
			const key = [prefix, k].filter(Boolean).join('.');

			if (typeof propValue === 'object') {
				if (typeof propValue.type === 'string') {
					return {
						key,
						name: typeof propValue.name === 'string' ? propValue.name : k,
					};
				} else {
					const nestedChildren: any[] = objectToTree(propValue, key);
					return {
						key,
						name:
							typeof propValue.__displayName === 'string'
								? propValue.__displayName
								: typeof propValue.name === 'string'
								? propValue.name
								: k,
						children: nestedChildren,
					};
				}
			}

			return null;
		})
		.filter(Boolean);
}

function addNoneGroupFilter(index: number, nodeInfo: any, key: string) {
	if (!nodeInfo.isNone) return;

	const currentFilters = getNoneGroupFilters(filterSync.value[index], nodeInfo);
	let newFilter;

	if (key === '$group') {
		newFilter = { _and: [] };
	} else {
		// Create filter without the relationship prefix (it will be added when saving)
		newFilter = set({}, key, { _eq: null });
	}

	updateNoneGroup(index, nodeInfo, [...currentFilters, newFilter]);
}

function updateNoneGroup(index: number, nodeInfo: any, newFilters: any[]) {
	if (nodeInfo.isNone) {
		// Add the relationship prefix back to the filters before saving
		const prefixedFilters = addRelationshipPrefix(newFilters, nodeInfo.relationshipField);

		// Update the _none group
		filterSync.value = filterSync.value.map((filter, filterIndex) => {
			if (filterIndex === index) {
				return {
					[nodeInfo.relationshipField]: {
						_none: prefixedFilters,
					},
				};
			}
			return filter;
		});
	} else {
		replaceNode(index, { [nodeInfo.name]: newFilters });
	}
}

function toggleLogic(index) {
	const nodeInfo = filterInfo.value[index];

	if (filterInfo.value[index].isField) return;

	// Don't toggle _none groups - they're locked to the relationship
	if (nodeInfo.isNone) return;

	if ('_and' in nodeInfo.node) {
		filterSync.value = filterSync.value.map((filter, filterIndex) => {
			if (filterIndex === index) {
				return { _or: nodeInfo.node._and };
			}

			return filter;
		});
	} else {
		filterSync.value = filterSync.value.map((filter, filterIndex) => {
			if (filterIndex === index) {
				return { _and: nodeInfo.node._or };
			}

			return filter;
		});
	}
}

function updateComparator(index, operator) {
	const nodeInfo = filterInfo.value[index];
	if (nodeInfo.isField === false) return;

	const valuePath = nodeInfo.field + '.' + nodeInfo.comparator;
	let value = get(nodeInfo.node, valuePath);

	switch (operator) {
		case '_in':
		case '_nin':
			update(toArray(value) || []);
			break;
		case '_between':
		case '_nbetween':
			update((toArray(value) || []).slice(0, 2));
			break;
		case '_null':
		case '_nnull':
		case '_empty':
		case '_nempty':
			update(true);
			break;
		case '_intersects':
		case '_nintersects':
		case '_intersects_bbox':
		case '_nintersects_bbox':
			if (['_intersects', '_nintersects', '_intersects_bbox', '_nintersects_bbox'].includes(nodeInfo.comparator)) {
				update(value);
			} else {
				update(null);
			}
			break;
		default:
			update(Array.isArray(value) ? value[0] : value);
			break;
	}

	function update(value) {
		if (nodeInfo.isField === false) return;

		filterSync.value = filterSync.value.map((filter, filterIndex) => {
			if (filterIndex === index) return fieldToFilter(nodeInfo.field, operator, value);
			return filter;
		});
	}
}

function updateField(index, newField) {
	if (newField.includes('.$')) {
		const [path, func] = newField.split('.$');
		switch (func) {
			case 'none':
				return replaceNode(index, { [path]: { _none: [] } });
			default:
				return replaceNode(index, { [`${func}(${path})`]: { _eq: null } });
		}
	}

	const nodeInfo = filterInfo.value[index];
	const oldFieldInfo = get(props.tree, nodeInfo.name);

	// Handle function syntax like count(field) - these return numbers
	const newFunctionMatch = newField.match(/^(\w+)\((.+)\)$/);
	let newFieldInfo =
		newFunctionMatch && newFunctionMatch[1] === 'count'
			? { type: 'integer' } // count() returns integer
			: get(props.tree, newField);

	if (nodeInfo.isField === false) return;

	// Determine old field type (handle function syntax)
	const oldFunctionMatch = nodeInfo.field.match(/^(\w+)\((.+)\)$/);
	const oldFieldType = oldFunctionMatch && oldFunctionMatch[1] === 'count' ? 'integer' : oldFieldInfo?.type;

	const valuePath = nodeInfo.field + '.' + nodeInfo.comparator;
	let value = get(nodeInfo.node, valuePath);
	let comparator = nodeInfo.comparator;

	if (oldFieldType !== newFieldInfo?.type) {
		value = null;
		const opts = getCompareOptions(newField);
		if (!opts.length) return;
		comparator = opts[0].value;
	}

	filterSync.value = filterSync.value.map((filter, filterIndex) => {
		if (filterIndex === index) return fieldToFilter(newField, comparator, value);
		return filter;
	});
}

function replaceNode(index, newFilter) {
	filterSync.value = filterSync.value.map((val, filterIndex) => {
		if (filterIndex === index) return newFilter;
		return val;
	});
}

function getCompareOptions(name) {
	// Handle function syntax like count(field) - these return numbers
	const functionMatch = name.match(/^(\w+)\((.+)\)$/);
	if (functionMatch && functionMatch[1] && functionMatch[2]) {
		const funcName = functionMatch[1];
		if (funcName === 'count') {
			// count() returns an integer, so use all numeric operators
			const operators = getFilterOperatorsForType('integer');
			return operators.map(type => ({
				text: t(`operators.${type}`),
				value: `_${type}`,
			}));
		}
	}

	const fieldInfo = get(props.tree, name);
	if (!fieldInfo) return [];

	let operators =
		Array.isArray(fieldInfo.operators) && fieldInfo.operators.length > 0
			? fieldInfo.operators
			: getFilterOperatorsForType(fieldInfo.type || 'string');

	// Add _none operator for o2m/m2m relationship fields only (not m2o)
	if (fieldInfo.__isMultipleRelationship) {
		operators.push('none');
	}

	return operators.map(type => ({
		text: t(`operators.${type}`),
		value: `_${type}`,
	}));
}
</script>

<style lang="scss" scoped>
.node-content {
	position: relative;
	display: flex;
	align-items: center;
	width: fit-content;
	margin-right: 18px;
	margin-bottom: 8px;
	padding: 2px 6px;
	padding-right: 8px;
	background-color: var(--filter-background);
	border: var(--filter-border-width) solid var(--filter-border-color);
	border-radius: 100px;
	transition: border-color var(--fast) var(--transition);

	.logic-type {
		color: var(--filter-subdued);

		.key {
			margin-right: 4px;
			padding: 2px 6px;
			border-radius: 6px;
			cursor: pointer;
			transition: var(--fast) var(--transition);
			transition-property: color, background-color;

			color: var(--blue-125);
			background-color: var(--blue-10);

			&:hover {
				background-color: var(--blue-25);
			}
		}

		&.or .key {
			color: var(--orange-125);
			background-color: var(--orange-10);

			&:hover {
				background-color: var(--orange-25);
			}
		}

		&.none .key {
			color: var(--red-125);
			background-color: var(--red-10);

			&:hover {
				background-color: var(--red-25);
			}
		}
	}

	.add-sub-filter {
		padding: 0 10px;
		margin-left: 10px;
		font-weight: 500;

		.add-filter {
			--v-select-placeholder-color: var(--secondary);
		}
	}

	.name,
	.comparator {
		position: relative;
		z-index: 2;
		display: inline-block;
		margin-right: 8px;

		&::before {
			position: absolute;
			top: 0px;
			left: -4px;
			z-index: -1;
			width: calc(100% + 8px);
			height: 100%;
			background-color: var(--filter-background);
			border-radius: 6px;
			opacity: 0;
			transition: opacity var(--fast) var(--transition);
			content: '';
			pointer-events: none;
		}

		&:hover::before {
			opacity: 1;
		}
	}

	.comparator {
		font-weight: 700;
	}

	.value {
		color: var(--green);
	}

	.delete {
		--v-icon-color: var(--filter-subdued);
		--v-icon-color-hover: var(--danger);

		position: absolute;
		top: 50%;
		left: 100%;
		padding-left: 4px;
		transform: translateY(-50%);
		opacity: 0;
		transition: opacity var(--fast) var(--transition);
	}

	&:hover {
		border-color: var(--filter-border--hover);

		.delete,
		&:hover {
			opacity: 1;
		}
	}

	.drag-handle {
		--v-icon-color: var(--filter-subdued);

		margin-right: 4px;
		cursor: grab;
	}

	&.inline {
		width: auto;
		margin-right: 0;
		padding-right: 12px;

		.delete {
			right: 8px;
			left: unset;
			background-color: var(--filter-background);
		}
	}
}

.row.disabled {
	.drag-handle,
	.delete {
		display: none;
	}
}

.group :deep(.sortable-ghost) {
	.node .node-content {
		background-color: var(--primary-alt);
		border-color: var(--primary);

		> * {
			opacity: 0;
		}
	}
}
</style>
