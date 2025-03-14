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
			field: 'properties',
			name: 'Properties',
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
			},
			schema: {
				default_value: `{}`,
			},
		},
	],
});