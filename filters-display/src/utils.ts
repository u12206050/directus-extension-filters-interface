import { Filter } from '@directus/shared/types';
import { get } from 'lodash-es';

export function getNodeName(node: Filter): string {
	return Object.keys(node)[0] as string;
}

export function getField(node: Record<string, any>): string {
	const name = getNodeName(node);
	if (name.startsWith('_')) return '';
	const subFields = getField(node[name]);
	return subFields !== '' ? `${name}.${subFields}` : name;
}

export function getComparator(node: Record<string, any>): string {
	return getNodeName(get(node, getField(node)));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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