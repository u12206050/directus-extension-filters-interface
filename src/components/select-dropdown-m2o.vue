<template>
  <v-notice v-if="!displayTemplate" type="warning">
    {{ t('display_template_not_setup') }}
  </v-notice>
  <div v-else class="many-to-one">
    <v-menu v-model="menuActive" attached :disabled="disabled">
      <template #activator="{ active }">
        <v-skeleton-loader v-if="loadingCurrent" type="input" />
        <div class="input" @click="onPreviewClick">
          <template v-if="currentItem">
            <div class="preview">
              <render-template
                  :collection="relatedCollection.collection"
                  :item="currentItem"
                  :template="displayTemplate"
              />
            </div>
            <v-icon v-tooltip="t('deselect')" name="close" class="deselect" @click.stop="$emit('input', null)" />
          </template>
          <template v-else>
            <p class="preview" style="width: 120px">{{ t('select_an_item') }}</p>
            <v-icon class="expand" :class="{ active }" name="expand_more" />
          </template>
        </div>
      </template>

      <v-list>
        <template v-if="itemsLoading">
          <v-list-item v-for="n in 10" :key="`loader-${n}`">
            <v-list-item-content>
              <v-skeleton-loader type="text" />
            </v-list-item-content>
          </v-list-item>
        </template>

        <template v-else-if="relatedPrimaryKeyField">
          <v-list-item
              v-for="item in items"
              :key="item[relatedPrimaryKeyField.field]"
              :active="value === item[relatedPrimaryKeyField.field]"
              clickable
              @click="setCurrent(item)"
          >
            <v-list-item-content>
              <render-template :collection="relatedCollection.collection" :template="displayTemplate" :item="item" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useApi, useStores, useCollection, getFieldsFromTemplate } from '@directus/extensions-sdk';

/**
 * @NOTE
 *
 * The value of a many to one can be one of three things: A primary key (number/string), a nested
 * object of edits (including primary key = editing existing) or an object with new values (no
 * primary key)
 */

export default defineComponent({
  // components: { DrawerItem, DrawerCollection },
  props: {
    value: {
      type: [Number, String, Object],
      default: null,
    },
    collection: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    template: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const api = useApi();

    const { useCollectionsStore } = useStores();

    const { t } = useI18n();

    const { collection } = toRefs(props);

    const collectionsStore = useCollectionsStore();

    const { relatedCollection, relatedPrimaryKeyField } = useRelation();
    const { info: collectionInfo } = useCollection(collection);
    const { selection, stageSelection } = useSelection();
    const { displayTemplate, onPreviewClick, requiredFields } = usePreview();
    const { totalCount, loading: itemsLoading, fetchItems, items } = useItems();

    const { setCurrent, currentItem, loading: loadingCurrent, currentPrimaryKey } = useCurrent();

    const { edits, stageEdits } = useEdits();

    const menuActive = ref(false);

    return {
      t,
      collectionInfo,
      currentItem,
      displayTemplate,
      items,
      itemsLoading,
      loadingCurrent,
      menuActive,
      onPreviewClick,
      relatedCollection,
      selection,
      setCurrent,
      totalCount,
      stageSelection,
      currentPrimaryKey,
      edits,
      stageEdits,
      relatedPrimaryKeyField
    };

    function useCurrent() {
      const currentItem = ref<Record<string, any> | null>(null);
      const loading = ref(false);

      watch(
          () => props.value,
          (newValue: any) => {
            // When the newly configured value is a primitive, assume it's the primary key
            // of the item and fetch it from the API to render the preview
            if (
                newValue !== null &&
                newValue !== currentItem.value?.[relatedPrimaryKeyField.value!.field] &&
                (typeof newValue === 'string' || typeof newValue === 'number')
            ) {
              fetchCurrent(newValue);
            }

                // If the value isn't a primary key, the current value will be set by the editing
            // handlers in useEdit()
            else if (newValue === null) {
              currentItem.value = null;
            }

                // If value is already fullfilled, let's fetch all necessary
            // fields for display template
            else if (
                !currentItem.value &&
                typeof newValue === 'object' &&
                newValue[relatedPrimaryKeyField.value!.field]
            ) {
              fetchCurrent(newValue[relatedPrimaryKeyField.value!.field]);
            }
          },
          { immediate: true }
      );

      const currentPrimaryKey = computed(() => {
        if (!currentItem.value) return '+';
        if (!props.value) return '+';
        if (!relatedPrimaryKeyField.value) return '+';

        if (typeof props.value === 'number' || typeof props.value === 'string') {
          return props.value;
        }

        if (typeof props.value === 'object' && relatedPrimaryKeyField.value!.field in (props.value ?? {})) {
          return props.value?.[relatedPrimaryKeyField.value!.field] ?? '+';
        }

        return '+';
      });

      return { setCurrent, currentItem, loading, currentPrimaryKey };

      function setCurrent(item: Record<string, any>) {
        if (!relatedPrimaryKeyField.value) return;
        currentItem.value = item;
        emit('input', item[relatedPrimaryKeyField.value!.field]);
      }

      async function fetchCurrent(key: string|number) {
        if (!relatedPrimaryKeyField.value || !relatedCollection.value) return;

        loading.value = true;

        const fields = requiredFields.value || [];

        if (fields.includes(relatedPrimaryKeyField.value!.field) === false) {
          fields.push(relatedPrimaryKeyField.value!.field);
        }

        try {
          const endpoint = relatedCollection.value.collection.startsWith('directus_')
              ? `/${relatedCollection.value.collection.substring(9)}/${key}`
              : `/items/${relatedCollection.value.collection}/${encodeURIComponent(key)}`;

          const response = await api.get(endpoint, {
            params: {
              fields: fields,
            },
          });

          currentItem.value = response.data.data;
        } catch (err) {
          console.error(err);
        } finally {
          loading.value = false;
        }
      }
    }

    function useItems() {
      const totalCount = ref(null);

      const items = ref(null);
      const loading = ref(false);

      watch(relatedCollection, () => {
        fetchTotalCount();
        items.value = null;
      });

      return { totalCount, fetchItems, items, loading };

      async function fetchItems() {
        if (items.value !== null) return;
        if (!relatedCollection.value || !relatedPrimaryKeyField.value) return;

        loading.value = true;

        const fields = requiredFields.value || [];

        if (fields.includes(relatedPrimaryKeyField.value!.field) === false) {
          fields.push(relatedPrimaryKeyField.value!.field);
        }

        try {
          const endpoint = relatedCollection.value.collection.startsWith('directus_')
              ? `/${relatedCollection.value.collection.substring(9)}`
              : `/items/${relatedCollection.value.collection}`;

          const response = await api.get(endpoint, {
            params: {
              fields: fields,
              limit: -1,
            },
          });

          items.value = response.data.data;
        } catch (err) {
          console.error(err);
        } finally {
          loading.value = false;
        }
      }

      async function fetchTotalCount() {
        if (!relatedCollection.value) return;

        const endpoint = relatedCollection.value.collection.startsWith('directus_')
            ? `/${relatedCollection.value.collection.substring(9)}`
            : `/items/${relatedCollection.value.collection}`;

        const response = await api.get(endpoint, {
          params: {
            limit: 0,
            meta: 'total_count',
          },
        });

        totalCount.value = response.data.meta.total_count;
      }
    }

    function useRelation() {
      const relatedCollection = computed(() => {
        if (!props.collection) return null;
        return collectionsStore.getCollection(props.collection);
      });

      const relatedCollectionName = computed(() => relatedCollection.value?.collection ?? null);

      const { primaryKeyField: relatedPrimaryKeyField } = useCollection(relatedCollectionName);

      return { relatedCollection, relatedPrimaryKeyField };
    }

    function usePreview() {
      const displayTemplate = computed(() => {
        if (props.template !== null) return props.template;
        return collectionInfo.value?.meta?.display_template || `{{ ${relatedPrimaryKeyField?.value?.field || ''} }}`;
      });

      const requiredFields = computed(() => {
        if (!displayTemplate.value || !relatedCollection.value) return null;

        return getFieldsFromTemplate(displayTemplate.value);
      });

      return { onPreviewClick, displayTemplate, requiredFields };

      function onPreviewClick() {
        if (props.disabled) return;

        const newActive = !menuActive.value;
        menuActive.value = newActive;
        if (newActive === true) fetchItems();
      }
    }

    function useSelection() {
      const selection = computed(() => {
        if (!props.value) return [];
        if (!relatedPrimaryKeyField.value) return [];

        if (typeof props.value === 'object' && relatedPrimaryKeyField.value!.field in (props.value ?? {})) {
          return [props.value[relatedPrimaryKeyField.value!.field]];
        }

        if (typeof props.value === 'string' || typeof props.value === 'number') {
          return [props.value];
        }

        return [];
      });

      return { selection, stageSelection };

      function stageSelection(newSelection: Array<any>) {
        if (newSelection.length === 0) {
          emit('input', null);
        } else {
          emit('input', newSelection[0]);
        }
      }
    }

    function useEdits() {
      const edits = computed(() => {
        // If the current value isn't a primitive, it means we've already staged some changes
        // This ensures we continue on those changes instead of starting over
        if (props.value && typeof props.value === 'object') {
          return props.value;
        }

        return {};
      });

      return { edits, stageEdits };

      function stageEdits(newEdits: Record<string, any>) {
        if (!relatedPrimaryKeyField.value) return;

        // Make sure we stage the primary key if it exists. This is needed to have the API
        // update the existing item instead of create a new one
        if (currentPrimaryKey.value && currentPrimaryKey.value !== '+') {
          emit('input', {
            [relatedPrimaryKeyField.value!.field]: currentPrimaryKey.value,
            ...newEdits,
          });
        } else {
          if (relatedPrimaryKeyField.value!.field in newEdits && newEdits[relatedPrimaryKeyField.value!.field] === '+') {
            delete newEdits[relatedPrimaryKeyField.value!.field];
          }

          emit('input', newEdits);
        }

        currentItem.value = {
          ...currentItem.value ?? {},
          ...newEdits,
        };
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.many-to-one {
  position: relative;

  :deep(.v-input .append) {
    display: flex;
  }

  .input {
    display: flex;
    align-items: center;
  }
}

.v-skeleton-loader {
  top: 0;
  left: 0;
}

.preview {
  display: block;
  flex-grow: 1;
  overflow: hidden;
}

.expand {
  transition: transform var(--fast) var(--transition);

  &.active {
    transform: scaleY(-1);
  }
}

.edit {
  margin-right: 4px;

  &:hover {
    --v-icon-color: var(--foreground-normal);
  }
}

.add:hover {
  --v-icon-color: var(--primary);
}

.deselect:hover {
  --v-icon-color: var(--danger);
}
</style>