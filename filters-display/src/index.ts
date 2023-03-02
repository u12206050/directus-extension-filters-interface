import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'filters-display',
	name: 'Filters&Rules',
	icon: 'search',
	description: 'A display for filter and rules',
	component: DisplayComponent,
	options: null,
	types: ['json'],
});
