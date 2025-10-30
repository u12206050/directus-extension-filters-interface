<script setup lang="ts">
import { useStores } from '@directus/extensions-sdk';
import { cloneDeep, get, isEmpty, set } from 'lodash-es';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
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
	useCollection: {
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
const { useFieldsStore, useRelationsStore } = useStores();

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

// Build properties from collection recursively (up to 3 levels)
function buildPropertiesFromCollection(
	collectionName: string,
	depth: number = 0,
	visitedCollections: Set<string> = new Set()
): Record<string, any> {
	// Prevent infinite recursion and limit depth to 3 levels
	if (depth >= 3 || visitedCollections.has(collectionName)) {
		return {};
	}

	const fieldsStore = useFieldsStore();
	const relationsStore = useRelationsStore();
	const fields = fieldsStore.getFieldsForCollection(collectionName);

	if (!fields) return {};

	// Mark this collection as visited
	const currentVisited = new Set(visitedCollections);
	currentVisited.add(collectionName);

	const properties: Record<string, any> = {};

	fields.forEach((field: any) => {
		// Skip system fields and alias groups
		if (field.field.startsWith('$')) return;
		if (field.type === 'alias' && field.meta?.special?.includes('group')) return;

		const special = field.meta?.special;
		let relatedCollection = null;

		// Debug logging for first level
		if (depth === 0) {
			console.log(`Field: ${field.field}, Type: ${field.type}, Special: ${special?.join(', ') || 'none'}`);
		}

		// Handle different relationship types
		if (special?.includes('m2o')) {
			// Many-to-One: This collection has FK to another
			const relations = relationsStore.getRelationsForField(collectionName, field.field);
			if (relations?.[0]) {
				relatedCollection = relations[0].related_collection || relations[0].meta?.one_collection;
			}
		} else if (special?.includes('o2m')) {
			// One-to-Many: Another collection has FK to this one
			const allRelations = relationsStore.relations;
			const reverseRelation = allRelations.find(
				(r: any) => r.meta?.one_field === field.field && r.meta?.one_collection === collectionName
			);
			if (reverseRelation) {
				relatedCollection = reverseRelation.collection;
			}
		} else if (special?.includes('m2m')) {
			// Many-to-Many: Goes through a junction table
			const allRelations = relationsStore.relations;
			const reverseRelation = allRelations.find(
				(r: any) => r.meta?.one_field === field.field && r.meta?.one_collection === collectionName
			);
			if (reverseRelation) {
				// reverseRelation.collection is the junction table
				// Find the other side of the junction
				const junctionCollection = reverseRelation.collection;
				const junctionRelations = relationsStore.getRelationsForCollection(junctionCollection);
				const otherSide = junctionRelations.find(
					(r: any) => r.collection === junctionCollection && r.related_collection !== collectionName
				);
				if (otherSide) {
					relatedCollection = otherSide.related_collection;
				}
			}
		} else {
			// Regular FK field (not alias)
			const relations = relationsStore.getRelationsForField(collectionName, field.field);
			if (relations?.[0]) {
				relatedCollection = relations[0].related_collection || relations[0].meta?.one_collection;
			}
		}

		if (depth === 0 && relatedCollection) {
			console.log(`  → Related to: ${relatedCollection}`);
		}

		// If we found a related collection, build nested properties
		if (relatedCollection && relatedCollection !== collectionName) {
			const nestedProps = buildPropertiesFromCollection(relatedCollection, depth + 1, currentVisited);

			if (Object.keys(nestedProps).length > 0) {
				// For relationship fields, use ONLY nested properties (no 'type' property)
				// This enables _some/_none operators
				// Store the display name separately to avoid collision with nested field named "name"
				// Store relationship type to determine if _none is applicable
				const isMultipleRelationship = special?.includes('o2m') || special?.includes('m2m');

				properties[field.field] = {
					...nestedProps,
					__displayName: typeof field.name === 'string' ? field.name : field.field,
					__isMultipleRelationship: isMultipleRelationship,
				};

				if (depth === 0) {
					console.log(
						`  ✅ Added nested properties with ${Object.keys(nestedProps).length} fields (${special?.join(', ')})`
					);
				}
			}
		} else {
			// Regular field (not a relation)
			// Ensure name is always a string
			const fieldName = typeof field.name === 'string' ? field.name : field.field;

			properties[field.field] = {
				name: fieldName,
				type: field.type,
			};

			// Add choices if they exist
			if (field.meta?.options?.choices) {
				properties[field.field].choices = field.meta.options.choices;
			}
		}
	});

	return properties;
}

// Compute effective properties
const effectiveProperties = computed(() => {
	// Priority 1: Collection-based properties
	if (props.useCollection) {
		return buildPropertiesFromCollection(props.useCollection);
	}

	// Priority 2: Custom properties
	if (props.properties) {
		try {
			return typeof props.properties === 'string' ? JSON.parse(props.properties) : props.properties;
		} catch (e) {
			console.error('Error parsing properties:', e);
		}
	}

	return null;
});

const tree = ref<any>(null);
const branches = ref<Array<any>>([]);

// Watch for changes and rebuild tree
watch(
	() => effectiveProperties.value,
	newProps => {
		if (newProps) {
			try {
				tree.value = newProps;
				branches.value = objectToTree(tree.value);
			} catch (e) {
				console.error('Error building tree:', e);
			}
		} else {
			tree.value = null;
			branches.value = [];
		}
	},
	{ immediate: true }
);

const fieldOptions = computed(() => {
	return [{ key: '$group', name: t('interfaces.filter.add_group') }, { divider: true }, ...(branches.value || [])];
});

function objectToTree(obj, prefix = '') {
	return Object.keys(obj)
		.map(k => {
			const propValue = obj[k];
			const key = [prefix, k].filter(Boolean).join('.');

			if (k === '__displayName') return propValue;

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
					// Regular field with a type - ensure name is a string
					const fieldName = typeof propValue.name === 'string' ? propValue.name : k;
					return {
						key,
						name: fieldName,
					};
				} else {
					// Relationship field with nested properties
					// Filter out special internal properties from nested children
					const allNestedChildren: any[] = objectToTree(propValue, key);
					const nestedChildren = allNestedChildren.filter(
						child => child && child.key !== `${key}.__displayName` && child.key !== `${key}.__isMultipleRelationship`
					);

					// Add special options at the top for o2m/m2m relationship operators only
					// Note: _some is the default behavior, m2o relationships don't support _none or count
					let specialChildren;
					if (propValue.__isMultipleRelationship === true) {
						specialChildren = [
							{ key: `${key}.$count`, name: '# Count', operator: 'count', selectable: true },
							{ key: `${key}.$none`, name: '∅ None', operator: '_none', selectable: true },
							{ divider: true },
						];
					}

					// Check for __displayName first, then fall back to name, then key
					let fieldName = k;
					if (typeof propValue.__displayName === 'string') {
						fieldName = propValue.__displayName;
					} else if (typeof propValue.name === 'string') {
						fieldName = propValue.name;
					}

					return {
						key,
						name: fieldName,
						children: specialChildren ? [...specialChildren, ...nestedChildren] : nestedChildren,
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
	} else if (key.endsWith('.$none')) {
		// Handle [None] operator for relationships
		// Create a _none group scoped to the relationship
		const fieldPath = key.replace(/\.\$none$/, '');
		const node = set({}, fieldPath, { _none: [] });
		innerValue.value = innerValue.value.concat(node);
	} else if (key.endsWith('.$count')) {
		// Handle count() function for relationships
		const fieldPath = key.replace(/\.\$count$/, '');
		const countKey = `count(${fieldPath})`;
		const node = { [countKey]: { _eq: null } };
		innerValue.value = innerValue.value.concat(node);
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

	:deep(.node-content .v-select.comparator .inline-display),
	:deep(.node-content .v-select.name .inline-display) {
		padding-right: 0;
		span.v-icon {
			display: none;
		}
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
