# Relationship Filters: `_none` Operator and `count()` Function

## Overview

This extension supports advanced filtering for One-to-Many (o2m) and Many-to-Many (m2m) relationship fields according to the [Directus filter rules documentation](https://directus.io/docs/guides/connect/filter-rules).

### Features

- **`count()` function**: Filter by the number of related items
- **`_none` operator**: Filter where none of the related items match conditions
- **Only for o2m/m2m**: Both features only work with relationships that can have multiple items
- **Default behavior**: Filtering on nested fields uses `_some` (at least one matches)

## How to Use

### For o2m/m2m Relationships

When you expand a One-to-Many or Many-to-Many relationship field in the "Add Filter" dropdown:

```
organizations ▶
  ├─ # Count        ← Filter by number of organizations
  ├─ ∅ None         ← Filter where no organizations match
  ├─ ─────────
  ├─ name           ← Default: at least one matches
  ├─ status
  └─ ...
```

## Count Function

### What It Does

Filters items based on the **number** of related items.

### How to Use

1. Expand a relationship field (e.g., `organizations`)
2. Select **# Count**
3. Choose an operator (equals, greater than, less than, etc.)
4. Enter a number

### Examples

**Example 1: Exactly 10 Organizations**

```json
{
	"count(organizations)": {
		"_eq": 10
	}
}
```

**Example 2: More Than 5 Organizations**

```json
{
	"count(organizations)": {
		"_gt": 5
	}
}
```

**Example 3: At Least 1 Organization (Has Organizations)**

```json
{
	"count(organizations)": {
		"_gte": 1
	}
}
```

**Example 4: No Organizations**

```json
{
	"count(organizations)": {
		"_eq": 0
	}
}
```

## None Operator

### What It Does

Filters items where **none** of the related items match the specified conditions.

### How to Use

1. Expand a relationship field (e.g., `organizations`)
2. Select **∅ None**
3. A red group appears: "Organizations - None of the following:"
4. Add filters for the related collection's fields

### Examples

**Example 1: No Organizations Named "Acme"**

Visual:

```
🔴 Organizations - None of the following:
   └─ Name Equals "Acme"
```

Generated Filter:

```json
{
	"organizations": {
		"_none": {
			"name": {
				"_eq": "Acme"
			}
		}
	}
}
```

**Example 2: No Active Organizations**

Visual:

```
🔴 Organizations - None of the following:
   └─ Status Equals "active"
```

Generated Filter:

```json
{
	"organizations": {
		"_none": {
			"status": {
				"_eq": "active"
			}
		}
	}
}
```

**Example 3: Complex - No Large Active Organizations**

Visual:

```
🔴 Organizations - None of the following:
   ├─ Status Equals "active"
   └─ Size Equals "large"
```

Generated Filter:

```json
{
	"organizations": {
		"_none": {
			"status": { "_eq": "active" },
			"size": { "_eq": "large" }
		}
	}
}
```

**Note**: When multiple filters are added to a `_none` group, they are merged into a flat object. The `_and` operator is not supported inside `_none` groups.

## Combining Count and None

You can combine these features with other filters for powerful queries!

**Example: Has Between 1-5 Organizations, None of Which Are Active**

```json
{
	"_and": [
		{
			"count(organizations)": {
				"_between": [1, 5]
			}
		},
		{
			"organizations": {
				"_none": {
					"status": {
						"_eq": "active"
					}
				}
			}
		}
	]
}
```

## Comparison Table

| Filter Type                        | Use Case             | Example                                |
| ---------------------------------- | -------------------- | -------------------------------------- |
| **Nested Field** (default `_some`) | At least one matches | organizations → status = "active"      |
| **count()**                        | Filter by number     | count(organizations) ≥ 5               |
| **\_none**                         | None match condition | organizations None → status = "active" |

## Technical Details

### Count Function

- **Syntax**: `count(field_name)`
- **Returns**: Integer (number of related items)
- **Supported Operators**: All numeric operators (\_eq, \_neq, \_gt, \_gte, \_lt, \_lte, \_between, \_nbetween)
- **Type**: Automatically detected as `integer` type for proper input handling

### None Operator

- **Structure**: Field with `_none` operator containing nested filters
- **UI Rendering**: Logical group (like \_and/\_or) with scoped field tree
- **Path Management**: Automatic stripping/adding of relationship prefix
- **Color**: Red to distinguish from other logical groups
- **Toggle**: Cannot be toggled (locked to relationship context)

### Files Modified

1. **`src/interface.vue`**

   - Added `[Count]` and `[None]` options to o2m/m2m relationship dropdowns
   - Handles `.$count` suffix to create count() filters
   - Handles `.$none` suffix to create \_none groups

2. **`src/components/nodes.vue`**

   - Detects `_none` groups and renders as logical groups
   - Handles `count()` function display in field previews
   - Implements path stripping/adding for None groups

3. **`src/components/input-group.vue`**

   - Detects `count()` functions and uses integer input type

4. **`src/utils.ts` & `filters-display/src/utils.ts`**

   - Updated `getField()` to recognize function syntax

5. **`filters-display/src/components/nodes.vue`**
   - Handles display of both `count()` and `_none` features

## Usage Tips

1. **Use `count()` for quantity checks**

   - "Has at least 3 orders"
   - "Has exactly 0 organizations"
   - "Has between 5-10 items"

2. **Use `_none` for exclusion conditions**

   - "No pending orders"
   - "No inactive organizations"
   - "No expired subscriptions"

3. **Use nested fields (default) for inclusion**

   - "Has at least one active organization" (just use: organizations → status = active)

4. **Combine for complex logic**
   - "Has 1-3 organizations, none of which are pending"
