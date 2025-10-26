# Implementation of `_some` and `_none` Operators

This document describes the implementation of `_some` and `_none` filter operators for relationship fields in the Directus filters interface extension.

## Overview

According to the [Directus documentation](https://directus.io/docs/guides/connect/filter-rules#_some-vs-_none-in-one-to-many-and-many-to-many), `_some` and `_none` are special operators for filtering One-to-Many and Many-to-Many relational fields:

- **`_some`**: Matches items where **at least one** related item meets the condition
- **`_none`**: Matches items where **none** of the related items meet the condition

## How to Use

### Step 1: Select a Relationship Field

When adding a filter, select a field that represents a relationship (e.g., `children`, `categories`, `authors`).

### Step 2: Choose Some or None Operator

After selecting a relationship field, you'll see `Some` and `None` as operator options in the dropdown (along with other operators).

### Step 3: Define Nested Filters

Once you select `Some` or `None`, a nested filter interface will appear where you can:

- Add conditions on the related collection's fields
- Use logical grouping (AND/OR) for multiple conditions
- Build complex nested queries

## Example Use Cases

### Example 1: Articles with Recipe Category

```json
{
	"categories": {
		"_some": {
			"name": {
				"_eq": "Recipe"
			}
		}
	}
}
```

This finds all articles where at least one category is named "Recipe".

### Example 2: Parents with No Adult Children

```json
{
	"children": {
		"_none": {
			"age": {
				"_gte": 18
			}
		}
	}
}
```

This finds all parents where none of their children are 18 or older.

### Example 3: Complex Nested Conditions

```json
{
	"orders": {
		"_some": {
			"_and": [
				{
					"status": {
						"_eq": "completed"
					}
				},
				{
					"total": {
						"_gt": 1000
					}
				}
			]
		}
	}
}
```

This finds all customers where at least one order is completed AND has a total greater than 1000.

## Technical Details

### Files Modified

1. **`src/components/nodes.vue`**

   - Added detection of relationship fields in `getCompareOptions()`
   - Added `_some` and `_none` to operators list for relationship fields
   - Updated `updateComparator()` to initialize nested filter structure

2. **`src/components/input-group.vue`**

   - Imported `Nodes` component for nested rendering
   - Added `nestedTree`, `nestedBranches`, and `nestedValue` computed properties
   - Added template section to render nested `Nodes` component for `_some`/`_none`
   - Added styling for nested filter display

3. **`filters-display/src/components/nodes.vue`**
   - Added `getNestedFilters()` and `getNestedTree()` helper functions
   - Updated template to render nested filters for `_some`/`_none` operators
   - Added styling for nested display

### Field Detection

Relationship fields are detected by checking if a field:

- Is an object (not a primitive type)
- Does NOT have a `type` property
- Has nested properties (the related collection's fields)

This works because relationship fields in the tree structure contain nested field definitions rather than a simple type.

### Data Structure

When `_some` or `_none` is selected, the value is structured as:

```json
{
	"field_name": {
		"_some": {
			"_and": [
				// nested filter conditions
			]
		}
	}
}
```

The nested conditions can contain:

- Single filter condition
- `_and` group with multiple conditions
- `_or` group with multiple conditions

## Testing Checklist

- [ ] Relationship fields show `Some` and `None` operators
- [ ] Regular (non-relationship) fields do NOT show these operators
- [ ] Selecting `Some` shows a nested filter interface
- [ ] Selecting `None` shows a nested filter interface
- [ ] Can add multiple nested conditions
- [ ] Can use AND/OR grouping within nested filters
- [ ] Nested filters display correctly in the interface
- [ ] Nested filters display correctly in the display component
- [ ] Generated filter object matches Directus API format
- [ ] Can save and reload filters with `_some`/`_none` operators

## Known Limitations

1. The implementation assumes relationship fields are identified by having nested properties without a `type` field. If your schema has a different structure, the field detection logic in `getCompareOptions()` may need adjustment.

2. The nested filter interface currently shows all nested fields. If you need to filter which fields are available in the nested interface, you can modify the `nestedBranches` computed property in `input-group.vue`.
