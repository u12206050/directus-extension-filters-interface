# `_none` Operator Implementation Guide

## Overview

This extension now supports the `_none` operator for filtering relationship fields (One-to-Many and Many-to-Many) according to the [Directus filter rules documentation](https://directus.io/docs/guides/connect/filter-rules#_some-vs-_none-in-one-to-many-and-many-to-many).

- **`_none`**: Matches items where **none** of the related items meet the condition
- **Only for o2m/m2m**: The `_none` operator only appears for One-to-Many and Many-to-Many relationships. Many-to-One (m2o) relationships have only one related item, so `_none` doesn't apply.
- **Default behavior**: Filtering on relationship nested fields uses `_some` (at least one matches) automatically

## How to Use

### Step 1: Expand a Relationship Field

Click "Add Filter" and expand a relationship field (e.g., `organizations`, `children`, `categories`).

### Step 2: Select [None]

At the **top** of the nested fields dropdown, you'll see:

```
organizations ▶
  ├─ [None]         ← Select this!
  ├─ ─────────
  ├─ name
  ├─ status
  └─ ...
```

### Step 3: Add Nested Filters

Once you select `[None]`, a **red-colored group** appears with "Organizations - None of the following:".

Use the **"Add Filter"** button inside the group to add conditions on the related collection's fields.

## Key Features

### ✅ Clean UI (Like AND/OR Groups)

- Red badge labeled "Organizations - None"
- Same layout as AND/OR groups
- Full drag-and-drop support

### ✅ Automatic Field Scoping

- Inside the None group, you only see organization fields
- Select "name" not "organizations.name"
- Paths are automatically managed

### ✅ Smart Path Management

- **When adding filters**: Paths are added automatically (name → organizations.name)
- **When removing filters**: Dragging out strips the prefix automatically
- **When saving**: Filter structure matches Directus API format

### ✅ Full Nesting Support

- Can add AND/OR groups inside None groups
- Can nest multiple levels
- Can mix with other filters

## Examples

### Example 1: No Organizations Named "Acme"

**Visual:**

```
🔴 Organizations - None of the following:
   └─ Name Equals "Acme"
```

**Generated Filter:**

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

### Example 2: No Active Organizations

**Visual:**

```
🔴 Organizations - None of the following:
   └─ Status Equals "active"
```

**Generated Filter:**

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

### Example 3: No Organizations Matching Complex Criteria

**Visual:**

```
🔴 Organizations - None of the following:
   ├─ 🔵 All of the following:
   │   ├─ Status Equals "active"
   │   └─ Type Equals "corporate"
   └─ Name Contains "Test"
```

**Generated Filter:**

```json
{
	"organizations": {
		"_none": {
			"_and": [
				{
					"_and": [{ "status": { "_eq": "active" } }, { "type": { "_eq": "corporate" } }]
				},
				{ "name": { "_contains": "Test" } }
			]
		}
	}
}
```

## Comparison: Default vs None

### Default Behavior (At Least One Matches)

```
🔘 Organizations → Status Equals "active"
```

Generates:

```json
{
	"organizations": {
		"status": {
			"_eq": "active"
		}
	}
}
```

Matches: People who have **at least one** active organization.

### None Operator

```
🔴 Organizations - None of the following:
   └─ Status Equals "active"
```

Generates:

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

Matches: People who have **no** active organizations.

## Technical Details

### Implementation Architecture

**`_none` is a Hybrid Operator:**

- **Data Structure**: Field operator (like `_eq`, `_gt`)
  ```json
  { "field": { "_none": <filters> } }
  ```
- **UI Rendering**: Logical group (like `_and`, `_or`)
  - Detected by checking if a field's value is `{ _none: [...] }`
  - Renders with group UI instead of field operator UI

### Path Management

**Stripping (Display):**

```typescript
// organizations.name → name
stripRelationshipPrefix(filters, 'organizations');
```

**Adding (Save):**

```typescript
// name → organizations.name
addRelationshipPrefix(filters, 'organizations');
```

**Applied automatically when:**

- Rendering filters in the UI (stripped)
- Saving changes (prefixed)
- Adding new filters (created without prefix)
- Dragging filters in/out (prefix adjusted)

### Files Modified

1. **`src/interface.vue`**

   - Added `[None]` option to relationship field dropdowns
   - Updated `addNode()` to create `_none` groups

2. **`src/components/nodes.vue`**

   - Detects `_none` groups in `filterInfo` computed
   - Renders as logical group with scoped tree/branches
   - Implements `stripRelationshipPrefix()` and `addRelationshipPrefix()`
   - Auto-manages field paths on update/add/remove
   - Added dedicated "Add Filter" button for None groups

3. **`src/components/input-group.vue`**

   - Removed custom nested UI (no longer needed)

4. **`filters-display/src/components/nodes.vue`**
   - Detects and displays `_none` groups with proper labeling
   - Shows relationship name before "None"

## Testing Checklist

- [x] `[None]` option appears in relationship field dropdowns
- [x] Selecting `[None]` creates a red-colored group
- [x] Group label shows "Relationship - None of the following:"
- [x] "Add Filter" button inside group shows only related fields
- [x] Adding filters works directly (no drag-and-drop needed)
- [x] Field paths are displayed without relationship prefix (e.g., "name" not "organizations.name")
- [x] Saved filter includes proper paths with prefix
- [x] Can add AND/OR groups inside None groups
- [x] Can delete filters from None groups
- [x] Drag-and-drop between None group and main area works
- [ ] Filter validates correctly with rule-filter-validator (user testing needed)

## Known Behaviors

1. **Clicking "None" badge does nothing** - Unlike AND/OR which toggle, None is locked to the relationship context
2. **Can't drag regular groups into None** - Would break the structure (validator would catch this)
3. **Dragging from None to main area** - Automatically adds the relationship prefix back
