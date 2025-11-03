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
		@change="handleDragChange"
		@add="handleDragAdd"
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
								:items="getNoneGroupItems(filterInfo[index])"
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
						:parent-none-relationship="
							filterInfo[index].isNone ? filterInfo[index].relationshipField : parentNoneRelationship
						"
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
import { fieldToFilter, findFieldByPath, getComparator, getField, getNodeName } from '../utils';
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
	parentNoneRelationship: {
		type: String,
		default: null,
	},
});

const emit = defineEmits(['remove-node', 'update:filter', 'change', 'add-to-none-group']);

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
		// Check if this segment is a function call like year(dob)
		const functionMatch = fieldKey.match(/^(\w+)\((.+)\)$/);
		if (functionMatch && functionMatch[1] && functionMatch[2]) {
			const funcName = functionMatch[1];
			const innerFieldPath = functionMatch[2];

			// Build the full path up to this point (excluding the function part)
			const pathPrefix = fieldParts.slice(0, index);

			// For the inner field path, we need to resolve it relative to the tree at this point
			// If innerFieldPath has dots (like "person.dob"), we need to resolve each part
			const innerParts = innerFieldPath.split('.');

			// Now resolve the inner field path from the current tree position
			let displayParts: string[] = [];
			for (let i = 0; i < innerParts.length; i++) {
				const innerPart = innerParts[i];
				const innerPrefix = innerParts.slice(0, i);
				const fullPath = [...pathPrefix, ...innerPrefix, innerPart].join('.');
				const field = findFieldByPath(props.tree, fullPath);
				displayParts.push(field?.__displayName || field?.name || innerPart);
			}

			const innerDisplay = displayParts.join(' -> ');
			return `${innerDisplay} (${funcName})`;
		}

		// Regular field segment - build path up to this point
		const pathUpToHere = fieldParts.slice(0, index + 1).join('.');
		const field = findFieldByPath(props.tree, pathUpToHere);
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
	const relationshipTree = findFieldTree(props.tree, nodeInfo.relationshipField);
	return relationshipTree?.__displayName || relationshipTree?.name || nodeInfo.relationshipField;
}

function stripRelationshipPrefix(filters: any[], relationshipField: string): any[] {
	// Strip the relationship field prefix from nested filters
	return filters
		.filter(filter => filter != null && typeof filter === 'object')
		.map(filter => {
			const name = getNodeName(filter);

			// Guard against undefined/null names
			if (!name || typeof name !== 'string') {
				return filter;
			}

			// If it's a logical group, recursively process its contents
			if (['_and', '_or', '_none'].includes(name)) {
				const groupValue = filter[name];
				if (Array.isArray(groupValue)) {
					return {
						[name]: stripRelationshipPrefix(groupValue, relationshipField),
					};
				}
				return filter;
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
		const rawFilters = element[nodeInfo.name]?._none;
		if (!rawFilters || typeof rawFilters !== 'object') return [];

		// Handle different formats:
		// 1. Array (old incorrect format - for backward compatibility)
		// 2. Object with _and property (correct format for multiple filters)
		// 3. Single object (correct format for single filter)
		let filters: any[];
		if (Array.isArray(rawFilters)) {
			filters = rawFilters.filter(f => f != null && typeof f === 'object');
		} else if (rawFilters._and && Array.isArray(rawFilters._and)) {
			filters = rawFilters._and.filter(f => f != null && typeof f === 'object');
		} else if (typeof rawFilters === 'object' && Object.keys(rawFilters).length > 0) {
			filters = [rawFilters];
		} else {
			return [];
		}

		// Strip the relationship prefix from displayed filters
		return stripRelationshipPrefix(filters, nodeInfo.relationshipField);
	}
	return element[nodeInfo.name];
}

function getNoneGroupTree(nodeInfo: any) {
	if (nodeInfo.isNone) {
		// Get the nested tree for the relationship field (supports grouped trees)
		const relationshipTree = findFieldTree(props.tree, nodeInfo.relationshipField);
		// Check if this is a relationship container (has nested fields) vs a leaf field (has type as string)
		if (relationshipTree && typeof relationshipTree === 'object' && typeof relationshipTree.type !== 'string') {
			const tree = { ...relationshipTree };
			delete tree.__displayName;
			delete tree.__isMultipleRelationship;
			delete tree.__isGroup;
			return tree;
		}
		return {};
	}
	return props.tree;
}

function getNoneGroupItems(nodeInfo: any) {
	if (!nodeInfo || !nodeInfo.isNone) {
		return [{ key: '$group', name: t('interfaces.filter.add_group') }, { divider: true }];
	}

	const branches = getNoneGroupBranches(nodeInfo) || [];
	return [{ key: '$group', name: t('interfaces.filter.add_group') }, { divider: true }, ...branches];
}

function getNoneGroupBranches(nodeInfo: any) {
	if (nodeInfo.isNone) {
		// Build branches from the relationship tree (supports grouped trees)
		const relationshipTree = findFieldTree(props.tree, nodeInfo.relationshipField);

		// Check if this is a relationship container (has nested fields) vs a leaf field (has type as string)
		if (relationshipTree && typeof relationshipTree === 'object' && typeof relationshipTree.type !== 'string') {
			const tree = { ...relationshipTree };
			delete tree.__displayName;
			delete tree.__isMultipleRelationship;
			delete tree.__isGroup;

			return objectToTree(tree);
		}
		return [];
	}
	return props.branches;
}

function objectToTree(obj: any, prefix = ''): any[] {
	if (!obj || typeof obj !== 'object') return [];

	return Object.keys(obj)
		.map(k => {
			const propValue = obj[k];

			// Skip internal metadata keys at the top level
			if (k.startsWith('__')) return null;

			const key = [prefix, k].filter(Boolean).join('.');

			if (typeof propValue === 'object' && propValue !== null) {
				if (typeof propValue.type === 'string') {
					// This is a leaf field with a type
					return {
						key,
						name: typeof propValue.name === 'string' ? propValue.name : k,
					};
				} else if (propValue.__isGroup === true) {
					// UI-only group: don't include in path
					const allNestedChildren: any[] = objectToTree(propValue, prefix);
					const nestedChildren = allNestedChildren.filter(child => {
						if (!child || typeof child.key !== 'string') return false;
						const ck = child.key;
						if (ck === '__displayName' || ck === '__isMultipleRelationship' || ck === '__isGroup') return false;
						if (ck.endsWith('.__displayName') || ck.endsWith('.__isMultipleRelationship') || ck.endsWith('.__isGroup'))
							return false;
						return true;
					});

					// Only return group if it has children
					if (nestedChildren.length === 0) return null;

					return {
						key: `group:${key}`,
						name:
							typeof propValue.__displayName === 'string'
								? propValue.__displayName
								: typeof propValue.name === 'string'
								? propValue.name
								: k,
						children: nestedChildren,
					};
				} else {
					// Relationship field or nested structure
					const nestedChildren: any[] = objectToTree(propValue, key);

					// Only return if it has children or is a selectable field
					if (nestedChildren.length === 0 && !propValue.type) return null;

					return {
						key,
						name:
							typeof propValue.__displayName === 'string'
								? propValue.__displayName
								: typeof propValue.name === 'string'
								? propValue.name
								: k,
						children: nestedChildren.length > 0 ? nestedChildren : undefined,
					};
				}
			}

			return null;
		})
		.filter(Boolean);
}

// Recursively find a field tree anywhere within the object, navigating through groups
function findFieldTree(obj: any, target: string): any | null {
	if (!obj || typeof obj !== 'object') return null;

	// First check if the field exists directly at this level
	if (Object.prototype.hasOwnProperty.call(obj, target)) {
		return obj[target];
	}

	// Search recursively through all object properties
	for (const key of Object.keys(obj)) {
		// Skip internal metadata keys themselves (don't treat __displayName as a searchable field)
		if (key.startsWith('__')) continue;

		const val = obj[key];
		if (!val || typeof val !== 'object') continue;

		// Explicitly check if this key matches the target (could be a relationship field)
		if (key === target) {
			return val;
		}

		// Skip leaf fields that have a type (these are terminal fields, not containers)
		if (typeof val.type === 'string') continue;

		// Check if this is a group - search within it explicitly
		if (val.__isGroup === true) {
			// Search within the group for the target field
			if (Object.prototype.hasOwnProperty.call(val, target)) {
				return val[target];
			}
			// Also recursively search within the group
			const foundInGroup = findFieldTree(val, target);
			if (foundInGroup) return foundInGroup;
		}

		// Recursively search within this object (could be a relationship or nested structure)
		const found = findFieldTree(val, target);
		if (found) return found;
	}

	return null;
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
		// For _none groups, filters should NOT have the relationship prefix
		// The relationship context is already established by the outer key
		// Filters are relative to the relationship, so use them as-is

		// Format _none according to Directus API expectations:
		// - Single filter: object directly
		// - Multiple filters: object with _and array
		let noneValue: any;
		if (newFilters.length === 0) {
			noneValue = {};
		} else if (newFilters.length === 1) {
			noneValue = newFilters[0];
		} else {
			noneValue = { _and: newFilters };
		}

		// Update the _none group
		filterSync.value = filterSync.value.map((filter, filterIndex) => {
			if (filterIndex === index) {
				return {
					[nodeInfo.relationshipField]: {
						_none: noneValue,
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
	const oldFieldInfo = findFieldByPath(props.tree, nodeInfo.name);

	// Handle function syntax like count(field) - these return numbers
	const newFunctionMatch = newField.match(/^(\w+)\((.+)\)$/);
	let newFieldInfo: any;
	if (newFunctionMatch && newFunctionMatch[1] === 'count') {
		newFieldInfo = { type: 'integer' }; // count() returns integer
	} else if (newFunctionMatch && ['year', 'month', 'day', 'hour', 'minute', 'second'].includes(newFunctionMatch[1])) {
		// dateTime functions return integers
		newFieldInfo = { type: 'integer' };
	} else {
		// Extract field path if there's a nested function call (e.g., "person.year(dob)")
		let fieldPathToLookup = newField;
		const pathParts = newField.split('.');
		const lastPart = pathParts[pathParts.length - 1];
		const nestedFunctionMatch = lastPart.match(/^(\w+)\((.+)\)$/);
		if (nestedFunctionMatch && nestedFunctionMatch[1] && nestedFunctionMatch[2]) {
			// Replace function call with inner field path for lookup
			pathParts[pathParts.length - 1] = nestedFunctionMatch[2];
			fieldPathToLookup = pathParts.join('.');
			// dateTime functions return integers
			if (['year', 'month', 'day', 'hour', 'minute', 'second'].includes(nestedFunctionMatch[1])) {
				newFieldInfo = { type: 'integer' };
			} else {
				newFieldInfo = findFieldByPath(props.tree, fieldPathToLookup);
			}
		} else {
			newFieldInfo = findFieldByPath(props.tree, newField);
		}
	}

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

function handleDragChange(evt: any) {
	// If we're inside a NONE group, check if any items need conversion
	if (props.parentNoneRelationship && evt.added) {
		// An item was added - check if it belongs to this NONE group
		const relationshipPath = props.parentNoneRelationship;
		const newIndex = evt.added.newIndex;

		if (typeof newIndex === 'number' && newIndex < filterSync.value.length) {
			const addedItem = filterSync.value[newIndex];
			const fieldPath = getField(addedItem);

			if (fieldPath && fieldPath.startsWith(relationshipPath + '.')) {
				// This item belongs to this NONE group - strip the prefix
				const strippedFilters = stripRelationshipPrefix([addedItem], relationshipPath);
				filterSync.value = filterSync.value.map((item: any, idx: number) =>
					idx === newIndex ? strippedFilters[0] : item
				);
			} else if (fieldPath && !fieldPath.startsWith(relationshipPath + '.')) {
				// Path doesn't match - remove it (prevent drop)
				filterSync.value = filterSync.value.filter((_: any, idx: number) => idx !== newIndex);
			}
		}
	}

	emit('change');
}

function handleDragAdd(evt: any) {
	// Trigger change handler which will validate
	handleDragChange(evt);
}

function getCompareOptions(name) {
	// Handle function syntax like count(field) or year(dob) - extract the inner field path
	let fieldPath = name;
	let funcName = null;

	// Check if the entire name is a function call
	const topLevelFunctionMatch = name.match(/^(\w+)\((.+)\)$/);
	if (topLevelFunctionMatch && topLevelFunctionMatch[1] && topLevelFunctionMatch[2]) {
		funcName = topLevelFunctionMatch[1];
		fieldPath = topLevelFunctionMatch[2];

		// Handle known functions that return specific types
		if (funcName === 'count') {
			// count() returns an integer, so use all numeric operators
			const operators = getFilterOperatorsForType('integer');
			return operators.map(type => ({
				text: t(`operators.${type}`),
				value: `_${type}`,
			}));
		}
		// dateTime functions like year(), month(), etc. return integers
		if (['year', 'month', 'day', 'hour', 'minute', 'second'].includes(funcName)) {
			const operators = getFilterOperatorsForType('integer');
			return operators.map(type => ({
				text: t(`operators.${type}`),
				value: `_${type}`,
			}));
		}
	}

	// Check if there's a function call within a path (e.g., "person.year(dob)")
	const pathParts = fieldPath.split('.');
	const lastPart = pathParts[pathParts.length - 1];
	const nestedFunctionMatch = lastPart.match(/^(\w+)\((.+)\)$/);
	if (nestedFunctionMatch && nestedFunctionMatch[1] && nestedFunctionMatch[2]) {
		funcName = nestedFunctionMatch[1];
		// Replace the function part with the inner field path
		pathParts[pathParts.length - 1] = nestedFunctionMatch[2];
		fieldPath = pathParts.join('.');

		// dateTime functions return integers
		if (['year', 'month', 'day', 'hour', 'minute', 'second'].includes(funcName)) {
			const operators = getFilterOperatorsForType('integer');
			return operators.map(type => ({
				text: t(`operators.${type}`),
				value: `_${type}`,
			}));
		}
	}

	// Find the field using path-aware lookup (handles groups)
	let fieldInfo = findFieldByPath(props.tree, fieldPath);

	// If not found and we have a simple field name (no dots), try searching recursively
	if (!fieldInfo && !fieldPath.includes('.')) {
		fieldInfo = findFieldTree(props.tree, fieldPath);
	}

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
