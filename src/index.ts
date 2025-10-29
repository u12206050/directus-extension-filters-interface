import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'filters',
	name: 'Filters&Rules',
	description: 'A filter interface for creating rules on given properties',
	icon: 'search',
	component: InterfaceComponent,
	types: ['json'],
	group: 'selection',
	options: [
		{
			field: 'useCollection',
			type: 'string',
			name: '$t:collection',
			meta: {
				interface: 'system-collection',
				options: {
					includeSystem: true,
					includeSingleton: false,
				},
				width: 'full',
				note: 'Select a collection to use its fields as the schema. If not set, custom properties below will be used.',
			},
		},
		{
			field: 'properties',
			name: 'Custom Properties',
			type: 'json',
			meta: {
				interface: 'code',
				options: {
					language: 'json',
					template: JSON.stringify(
						{
							name: {
								name: 'Full name',
								type: 'string',
								operators: ['eq', 'neq'],
							},
							age: 'integer',
							gender: {
								type: 'string',
								choices: [
									{
										text: 'Male',
										value: 'male',
									},
									{
										text: 'Female',
										value: 'female',
									},
								],
							},
							country: {
								type: 'string',
								choices: '$COUNTRIES',
							},
							meta: {
								now: 'dateTime',
								active: 'boolean',
							},
						},
						null,
						4
					),
				},
				note: 'Custom schema definition. Only used if no collection is selected above.',
			},
			schema: {
				default_value: `{}`,
			},
		},
	],
});
