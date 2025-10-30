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
