<script setup lang="ts">
import { isEmpty } from 'lodash-es';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Nodes from './components/nodes.vue';

const props = defineProps({
	value: {
		type: Object,
		default: null,
	},
});

const { t } = useI18n();

const innerValue = computed(() => {
	if (!props.value || isEmpty(props.value)) return [];

	return props.value._and ? props.value._and : [props.value];
});
</script>

<template>
	<div class="system-filter" :class="{ empty: innerValue.length === 0 }">
		<v-list :mandatory="true">
			<div v-if="innerValue.length === 0" class="no-rules">
				{{ t('interfaces.filter.no_rules') }}
			</div>
			<nodes v-else :filter="innerValue" inline :depth="1" :tree="{}" :branches="[]" />
		</v-list>
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
		margin: 0;
		padding: 0;
		border: 0;

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
			display: none;
		}

		.no-rules {
			color: var(--foreground-subdued);
			font-family: var(--family-monospace);
		}
	}
}
</style>
