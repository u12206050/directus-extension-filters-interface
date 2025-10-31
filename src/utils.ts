import { get } from 'lodash-es';
import type { Filter } from 'rule-filter-validator';

export function getNodeName(node: Filter): string {
	return Object.keys(node)[0] as string;
}

export function getField(node: Record<string, any>): string {
	const name = getNodeName(node);
	if (name.startsWith('_')) return '';
	// Handle function syntax like count(field) - these are leaf nodes
	if (name.match(/^\w+\(.+\)$/)) return name;
	const subFields = getField(node[name]);
	return subFields !== '' ? `${name}.${subFields}` : name;
}

export function getComparator(node: Record<string, any>): string {
	return getNodeName(get(node, getField(node)));
}

export function fieldToFilter(field: string, operator: string, value: any): Record<string, any> {
	return fieldToFilterR(field.split('.'));

	function fieldToFilterR(sections: string[]): Record<string, any> {
		const section = sections.shift();

		if (section !== undefined) {
			return {
				[section]: fieldToFilterR(sections),
			};
		} else {
			return {
				[operator]: value,
			};
		}
	}
}

// Find a field by its full path (e.g., "person.dob"), navigating through groups and relationships
export function findFieldByPath(obj: any, path: string): any | null {
	if (!obj || !path || typeof path !== 'string') return null;

	const parts = path.split('.');
	if (parts.length === 0) return null;

	// Helper to search within a single object level
	function searchAtLevel(level: any, remainingParts: string[]): any | null {
		if (!level || typeof level !== 'object' || remainingParts.length === 0) return null;

		const part = remainingParts[0];
		if (!part) return null;

		// First, check if the field exists directly at this level
		if (Object.prototype.hasOwnProperty.call(level, part)) {
			const found = level[part];
			// If this is the last part, return it
			if (remainingParts.length === 1) {
				return found;
			}
			// Otherwise, continue searching within this found object
			return searchAtLevel(found, remainingParts.slice(1));
		}

		// If not found directly, check groups and relationships
		for (const key of Object.keys(level)) {
			// Skip internal metadata keys
			if (key.startsWith('__')) continue;

			const val = level[key];
			if (!val || typeof val !== 'object') continue;

			// Check if this is a group - search within it
			if (val.__isGroup === true) {
				const foundInGroup = searchAtLevel(val, remainingParts);
				if (foundInGroup) return foundInGroup;
			}
			// Check if this key matches the part we're looking for
			// (could be a relationship or regular field)
			else if (key === part) {
				// Found the part - continue searching within it
				return searchAtLevel(val, remainingParts.slice(1));
			}
		}

		return null;
	}

	return searchAtLevel(obj, parts);
}
