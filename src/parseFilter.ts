export type ObjectType = Record<string, any>;

export function parseFilter(obj: ObjectType | null, currentItem: ObjectType): any {
	return deepParse(obj, currentItem);
}

function deepParse(obj: ObjectType | null, currentItem: ObjectType): any {
	if (Array.isArray(obj)) {
		return obj.map(val => {
			return isObjectLike(val) ? deepParse(val, currentItem) : parseValue(val, currentItem);
		});
	} else if (isObjectLike(obj)) {
		const res: ObjectType = {};

		for (const key in obj) {
			const val = obj[key];

			if (isObjectLike(val)) {
				res[key] = deepParse(val, currentItem);
			} else {
				res[key] = parseValue(val, currentItem);
			}
		}

		return res;
	} else {
		return obj;
	}
}

function parseValue(value: any, currentItem: ObjectType) {
	if (value === 'true') return true;
	if (value === 'false') return false;
	if (value === 'null' || value === 'NULL') return null;
	if (typeof value === 'string' && value.startsWith('$CURRENT_ITEM.')) {
		return get(currentItem, value.replace('$CURRENT_ITEM.', ''), null);
	}
	return value;
}

function isObjectLike(value: any) {
	return value && typeof value === 'object';
}

function get(obj: ObjectType | any[], path: string, defaultValue: any): any {
	const [key, ...follow] = path.split('.');
	const result = Array.isArray(obj) ? obj.map(entry => entry[key!]) : obj?.[key!];
	if (follow.length > 0) {
		return get(result, follow.join('.'), defaultValue);
	}
	return result ?? defaultValue;
}
