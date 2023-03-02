<template>
	<li v-for="(element, index) in filterSync" :key="index" class="row">
		<div v-if="filterInfo[index].isField" block class="node field">
			<div class="header" :class="{ inline }">
				<span>{{ getFieldPreview(element) }}</span>
				<span class="comparator">{{ getCompareText(filterInfo[index].comparator) }}</span>
				<span class="preview-value">{{ getFieldValue(element) }}</span>
			</div>
		</div>

		<div v-else class="node logic">
			<div class="header" :class="{ inline }">
				<div class="logic-type" :class="{ or: filterInfo[index].name === '_or' }">
					<span class="key">
						{{ filterInfo[index].name === '_and' ? t('interfaces.filter.all') : t('interfaces.filter.any') }}
					</span>
					<span class="text">{{ t('interfaces.filter.of_the_following') }}</span>
				</div>
			</div>
			<nodes
				:filter="element[filterInfo[index].name]"
				:depth="depth + 1"
				:inline="inline"
				:tree="tree"
				:branches="branches"
			/>
		</div>
	</li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import _get from 'lodash.get';
import { getField, getNodeName, getComparator } from '../utils';

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
})

const emit = defineEmits(['remove-node', 'update:filter', 'change'])

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
			newVal.map((val) => val.node)
		);
	},
});

function getFieldPreview(node) {
	const fieldKey = getField(node);

	const fieldParts = fieldKey.split('.');

	const fieldNames = fieldParts.map((fieldKey, index) => {
		const pathPrefix = fieldParts.slice(0, index);
		const field = _get(props.tree, [...pathPrefix, fieldKey].join('.'));
		return field?.name ?? fieldKey;
	});

	return fieldNames.join(' -> ');
}

function getCompareText(comparator) {
	return t(`operators.${comparator.slice(1)}`);
}

function getFieldValue(node) {
	const fieldPath = getField(node);
	const comparator = getComparator(node);

	let value = _get(node, `${fieldPath}.${comparator}`);
	if (['_in', '_nin'].includes(comparator)) {
		value = [...(value).filter((val: any) => val !== null && val !== ''), null];
	}

	if (Array.isArray(value)) {
		value = value.join(', ')
	}

	if (value === null) return null;
	if (value === undefined) return null;

	if (typeof value === 'string' && value.length > 25) {
		return value.substring(0, 22) + '...';
	}

	return value;
}
</script>

<style lang="scss" scoped>

.preview-value {
	display: flex;
	justify-content: center;
	color: var(--primary);
	font-family: var(--family-monospace);
}

.header {
	position: relative;
	display: flex;
	align-items: center;
	width: fit-content;
	margin-right: 18px;
	margin-bottom: 8px;
	padding: 2px 6px;
	padding-right: 8px;
	background-color: var(--background-page);
	border: var(--border-width) solid var(--border-subdued);
	border-radius: 100px;
	transition: border-color var(--fast) var(--transition);

	.logic-type {
		color: var(--foreground-subdued);

		.key {
			margin-right: 4px;
			padding: 2px 6px;
			color: var(--primary);
			background-color: var(--primary-alt);
			border-radius: 6px;
			cursor: pointer;
			transition: var(--fast) var(--transition);
			transition-property: color, background-color;

			&:hover {
				background-color: var(--primary-25);
			}
		}

		&.or .key {
			color: var(--secondary);
			background-color: var(--secondary-alt);

			&:hover {
				background-color: var(--secondary-25);
			}
		}
	}

	:deep(.inline-display) {
		padding-right: 0px;

		.v-icon {
			display: none;
		}
	}

	.name,
	.comparator {
		position: relative;
		z-index: 2;
		display: inline-block;
		margin: 0 8px;
	}

	.comparator {
		font-weight: 700;
	}

	.value {
		color: var(--green);
	}
	&.inline {
		width: auto;
		margin-right: 0;
		padding-right: 12px;
	}
}

.group :deep(.sortable-ghost) {
	.node .header {
		background-color: var(--primary-alt);
		border-color: var(--primary);

		> * {
			opacity: 0;
		}
	}
}
</style>