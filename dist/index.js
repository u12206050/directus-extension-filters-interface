import { useApi, useStores, useCollection, getFieldsFromTemplate, defineInterface } from '@directus/extensions-sdk';
import * as vue from 'vue';
import { defineComponent, toRefs, inject, ref, computed, watch, resolveComponent, resolveDirective, unref, openBlock, createBlock, withCtx, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, createElementBlock, Fragment, createVNode, withDirectives, withModifiers, normalizeClass, renderList, onMounted, normalizeStyle, mergeProps, resolveDynamicComponent, createSlots } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseJoi from 'joi';
import * as sortablejs from 'sortablejs';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$d.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$c.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$2 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && baseGetTag(value) == symbolTag$2);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike$1(value) && baseGetTag(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$7.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$5 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$5 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$5] = typedArrayTags[numberTag$2] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
typedArrayTags[setTag$5] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike$1(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$2.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root, 'Set');

/** `Object#toString` result references. */
var mapTag$4 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$4 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set$1),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map && getTag(new Map) != mapTag$4) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set$1 && getTag(new Set$1) != setTag$4) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$4;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$4;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$3 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$3:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$3:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike$1(value) && getTag$1(value) == mapTag$2;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

/** `Object#toString` result references. */
var setTag$2 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike$1(value) && getTag$1(value) == setTag$2;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$2 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag$1] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag$1] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$1,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$2;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG$1);
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

/* micromustache v8.0.3 */
/** @internal */
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
var numberConstructor = (0).constructor;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
numberConstructor.isFinite;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
numberConstructor.isInteger;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
[].constructor.isArray;

/**
 * @internal
 * The number of different varNames that will be cached.
 * If a varName is cached, the actual parsing algorithm will not be called
 * which significantly improves performance.
 * However, this cache is size-limited to prevent degrading the user's software
 * over a period of time.
 * If the cache is full, we start removing older varNames one at a time.
 */
var cacheSize = 1000;
/**
 * @internal
 */
var Cache = /** @class */ (function () {
    function Cache(size) {
        this.size = size;
        this.reset();
    }
    Cache.prototype.reset = function () {
        this.oldestIndex = 0;
        this.map = {};
        this.cachedKeys = new Array(this.size);
    };
    Cache.prototype.get = function (key) {
        return this.map[key];
    };
    Cache.prototype.set = function (key, value) {
        this.map[key] = value;
        var oldestKey = this.cachedKeys[this.oldestIndex];
        if (oldestKey !== undefined) {
            delete this.map[oldestKey];
        }
        this.cachedKeys[this.oldestIndex] = key;
        this.oldestIndex++;
        this.oldestIndex %= this.size;
    };
    return Cache;
}());
/** @internal */
new Cache(cacheSize);

var t$1={table:"directus_collections",defaults:{collection:null,hidden:!1,singleton:!1,icon:null,note:null,translations:null,display_template:null,accountability:"all"},data:[{collection:"directus_access",icon:"admin_panel_settings",note:"$t:directus_collection.directus_access",display_template:"{{ policy.name }}",sort_field:"sort"},{collection:"directus_activity",note:"$t:directus_collection.directus_activity",accountability:null},{collection:"directus_collections",icon:"database",note:"$t:directus_collection.directus_collections"},{collection:"directus_comments",note:"$t:directus_collection.directus_comments"},{collection:"directus_fields",icon:"input",note:"$t:directus_collection.directus_fields"},{collection:"directus_files",icon:"folder",note:"$t:directus_collection.directus_files",display_template:"{{ $thumbnail }} {{ title }}"},{collection:"directus_folders",note:"$t:directus_collection.directus_folders",display_template:"{{ name }}"},{collection:"directus_migrations",note:"$t:directus_collection.directus_migrations"},{collection:"directus_permissions",icon:"admin_panel_settings",note:"$t:directus_collection.directus_permissions"},{collection:"directus_policies",icon:"admin_panel_settings",note:"$t:directus_collection.directus_policies"},{collection:"directus_presets",icon:"bookmark",note:"$t:directus_collection.directus_presets",accountability:null},{collection:"directus_relations",icon:"merge_type",note:"$t:directus_collection.directus_relations"},{collection:"directus_revisions",note:"$t:directus_collection.directus_revisions",accountability:null},{collection:"directus_roles",icon:"supervised_user_circle",note:"$t:directus_collection.directus_roles"},{collection:"directus_sessions",note:"$t:directus_collection.directus_sessions"},{collection:"directus_settings",singleton:!0,note:"$t:directus_collection.directus_settings"},{collection:"directus_users",archive_field:"status",archive_value:"archived",unarchive_value:"draft",icon:"people_alt",note:"$t:directus_collection.directus_users",display_template:"{{ first_name }} {{ last_name }}"},{collection:"directus_webhooks",note:"$t:directus_collection.directus_webhooks"},{collection:"directus_dashboards",note:"$t:directus_collection.directus_dashboards"},{collection:"directus_panels",note:"$t:directus_collection.directus_panels"},{collection:"directus_notifications",note:"$t:directus_collection.directus_notifications"},{collection:"directus_shares",icon:"share",note:"$t:directus_collection.directus_shares"},{collection:"directus_flows",note:"$t:directus_collection.directus_flows"},{collection:"directus_operations",note:"$t:directus_collection.directus_operations"},{collection:"directus_translations",note:"$t:directus_collection.directus_translations"},{collection:"directus_versions",note:"$t:directus_collection.directus_versions"},{collection:"directus_extensions",note:"$t:directus_collection.directus_extensions"}]};t$1.data.map(i=>({...t$1.defaults,...i,system:!0}));t$1.data.map(i=>i.collection);var l={table:"directus_relations",defaults:{many_collection:"directus_users",many_field:null,one_collection:null,one_field:null,one_allowed_collections:null,one_collection_field:null,one_deselect_action:"nullify",junction_field:null,sort_field:null},data:[{many_collection:"directus_collections",many_field:"group",one_collection:"directus_collections"},{many_collection:"directus_comments",many_field:"collection",one_collection:"directus_collections"},{many_collection:"directus_comments",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_comments",many_field:"user_updated",one_collection:"directus_users"},{many_collection:"directus_users",many_field:"role",one_collection:"directus_roles",one_field:"users"},{many_collection:"directus_users",many_field:"avatar",one_collection:"directus_files"},{many_collection:"directus_revisions",many_field:"activity",one_collection:"directus_activity",one_field:"revisions"},{many_collection:"directus_revisions",many_field:"parent",one_collection:"directus_revisions"},{many_collection:"directus_revisions",many_field:"version",one_collection:"directus_versions"},{many_collection:"directus_presets",many_field:"user",one_collection:"directus_users"},{many_collection:"directus_presets",many_field:"role",one_collection:"directus_roles"},{many_collection:"directus_folders",many_field:"parent",one_collection:"directus_folders"},{many_collection:"directus_files",many_field:"folder",one_collection:"directus_folders"},{many_collection:"directus_files",many_field:"uploaded_by",one_collection:"directus_users"},{many_collection:"directus_files",many_field:"modified_by",one_collection:"directus_users"},{many_collection:"directus_fields",many_field:"collection",one_collection:"directus_collections",one_field:"fields"},{many_collection:"directus_fields",many_field:"group",one_collection:"directus_fields"},{many_collection:"directus_activity",many_field:"user",one_collection:"directus_users"},{many_collection:"directus_settings",many_field:"project_logo",one_collection:"directus_files"},{many_collection:"directus_settings",many_field:"public_foreground",one_collection:"directus_files"},{many_collection:"directus_settings",many_field:"public_background",one_collection:"directus_files"},{many_collection:"directus_settings",many_field:"public_favicon",one_collection:"directus_files"},{many_collection:"directus_settings",many_field:"storage_default_folder",one_collection:"directus_folders"},{many_collection:"directus_settings",many_field:"public_registration_role",one_collection:"directus_roles"},{many_collection:"directus_panels",many_field:"dashboard",one_collection:"directus_dashboards",one_field:"panels"},{many_collection:"directus_panels",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_flows",many_field:"operation",one_collection:"directus_operations"},{many_collection:"directus_flows",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_operations",many_field:"flow",one_collection:"directus_flows",one_field:"operations",one_deselect_action:"delete"},{many_collection:"directus_operations",many_field:"resolve",one_collection:"directus_operations"},{many_collection:"directus_operations",many_field:"reject",one_collection:"directus_operations"},{many_collection:"directus_operations",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_sessions",many_field:"user",one_collection:"directus_users"},{many_collection:"directus_sessions",many_field:"share",one_collection:"directus_shares"},{many_collection:"directus_dashboards",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_notifications",many_field:"recipient",one_collection:"directus_users"},{many_collection:"directus_notifications",many_field:"sender",one_collection:"directus_users"},{many_collection:"directus_shares",many_field:"role",one_collection:"directus_roles"},{many_collection:"directus_shares",many_field:"collection",one_collection:"directus_collections"},{many_collection:"directus_shares",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_versions",many_field:"collection",one_collection:"directus_collections"},{many_collection:"directus_versions",many_field:"user_created",one_collection:"directus_users"},{many_collection:"directus_versions",many_field:"user_updated",one_collection:"directus_users"},{many_collection:"directus_permissions",many_field:"policy",one_collection:"directus_policies",one_field:"permissions",one_deselect_action:"delete"},{many_collection:"directus_access",many_field:"policy",one_collection:"directus_policies",one_field:"roles",one_deselect_action:"delete",junction_field:"role"},{many_collection:"directus_access",many_field:"policy",one_collection:"directus_policies",one_field:"users",one_deselect_action:"delete",junction_field:"user"},{many_collection:"directus_access",many_field:"role",one_collection:"directus_roles",one_field:"policies",one_deselect_action:"delete",junction_field:"policy",sort_field:"sort"},{many_collection:"directus_access",many_field:"user",one_collection:"directus_users",one_field:"policies",one_deselect_action:"delete",junction_field:"policy",sort_field:"sort"},{many_collection:"directus_roles",many_field:"parent",one_collection:"directus_roles",one_field:"children"},{many_collection:"directus_webhooks",many_field:"migrated_flow",one_collection:"directus_flows"}]};l.data.map(i=>({...l.defaults,...i,system:!0}));var o={collection:null,field:null,special:null,interface:null,options:null,display:null,display_options:null,readonly:!1,hidden:!1,sort:null,width:"full",group:null,translations:null,note:null,conditions:null,required:!1};var s={table:"directus_access",fields:[{field:"id",special:["uuid"],hidden:!0,width:"half"},{field:"role",hidden:!0,width:"half",special:["m2o"]},{field:"user",hidden:!0,width:"half",special:["m2o"]},{field:"policy",hidden:!0,width:"half",special:["m2o"]},{field:"sort",hidden:!0,width:"half"}]};var a={table:"directus_activity",fields:[{field:"id",width:"half"},{field:"item",width:"half"},{field:"action",display:"labels",display_options:{choices:[{text:"$t:field_options.directus_activity.create",value:"create",foreground:"var(--theme--primary)",background:"var(--theme--primary-subdued)"},{text:"$t:field_options.directus_activity.update",value:"update",foreground:"var(--blue)",background:"var(--blue-25)"},{text:"$t:field_options.directus_activity.delete",value:"delete",foreground:"var(--theme--danger)",background:"var(--danger-25)"},{text:"$t:field_options.directus_activity.login",value:"login",foreground:"var(--purple)",background:"var(--purple-25)"}]},width:"half"},{field:"collection",display:"collection",display_options:{icon:!0},width:"half"},{field:"timestamp",display:"datetime",special:["date-created","cast-timestamp"],options:{relative:!0},width:"half"},{field:"user",display:"user",width:"half"},{field:"user_agent",display:"formatted-value",display_options:{font:"monospace"},width:"half"},{field:"origin",display:"formatted-value",display_options:{font:"monospace"},width:"half"},{field:"ip",display:"formatted-value",display_options:{font:"monospace"},width:"half"},{field:"revisions",interface:"list-o2m",special:["o2m"],options:{fields:["collection","item"]},width:"half"}]};var d={table:"directus_collections",fields:[{field:"collection_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"box",title:"$t:field_options.directus_collections.collection_setup"},width:"full"},{field:"collection",interface:"input",options:{font:"monospace"},readonly:!0,width:"half"},{field:"note",interface:"input",options:{placeholder:"$t:field_options.directus_collections.note_placeholder"},width:"half"},{field:"icon",interface:"select-icon",options:null,width:"half"},{field:"color",interface:"select-color",options:{placeholder:"$t:interfaces.select-color.placeholder"},width:"half"},{field:"display_template",interface:"system-display-template",options:{collectionField:"collection"},width:"full"},{field:"hidden",special:["cast-boolean"],interface:"boolean",options:{label:"$t:field_options.directus_collections.hidden_label"},width:"half"},{field:"singleton",special:["cast-boolean"],interface:"boolean",options:{label:"$t:singleton_label"},width:"half"},{field:"translations",special:["cast-json"],interface:"list",options:{template:"{{ translation }} ({{ language }})",fields:[{field:"language",name:"$t:language",type:"string",schema:{default_value:"en-US"},meta:{interface:"system-language",width:"half",required:!0}},{field:"translation",name:"$t:field_options.directus_collections.collection_name",type:"string",meta:{interface:"input",width:"half",required:!0,options:{placeholder:"$t:field_options.directus_collections.translation_placeholder"}}},{field:"singular",name:"$t:field_options.directus_collections.singular_unit",type:"string",meta:{interface:"input",width:"half",options:{placeholder:"$t:field_options.directus_collections.translation_placeholder"}}},{field:"plural",name:"$t:field_options.directus_collections.plural_unit",type:"string",meta:{interface:"input",width:"half",options:{placeholder:"$t:field_options.directus_collections.translation_placeholder"}}}]},width:"full"},{field:"preview_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"preview",title:"$t:field_options.directus_collections.preview_divider"},width:"full"},{field:"preview_url",interface:"system-display-template",options:{collectionField:"collection",injectVersionField:!0},width:"full"},{field:"content_versioning_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"published_with_changes",title:"$t:field_options.directus_collections.content_versioning_divider"},width:"full"},{field:"versioning",interface:"boolean",special:["cast-boolean"],options:{label:"$t:field_options.directus_collections.enable_versioning"},width:"half"},{field:"archive_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"archive",title:"$t:field_options.directus_collections.archive_divider"},width:"full"},{field:"archive_field",interface:"system-field",options:{collectionField:"collection",allowNone:!0,placeholder:"$t:field_options.directus_collections.archive_field_placeholder"},width:"half"},{field:"archive_app_filter",interface:"boolean",special:["cast-boolean"],options:{label:"$t:field_options.directus_collections.archive_app_filter"},width:"half"},{field:"archive_value",interface:"input",options:{font:"monospace",iconRight:"archive",placeholder:"$t:field_options.directus_collections.archive_value"},width:"half"},{field:"unarchive_value",interface:"input",options:{font:"monospace",iconRight:"unarchive",placeholder:"$t:field_options.directus_collections.unarchive_value"},width:"half"},{field:"sort_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"sort",title:"$t:field_options.directus_collections.sort_divider"},width:"full"},{field:"sort_field",interface:"system-field",options:{collectionField:"collection",placeholder:"$t:field_options.directus_collections.sort_field",typeAllowList:["float","decimal","integer"],allowNone:!0,allowPrimaryKey:!1,allowForeignKeys:!1},width:"half"},{field:"accountability_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"admin_panel_settings",title:"$t:field_options.directus_collections.accountability_divider"},width:"full"},{field:"accountability",interface:"select-dropdown",options:{choices:[{text:"$t:field_options.directus_collections.track_activity_revisions",value:"all"},{text:"$t:field_options.directus_collections.only_track_activity",value:"activity"},{text:"$t:field_options.directus_collections.do_not_track_anything",value:null}]},width:"half"},{field:"duplication_divider",special:["alias","no-data"],interface:"presentation-divider",options:{icon:"content_copy",title:"$t:field_options.directus_collections.duplication_divider"}},{field:"item_duplication_fields",special:["cast-json"],interface:"system-field-tree",options:{collectionField:"collection"}},{field:"sort",hidden:!0},{field:"group",hidden:!0},{field:"collapse",hidden:!0}]};var n$1={table:"directus_comments",fields:[{field:"id",special:["uuid"],readonly:!0,hidden:!0},{field:"collection"},{field:"item"},{field:"comment"},{field:"date_created",special:["date-created","cast-timestamp"]},{field:"date_updated",special:["date-updated","cast-timestamp"]},{field:"user_created",special:["user-created"]},{field:"user_updated",special:["user-updated"]}]};var c={table:"directus_dashboards",fields:[{field:"id",special:["uuid"]},{field:"name"},{field:"icon"},{field:"panels",special:["o2m"]},{field:"date_created",special:["date-created","cast-timestamp"]},{field:"user_created",special:["user-created"]},{field:"note"},{field:"color"}]};var r={table:"directus_extensions",fields:[{collection:"directus_extensions",field:"id",special:["uuid"]},{collection:"directus_extensions",field:"folder"},{collection:"directus_extensions",field:"source"},{collection:"directus_extensions",field:"bundle"},{collection:"directus_extensions",field:"enabled",special:["cast-boolean"]}]};var f={table:"directus_fields",fields:[{collection:"directus_fields",field:"id",width:"half"},{collection:"directus_fields",field:"collection",width:"half"},{collection:"directus_fields",field:"field",width:"half"},{collection:"directus_fields",field:"special",hidden:!0,special:["cast-csv"],width:"half"},{collection:"directus_fields",field:"interface",width:"half"},{collection:"directus_fields",field:"options",hidden:!0,special:["cast-json"],width:"half"},{collection:"directus_fields",field:"display",width:"half"},{collection:"directus_fields",field:"display_options",hidden:!0,special:["cast-json"],width:"half"},{collection:"directus_fields",field:"readonly",hidden:!0,special:["cast-boolean"],width:"half"},{collection:"directus_fields",field:"hidden",hidden:!0,special:["cast-boolean"],width:"half"},{collection:"directus_fields",field:"required",hidden:!0,special:["cast-boolean"],width:"half"},{collection:"directus_fields",field:"sort",width:"half"},{collection:"directus_fields",field:"width",width:"half"},{collection:"directus_fields",field:"group",width:"half"},{collection:"directus_fields",field:"translations",hidden:!0,special:["cast-json"],width:"half"},{collection:"directus_fields",field:"note",width:"half"},{collection:"directus_fields",field:"conditions",hidden:!0,special:["cast-json"]},{collection:"directus_fields",field:"validation",hidden:!0,special:["cast-json"]},{collection:"directus_fields",field:"validation_message",hidden:!0}]};var u={table:"directus_files",fields:[{field:"id",hidden:!0,interface:"input",special:["uuid"]},{field:"title",interface:"input",options:{iconRight:"title",placeholder:"$t:field_options.directus_files.title"},width:"full"},{field:"description",interface:"input-multiline",width:"full",options:{placeholder:"$t:field_options.directus_files.description"}},{field:"tags",interface:"tags",options:{iconRight:"local_offer"},special:["cast-json"],width:"full",display:"labels",display_options:{choices:null,format:!1}},{field:"location",interface:"input",options:{iconRight:"place",placeholder:"$t:field_options.directus_files.location"},width:"half"},{field:"storage",interface:"input",options:{iconRight:"storage"},width:"half",readonly:!0},{field:"focal_point_divider",interface:"presentation-divider",options:{icon:"image_search",title:"$t:field_options.directus_files.focal_point_divider"},special:["alias","no-data"],width:"full"},{field:"focal_point_x",width:"half"},{field:"focal_point_y",width:"half"},{field:"storage_divider",interface:"presentation-divider",options:{icon:"insert_drive_file",title:"$t:field_options.directus_files.storage_divider"},special:["alias","no-data"],width:"full"},{field:"filename_disk",interface:"input",options:{iconRight:"publish",placeholder:"$t:field_options.directus_files.filename_disk"},readonly:!0,width:"half"},{field:"filename_download",interface:"input",options:{iconRight:"get_app",placeholder:"$t:field_options.directus_files.filename_download"},width:"half"},{field:"metadata",hidden:!0,special:["cast-json"]},{field:"type",display:"mime-type",readonly:!0},{field:"filesize",display:"filesize",readonly:!0},{field:"created_on",interface:"datetime",display:"datetime",width:"half",special:["date-created"],readonly:!0},{field:"modified_by",interface:"select-dropdown-m2o",special:["user-updated"],width:"half",display:"user",readonly:!0,options:{template:"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}},{field:"modified_on",interface:"datetime",special:["date-updated"],width:"half",display:"datetime",readonly:!0},{field:"embed",width:"half",hidden:!0},{field:"uploaded_by",display:"user",width:"half",hidden:!0,special:["user-created"]},{field:"uploaded_on",display:"datetime",width:"half",hidden:!0},{field:"folder",width:"half",readonly:!0,special:["m2o"],display:"related-values",display_options:{template:"{{ name }}"}},{field:"width",width:"half",readonly:!0},{field:"height",width:"half",readonly:!0},{field:"charset",width:"half",readonly:!0},{field:"duration",width:"half",readonly:!0},{field:"tus_id",width:"half",hidden:!0},{field:"tus_data",width:"half",hidden:!0,special:["cast-json"]}]};var p={table:"directus_flows",fields:[{field:"id",special:["uuid"]},{field:"name"},{field:"icon"},{field:"color"},{field:"description"},{field:"status"},{field:"trigger"},{field:"accountability"},{field:"options",special:["cast-json"]},{field:"operation"},{field:"operations",special:["o2m"]},{field:"date_created",special:["date-created"]},{field:"user_created",special:["user-created"]}]};var _={table:"directus_folders",fields:[{field:"id",interface:"input",special:["uuid"],width:"half"},{field:"parent",width:"half"},{field:"name",width:"full"}]};var h={table:"directus_migrations",fields:[{collection:"directus_migrations",field:"version"},{collection:"directus_migrations",field:"name"},{collection:"directus_migrations",field:"timestamp"}]};var m={table:"directus_notifications",fields:[{field:"id"},{field:"timestamp",special:["date-created","cast-timestamp"]},{field:"status"},{field:"recipient"},{field:"sender"},{field:"subject"},{field:"message"},{field:"collection"},{field:"item"}]};var y={table:"directus_operations",fields:[{field:"id",special:["uuid"]},{field:"name"},{field:"key"},{field:"type"},{field:"position_x"},{field:"position_y"},{field:"options",special:["cast-json"]},{field:"resolve"},{field:"reject"},{field:"flow"},{field:"date_created",special:["date-created"]},{field:"user_created",special:["user-created"]}]};var g={table:"directus_panels",fields:[{field:"id",special:["uuid"]},{field:"name"},{field:"icon"},{field:"color"},{field:"note"},{field:"type"},{field:"show_header",special:["cast-boolean"]},{field:"position_x"},{field:"position_y"},{field:"width"},{field:"height"},{field:"options",special:["cast-json"]},{field:"date_created",special:["date-created","cast-timestamp"]},{field:"user_created",special:["user-created"]},{field:"dashboard"}]};var w={table:"directus_permissions",fields:[{field:"permissions",hidden:!0,special:["cast-json"],width:"half"},{field:"presets",hidden:!0,special:["cast-json"],width:"half"},{field:"policy",hidden:!0,interface:"select-dropdown-m2o",width:"half",special:["m2o"]},{field:"collection",width:"half"},{field:"id",width:"half"},{field:"fields",width:"half",special:["cast-csv"]},{field:"action",width:"half"},{field:"validation",width:"half",special:["cast-json"]}]};var v={table:"directus_policies",fields:[{field:"id",hidden:!0,special:["uuid"]},{field:"name",required:!0,width:"half",display:"formatted-value",display_options:{translate:!0}},{field:"icon",interface:"select-icon",display:"icon",width:"half"},{field:"description",interface:"input",options:{placeholder:"$t:field_options.directus_policies.description"},width:"full",display:"formatted-value",display_options:{translate:!0}},{field:"permissions",interface:"system-permissions",special:["o2m"]},{field:"app_access",interface:"boolean",special:["cast-boolean"],width:"half"},{field:"admin_access",interface:"boolean",special:["cast-boolean"],width:"half"},{field:"ip_access",interface:"tags",options:{placeholder:"$t:field_options.directus_policies.ip_access"},special:["cast-csv"],width:"full"},{field:"enforce_tfa",note:"$t:field_options.directus_policies.enforce_tfa",interface:"boolean",special:["cast-boolean"],width:"half"},{field:"assigned_to_divider",interface:"presentation-divider",options:{title:"$t:field_options.directus_policies.assigned_to"},special:["alias","no-data"],width:"full"},{field:"users",interface:"list-m2m",options:{template:"{{ user.first_name }} {{ user.last_name }}",junctionFilter:{user:{_nnull:!0}}},special:["m2m"]},{field:"roles",interface:"list-m2m",options:{template:"{{ role.name }}",junctionFilter:{role:{_nnull:!0}}},special:["m2m"]}]};var b={table:"directus_presets",fields:[{field:"filter",hidden:!0,special:["cast-json"]},{field:"layout_query",hidden:!0,special:["cast-json"]},{field:"layout_options",hidden:!0,special:["cast-json"]},{field:"role",width:"half",special:["m2o"],display:"related-values",display_options:{template:"{{ name }}"}},{field:"user",width:"half",special:["m2o"],display:"related-values",display_options:{template:"{{ email }}"}},{field:"id",width:"half"},{field:"bookmark",width:"half"},{field:"icon",width:"half",display:"icon"},{field:"color",width:"half",display:"color"},{field:"search",width:"half"},{field:"collection",width:"half"},{field:"layout",width:"half"},{field:"refresh_interval"}]};var $={table:"directus_relations",fields:[{field:"id",width:"half"},{field:"many_collection",width:"half"},{field:"many_field",width:"half"},{field:"one_collection",width:"half"},{field:"one_field",width:"half"},{field:"one_collection_field",width:"half"},{field:"one_allowed_collections",special:["cast-csv"],width:"half"},{field:"junction_field",width:"half"},{field:"sort_field",width:"half"},{field:"one_deselect_action",width:"half"}]};var k={table:"directus_revisions",fields:[{field:"id",width:"half"},{field:"activity",width:"half"},{field:"collection",width:"half"},{field:"item",width:"half"},{field:"data",hidden:!0,special:["cast-json"]},{field:"delta",hidden:!0,special:["cast-json"]},{field:"parent",width:"half"},{field:"version",width:"half"}]};var x={table:"directus_roles",fields:[{field:"id",hidden:!0,interface:"input",special:["uuid"]},{field:"name",required:!0,interface:"input",options:{placeholder:"$t:field_options.directus_roles.name"},width:"half",display:"formatted-value",display_options:{translate:!0}},{field:"icon",interface:"select-icon",display:"icon",width:"half"},{field:"description",interface:"input",options:{placeholder:"$t:field_options.directus_roles.description"},width:"full",display:"formatted-value",display_options:{translate:!0}},{field:"parent",interface:"select-dropdown-m2o",note:"$t:field_options.directus_roles.parent_note",options:{template:"{{ name }}",filter:{id:{_neq:"{{ id }}"}}},special:["m2o"],width:"half",display:"related-values",display_options:{template:"{{ name }}"}},{field:"children",hidden:!0,interface:"list-o2m-tree-view",note:"$t:field_options.directus_roles.children_note",special:["o2m"],options:{displayTemplate:"{{ name }}",enableCreate:!1,fields:["name"],filter:{id:{_neq:"{{ id }}"}}},display:"related-values",display_options:{template:"{{ name }}"},width:"full"},{field:"policies",interface:"list-m2m",options:{layout:"list"},display:"related-values",special:["m2m"],width:"full"},{field:"users_group",interface:"group-raw",special:["alias","no-data","group"]},{field:"users_divider",interface:"presentation-divider",options:{icon:"people_alt",title:"$t:users"},special:["alias","no-data"],width:"full",group:"users_group"},{field:"users",interface:"list-o2m",special:["o2m"],options:{fields:["first_name","last_name"]},width:"full",group:"users_group"}]};var R={table:"directus_sessions",fields:[{field:"token",width:"half"},{field:"user",width:"half"},{field:"expires",width:"half"},{field:"ip",width:"half"},{field:"user_agent",width:"half"},{field:"origin",width:"half"},{field:"share",width:"half"},{field:"next_token",width:"half"}]};var j={table:"directus_settings",fields:[{field:"id",hidden:!0},{field:"project_name",interface:"input",options:{iconRight:"title",placeholder:"$t:field_options.directus_settings.project_name_placeholder"},width:"half"},{field:"project_descriptor",interface:"input",options:{iconRight:"title",placeholder:"$t:field_options.directus_settings.project_name_placeholder"},width:"half"},{field:"project_url",interface:"input",options:{iconRight:"link",placeholder:"https://example.com"},width:"half"},{field:"default_language",interface:"system-language",options:{iconRight:"language",placeholder:"en-US"},width:"half"},{field:"theming_group",interface:"group-raw",special:["alias","no-data","group"]},{field:"branding_divider",interface:"presentation-divider",options:{icon:"palette",title:"$t:fields.directus_settings.branding"},special:["alias","no-data"],width:"full",group:"theming_group"},{field:"project_color",interface:"select-color",note:"$t:field_options.directus_settings.project_color_note",width:"half",group:"theming_group"},{field:"project_logo",interface:"file",note:"$t:field_options.directus_settings.project_logo_note",width:"half",group:"theming_group"},{field:"public_foreground",interface:"file",width:"half",group:"theming_group"},{field:"public_background",interface:"file",width:"half",group:"theming_group"},{field:"public_favicon",interface:"file",note:"$t:field_options.directus_settings.project_favicon_note",width:"half",group:"theming_group"},{field:"public_note",interface:"input",options:{placeholder:"$t:field_options.directus_settings.public_note_placeholder",iconRight:"info"},width:"half",group:"theming_group"},{field:"theming_divider",interface:"presentation-divider",options:{icon:"palette",title:"$t:fields.directus_settings.theming"},special:["alias","no-data"],width:"full",group:"theming_group"},{field:"default_appearance",interface:"select-dropdown",width:"half",options:{choices:[{value:"auto",text:"$t:appearance_auto"},{value:"light",text:"$t:appearance_light"},{value:"dark",text:"$t:appearance_dark"}]},group:"theming_group"},{field:"default_theme_light",width:"full",interface:"system-theme",options:{appearance:"light"},group:"theming_group"},{field:"theme_light_overrides",width:"full",interface:"system-theme-overrides",options:{appearance:"light"},group:"theming_group",special:["cast-json"]},{field:"default_theme_dark",width:"full",interface:"system-theme",options:{appearance:"dark"},group:"theming_group"},{field:"theme_dark_overrides",width:"full",interface:"system-theme-overrides",options:{appearance:"dark"},group:"theming_group",special:["cast-json"]},{field:"custom_css",interface:"input-code",options:{language:"css",lineNumber:!0,template:`#app, #main-content, body {
  --v-button-background-color: #6644FF !important;
  --v-button-background-color-hover: #5E41EC !important;
}
`},width:"full",group:"theming_group"},{field:"modules_divider",interface:"presentation-divider",options:{icon:"menu_open",title:"$t:modules"},special:["alias","no-data"],width:"full"},{field:"module_bar",interface:"system-modules",special:["cast-json"]},{field:"security_divider",interface:"presentation-divider",options:{icon:"shield",title:"$t:security"},special:["alias","no-data"],width:"full"},{field:"auth_password_policy",interface:"select-dropdown",options:{choices:[{value:null,text:"$t:field_options.directus_settings.auth_password_policy.none_text"},{value:"/^.{8,}$/",text:"$t:field_options.directus_settings.auth_password_policy.weak_text"},{value:"/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\\s).*$/",text:"$t:field_options.directus_settings.auth_password_policy.strong_text"}],allowOther:!0},width:"half"},{field:"auth_login_attempts",interface:"input",options:{iconRight:"lock",placeholder:"$t:unlimited"},width:"half"},{field:"public_registration_divider",interface:"presentation-divider",options:{icon:"person_add",title:"$t:fields.directus_settings.public_registration"},special:["alias","no-data"],width:"full"},{field:"public_registration",interface:"boolean",note:"$t:fields.directus_settings.public_registration_note",width:"half",options:{label:"$t:enabled"},special:["cast-boolean"]},{field:"public_registration_role",interface:"select-dropdown-m2o",note:"$t:fields.directus_settings.public_registration_role_note",options:{template:"{{ name }}"},special:["m2o"],width:"half",display:"related-values",display_options:{template:"{{ name }}"}},{field:"public_registration_verify_email",interface:"boolean",note:"$t:fields.directus_settings.public_registration_verify_email_note",width:"half",options:{label:"$t:enabled"},special:["cast-boolean"]},{field:"public_registration_email_filter",interface:"system-filter",note:"$t:fields.directus_settings.public_registration_email_filter_note",options:{collectionName:"directus_users",collectionField:"email",fieldName:"email"},special:["cast-json"],width:"half"},{field:"files_divider",interface:"presentation-divider",options:{icon:"folder",title:"$t:fields.directus_settings.files_and_thumbnails"},special:["alias","no-data"],width:"full"},{field:"storage_asset_transform",interface:"select-dropdown",options:{choices:[{value:"all",text:"$t:fields.directus_settings.transformations_all"},{value:"none",text:"$t:fields.directus_settings.transformations_none"},{value:"presets",text:"$t:fields.directus_settings.transformations_presets"}]},width:"half"},{field:"storage_default_folder",interface:"system-folder",width:"half",note:"$t:interfaces.system-folder.field_hint"},{field:"storage_asset_presets",interface:"list",options:{fields:[{field:"key",name:"$t:key",type:"string",schema:{is_nullable:!1},meta:{interface:"input",options:{slug:!0,onlyOnCreate:!1},width:"full",required:!0}},{field:"fit",name:"$t:field_options.directus_settings.storage_asset_presets.fit_label",type:"string",schema:{is_nullable:!1},meta:{interface:"select-dropdown",options:{choices:[{value:"contain",text:"$t:field_options.directus_settings.storage_asset_presets.fit.contain_text"},{value:"cover",text:"$t:field_options.directus_settings.storage_asset_presets.fit.cover_text"},{value:"inside",text:"$t:field_options.directus_settings.storage_asset_presets.fit.fit_text"},{value:"outside",text:"$t:field_options.directus_settings.storage_asset_presets.fit.outside_text"}]},width:"half"}},{field:"width",name:"$t:width",type:"integer",schema:{is_nullable:!1},meta:{interface:"input",width:"half"}},{field:"height",name:"$t:height",type:"integer",schema:{is_nullable:!1},meta:{interface:"input",width:"half"}},{field:"quality",type:"integer",name:"$t:quality",schema:{default_value:80,is_nullable:!1},meta:{interface:"slider",options:{max:100,min:0,step:1},width:"half"}},{field:"withoutEnlargement",name:"$t:field_options.directus_settings.storage_asset_presets.upscaling",type:"boolean",schema:{default_value:!1},meta:{interface:"boolean",width:"half",options:{label:"$t:no_upscale"}}},{field:"format",name:"$t:format",type:"string",schema:{is_nullable:!1,default_value:""},meta:{interface:"select-dropdown",options:{allowNone:!0,choices:[{value:"auto",text:"Auto"},{value:"jpeg",text:"JPEG"},{value:"png",text:"PNG"},{value:"webp",text:"WebP"},{value:"tiff",text:"Tiff"},{value:"avif",text:"AVIF"}]},width:"half"}},{field:"transforms",name:"$t:field_options.directus_settings.additional_transforms",type:"json",schema:{is_nullable:!1,default_value:[]},meta:{note:"$t:field_options.directus_settings.transforms_note",interface:"json",options:{template:`[
  ["blur", 45],
  ["grayscale"],
  ["extend", { "right": 500, "background": "rgb(255, 0, 0)" }]
]
`,placeholder:`[
  ["blur", 45],
  ["grayscale"],
  ["extend", { "right": 500, "background": "rgb(255, 0, 0)" }]
]
`},width:"full"}}],template:"{{key}}"},special:["cast-json"],width:"full"},{field:"reporting_divider",interface:"presentation-divider",options:{icon:"feedback",title:"$t:fields.directus_settings.reporting"},special:["alias","no-data"],width:"full"},{field:"report_feature_url",interface:"input",options:{iconRight:"link",placeholder:"https://example.com/feature"},width:"half"},{field:"report_bug_url",interface:"input",options:{iconRight:"link",placeholder:"https://example.com/bug"},width:"half"},{field:"report_error_url",interface:"system-display-template",options:{placeholder:"https://example.com/error",fields:[{name:"Error",field:"error",key:"error",path:"error",children:[{name:"Name",field:"name",key:"error.name",path:"error.name"},{name:"Message",field:"message",key:"error.message",path:"error.message"}]},{name:"Navigator",field:"navigator",key:"navigator",path:"navigator",children:[{name:"Language",field:"language",key:"navigator.language",path:"navigator.language"},{name:"User Agent",field:"userAgent",key:"navigator.userAgent",path:"navigator.userAgent"}]},{name:"Route",field:"route",key:"route",path:"route",children:[{name:"Full Path",field:"fullPath",key:"route.fullPath",path:"route.fullPath"},{name:"Hash",field:"hash",key:"route.hash",path:"route.hash"},{name:"Name",field:"name",key:"route.name",path:"route.name"},{name:"Path",field:"path",key:"route.path",path:"route.path"},{name:"Query",field:"query",key:"route.query",path:"route.query"}]},{name:"User",field:"user",key:"user",path:"user",children:[{name:"ID",field:"id",key:"user.id",path:"user.id"},{name:"First Name",field:"first_name",key:"user.first_name",path:"user.first_name"},{name:"Last Name",field:"last_name",key:"user.last_name",path:"user.last_name"},{name:"Status",field:"status",key:"user.status",path:"user.status"},{name:"Title",field:"title",key:"user.title",path:"user.title"},{name:"Description",field:"description",key:"user.description",path:"user.description"},{name:"Location",field:"location",key:"user.location",path:"user.location"}]},{name:"Role",field:"role",key:"role",path:"role",children:[{name:"ID",field:"id",key:"role.id",path:"role.id"},{name:"Name",field:"name",key:"role.name",path:"role.name"}]}]},width:"full"},{field:"map_divider",interface:"presentation-divider",options:{icon:"map",title:"$t:fields.directus_settings.mapping"},special:["alias","no-data"],width:"full"},{field:"mapbox_key",interface:"input",options:{icon:"key",title:"$t:field_options.directus_settings.mapbox_key",placeholder:"$t:field_options.directus_settings.mapbox_placeholder",iconLeft:"vpn_key",font:"monospace"},width:"full"},{field:"basemaps",interface:"list",special:["cast-json"],options:{template:"{{name}}",fields:[{field:"name",name:"$t:name",schema:{is_nullable:!1},meta:{interface:"text-input",required:!0,options:{placeholder:"$t:field_options.directus_settings.basemaps_name_placeholder"}}},{field:"type",name:"$t:type",meta:{interface:"select-dropdown",options:{choices:[{value:"raster",text:"$t:field_options.directus_settings.basemaps_raster"},{value:"tile",text:"$t:field_options.directus_settings.basemaps_tile"},{value:"style",text:"$t:field_options.directus_settings.basemaps_style"}]}}},{field:"url",name:"$t:url",schema:{is_nullable:!1},meta:{interface:"text-input",options:{placeholder:"http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"}}},{field:"tileSize",name:"$t:tile_size",type:"integer",schema:{is_nullable:!0},meta:{interface:"input",options:{placeholder:"512"},conditions:[{name:"typeNeqRaster",rule:{type:{_neq:"raster"}},hidden:!0}]}},{field:"attribution",name:"$t:fields.directus_settings.attribution",type:"string",schema:{is_nullable:!0},meta:{interface:"input",options:{placeholder:"$t:fields.directus_settings.attribution_placeholder"}}}]}},{field:"image_editor",interface:"presentation-divider",options:{icon:"image",title:"$t:fields.directus_settings.image_editor"},special:["alias","no-data"],width:"full"},{field:"custom_aspect_ratios",interface:"list",special:["cast-json"],options:{template:"{{text}}",fields:[{field:"text",name:"$t:text",type:"string",meta:{interface:"text-input",width:"half",required:!0,options:{placeholder:"$t:text"}}},{field:"value",name:"$t:value",type:"float",meta:{interface:"input",width:"half",required:!0,options:{placeholder:"$t:value"}}}]}}]};var F={table:"directus_shares",fields:[{field:"id",special:["uuid"],readonly:!0,hidden:!0},{field:"name"},{field:"collection",width:"half",hidden:!0},{field:"item",width:"half",hidden:!0},{field:"role",interface:"select-dropdown-m2o",width:"half",options:{template:"{{name}}"}},{field:"password",special:["hash","conceal"],interface:"input-hash",options:{iconRight:"lock",masked:!0},width:"half",note:"$t:shared_leave_blank_for_passwordless_access"},{field:"date_start",width:"half",note:"$t:shared_leave_blank_for_unlimited"},{field:"date_end",width:"half",note:"$t:shared_leave_blank_for_unlimited"},{field:"max_uses",width:"half",note:"$t:shared_leave_blank_for_unlimited"},{field:"times_used",width:"half",readonly:!0},{field:"date_created",special:["date-created","cast-timestamp"],width:"half",readonly:!0,conditions:[{name:"notCreatedYet",rule:{id:{_null:!0}},hidden:!0}]},{field:"user_created",special:["user-created"],interface:"select-dropdown-m2o",width:"half",display:"user",options:{template:"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"},readonly:!0,conditions:[{name:"notCreatedYet",rule:{id:{_null:!0}},hidden:!0}]}]};var E={table:"directus_translations",fields:[{field:"id",hidden:!0,sort:1,special:["uuid"]},{field:"key",width:"half",sort:2,required:!0,interface:"input",options:{font:"monospace",placeholder:"$t:translation_key_placeholder"}},{field:"language",interface:"system-language",width:"half",sort:3,required:!0},{field:"value",interface:"input-multiline",sort:4,required:!0,options:{placeholder:"$t:enter_a_value"}}]};var q={table:"directus_users",fields:[{field:"first_name",interface:"input",options:{iconRight:"account_circle"},width:"half"},{field:"last_name",interface:"input",options:{iconRight:"account_circle"},width:"half"},{field:"email",interface:"input",options:{iconRight:"email"},width:"half"},{field:"password",special:["hash","conceal"],interface:"input-hash",options:{iconRight:"lock",masked:!0},width:"half"},{field:"avatar",interface:"file",width:"full",display:"image"},{field:"location",interface:"input",options:{iconRight:"place"},width:"half"},{field:"title",interface:"input",options:{iconRight:"work"},width:"half"},{field:"description",interface:"input-multiline",width:"full"},{field:"tags",interface:"tags",special:["cast-json"],width:"full",options:{iconRight:"local_offer"},display:"labels",display_options:{choices:null,format:!1}},{field:"preferences_divider",interface:"presentation-divider",options:{icon:"face",title:"$t:fields.directus_users.user_preferences"},special:["alias","no-data"],width:"full"},{field:"language",interface:"system-language",width:"half",options:{includeProjectDefault:!0}},{field:"tfa_secret",interface:"system-mfa-setup",special:["conceal"],width:"half"},{field:"email_notifications",interface:"boolean",width:"half",special:["cast-boolean"]},{field:"theming_divider",interface:"presentation-divider",options:{icon:"palette",title:"$t:theme"},special:["alias","no-data"],width:"full"},{field:"appearance",interface:"select-dropdown",options:{choices:[{value:null,text:"$t:default_sync_with_project"},{value:"auto",text:"$t:appearance_auto"},{value:"light",text:"$t:appearance_light"},{value:"dark",text:"$t:appearance_dark"}]},width:"half"},{field:"theme_light",width:"full",interface:"system-theme",options:{appearance:"light",includeNull:!0}},{field:"theme_light_overrides",width:"full",interface:"system-theme-overrides",options:{appearance:"light"},special:["cast-json"]},{field:"theme_dark",width:"full",interface:"system-theme",options:{appearance:"dark",includeNull:!0}},{field:"theme_dark_overrides",width:"full",interface:"system-theme-overrides",options:{appearance:"dark"},special:["cast-json"]},{field:"admin_divider",interface:"presentation-divider",options:{icon:"verified_user",title:"$t:fields.directus_users.admin_options",color:"var(--theme--danger)"},special:["alias","no-data"],width:"full"},{field:"status",interface:"select-dropdown",options:{choices:[{text:"$t:fields.directus_users.status_draft",value:"draft"},{text:"$t:fields.directus_users.status_invited",value:"invited"},{text:"$t:fields.directus_users.status_unverified",value:"unverified"},{text:"$t:fields.directus_users.status_active",value:"active"},{text:"$t:fields.directus_users.status_suspended",value:"suspended"},{text:"$t:fields.directus_users.status_archived",value:"archived"}]},width:"half"},{field:"role",interface:"select-dropdown-m2o",options:{template:"{{ name }}"},special:["m2o"],width:"half",display:"related-values",display_options:{template:"{{ name }}"}},{field:"policies",interface:"list-m2m",options:{layout:"list"},display:"related-values",special:["m2m"],width:"full"},{field:"token",interface:"system-token",special:["conceal"],width:"full"},{field:"id",special:["uuid"],interface:"input",options:{iconRight:"vpn_key"},width:"full"},{field:"last_page",width:"half"},{field:"last_access",width:"half",display:"datetime",readonly:!0,display_options:{relative:!0}},{field:"provider",width:"half",interface:"select-dropdown",options:{choices:[{text:"$t:default_provider",value:"default"}]}},{field:"external_identifier",width:"half",options:{iconRight:"account_circle"},interface:"input"},{field:"auth_data",hidden:!0}]};var N={table:"directus_versions",fields:[{field:"id",special:["uuid"],readonly:!0,hidden:!0},{field:"key"},{field:"name"},{field:"collection"},{field:"item"},{field:"hash",readonly:!0,hidden:!0},{field:"date_created",special:["date-created","cast-timestamp"]},{field:"date_updated",special:["date-updated","cast-timestamp"]},{field:"user_created",special:["user-created"]},{field:"user_updated",special:["user-updated"]},{field:"delta",special:["cast-json"]}]};var U={table:"directus_webhooks",fields:[{field:"id",hidden:!0},{field:"name",interface:"input",options:{iconRight:"title"},width:"full"},{field:"method",interface:"select-dropdown",display:"labels",display_options:{choices:[{value:"POST",foreground:"var(--theme--primary)",background:"var(--theme--primary-subdued)"},{value:"GET",foreground:"var(--theme--secondary)",background:"var(--secondary-25)"}],format:!1},options:{choices:["GET","POST"]},width:"half"},{field:"url",interface:"input",options:{iconRight:"link"},width:"half"},{field:"status",interface:"select-dropdown",display:"labels",display_options:{showAsDot:!0,choices:[{text:"$t:field_options.directus_webhooks.status_options_active",value:"active",foreground:"var(--theme--primary-background)",background:"var(--theme--primary)"},{text:"$t:field_options.directus_webhooks.status_options_inactive",value:"inactive",foreground:"var(--theme--foreground)",background:"var(--background-normal-alt)"}]},options:{choices:[{text:"$t:field_options.directus_webhooks.status_options_active",value:"active"},{text:"$t:field_options.directus_webhooks.status_options_inactive",value:"inactive"}]},width:"half"},{field:"data",interface:"boolean",options:{label:"$t:fields.directus_webhooks.data_label"},special:["cast-boolean"],width:"half",display:"boolean"},{field:"headers",special:["cast-json"],interface:"list",options:{template:"{{ header }}: {{ value }}",addLabel:"$t:field_options.directus_webhooks.headers.add",fields:[{field:"header",name:"$t:field_options.directus_webhooks.headers.header",type:"string",meta:{interface:"input",width:"half"}},{field:"value",name:"$t:field_options.directus_webhooks.headers.value",type:"string",meta:{interface:"input",width:"half"}}]},width:"full"},{field:"triggers_divider",interface:"presentation-divider",options:{icon:"api",title:"$t:fields.directus_webhooks.triggers"},special:["alias","no-data"],width:"full"},{field:"actions",interface:"select-multiple-checkbox",options:{choices:[{text:"$t:create",value:"create"},{text:"$t:update",value:"update"},{text:"$t:delete_label",value:"delete"}]},special:["cast-csv"],width:"full",display:"labels",display_options:{choices:[{text:"$t:create",value:"create",foreground:"var(--theme--primary)",background:"var(--theme--primary-subdued)"},{text:"$t:update",value:"update",foreground:"var(--blue)",background:"var(--blue-25)"},{text:"$t:delete_label",value:"delete",foreground:"var(--theme--danger)",background:"var(--danger-25)"},{text:"$t:login",value:"login",foreground:"var(--purple)",background:"var(--purple-25)"}]}},{field:"collections",interface:"system-collections",special:["cast-csv"],width:"full",display:"labels",display_options:{choices:null,format:!1}},{field:"was_active_before_deprecation",hidden:!0},{field:"migrated_flow",hidden:!0}]};var me=[];e$1(s);e$1(a);e$1(d);e$1(n$1);e$1(c);e$1(r);e$1(f);e$1(u);e$1(p);e$1(_);e$1(h);e$1(m);e$1(y);e$1(g);e$1(w);e$1(v);e$1(b);e$1($);e$1(k);e$1(x);e$1(R);e$1(j);e$1(F);e$1(E);e$1(q);e$1(N);e$1(U);function e$1(i){let{fields:S,table:M}=i;S.forEach((D,A)=>{me.push({system:!0,...o,...D,collection:M,sort:A+1});});}var C=[{collection:"directus_activity",action:"read",permissions:{user:{_eq:"$CURRENT_USER"}}},{collection:"directus_comments",action:"read",permissions:{user_created:{_eq:"$CURRENT_USER"}}},{collection:"directus_comments",action:"create",validation:{comment:{_nnull:!0}}},{collection:"directus_comments",action:"update",permissions:{user_created:{_eq:"$CURRENT_USER"}},fields:["comment"]},{collection:"directus_comments",action:"delete",permissions:{user_created:{_eq:"$CURRENT_USER"}}},{collection:"directus_presets",action:"read",permissions:{_or:[{user:{_eq:"$CURRENT_USER"}},{_and:[{user:{_null:!0}},{role:{_eq:"$CURRENT_ROLE"}}]},{_and:[{user:{_null:!0}},{role:{_null:!0}}]}]}},{collection:"directus_presets",action:"create",validation:{user:{_eq:"$CURRENT_USER"}}},{collection:"directus_presets",action:"update",permissions:{user:{_eq:"$CURRENT_USER"}},validation:{user:{_eq:"$CURRENT_USER"}}},{collection:"directus_presets",action:"delete",permissions:{user:{_eq:"$CURRENT_USER"}}},{collection:"directus_roles",action:"read",permissions:{id:{_in:"$CURRENT_ROLES"}}},{collection:"directus_settings",action:"read"},{collection:"directus_translations",action:"read"},{collection:"directus_notifications",action:"read",permissions:{recipient:{_eq:"$CURRENT_USER"}}},{collection:"directus_notifications",action:"update",permissions:{recipient:{_eq:"$CURRENT_USER"}},fields:["status"]},{collection:"directus_shares",action:"read",permissions:{user_created:{_eq:"$CURRENT_USER"}}},{collection:"directus_users",action:"read",permissions:{id:{_eq:"$CURRENT_USER"}},fields:["id","first_name","last_name","last_page","email","password","location","title","description","tags","preferences_divider","avatar","language","appearance","theme_light","theme_dark","tfa_secret","status","role"]}];var P=[{collection:"directus_collections",action:"read"},{collection:"directus_fields",action:"read"},{collection:"directus_relations",action:"read"},{collection:"directus_translations",action:"read"}];var T={policy:null,permissions:{},validation:null,presets:null,fields:["*"],system:!0},we=P.map(i=>({...T,...i}));[...we,...C].map(i=>({...T,...i}));

// shared/abbreviate-number.ts
BaseJoi.extend({
  type: "string",
  base: BaseJoi.string(),
  messages: {
    "string.contains": "{{#label}} must contain [{{#substring}}]",
    "string.icontains": "{{#label}} must contain case insensitive [{{#substring}}]",
    "string.ncontains": "{{#label}} can't contain [{{#substring}}]"
  },
  rules: {
    contains: {
      args: [
        {
          name: "substring",
          ref: true,
          assert: (val) => typeof val === "string",
          message: "must be a string"
        }
      ],
      method(substring) {
        return this.$_addRule({ name: "contains", args: { substring } });
      },
      validate(value, helpers, { substring }) {
        if (value.includes(substring) === false) {
          return helpers.error("string.contains", { substring });
        }
        return value;
      }
    },
    icontains: {
      args: [
        {
          name: "substring",
          ref: true,
          assert: (val) => typeof val === "string",
          message: "must be a string"
        }
      ],
      method(substring) {
        return this.$_addRule({ name: "icontains", args: { substring } });
      },
      validate(value, helpers, { substring }) {
        if (value.toLowerCase().includes(substring.toLowerCase()) === false) {
          return helpers.error("string.icontains", { substring });
        }
        return value;
      }
    },
    ncontains: {
      args: [
        {
          name: "substring",
          ref: true,
          assert: (val) => typeof val === "string",
          message: "must be a string"
        }
      ],
      method(substring) {
        return this.$_addRule({ name: "ncontains", args: { substring } });
      },
      validate(value, helpers, { substring }) {
        if (value.includes(substring) === true) {
          return helpers.error("string.ncontains", { substring });
        }
        return value;
      }
    }
  }
});

// shared/get-filter-operators-for-type.ts
function getFilterOperatorsForType(type, opts) {
  const validationOnlyStringFilterOperators = opts?.includeValidation ? ["regex"] : [];
  switch (type) {
    // Text
    case "binary":
    case "string":
    case "text":
    case "csv":
      return [
        "contains",
        "ncontains",
        "icontains",
        "starts_with",
        "nstarts_with",
        "istarts_with",
        "nistarts_with",
        "ends_with",
        "nends_with",
        "iends_with",
        "niends_with",
        "eq",
        "neq",
        "empty",
        "nempty",
        "null",
        "nnull",
        "in",
        "nin",
        ...validationOnlyStringFilterOperators
      ];
    case "hash":
      return ["empty", "nempty", "null", "nnull"];
    case "uuid":
      return ["eq", "neq", "null", "nnull", "in", "nin"];
    case "json":
      return ["null", "nnull"];
    case "boolean":
      return ["eq", "neq", "null", "nnull"];
    // Numbers
    case "bigInteger":
    case "integer":
    case "decimal":
    case "float":
      return ["eq", "neq", "lt", "lte", "gt", "gte", "between", "nbetween", "null", "nnull", "in", "nin"];
    // Datetime
    case "dateTime":
    case "date":
    case "time":
      return ["eq", "neq", "lt", "lte", "gt", "gte", "between", "nbetween", "null", "nnull", "in", "nin"];
    case "geometry":
      return ["eq", "neq", "null", "nnull", "intersects", "nintersects", "intersects_bbox", "nintersects_bbox"];
    default:
      return [
        "contains",
        "ncontains",
        "eq",
        "neq",
        "lt",
        "lte",
        "gt",
        "gte",
        "between",
        "nbetween",
        "empty",
        "nempty",
        "null",
        "nnull",
        "in",
        "nin",
        ...validationOnlyStringFilterOperators
      ];
  }
}

// shared/to-array.ts
function toArray(val) {
  if (typeof val === "string") {
    return val.split(",");
  }
  return Array.isArray(val) ? val : [val];
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var vuedraggable_umd = {exports: {}};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(vue);

var require$$1 = /*@__PURE__*/getAugmentedNamespace(sortablejs);

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory(require$$0, require$$1);
	})((typeof self !== 'undefined' ? self : commonjsGlobal), function(__WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a352__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
	/******/ })
	/************************************************************************/
	/******/ ({

	/***/ "00ee":
	/***/ (function(module, exports, __webpack_require__) {

	var wellKnownSymbol = __webpack_require__("b622");

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	module.exports = String(test) === '[object z]';


	/***/ }),

	/***/ "0366":
	/***/ (function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__("1c0b");

	// optional / simple context binding
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


	/***/ }),

	/***/ "057f":
	/***/ (function(module, exports, __webpack_require__) {

	var toIndexedObject = __webpack_require__("fc6a");
	var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};


	/***/ }),

	/***/ "06cf":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var propertyIsEnumerableModule = __webpack_require__("d1e7");
	var createPropertyDescriptor = __webpack_require__("5c6c");
	var toIndexedObject = __webpack_require__("fc6a");
	var toPrimitive = __webpack_require__("c04e");
	var has = __webpack_require__("5135");
	var IE8_DOM_DEFINE = __webpack_require__("0cfb");

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
	};


	/***/ }),

	/***/ "0cfb":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var fails = __webpack_require__("d039");
	var createElement = __webpack_require__("cc12");

	// Thank's IE8 for his funny defineProperty
	module.exports = !DESCRIPTORS && !fails(function () {
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});


	/***/ }),

	/***/ "13d5":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $reduce = __webpack_require__("d58f").left;
	var arrayMethodIsStrict = __webpack_require__("a640");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var STRICT_METHOD = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

	// `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});


	/***/ }),

	/***/ "14c3":
	/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__("c6b6");
	var regexpExec = __webpack_require__("9263");

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	module.exports = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classof(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};



	/***/ }),

	/***/ "159b":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var DOMIterables = __webpack_require__("fdbc");
	var forEach = __webpack_require__("17c2");
	var createNonEnumerableProperty = __webpack_require__("9112");

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	}


	/***/ }),

	/***/ "17c2":
	/***/ (function(module, exports, __webpack_require__) {

	var $forEach = __webpack_require__("b727").forEach;
	var arrayMethodIsStrict = __webpack_require__("a640");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;


	/***/ }),

	/***/ "1be4":
	/***/ (function(module, exports, __webpack_require__) {

	var getBuiltIn = __webpack_require__("d066");

	module.exports = getBuiltIn('document', 'documentElement');


	/***/ }),

	/***/ "1c0b":
	/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};


	/***/ }),

	/***/ "1c7e":
	/***/ (function(module, exports, __webpack_require__) {

	var wellKnownSymbol = __webpack_require__("b622");

	var ITERATOR = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	module.exports = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};


	/***/ }),

	/***/ "1d80":
	/***/ (function(module, exports) {

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};


	/***/ }),

	/***/ "1dde":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");
	var wellKnownSymbol = __webpack_require__("b622");
	var V8_VERSION = __webpack_require__("2d00");

	var SPECIES = wellKnownSymbol('species');

	module.exports = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};


	/***/ }),

	/***/ "23cb":
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__("a691");

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	module.exports = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};


	/***/ }),

	/***/ "23e7":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
	var createNonEnumerableProperty = __webpack_require__("9112");
	var redefine = __webpack_require__("6eeb");
	var setGlobal = __webpack_require__("ce4e");
	var copyConstructorProperties = __webpack_require__("e893");
	var isForced = __webpack_require__("94ca");

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	module.exports = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global;
	  } else if (STATIC) {
	    target = global[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};


	/***/ }),

	/***/ "241c":
	/***/ (function(module, exports, __webpack_require__) {

	var internalObjectKeys = __webpack_require__("ca84");
	var enumBugKeys = __webpack_require__("7839");

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys);
	};


	/***/ }),

	/***/ "25f0":
	/***/ (function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__("6eeb");
	var anObject = __webpack_require__("825a");
	var fails = __webpack_require__("d039");
	var flags = __webpack_require__("ad6d");

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}


	/***/ }),

	/***/ "2ca0":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
	var toLength = __webpack_require__("50c4");
	var notARegExp = __webpack_require__("5a34");
	var requireObjectCoercible = __webpack_require__("1d80");
	var correctIsRegExpLogic = __webpack_require__("ab13");
	var IS_PURE = __webpack_require__("c430");

	var nativeStartsWith = ''.startsWith;
	var min = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
	$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = String(requireObjectCoercible(this));
	    notARegExp(searchString);
	    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});


	/***/ }),

	/***/ "2d00":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var userAgent = __webpack_require__("342f");

	var process = global.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	module.exports = version && +version;


	/***/ }),

	/***/ "342f":
	/***/ (function(module, exports, __webpack_require__) {

	var getBuiltIn = __webpack_require__("d066");

	module.exports = getBuiltIn('navigator', 'userAgent') || '';


	/***/ }),

	/***/ "35a1":
	/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__("f5df");
	var Iterators = __webpack_require__("3f8c");
	var wellKnownSymbol = __webpack_require__("b622");

	var ITERATOR = wellKnownSymbol('iterator');

	module.exports = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


	/***/ }),

	/***/ "37e8":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var definePropertyModule = __webpack_require__("9bf2");
	var anObject = __webpack_require__("825a");
	var objectKeys = __webpack_require__("df75");

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
	  return O;
	};


	/***/ }),

	/***/ "3bbe":
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("861d");

	module.exports = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};


	/***/ }),

	/***/ "3ca3":
	/***/ (function(module, exports, __webpack_require__) {

	var charAt = __webpack_require__("6547").charAt;
	var InternalStateModule = __webpack_require__("69f3");
	var defineIterator = __webpack_require__("7dd0");

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});


	/***/ }),

	/***/ "3f8c":
	/***/ (function(module, exports) {

	module.exports = {};


	/***/ }),

	/***/ "4160":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var forEach = __webpack_require__("17c2");

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
	  forEach: forEach
	});


	/***/ }),

	/***/ "428f":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");

	module.exports = global;


	/***/ }),

	/***/ "44ad":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");
	var classof = __webpack_require__("c6b6");

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	module.exports = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;


	/***/ }),

	/***/ "44d2":
	/***/ (function(module, exports, __webpack_require__) {

	var wellKnownSymbol = __webpack_require__("b622");
	var create = __webpack_require__("7c73");
	var definePropertyModule = __webpack_require__("9bf2");

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	module.exports = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};


	/***/ }),

	/***/ "44e7":
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("861d");
	var classof = __webpack_require__("c6b6");
	var wellKnownSymbol = __webpack_require__("b622");

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	module.exports = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
	};


	/***/ }),

	/***/ "4930":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");

	module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});


	/***/ }),

	/***/ "4d64":
	/***/ (function(module, exports, __webpack_require__) {

	var toIndexedObject = __webpack_require__("fc6a");
	var toLength = __webpack_require__("50c4");
	var toAbsoluteIndex = __webpack_require__("23cb");

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	module.exports = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};


	/***/ }),

	/***/ "4de4":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $filter = __webpack_require__("b727").filter;
	var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});


	/***/ }),

	/***/ "4df4":
	/***/ (function(module, exports, __webpack_require__) {

	var bind = __webpack_require__("0366");
	var toObject = __webpack_require__("7b0b");
	var callWithSafeIterationClosing = __webpack_require__("9bdd");
	var isArrayIteratorMethod = __webpack_require__("e95a");
	var toLength = __webpack_require__("50c4");
	var createProperty = __webpack_require__("8418");
	var getIteratorMethod = __webpack_require__("35a1");

	// `Array.from` method implementation
	// https://tc39.github.io/ecma262/#sec-array.from
	module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};


	/***/ }),

	/***/ "4fad":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $entries = __webpack_require__("6f53").entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	$({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});


	/***/ }),

	/***/ "50c4":
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__("a691");

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	module.exports = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};


	/***/ }),

	/***/ "5135":
	/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;

	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


	/***/ }),

	/***/ "5319":
	/***/ (function(module, exports, __webpack_require__) {

	var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
	var anObject = __webpack_require__("825a");
	var toObject = __webpack_require__("7b0b");
	var toLength = __webpack_require__("50c4");
	var toInteger = __webpack_require__("a691");
	var requireObjectCoercible = __webpack_require__("1d80");
	var advanceStringIndex = __webpack_require__("8aa5");
	var regExpExec = __webpack_require__("14c3");

	var max = Math.max;
	var min = Math.min;
	var floor = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
	      var S = String(this);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max(min(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	  // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});


	/***/ }),

	/***/ "5692":
	/***/ (function(module, exports, __webpack_require__) {

	var IS_PURE = __webpack_require__("c430");
	var store = __webpack_require__("c6cd");

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.5',
	  mode: IS_PURE ? 'pure' : 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});


	/***/ }),

	/***/ "56ef":
	/***/ (function(module, exports, __webpack_require__) {

	var getBuiltIn = __webpack_require__("d066");
	var getOwnPropertyNamesModule = __webpack_require__("241c");
	var getOwnPropertySymbolsModule = __webpack_require__("7418");
	var anObject = __webpack_require__("825a");

	// all object keys, includes non-enumerable and symbols
	module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};


	/***/ }),

	/***/ "5a34":
	/***/ (function(module, exports, __webpack_require__) {

	var isRegExp = __webpack_require__("44e7");

	module.exports = function (it) {
	  if (isRegExp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};


	/***/ }),

	/***/ "5c6c":
	/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


	/***/ }),

	/***/ "5db7":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var flattenIntoArray = __webpack_require__("a2bf");
	var toObject = __webpack_require__("7b0b");
	var toLength = __webpack_require__("50c4");
	var aFunction = __webpack_require__("1c0b");
	var arraySpeciesCreate = __webpack_require__("65f0");

	// `Array.prototype.flatMap` method
	// https://github.com/tc39/proposal-flatMap
	$({ target: 'Array', proto: true }, {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = toObject(this);
	    var sourceLen = toLength(O.length);
	    var A;
	    aFunction(callbackfn);
	    A = arraySpeciesCreate(O, 0);
	    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    return A;
	  }
	});


	/***/ }),

	/***/ "6547":
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__("a691");
	var requireObjectCoercible = __webpack_require__("1d80");

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	module.exports = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};


	/***/ }),

	/***/ "65f0":
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("861d");
	var isArray = __webpack_require__("e8b5");
	var wellKnownSymbol = __webpack_require__("b622");

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	module.exports = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};


	/***/ }),

	/***/ "69f3":
	/***/ (function(module, exports, __webpack_require__) {

	var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
	var global = __webpack_require__("da84");
	var isObject = __webpack_require__("861d");
	var createNonEnumerableProperty = __webpack_require__("9112");
	var objectHas = __webpack_require__("5135");
	var sharedKey = __webpack_require__("f772");
	var hiddenKeys = __webpack_require__("d012");

	var WeakMap = global.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP) {
	  var store = new WeakMap();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	module.exports = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};


	/***/ }),

	/***/ "6eeb":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var createNonEnumerableProperty = __webpack_require__("9112");
	var has = __webpack_require__("5135");
	var setGlobal = __webpack_require__("ce4e");
	var inspectSource = __webpack_require__("8925");
	var InternalStateModule = __webpack_require__("69f3");

	var getInternalState = InternalStateModule.get;
	var enforceInternalState = InternalStateModule.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});


	/***/ }),

	/***/ "6f53":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var objectKeys = __webpack_require__("df75");
	var toIndexedObject = __webpack_require__("fc6a");
	var propertyIsEnumerable = __webpack_require__("d1e7").f;

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	module.exports = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod(false)
	};


	/***/ }),

	/***/ "73d9":
	/***/ (function(module, exports, __webpack_require__) {

	// this method was added to unscopables after implementation
	// in popular engines, so it's moved to a separate module
	var addToUnscopables = __webpack_require__("44d2");

	addToUnscopables('flatMap');


	/***/ }),

	/***/ "7418":
	/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


	/***/ }),

	/***/ "746f":
	/***/ (function(module, exports, __webpack_require__) {

	var path = __webpack_require__("428f");
	var has = __webpack_require__("5135");
	var wrappedWellKnownSymbolModule = __webpack_require__("e538");
	var defineProperty = __webpack_require__("9bf2").f;

	module.exports = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule.f(NAME)
	  });
	};


	/***/ }),

	/***/ "7839":
	/***/ (function(module, exports) {

	// IE8- don't enum bug keys
	module.exports = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];


	/***/ }),

	/***/ "7b0b":
	/***/ (function(module, exports, __webpack_require__) {

	var requireObjectCoercible = __webpack_require__("1d80");

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	module.exports = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};


	/***/ }),

	/***/ "7c73":
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__("825a");
	var defineProperties = __webpack_require__("37e8");
	var enumBugKeys = __webpack_require__("7839");
	var hiddenKeys = __webpack_require__("d012");
	var html = __webpack_require__("1be4");
	var documentCreateElement = __webpack_require__("cc12");
	var sharedKey = __webpack_require__("f772");

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : defineProperties(result, Properties);
	};


	/***/ }),

	/***/ "7dd0":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var createIteratorConstructor = __webpack_require__("9ed3");
	var getPrototypeOf = __webpack_require__("e163");
	var setPrototypeOf = __webpack_require__("d2bb");
	var setToStringTag = __webpack_require__("d44e");
	var createNonEnumerableProperty = __webpack_require__("9112");
	var redefine = __webpack_require__("6eeb");
	var wellKnownSymbol = __webpack_require__("b622");
	var IS_PURE = __webpack_require__("c430");
	var Iterators = __webpack_require__("3f8c");
	var IteratorsCore = __webpack_require__("ae93");

	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf) {
	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
	  }
	  Iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};


	/***/ }),

	/***/ "7f9a":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var inspectSource = __webpack_require__("8925");

	var WeakMap = global.WeakMap;

	module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


	/***/ }),

	/***/ "825a":
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("861d");

	module.exports = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};


	/***/ }),

	/***/ "83ab":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");

	// Thank's IE8 for his funny defineProperty
	module.exports = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});


	/***/ }),

	/***/ "8418":
	/***/ (function(module, exports, __webpack_require__) {

	var toPrimitive = __webpack_require__("c04e");
	var definePropertyModule = __webpack_require__("9bf2");
	var createPropertyDescriptor = __webpack_require__("5c6c");

	module.exports = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};


	/***/ }),

	/***/ "861d":
	/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


	/***/ }),

	/***/ "8875":
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
	// MIT license
	// source: https://github.com/amiller-gh/currentScript-polyfill

	// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

	(function (root, factory) {
	  {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
					__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
					(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}(typeof self !== 'undefined' ? self : this, function () {
	  function getCurrentScript () {
	    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript');
	    // for chrome
	    if (!descriptor && 'currentScript' in document && document.currentScript) {
	      return document.currentScript
	    }

	    // for other browsers with native support for currentScript
	    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
	      return document.currentScript
	    }
	  
	    // IE 8-10 support script readyState
	    // IE 11+ & Firefox support stack trace
	    try {
	      throw new Error();
	    }
	    catch (err) {
	      // Find the second match for the "at" string to get file src url from stack.
	      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
	        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
	        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
	        scriptLocation = (stackDetails && stackDetails[1]) || false,
	        line = (stackDetails && stackDetails[2]) || false,
	        currentLocation = document.location.href.replace(document.location.hash, ''),
	        pageSource,
	        inlineScriptSourceRegExp,
	        inlineScriptSource,
	        scripts = document.getElementsByTagName('script'); // Live NodeList collection
	  
	      if (scriptLocation === currentLocation) {
	        pageSource = document.documentElement.outerHTML;
	        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
	        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
	      }
	  
	      for (var i = 0; i < scripts.length; i++) {
	        // If ready state is interactive, return the script tag
	        if (scripts[i].readyState === 'interactive') {
	          return scripts[i];
	        }
	  
	        // If src matches, return the script tag
	        if (scripts[i].src === scriptLocation) {
	          return scripts[i];
	        }
	  
	        // If inline source matches, return the script tag
	        if (
	          scriptLocation === currentLocation &&
	          scripts[i].innerHTML &&
	          scripts[i].innerHTML.trim() === inlineScriptSource
	        ) {
	          return scripts[i];
	        }
	      }
	  
	      // If no match, return null
	      return null;
	    }
	  }
	  return getCurrentScript
	}));


	/***/ }),

	/***/ "8925":
	/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__("c6cd");

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof store.inspectSource != 'function') {
	  store.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	module.exports = store.inspectSource;


	/***/ }),

	/***/ "8aa5":
	/***/ (function(module, exports, __webpack_require__) {

	var charAt = __webpack_require__("6547").charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	module.exports = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};


	/***/ }),

	/***/ "8bbf":
	/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

	/***/ }),

	/***/ "90e3":
	/***/ (function(module, exports) {

	var id = 0;
	var postfix = Math.random();

	module.exports = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};


	/***/ }),

	/***/ "9112":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var definePropertyModule = __webpack_require__("9bf2");
	var createPropertyDescriptor = __webpack_require__("5c6c");

	module.exports = DESCRIPTORS ? function (object, key, value) {
	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


	/***/ }),

	/***/ "9263":
	/***/ (function(module, exports, __webpack_require__) {

	var regexpFlags = __webpack_require__("ad6d");
	var stickyHelpers = __webpack_require__("9f7f");

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	module.exports = patchedExec;


	/***/ }),

	/***/ "94ca":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	module.exports = isForced;


	/***/ }),

	/***/ "99af":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var fails = __webpack_require__("d039");
	var isArray = __webpack_require__("e8b5");
	var isObject = __webpack_require__("861d");
	var toObject = __webpack_require__("7b0b");
	var toLength = __webpack_require__("50c4");
	var createProperty = __webpack_require__("8418");
	var arraySpeciesCreate = __webpack_require__("65f0");
	var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
	var wellKnownSymbol = __webpack_require__("b622");
	var V8_VERSION = __webpack_require__("2d00");

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});


	/***/ }),

	/***/ "9bdd":
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__("825a");

	// call something on iterator step with safe closing on error
	module.exports = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};


	/***/ }),

	/***/ "9bf2":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var IE8_DOM_DEFINE = __webpack_require__("0cfb");
	var anObject = __webpack_require__("825a");
	var toPrimitive = __webpack_require__("c04e");

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


	/***/ }),

	/***/ "9ed3":
	/***/ (function(module, exports, __webpack_require__) {

	var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
	var create = __webpack_require__("7c73");
	var createPropertyDescriptor = __webpack_require__("5c6c");
	var setToStringTag = __webpack_require__("d44e");
	var Iterators = __webpack_require__("3f8c");

	var returnThis = function () { return this; };

	module.exports = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};


	/***/ }),

	/***/ "9f7f":
	/***/ (function(module, exports, __webpack_require__) {


	var fails = __webpack_require__("d039");

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	exports.UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	exports.BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});


	/***/ }),

	/***/ "a2bf":
	/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__("e8b5");
	var toLength = __webpack_require__("50c4");
	var bind = __webpack_require__("0366");

	// `FlattenIntoArray` abstract operation
	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
	  var element;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      if (depth > 0 && isArray(element)) {
	        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	};

	module.exports = flattenIntoArray;


	/***/ }),

	/***/ "a352":
	/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_a352__;

	/***/ }),

	/***/ "a434":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var toAbsoluteIndex = __webpack_require__("23cb");
	var toInteger = __webpack_require__("a691");
	var toLength = __webpack_require__("50c4");
	var toObject = __webpack_require__("7b0b");
	var arraySpeciesCreate = __webpack_require__("65f0");
	var createProperty = __webpack_require__("8418");
	var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

	var max = Math.max;
	var min = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});


	/***/ }),

	/***/ "a4d3":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var global = __webpack_require__("da84");
	var getBuiltIn = __webpack_require__("d066");
	var IS_PURE = __webpack_require__("c430");
	var DESCRIPTORS = __webpack_require__("83ab");
	var NATIVE_SYMBOL = __webpack_require__("4930");
	var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
	var fails = __webpack_require__("d039");
	var has = __webpack_require__("5135");
	var isArray = __webpack_require__("e8b5");
	var isObject = __webpack_require__("861d");
	var anObject = __webpack_require__("825a");
	var toObject = __webpack_require__("7b0b");
	var toIndexedObject = __webpack_require__("fc6a");
	var toPrimitive = __webpack_require__("c04e");
	var createPropertyDescriptor = __webpack_require__("5c6c");
	var nativeObjectCreate = __webpack_require__("7c73");
	var objectKeys = __webpack_require__("df75");
	var getOwnPropertyNamesModule = __webpack_require__("241c");
	var getOwnPropertyNamesExternal = __webpack_require__("057f");
	var getOwnPropertySymbolsModule = __webpack_require__("7418");
	var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
	var definePropertyModule = __webpack_require__("9bf2");
	var propertyIsEnumerableModule = __webpack_require__("d1e7");
	var createNonEnumerableProperty = __webpack_require__("9112");
	var redefine = __webpack_require__("6eeb");
	var shared = __webpack_require__("5692");
	var sharedKey = __webpack_require__("f772");
	var hiddenKeys = __webpack_require__("d012");
	var uid = __webpack_require__("90e3");
	var wellKnownSymbol = __webpack_require__("b622");
	var wrappedWellKnownSymbolModule = __webpack_require__("e538");
	var defineWellKnownSymbol = __webpack_require__("746f");
	var setToStringTag = __webpack_require__("d44e");
	var InternalStateModule = __webpack_require__("69f3");
	var $forEach = __webpack_require__("b727").forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS && fails(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS) symbol.description = description;
	  return symbol;
	};

	var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (DESCRIPTORS) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    if (!IS_PURE) {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;


	/***/ }),

	/***/ "a630":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var from = __webpack_require__("4df4");
	var checkCorrectnessOfIteration = __webpack_require__("1c7e");

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.github.io/ecma262/#sec-array.from
	$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});


	/***/ }),

	/***/ "a640":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");

	module.exports = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};


	/***/ }),

	/***/ "a691":
	/***/ (function(module, exports) {

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	module.exports = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};


	/***/ }),

	/***/ "ab13":
	/***/ (function(module, exports, __webpack_require__) {

	var wellKnownSymbol = __webpack_require__("b622");

	var MATCH = wellKnownSymbol('match');

	module.exports = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};


	/***/ }),

	/***/ "ac1f":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var exec = __webpack_require__("9263");

	$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});


	/***/ }),

	/***/ "ad6d":
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__("825a");

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	module.exports = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};


	/***/ }),

	/***/ "ae40":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var fails = __webpack_require__("d039");
	var has = __webpack_require__("5135");

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	module.exports = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !DESCRIPTORS) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};


	/***/ }),

	/***/ "ae93":
	/***/ (function(module, exports, __webpack_require__) {

	var getPrototypeOf = __webpack_require__("e163");
	var createNonEnumerableProperty = __webpack_require__("9112");
	var has = __webpack_require__("5135");
	var wellKnownSymbol = __webpack_require__("b622");
	var IS_PURE = __webpack_require__("c430");

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	module.exports = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};


	/***/ }),

	/***/ "b041":
	/***/ (function(module, exports, __webpack_require__) {

	var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
	var classof = __webpack_require__("f5df");

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};


	/***/ }),

	/***/ "b0c0":
	/***/ (function(module, exports, __webpack_require__) {

	var DESCRIPTORS = __webpack_require__("83ab");
	var defineProperty = __webpack_require__("9bf2").f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
	  defineProperty(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}


	/***/ }),

	/***/ "b622":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var shared = __webpack_require__("5692");
	var has = __webpack_require__("5135");
	var uid = __webpack_require__("90e3");
	var NATIVE_SYMBOL = __webpack_require__("4930");
	var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

	var WellKnownSymbolsStore = shared('wks');
	var Symbol = global.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

	module.exports = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};


	/***/ }),

	/***/ "b64b":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var toObject = __webpack_require__("7b0b");
	var nativeKeys = __webpack_require__("df75");
	var fails = __webpack_require__("d039");

	var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject(it));
	  }
	});


	/***/ }),

	/***/ "b727":
	/***/ (function(module, exports, __webpack_require__) {

	var bind = __webpack_require__("0366");
	var IndexedObject = __webpack_require__("44ad");
	var toObject = __webpack_require__("7b0b");
	var toLength = __webpack_require__("50c4");
	var arraySpeciesCreate = __webpack_require__("65f0");

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	module.exports = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6)
	};


	/***/ }),

	/***/ "c04e":
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("861d");

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


	/***/ }),

	/***/ "c430":
	/***/ (function(module, exports) {

	module.exports = false;


	/***/ }),

	/***/ "c6b6":
	/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


	/***/ }),

	/***/ "c6cd":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var setGlobal = __webpack_require__("ce4e");

	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || setGlobal(SHARED, {});

	module.exports = store;


	/***/ }),

	/***/ "c740":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $findIndex = __webpack_require__("b727").findIndex;
	var addToUnscopables = __webpack_require__("44d2");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
	$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);


	/***/ }),

	/***/ "c8ba":
	/***/ (function(module, exports) {

	var g;

	// This works in non-strict mode
	g = (function() {
		return this;
	})();

	try {
		// This works if eval is allowed (see CSP)
		g = g || new Function("return this")();
	} catch (e) {
		// This works if the window reference is available
		if (typeof window === "object") g = window;
	}

	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}

	module.exports = g;


	/***/ }),

	/***/ "c975":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $indexOf = __webpack_require__("4d64").indexOf;
	var arrayMethodIsStrict = __webpack_require__("a640");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});


	/***/ }),

	/***/ "ca84":
	/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__("5135");
	var toIndexedObject = __webpack_require__("fc6a");
	var indexOf = __webpack_require__("4d64").indexOf;
	var hiddenKeys = __webpack_require__("d012");

	module.exports = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};


	/***/ }),

	/***/ "caad":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $includes = __webpack_require__("4d64").includes;
	var addToUnscopables = __webpack_require__("44d2");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');


	/***/ }),

	/***/ "cc12":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var isObject = __webpack_require__("861d");

	var document = global.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document) && isObject(document.createElement);

	module.exports = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};


	/***/ }),

	/***/ "ce4e":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var createNonEnumerableProperty = __webpack_require__("9112");

	module.exports = function (key, value) {
	  try {
	    createNonEnumerableProperty(global, key, value);
	  } catch (error) {
	    global[key] = value;
	  } return value;
	};


	/***/ }),

	/***/ "d012":
	/***/ (function(module, exports) {

	module.exports = {};


	/***/ }),

	/***/ "d039":
	/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};


	/***/ }),

	/***/ "d066":
	/***/ (function(module, exports, __webpack_require__) {

	var path = __webpack_require__("428f");
	var global = __webpack_require__("da84");

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	module.exports = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
	    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
	};


	/***/ }),

	/***/ "d1e7":
	/***/ (function(module, exports, __webpack_require__) {

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;


	/***/ }),

	/***/ "d28b":
	/***/ (function(module, exports, __webpack_require__) {

	var defineWellKnownSymbol = __webpack_require__("746f");

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');


	/***/ }),

	/***/ "d2bb":
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__("825a");
	var aPossiblePrototype = __webpack_require__("3bbe");

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);


	/***/ }),

	/***/ "d3b7":
	/***/ (function(module, exports, __webpack_require__) {

	var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
	var redefine = __webpack_require__("6eeb");
	var toString = __webpack_require__("b041");

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  redefine(Object.prototype, 'toString', toString, { unsafe: true });
	}


	/***/ }),

	/***/ "d44e":
	/***/ (function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__("9bf2").f;
	var has = __webpack_require__("5135");
	var wellKnownSymbol = __webpack_require__("b622");

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	module.exports = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};


	/***/ }),

	/***/ "d58f":
	/***/ (function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__("1c0b");
	var toObject = __webpack_require__("7b0b");
	var IndexedObject = __webpack_require__("44ad");
	var toLength = __webpack_require__("50c4");

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction(callbackfn);
	    var O = toObject(that);
	    var self = IndexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	module.exports = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};


	/***/ }),

	/***/ "d784":
	/***/ (function(module, exports, __webpack_require__) {

	// TODO: Remove from `core-js@4` since it's moved to entry points
	__webpack_require__("ac1f");
	var redefine = __webpack_require__("6eeb");
	var fails = __webpack_require__("d039");
	var wellKnownSymbol = __webpack_require__("b622");
	var regexpExec = __webpack_require__("9263");
	var createNonEnumerableProperty = __webpack_require__("9112");

	var SPECIES = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	var REPLACE = wellKnownSymbol('replace');
	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	module.exports = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};


	/***/ }),

	/***/ "d81d":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var $map = __webpack_require__("b727").map;
	var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH = arrayMethodUsesToLength('map');

	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});


	/***/ }),

	/***/ "da84":
	/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	module.exports =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof global == 'object' && global) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")));

	/***/ }),

	/***/ "dbb4":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var DESCRIPTORS = __webpack_require__("83ab");
	var ownKeys = __webpack_require__("56ef");
	var toIndexedObject = __webpack_require__("fc6a");
	var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
	var createProperty = __webpack_require__("8418");

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});


	/***/ }),

	/***/ "dbf1":
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return console; });
	function getConsole() {
	  if (typeof window !== "undefined") {
	    return window.console;
	  }

	  return global.console;
	}

	var console = getConsole();

	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")));

	/***/ }),

	/***/ "ddb0":
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__("da84");
	var DOMIterables = __webpack_require__("fdbc");
	var ArrayIteratorMethods = __webpack_require__("e260");
	var createNonEnumerableProperty = __webpack_require__("9112");
	var wellKnownSymbol = __webpack_require__("b622");

	var ITERATOR = wellKnownSymbol('iterator');
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	}


	/***/ }),

	/***/ "df75":
	/***/ (function(module, exports, __webpack_require__) {

	var internalObjectKeys = __webpack_require__("ca84");
	var enumBugKeys = __webpack_require__("7839");

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	module.exports = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys);
	};


	/***/ }),

	/***/ "e01a":
	/***/ (function(module, exports, __webpack_require__) {
	// `Symbol.prototype.description` getter
	// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

	var $ = __webpack_require__("23e7");
	var DESCRIPTORS = __webpack_require__("83ab");
	var global = __webpack_require__("da84");
	var has = __webpack_require__("5135");
	var isObject = __webpack_require__("861d");
	var defineProperty = __webpack_require__("9bf2").f;
	var copyConstructorProperties = __webpack_require__("e893");

	var NativeSymbol = global.Symbol;

	if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}


	/***/ }),

	/***/ "e163":
	/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__("5135");
	var toObject = __webpack_require__("7b0b");
	var sharedKey = __webpack_require__("f772");
	var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};


	/***/ }),

	/***/ "e177":
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__("d039");

	module.exports = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});


	/***/ }),

	/***/ "e260":
	/***/ (function(module, exports, __webpack_require__) {

	var toIndexedObject = __webpack_require__("fc6a");
	var addToUnscopables = __webpack_require__("44d2");
	var Iterators = __webpack_require__("3f8c");
	var InternalStateModule = __webpack_require__("69f3");
	var defineIterator = __webpack_require__("7dd0");

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	Iterators.Arguments = Iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


	/***/ }),

	/***/ "e439":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var fails = __webpack_require__("d039");
	var toIndexedObject = __webpack_require__("fc6a");
	var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
	var DESCRIPTORS = __webpack_require__("83ab");

	var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
	  }
	});


	/***/ }),

	/***/ "e538":
	/***/ (function(module, exports, __webpack_require__) {

	var wellKnownSymbol = __webpack_require__("b622");

	exports.f = wellKnownSymbol;


	/***/ }),

	/***/ "e893":
	/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__("5135");
	var ownKeys = __webpack_require__("56ef");
	var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
	var definePropertyModule = __webpack_require__("9bf2");

	module.exports = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};


	/***/ }),

	/***/ "e8b5":
	/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__("c6b6");

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	module.exports = Array.isArray || function isArray(arg) {
	  return classof(arg) == 'Array';
	};


	/***/ }),

	/***/ "e95a":
	/***/ (function(module, exports, __webpack_require__) {

	var wellKnownSymbol = __webpack_require__("b622");
	var Iterators = __webpack_require__("3f8c");

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};


	/***/ }),

	/***/ "f5df":
	/***/ (function(module, exports, __webpack_require__) {

	var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
	var classofRaw = __webpack_require__("c6b6");
	var wellKnownSymbol = __webpack_require__("b622");

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};


	/***/ }),

	/***/ "f772":
	/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__("5692");
	var uid = __webpack_require__("90e3");

	var keys = shared('keys');

	module.exports = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};


	/***/ }),

	/***/ "fb15":
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	// ESM COMPAT FLAG
	__webpack_require__.r(__webpack_exports__);

	// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
	// This file is imported into lib/wc client bundles.

	if (typeof window !== 'undefined') {
	  var currentScript = window.document.currentScript;
	  {
	    var getCurrentScript = __webpack_require__("8875");
	    currentScript = getCurrentScript();

	    // for backward compatibility, because previously we directly included the polyfill
	    if (!('currentScript' in document)) {
	      Object.defineProperty(document, 'currentScript', { get: getCurrentScript });
	    }
	  }

	  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
	  if (src) {
	    __webpack_require__.p = src[1]; // eslint-disable-line
	  }
	}

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
	__webpack_require__("99af");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
	__webpack_require__("4de4");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
	__webpack_require__("4160");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
	__webpack_require__("c975");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
	__webpack_require__("d81d");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
	__webpack_require__("a434");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
	__webpack_require__("159b");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
	__webpack_require__("a4d3");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
	__webpack_require__("e439");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
	__webpack_require__("dbb4");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
	__webpack_require__("b64b");

	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
	__webpack_require__("e01a");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
	__webpack_require__("d28b");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
	__webpack_require__("e260");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
	__webpack_require__("d3b7");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
	__webpack_require__("3ca3");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
	__webpack_require__("ddb0");

	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}
	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
	__webpack_require__("a630");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
	__webpack_require__("fb6a");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
	__webpack_require__("b0c0");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
	__webpack_require__("25f0");

	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js







	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js








	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}
	// EXTERNAL MODULE: external {"commonjs":"sortablejs","commonjs2":"sortablejs","amd":"sortablejs","root":"Sortable"}
	var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
	var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);

	// CONCATENATED MODULE: ./src/util/htmlHelper.js
	function removeNode(node) {
	  if (node.parentElement !== null) {
	    node.parentElement.removeChild(node);
	  }
	}

	function insertNodeAt(fatherNode, node, position) {
	  var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
	  fatherNode.insertBefore(node, refNode);
	}


	// EXTERNAL MODULE: ./src/util/console.js
	var console = __webpack_require__("dbf1");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
	__webpack_require__("13d5");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
	__webpack_require__("4fad");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
	__webpack_require__("ac1f");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
	__webpack_require__("5319");

	// CONCATENATED MODULE: ./src/util/string.js



	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}

	var regex = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(regex, function (_, c) {
	    return c.toUpperCase();
	  });
	});

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat-map.js
	__webpack_require__("5db7");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat-map.js
	__webpack_require__("73d9");

	// CONCATENATED MODULE: ./src/core/sortableEvents.js




	var manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
	var emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
	var manage = ["Move"];
	var eventHandlerNames = [manage, manageAndEmit, emit].flatMap(function (events) {
	  return events;
	}).map(function (evt) {
	  return "on".concat(evt);
	});
	var events = {
	  manage: manage,
	  manageAndEmit: manageAndEmit,
	  emit: emit
	};

	function isReadOnly(eventName) {
	  return eventHandlerNames.indexOf(eventName) !== -1;
	}


	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
	__webpack_require__("caad");

	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
	__webpack_require__("2ca0");

	// CONCATENATED MODULE: ./src/util/tags.js


	var tags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];

	function isHtmlTag(name) {
	  return tags.includes(name);
	}

	function isTransition(name) {
	  return ["transition-group", "TransitionGroup"].includes(name);
	}

	function isHtmlAttribute(value) {
	  return ["id", "class", "role", "style"].includes(value) || value.startsWith("data-") || value.startsWith("aria-") || value.startsWith("on");
	}


	// CONCATENATED MODULE: ./src/core/componentBuilderHelper.js












	function project(entries) {
	  return entries.reduce(function (res, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        key = _ref2[0],
	        value = _ref2[1];

	    res[key] = value;
	    return res;
	  }, {});
	}

	function getComponentAttributes(_ref3) {
	  var $attrs = _ref3.$attrs,
	      _ref3$componentData = _ref3.componentData,
	      componentData = _ref3$componentData === void 0 ? {} : _ref3$componentData;
	  var attributes = project(Object.entries($attrs).filter(function (_ref4) {
	    var _ref5 = _slicedToArray(_ref4, 2),
	        key = _ref5[0];
	        _ref5[1];

	    return isHtmlAttribute(key);
	  }));
	  return _objectSpread2(_objectSpread2({}, attributes), componentData);
	}

	function createSortableOption(_ref6) {
	  var $attrs = _ref6.$attrs,
	      callBackBuilder = _ref6.callBackBuilder;
	  var options = project(getValidSortableEntries($attrs));
	  Object.entries(callBackBuilder).forEach(function (_ref7) {
	    var _ref8 = _slicedToArray(_ref7, 2),
	        eventType = _ref8[0],
	        eventBuilder = _ref8[1];

	    events[eventType].forEach(function (event) {
	      options["on".concat(event)] = eventBuilder(event);
	    });
	  });
	  var draggable = "[data-draggable]".concat(options.draggable || "");
	  return _objectSpread2(_objectSpread2({}, options), {}, {
	    draggable: draggable
	  });
	}

	function getValidSortableEntries(value) {
	  return Object.entries(value).filter(function (_ref9) {
	    var _ref10 = _slicedToArray(_ref9, 2),
	        key = _ref10[0];
	        _ref10[1];

	    return !isHtmlAttribute(key);
	  }).map(function (_ref11) {
	    var _ref12 = _slicedToArray(_ref11, 2),
	        key = _ref12[0],
	        value = _ref12[1];

	    return [camelize(key), value];
	  }).filter(function (_ref13) {
	    var _ref14 = _slicedToArray(_ref13, 2),
	        key = _ref14[0];
	        _ref14[1];

	    return !isReadOnly(key);
	  });
	}


	// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
	__webpack_require__("c740");

	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}
	// CONCATENATED MODULE: ./src/core/componentStructure.js








	var getHtmlElementFromNode = function getHtmlElementFromNode(_ref) {
	  var el = _ref.el;
	  return el;
	};

	var addContext = function addContext(domElement, context) {
	  return domElement.__draggable_context = context;
	};

	var getContext = function getContext(domElement) {
	  return domElement.__draggable_context;
	};

	var componentStructure_ComponentStructure = /*#__PURE__*/function () {
	  function ComponentStructure(_ref2) {
	    var _ref2$nodes = _ref2.nodes,
	        header = _ref2$nodes.header,
	        defaultNodes = _ref2$nodes.default,
	        footer = _ref2$nodes.footer,
	        root = _ref2.root,
	        realList = _ref2.realList;

	    _classCallCheck(this, ComponentStructure);

	    this.defaultNodes = defaultNodes;
	    this.children = [].concat(_toConsumableArray(header), _toConsumableArray(defaultNodes), _toConsumableArray(footer));
	    this.externalComponent = root.externalComponent;
	    this.rootTransition = root.transition;
	    this.tag = root.tag;
	    this.realList = realList;
	  }

	  _createClass(ComponentStructure, [{
	    key: "render",
	    value: function render(h, attributes) {
	      var tag = this.tag,
	          children = this.children,
	          _isRootComponent = this._isRootComponent;
	      var option = !_isRootComponent ? children : {
	        default: function _default() {
	          return children;
	        }
	      };
	      return h(tag, attributes, option);
	    }
	  }, {
	    key: "updated",
	    value: function updated() {
	      var defaultNodes = this.defaultNodes,
	          realList = this.realList;
	      defaultNodes.forEach(function (node, index) {
	        addContext(getHtmlElementFromNode(node), {
	          element: realList[index],
	          index: index
	        });
	      });
	    }
	  }, {
	    key: "getUnderlyingVm",
	    value: function getUnderlyingVm(domElement) {
	      return getContext(domElement);
	    }
	  }, {
	    key: "getVmIndexFromDomIndex",
	    value: function getVmIndexFromDomIndex(domIndex, element) {
	      var defaultNodes = this.defaultNodes;
	      var length = defaultNodes.length;
	      var domChildren = element.children;
	      var domElement = domChildren.item(domIndex);

	      if (domElement === null) {
	        return length;
	      }

	      var context = getContext(domElement);

	      if (context) {
	        return context.index;
	      }

	      if (length === 0) {
	        return 0;
	      }

	      var firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);

	      var indexFirstDomListElement = _toConsumableArray(domChildren).findIndex(function (element) {
	        return element === firstDomListElement;
	      });

	      return domIndex < indexFirstDomListElement ? 0 : length;
	    }
	  }, {
	    key: "_isRootComponent",
	    get: function get() {
	      return this.externalComponent || this.rootTransition;
	    }
	  }]);

	  return ComponentStructure;
	}();


	// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
	var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

	// CONCATENATED MODULE: ./src/core/renderHelper.js









	function getSlot(slots, key) {
	  var slotValue = slots[key];
	  return slotValue ? slotValue() : [];
	}

	function computeNodes(_ref) {
	  var $slots = _ref.$slots,
	      realList = _ref.realList,
	      getKey = _ref.getKey;
	  var normalizedList = realList || [];

	  var _map = ["header", "footer"].map(function (name) {
	    return getSlot($slots, name);
	  }),
	      _map2 = _slicedToArray(_map, 2),
	      header = _map2[0],
	      footer = _map2[1];

	  var item = $slots.item;

	  if (!item) {
	    throw new Error("draggable element must have an item slot");
	  }

	  var defaultNodes = normalizedList.flatMap(function (element, index) {
	    return item({
	      element: element,
	      index: index
	    }).map(function (node) {
	      node.key = getKey(element);
	      node.props = _objectSpread2(_objectSpread2({}, node.props || {}), {}, {
	        "data-draggable": true
	      });
	      return node;
	    });
	  });

	  if (defaultNodes.length !== normalizedList.length) {
	    throw new Error("Item slot must have only one child");
	  }

	  return {
	    header: header,
	    footer: footer,
	    default: defaultNodes
	  };
	}

	function getRootInformation(tag) {
	  var transition = isTransition(tag);
	  var externalComponent = !isHtmlTag(tag) && !transition;
	  return {
	    transition: transition,
	    externalComponent: externalComponent,
	    tag: externalComponent ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])(tag) : transition ? external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"] : tag
	  };
	}

	function computeComponentStructure(_ref2) {
	  var $slots = _ref2.$slots,
	      tag = _ref2.tag,
	      realList = _ref2.realList,
	      getKey = _ref2.getKey;
	  var nodes = computeNodes({
	    $slots: $slots,
	    realList: realList,
	    getKey: getKey
	  });
	  var root = getRootInformation(tag);
	  return new componentStructure_ComponentStructure({
	    nodes: nodes,
	    root: root,
	    realList: realList
	  });
	}


	// CONCATENATED MODULE: ./src/vuedraggable.js


















	function _emit(evtName, evtData) {
	  var _this = this;

	  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
	    return _this.$emit(evtName.toLowerCase(), evtData);
	  });
	}

	function _manage(evtName) {
	  var _this2 = this;

	  return function (evtData, originalElement) {
	    if (_this2.realList !== null) {
	      return _this2["onDrag".concat(evtName)](evtData, originalElement);
	    }
	  };
	}

	function _manageAndEmit(evtName) {
	  var _this3 = this;

	  var delegateCallBack = _manage.call(this, evtName);

	  return function (evtData, originalElement) {
	    delegateCallBack.call(_this3, evtData, originalElement);

	    _emit.call(_this3, evtName, evtData);
	  };
	}

	var draggingElement = null;
	var props = {
	  list: {
	    type: Array,
	    required: false,
	    default: null
	  },
	  modelValue: {
	    type: Array,
	    required: false,
	    default: null
	  },
	  itemKey: {
	    type: [String, Function],
	    required: true
	  },
	  clone: {
	    type: Function,
	    default: function _default(original) {
	      return original;
	    }
	  },
	  tag: {
	    type: String,
	    default: "div"
	  },
	  move: {
	    type: Function,
	    default: null
	  },
	  componentData: {
	    type: Object,
	    required: false,
	    default: null
	  }
	};
	var emits = ["update:modelValue", "change"].concat(_toConsumableArray([].concat(_toConsumableArray(events.manageAndEmit), _toConsumableArray(events.emit)).map(function (evt) {
	  return evt.toLowerCase();
	})));
	var draggableComponent = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
	  name: "draggable",
	  inheritAttrs: false,
	  props: props,
	  emits: emits,
	  data: function data() {
	    return {
	      error: false
	    };
	  },
	  render: function render() {
	    try {
	      this.error = false;
	      var $slots = this.$slots,
	          $attrs = this.$attrs,
	          tag = this.tag,
	          componentData = this.componentData,
	          realList = this.realList,
	          getKey = this.getKey;
	      var componentStructure = computeComponentStructure({
	        $slots: $slots,
	        tag: tag,
	        realList: realList,
	        getKey: getKey
	      });
	      this.componentStructure = componentStructure;
	      var attributes = getComponentAttributes({
	        $attrs: $attrs,
	        componentData: componentData
	      });
	      return componentStructure.render(external_commonjs_vue_commonjs2_vue_root_Vue_["h"], attributes);
	    } catch (err) {
	      this.error = true;
	      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])("pre", {
	        style: {
	          color: "red"
	        }
	      }, err.stack);
	    }
	  },
	  created: function created() {
	    if (this.list !== null && this.modelValue !== null) {
	      console["a" /* console */].error("modelValue and list props are mutually exclusive! Please set one or another.");
	    }
	  },
	  mounted: function mounted() {
	    var _this4 = this;

	    if (this.error) {
	      return;
	    }

	    var $attrs = this.$attrs,
	        $el = this.$el,
	        componentStructure = this.componentStructure;
	    componentStructure.updated();
	    var sortableOptions = createSortableOption({
	      $attrs: $attrs,
	      callBackBuilder: {
	        manageAndEmit: function manageAndEmit(event) {
	          return _manageAndEmit.call(_this4, event);
	        },
	        emit: function emit(event) {
	          return _emit.bind(_this4, event);
	        },
	        manage: function manage(event) {
	          return _manage.call(_this4, event);
	        }
	      }
	    });
	    var targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
	    this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);
	    this.targetDomElement = targetDomElement;
	    targetDomElement.__draggable_component__ = this;
	  },
	  updated: function updated() {
	    this.componentStructure.updated();
	  },
	  beforeUnmount: function beforeUnmount() {
	    if (this._sortable !== undefined) this._sortable.destroy();
	  },
	  computed: {
	    realList: function realList() {
	      var list = this.list;
	      return list ? list : this.modelValue;
	    },
	    getKey: function getKey() {
	      var itemKey = this.itemKey;

	      if (typeof itemKey === "function") {
	        return itemKey;
	      }

	      return function (element) {
	        return element[itemKey];
	      };
	    }
	  },
	  watch: {
	    $attrs: {
	      handler: function handler(newOptionValue) {
	        var _sortable = this._sortable;
	        if (!_sortable) return;
	        getValidSortableEntries(newOptionValue).forEach(function (_ref) {
	          var _ref2 = _slicedToArray(_ref, 2),
	              key = _ref2[0],
	              value = _ref2[1];

	          _sortable.option(key, value);
	        });
	      },
	      deep: true
	    }
	  },
	  methods: {
	    getUnderlyingVm: function getUnderlyingVm(domElement) {
	      return this.componentStructure.getUnderlyingVm(domElement) || null;
	    },
	    getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(htmElement) {
	      //TODO check case where you need to see component children
	      return htmElement.__draggable_component__;
	    },
	    emitChanges: function emitChanges(evt) {
	      var _this5 = this;

	      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(function () {
	        return _this5.$emit("change", evt);
	      });
	    },
	    alterList: function alterList(onList) {
	      if (this.list) {
	        onList(this.list);
	        return;
	      }

	      var newList = _toConsumableArray(this.modelValue);

	      onList(newList);
	      this.$emit("update:modelValue", newList);
	    },
	    spliceList: function spliceList() {
	      var _arguments = arguments;

	      var spliceList = function spliceList(list) {
	        return list.splice.apply(list, _toConsumableArray(_arguments));
	      };

	      this.alterList(spliceList);
	    },
	    updatePosition: function updatePosition(oldIndex, newIndex) {
	      var updatePosition = function updatePosition(list) {
	        return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
	      };

	      this.alterList(updatePosition);
	    },
	    getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref3) {
	      var to = _ref3.to,
	          related = _ref3.related;
	      var component = this.getUnderlyingPotencialDraggableComponent(to);

	      if (!component) {
	        return {
	          component: component
	        };
	      }

	      var list = component.realList;
	      var context = {
	        list: list,
	        component: component
	      };

	      if (to !== related && list) {
	        var destination = component.getUnderlyingVm(related) || {};
	        return _objectSpread2(_objectSpread2({}, destination), context);
	      }

	      return context;
	    },
	    getVmIndexFromDomIndex: function getVmIndexFromDomIndex(domIndex) {
	      return this.componentStructure.getVmIndexFromDomIndex(domIndex, this.targetDomElement);
	    },
	    onDragStart: function onDragStart(evt) {
	      this.context = this.getUnderlyingVm(evt.item);
	      evt.item._underlying_vm_ = this.clone(this.context.element);
	      draggingElement = evt.item;
	    },
	    onDragAdd: function onDragAdd(evt) {
	      var element = evt.item._underlying_vm_;

	      if (element === undefined) {
	        return;
	      }

	      removeNode(evt.item);
	      var newIndex = this.getVmIndexFromDomIndex(evt.newIndex);
	      this.spliceList(newIndex, 0, element);
	      var added = {
	        element: element,
	        newIndex: newIndex
	      };
	      this.emitChanges({
	        added: added
	      });
	    },
	    onDragRemove: function onDragRemove(evt) {
	      insertNodeAt(this.$el, evt.item, evt.oldIndex);

	      if (evt.pullMode === "clone") {
	        removeNode(evt.clone);
	        return;
	      }

	      var _this$context = this.context,
	          oldIndex = _this$context.index,
	          element = _this$context.element;
	      this.spliceList(oldIndex, 1);
	      var removed = {
	        element: element,
	        oldIndex: oldIndex
	      };
	      this.emitChanges({
	        removed: removed
	      });
	    },
	    onDragUpdate: function onDragUpdate(evt) {
	      removeNode(evt.item);
	      insertNodeAt(evt.from, evt.item, evt.oldIndex);
	      var oldIndex = this.context.index;
	      var newIndex = this.getVmIndexFromDomIndex(evt.newIndex);
	      this.updatePosition(oldIndex, newIndex);
	      var moved = {
	        element: this.context.element,
	        oldIndex: oldIndex,
	        newIndex: newIndex
	      };
	      this.emitChanges({
	        moved: moved
	      });
	    },
	    computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
	      if (!relatedContext.element) {
	        return 0;
	      }

	      var domChildren = _toConsumableArray(evt.to.children).filter(function (el) {
	        return el.style["display"] !== "none";
	      });

	      var currentDomIndex = domChildren.indexOf(evt.related);
	      var currentIndex = relatedContext.component.getVmIndexFromDomIndex(currentDomIndex);
	      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
	      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
	    },
	    onDragMove: function onDragMove(evt, originalEvent) {
	      var move = this.move,
	          realList = this.realList;

	      if (!move || !realList) {
	        return true;
	      }

	      var relatedContext = this.getRelatedContextFromMoveEvent(evt);
	      var futureIndex = this.computeFutureIndex(relatedContext, evt);

	      var draggedContext = _objectSpread2(_objectSpread2({}, this.context), {}, {
	        futureIndex: futureIndex
	      });

	      var sendEvent = _objectSpread2(_objectSpread2({}, evt), {}, {
	        relatedContext: relatedContext,
	        draggedContext: draggedContext
	      });

	      return move(sendEvent, originalEvent);
	    },
	    onDragEnd: function onDragEnd() {
	      draggingElement = null;
	    }
	  }
	});
	/* harmony default export */ var vuedraggable = (draggableComponent);
	// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


	/* harmony default export */ __webpack_exports__["default"] = (vuedraggable);



	/***/ }),

	/***/ "fb6a":
	/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("23e7");
	var isObject = __webpack_require__("861d");
	var isArray = __webpack_require__("e8b5");
	var toAbsoluteIndex = __webpack_require__("23cb");
	var toLength = __webpack_require__("50c4");
	var toIndexedObject = __webpack_require__("fc6a");
	var createProperty = __webpack_require__("8418");
	var wellKnownSymbol = __webpack_require__("b622");
	var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
	var arrayMethodUsesToLength = __webpack_require__("ae40");

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});


	/***/ }),

	/***/ "fc6a":
	/***/ (function(module, exports, __webpack_require__) {

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = __webpack_require__("44ad");
	var requireObjectCoercible = __webpack_require__("1d80");

	module.exports = function (it) {
	  return IndexedObject(requireObjectCoercible(it));
	};


	/***/ }),

	/***/ "fdbc":
	/***/ (function(module, exports) {

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	module.exports = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};


	/***/ }),

	/***/ "fdbf":
	/***/ (function(module, exports, __webpack_require__) {

	var NATIVE_SYMBOL = __webpack_require__("4930");

	module.exports = NATIVE_SYMBOL
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';


	/***/ })

	/******/ })["default"];
	});
	
} (vuedraggable_umd));

var vuedraggable_umdExports = vuedraggable_umd.exports;
var Draggable = /*@__PURE__*/getDefaultExportFromCjs(vuedraggable_umdExports);

function getNodeName(node) {
  return Object.keys(node)[0];
}
function getField(node) {
  const name = getNodeName(node);
  if (name.startsWith("_"))
    return "";
  if (name.match(/^\w+\(.+\)$/))
    return name;
  const subFields = getField(node[name]);
  return subFields !== "" ? `${name}.${subFields}` : name;
}
function getComparator(node) {
  return getNodeName(get$1(node, getField(node)));
}
function fieldToFilter(field, operator, value) {
  return fieldToFilterR(field.split("."));
  function fieldToFilterR(sections) {
    const section = sections.shift();
    if (section !== void 0) {
      return {
        [section]: fieldToFilterR(sections)
      };
    } else {
      return {
        [operator]: value
      };
    }
  }
}

const _cache = {};
function IntlInfo(lang = "en", includeCurrencies = true) {
  if (_cache[lang]) {
    return _cache[lang];
  }
  const countryNames = new Intl.DisplayNames([lang], { type: "region", fallback: "none" });
  const languageNames = new Intl.DisplayNames([lang], { type: "language", fallback: "none" });
  const currencyNames = new Intl.DisplayNames([lang], { type: "currency", fallback: "none" });
  const countries = {};
  const languages = {};
  const currencies = {};
  let i, j, k, codeU, codeL, codeC, country, language, currency;
  if (!_cache.$) {
    _cache.$ = {
      U: [],
      L: [],
      C: []
    };
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (i = 0; i < 26; ++i) {
      for (j = 0; j < 26; ++j) {
        if (alpha[i] && alpha[j]) {
          codeU = alpha[i] + alpha[j];
          country = countryNames.of(codeU);
          if (country) {
            _cache.$.U.push(codeU);
            countries[codeU] = country;
          }
          codeL = codeU.toLowerCase();
          language = languageNames.of(codeL);
          if (language) {
            _cache.$.L.push(codeL);
            languages[codeL] = language;
          }
          if (includeCurrencies) {
            for (k = 0; k < 26; ++k) {
              codeC = codeU + alpha[k];
              currency = currencyNames.of(codeC);
              if (currency) {
                _cache.$.C.push(codeC);
                currencies[codeC] = currency;
              }
            }
          }
        }
      }
    }
  } else {
    for (i = 0; i < _cache.$.U.length; ++i) {
      codeU = _cache.$.U[i];
      countries[codeU] = countryNames.of(codeU);
    }
    for (j = 0; j < _cache.$.L.length; ++j) {
      codeL = _cache.$.L[j];
      languages[codeL] = languageNames.of(codeL);
    }
    for (k = 0; k < _cache.$.C.length; ++k) {
      codeC = _cache.$.C[k];
      currencies[codeC] = currencyNames.of(codeC);
    }
  }
  return _cache[lang] = {
    countries,
    languages,
    currencies
  };
}
IntlInfo._cache = _cache;

function parseFilter(obj, currentItem) {
  return deepParse(obj, currentItem);
}
function deepParse(obj, currentItem) {
  if (Array.isArray(obj)) {
    return obj.map((val) => {
      return isObjectLike(val) ? deepParse(val, currentItem) : parseValue(val, currentItem);
    });
  } else if (isObjectLike(obj)) {
    const res = {};
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
function parseValue(value, currentItem) {
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  if (value === "null" || value === "NULL")
    return null;
  if (typeof value === "string" && value.startsWith("$CURRENT_ITEM.")) {
    return get(currentItem, value.replace("$CURRENT_ITEM.", ""), null);
  }
  return value;
}
function isObjectLike(value) {
  return value && typeof value === "object";
}
function get(obj, path, defaultValue) {
  const [key, ...follow] = path.split(".");
  const result = Array.isArray(obj) ? obj.map((entry) => entry[key]) : obj == null ? void 0 : obj[key];
  if (follow.length > 0) {
    return get(result, follow.join("."), defaultValue);
  }
  return result != null ? result : defaultValue;
}

const _hoisted_1$4 = ["onClick"];
const _hoisted_2$3 = { class: "preview" };
const _hoisted_3$2 = {
  class: "preview",
  style: { "width": "120px" }
};
var _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "select-dropdown-m2o",
  props: {
    value: {
      type: [Number, String, Object],
      default: null
    },
    collection: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    template: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["input"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const api = useApi();
    const { useCollectionsStore } = useStores();
    const { t } = useI18n();
    const { collection } = toRefs(props);
    const collectionsStore = useCollectionsStore();
    const values = inject("values", ref({}));
    const { relatedCollection, relatedPrimaryKeyField } = useRelation();
    const { info: collectionInfo } = useCollection(collection);
    const { displayTemplate, requiredFields } = usePreview();
    const { loading: itemsLoading, fetchItems, items } = useItems();
    const { setCurrent, currentItem, loading: loadingCurrent } = useCurrent();
    const menuActive = ref(false);
    const search = ref(null);
    const internalSearch = ref(null);
    const listItems = computed(() => {
      var _a, _b;
      let result = items.value;
      if (!result)
        return [];
      const sortedField = ((_a = requiredFields.value) == null ? void 0 : _a[0]) || ((_b = relatedPrimaryKeyField.value) == null ? void 0 : _b.field) || "id";
      result.sort((a, b) => a[sortedField].localeCompare(b[sortedField]));
      if (internalSearch.value) {
        const iSearch = internalSearch.value.toLowerCase();
        const fields = requiredFields.value || [];
        result = result.filter((item) => {
          for (const field of fields) {
            if (item[field].toString().toLowerCase().includes(iSearch)) {
              return true;
            }
          }
          return false;
        });
      }
      return result;
    });
    watch(
      search,
      debounce((val) => {
        internalSearch.value = val;
      }, 250)
    );
    function useCurrent() {
      const currentItem2 = ref(null);
      const loading = ref(false);
      watch(
        () => props.value,
        (newValue) => {
          var _a;
          if (newValue !== null && newValue !== ((_a = currentItem2.value) == null ? void 0 : _a[relatedPrimaryKeyField.value.field]) && (typeof newValue === "string" || typeof newValue === "number")) {
            fetchCurrent(newValue);
          } else if (newValue === null) {
            currentItem2.value = null;
          } else if (!currentItem2.value && typeof newValue === "object" && newValue[relatedPrimaryKeyField.value.field]) {
            fetchCurrent(newValue[relatedPrimaryKeyField.value.field]);
          }
        },
        { immediate: true }
      );
      const currentPrimaryKey = computed(() => {
        var _a, _b, _c;
        if (!currentItem2.value)
          return "+";
        if (!props.value)
          return "+";
        if (!relatedPrimaryKeyField.value)
          return "+";
        if (typeof props.value === "number" || typeof props.value === "string") {
          return props.value;
        }
        if (typeof props.value === "object" && relatedPrimaryKeyField.value.field in ((_a = props.value) != null ? _a : {})) {
          return (_c = (_b = props.value) == null ? void 0 : _b[relatedPrimaryKeyField.value.field]) != null ? _c : "+";
        }
        return "+";
      });
      return { setCurrent: setCurrent2, currentItem: currentItem2, loading, currentPrimaryKey };
      function setCurrent2(item) {
        if (!relatedPrimaryKeyField.value)
          return;
        currentItem2.value = item;
        emit("input", item[relatedPrimaryKeyField.value.field]);
      }
      async function fetchCurrent(key) {
        if (!relatedPrimaryKeyField.value || !relatedCollection.value)
          return;
        loading.value = true;
        const fields = requiredFields.value || [];
        if (fields.includes(relatedPrimaryKeyField.value.field) === false) {
          fields.push(relatedPrimaryKeyField.value.field);
        }
        try {
          const endpoint = relatedCollection.value.collection.startsWith("directus_") ? `/${relatedCollection.value.collection.substring(9)}/${key}` : `/items/${relatedCollection.value.collection}/${encodeURIComponent(key)}`;
          const response = await api.get(endpoint, {
            params: {
              fields
            }
          });
          currentItem2.value = response.data.data;
        } catch (err) {
          console.error(err);
        } finally {
          loading.value = false;
        }
      }
    }
    function useItems() {
      const items2 = ref(null);
      const loading = ref(false);
      watch(relatedCollection, () => {
        items2.value = null;
      });
      return { fetchItems: fetchItems2, items: items2, loading };
      async function fetchItems2() {
        if (items2.value !== null)
          return;
        if (!relatedCollection.value || !relatedPrimaryKeyField.value)
          return;
        loading.value = true;
        const fields = requiredFields.value || [];
        if (fields.includes(relatedPrimaryKeyField.value.field) === false) {
          fields.push(relatedPrimaryKeyField.value.field);
        }
        try {
          const endpoint = relatedCollection.value.collection.startsWith("directus_") ? `/${relatedCollection.value.collection.substring(9)}` : `/items/${relatedCollection.value.collection}`;
          const response = await api.get(endpoint, {
            params: {
              fields,
              filter: parseFilter(props.filter, values ? values.value : {}),
              limit: -1
            }
          });
          items2.value = response.data.data;
        } catch (err) {
          console.error(err);
        } finally {
          loading.value = false;
        }
      }
    }
    function useRelation() {
      const relatedCollection2 = computed(() => {
        if (!props.collection)
          return null;
        return collectionsStore.getCollection(props.collection);
      });
      const relatedCollectionName = computed(() => {
        var _a, _b;
        return (_b = (_a = relatedCollection2.value) == null ? void 0 : _a.collection) != null ? _b : null;
      });
      const { primaryKeyField: relatedPrimaryKeyField2 } = useCollection(relatedCollectionName);
      return { relatedCollection: relatedCollection2, relatedPrimaryKeyField: relatedPrimaryKeyField2 };
    }
    function usePreview() {
      const displayTemplate2 = computed(() => {
        var _a, _b, _c;
        if (props.template !== null)
          return props.template;
        return ((_b = (_a = collectionInfo.value) == null ? void 0 : _a.meta) == null ? void 0 : _b.display_template) || `{{ ${((_c = relatedPrimaryKeyField == null ? void 0 : relatedPrimaryKeyField.value) == null ? void 0 : _c.field) || ""} }}`;
      });
      const requiredFields2 = computed(() => {
        if (!displayTemplate2.value || !relatedCollection.value)
          return null;
        return getFieldsFromTemplate(displayTemplate2.value);
      });
      return { displayTemplate: displayTemplate2, requiredFields: requiredFields2 };
    }
    async function onPreviewClick() {
      if (props.disabled)
        return;
      const newActive = !menuActive.value;
      menuActive.value = newActive;
      if (newActive === true)
        return fetchItems();
    }
    return (_ctx, _cache) => {
      const _component_v_notice = resolveComponent("v-notice");
      const _component_v_skeleton_loader = resolveComponent("v-skeleton-loader");
      const _component_render_template = resolveComponent("render-template");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_input = resolveComponent("v-input");
      const _component_v_list_item_content = resolveComponent("v-list-item-content");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_menu = resolveComponent("v-menu");
      const _directive_tooltip = resolveDirective("tooltip");
      return !unref(displayTemplate) ? (openBlock(), createBlock(_component_v_notice, {
        key: 0,
        type: "warning"
      }, {
        default: withCtx(() => [
          createTextVNode(
            toDisplayString(unref(t)("display_template_not_setup")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      })) : (openBlock(), createBlock(_component_v_menu, {
        key: 1,
        class: "filter-select-m2o",
        modelValue: menuActive.value,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => menuActive.value = $event),
        attached: "",
        disabled: __props.disabled
      }, {
        activator: withCtx(({ activate, active }) => [
          unref(loadingCurrent) ? (openBlock(), createBlock(_component_v_skeleton_loader, {
            key: 0,
            type: "input"
          })) : createCommentVNode("v-if", true),
          createElementVNode("div", {
            class: "input",
            onClick: () => onPreviewClick().then(activate)
          }, [
            unref(currentItem) ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                createElementVNode("div", _hoisted_2$3, [
                  createVNode(_component_render_template, {
                    collection: unref(relatedCollection).collection,
                    item: unref(currentItem),
                    template: unref(displayTemplate)
                  }, null, 8, ["collection", "item", "template"])
                ]),
                withDirectives(createVNode(
                  _component_v_icon,
                  {
                    name: "close",
                    small: "",
                    class: "deselect",
                    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("input", null), ["stop"]))
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [_directive_tooltip, unref(t)("deselect")]
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createElementVNode(
                  "p",
                  _hoisted_3$2,
                  toDisplayString(unref(t)("select_an_item")),
                  1
                  /* TEXT */
                ),
                createVNode(_component_v_icon, {
                  class: normalizeClass(["expand", { active }]),
                  name: "expand_more"
                }, null, 8, ["class"])
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 8, _hoisted_1$4)
        ]),
        default: withCtx(() => [
          createVNode(_component_v_list, { class: "auto-width-menu" }, {
            default: withCtx(() => [
              listItems.value.length > 10 || search.value ? (openBlock(), createBlock(_component_v_list_item, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(_component_v_list_item_content, null, {
                    default: withCtx(() => [
                      createVNode(_component_v_input, {
                        modelValue: search.value,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value = $event),
                        autofocus: "",
                        small: "",
                        placeholder: unref(t)("search"),
                        onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                        }, ["stop", "prevent"]))
                      }, {
                        append: withCtx(() => [
                          createVNode(_component_v_icon, {
                            small: "",
                            name: "search"
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })) : createCommentVNode("v-if", true),
              unref(itemsLoading) ? (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                renderList(10, (n) => {
                  return createVNode(_component_v_list_item, {
                    key: `loader-${n}`
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_list_item_content, null, {
                        default: withCtx(() => [
                          createVNode(_component_v_skeleton_loader, { type: "text" })
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  });
                }),
                64
                /* STABLE_FRAGMENT */
              )) : unref(relatedPrimaryKeyField) ? (openBlock(true), createElementBlock(
                Fragment,
                { key: 2 },
                renderList(listItems.value, (item) => {
                  return openBlock(), createBlock(_component_v_list_item, {
                    key: item[unref(relatedPrimaryKeyField).field],
                    active: __props.value === item[unref(relatedPrimaryKeyField).field],
                    clickable: "",
                    onClick: withModifiers(($event) => unref(setCurrent)(item), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode(
                        _component_v_list_item_content,
                        null,
                        {
                          default: withCtx(() => [
                            createVNode(_component_render_template, {
                              collection: unref(relatedCollection).collection,
                              template: unref(displayTemplate),
                              item
                            }, null, 8, ["collection", "template", "item"])
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["active", "onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "disabled"]));
    };
  }
});

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$6 = ".filter-select-m2o[data-v-9cfdfaba] {\n  position: relative;\n}\n.filter-select-m2o [data-v-9cfdfaba] .v-input .append {\n  display: flex;\n}\n.filter-select-m2o .input[data-v-9cfdfaba] {\n  display: flex;\n  align-items: center;\n}\n\n.v-skeleton-loader[data-v-9cfdfaba] {\n  top: 0;\n  left: 0;\n}\n\n.preview[data-v-9cfdfaba] {\n  display: block;\n  flex-grow: 1;\n  overflow: hidden;\n}\n\n.expand[data-v-9cfdfaba] {\n  transition: transform var(--fast) var(--transition);\n}\n.expand.active[data-v-9cfdfaba] {\n  transform: scaleY(-1);\n}\n\n.edit[data-v-9cfdfaba] {\n  margin-right: 4px;\n}\n.edit[data-v-9cfdfaba]:hover {\n  --v-icon-color: var(--foreground-normal);\n}\n\n.add[data-v-9cfdfaba]:hover {\n  --v-icon-color: var(--primary);\n}\n\n.deselect[data-v-9cfdfaba]:hover {\n  --v-icon-color: var(--danger);\n}";
n(css$6,{});

var css$5 = "\n.v-menu-content:has(> .auto-width-menu) {\n\twidth: min-content;\n}\n";
n(css$5,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

var SelectDropdownM2o = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-9cfdfaba"], ["__file", "select-dropdown-m2o.vue"]]);

var css$4 = ".preview[data-v-ac92902e] {\n  display: flex;\n  justify-content: center;\n  color: var(--primary);\n  font-family: var(--family-monospace);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  cursor: pointer;\n}\n.preview:empty[data-v-ac92902e]::after {\n  color: var(--filter-subdued);\n  content: \"--\";\n}\n\n.input[data-v-ac92902e] {\n  padding: 8px 4px;\n}\n.input.date[data-v-ac92902e], .input.timestamp[data-v-ac92902e], .input.time[data-v-ac92902e], .input.dateTime[data-v-ac92902e] {\n  min-width: 250px;\n}\n.input.geometry[data-v-ac92902e], .input.json[data-v-ac92902e] {\n  width: 500px;\n}\n\ninput[data-v-ac92902e] {\n  color: var(--primary);\n  font-family: var(--family-monospace);\n  line-height: 1em;\n  background-color: var(--background-page);\n  border: none;\n}\ninput[data-v-ac92902e]::placeholder {\n  color: var(--filter-subdued);\n  font-weight: 500;\n  font-family: var(--family-monospace);\n}\n\n.dialog[data-v-ac92902e] {\n  position: relative;\n  min-width: 800px;\n}\n\n.date-input[data-v-ac92902e] {\n  min-width: 380px;\n  max-width: 95vw;\n}";
n(css$4,{});

const _sfc_main$3 = defineComponent({
	components: { SelectDropdownM2o },
	props: {
		is: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		value: {
			type: [String, Number, Object, Boolean, Array],
			default: null,
		},
		focus: {
			type: Boolean,
			default: true,
		},
		inputProps: Object,
	},
	emits: ['input'],
	setup(props, { emit }) {
		const inputEl = ref();
		const { t } = useI18n();

		const displayValue = computed(() => {
			if (props.value === null) return null;
			if (props.value === undefined) return null;

			if (typeof props.value === 'string' && props.value.length > 25) {
				return props.value.substring(0, 22) + '...';
			}

			return props.value;
		});

		const width = computed(() => {
			return (props.value?.toString().length || 2) + 1 + 'ch';
		});

		const inputPattern = computed(() => {
			switch (props.type) {
				case 'integer':
				case 'bigInteger':
					return '[+-]?[0-9]+';
				case 'decimal':
				case 'float':
					return '[+-]?[0-9]+\\.?[0-9]*';
				case 'uuid':
					return '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}';
				default:
					return '';
			}
		});

		onMounted(() => {
			if (props.focus) inputEl.value?.focus();
		});

		const dateTimeMenu = ref();

		return { dateTimeMenu, displayValue, width, t, emitValue, inputEl, inputPattern };

		function emitValue(val) {
			if (val === '') {
				return emit('input', null);
			}

			if (
				typeof val === 'string' &&
				['$NOW', '$CURRENT_USER', '$CURRENT_ROLE'].some(prefix => val.startsWith(prefix))
			) {
				return emit('input', val);
			}

			if (typeof val !== 'string' || new RegExp(inputPattern.value).test(val)) {
				return emit('input', val);
			}
		}
	},
});

const _hoisted_1$3 = ["pattern", "value"];
const _hoisted_2$2 = ["pattern", "value"];
const _hoisted_3$1 = { class: "date-input" };
const _hoisted_4$1 = ["onClick"];

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_select = resolveComponent("v-select");
  const _component_select_dropdown_m2o = resolveComponent("select-dropdown-m2o");
  const _component_v_date_picker = resolveComponent("v-date-picker");
  const _component_v_menu = resolveComponent("v-menu");

  return (_ctx.type === 'boolean')
    ? (openBlock(), createBlock(_component_v_icon, {
        key: 0,
        name: _ctx.value === null ? 'indeterminate_check_box' : _ctx.value ? 'check_box' : 'check_box_outline_blank',
        clickable: "",
        class: "preview",
        small: "",
        onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('input', !_ctx.value)))
      }, null, 8 /* PROPS */, ["name"]))
    : (_ctx.is === 'interface-input')
      ? (openBlock(), createElementBlock("input", {
          key: 1,
          ref: "inputEl",
          type: "text",
          pattern: _ctx.inputPattern,
          value: _ctx.value,
          style: normalizeStyle({ width: _ctx.width }),
          placeholder: "--",
          onInput: _cache[1] || (_cache[1] = $event => (_ctx.emitValue($event.target.value)))
        }, null, 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_1$3))
      : (_ctx.is === 'select')
        ? (openBlock(), createBlock(_component_v_select, mergeProps({
            key: 2,
            inline: ""
          }, _ctx.inputProps, {
            "model-value": _ctx.value,
            placeholder: _ctx.t('select'),
            allowOther: "",
            showDeselect: "",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.emitValue($event)))
          }), null, 16 /* FULL_PROPS */, ["model-value", "placeholder"]))
        : (_ctx.is === 'interface-select-dropdown-m2o')
          ? (openBlock(), createBlock(_component_select_dropdown_m2o, mergeProps({ key: 3 }, _ctx.inputProps, {
              value: _ctx.value,
              onInput: _cache[3] || (_cache[3] = $event => (_ctx.emitValue($event)))
            }), null, 16 /* FULL_PROPS */, ["value"]))
          : (_ctx.is === 'interface-datetime')
            ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                createElementVNode("input", {
                  ref: "inputEl",
                  type: "text",
                  pattern: _ctx.inputPattern,
                  value: _ctx.value,
                  style: normalizeStyle({ width: _ctx.width }),
                  placeholder: "--",
                  onInput: _cache[4] || (_cache[4] = $event => (_ctx.emitValue($event.target.value)))
                }, null, 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_2$2),
                createVNode(_component_v_menu, {
                  ref: "dateTimeMenu",
                  "close-on-content-click": false,
                  "show-arrow": true,
                  placement: "bottom-start",
                  seamless: "",
                  "full-height": ""
                }, {
                  activator: withCtx(({ toggle }) => [
                    createVNode(_component_v_icon, {
                      class: "preview",
                      name: "event",
                      small: "",
                      onClick: toggle
                    }, null, 8 /* PROPS */, ["onClick"])
                  ]),
                  default: withCtx(() => [
                    createElementVNode("div", _hoisted_3$1, [
                      createVNode(_component_v_date_picker, {
                        type: _ctx.type,
                        "model-value": _ctx.value,
                        "onUpdate:modelValue": _ctx.emitValue,
                        onClose: _ctx.dateTimeMenu?.deactivate
                      }, null, 8 /* PROPS */, ["type", "model-value", "onUpdate:modelValue", "onClose"])
                    ])
                  ]),
                  _: 1 /* STABLE */
                }, 512 /* NEED_PATCH */)
              ], 64 /* STABLE_FRAGMENT */))
            : (openBlock(), createBlock(_component_v_menu, {
                key: 5,
                "close-on-content-click": false,
                "show-arrow": true,
                placement: "bottom-start"
              }, {
                activator: withCtx(({ toggle }) => [
                  (_ctx.type.startsWith('geometry') || _ctx.type === 'json')
                    ? (openBlock(), createBlock(_component_v_icon, {
                        key: 0,
                        class: "preview",
                        name: _ctx.type === 'json' ? 'integration_instructions' : 'map',
                        onClick: toggle
                      }, null, 8 /* PROPS */, ["name", "onClick"]))
                    : (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: "preview",
                        onClick: toggle
                      }, toDisplayString(_ctx.displayValue) + " - " + toDisplayString(_ctx.is), 9 /* TEXT, PROPS */, _hoisted_4$1))
                ]),
                default: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(["input", _ctx.type])
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.is), mergeProps(_ctx.inputProps, {
                      class: "input-component",
                      small: "",
                      type: _ctx.type,
                      value: _ctx.value,
                      onInput: _cache[5] || (_cache[5] = $event => (_ctx.emitValue($event)))
                    }), null, 16 /* FULL_PROPS */, ["type", "value"]))
                  ], 2 /* CLASS */)
                ]),
                _: 1 /* STABLE */
              }))
}
var InputComponent = /*#__PURE__*/_export_sfc(_sfc_main$3, [['render',_sfc_render],['__scopeId',"data-v-ac92902e"],['__file',"input-component.vue"]]);

const _hoisted_1$2 = { class: "and" };
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "input-group",
  props: {
    field: {
      type: Object,
      required: true
    },
    tree: Object
  },
  emits: ["update:field"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    const emit = __emit;
    const fieldInfo = computed(() => {
      const fieldPath = getField(props.field);
      const functionMatch = fieldPath.match(/^(\w+)\((.+)\)$/);
      if (functionMatch) {
        const [, funcName] = functionMatch;
        if (funcName === "count") {
          return {
            name: fieldPath,
            type: "integer"
          };
        }
      }
      return get$1(props.tree, fieldPath);
    });
    const continents = {
      AF: "Africa",
      AN: "Antarctica",
      AS: "Asia",
      EU: "Europe",
      NA: "North America",
      OC: "Oceania",
      SA: "South America"
    };
    const inputTypes = {
      bigInteger: "input",
      binary: "input",
      boolean: "boolean",
      date: "datetime",
      dateTime: "datetime",
      decimal: "input",
      float: "input",
      integer: "input",
      json: "input-code",
      string: "input",
      text: "input-multiline",
      time: "datetime",
      timestamp: "datetime",
      uuid: "input",
      csv: "input",
      hash: "input-hash",
      geometry: "map"
    };
    const { countries, languages } = IntlInfo(navigator.language, false);
    const fieldInterface = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      const dynamic = {
        is: "interface-input",
        type: (_b = (_a = fieldInfo.value) == null ? void 0 : _a.type) != null ? _b : "unknown",
        inputProps: { ...fieldInfo.value }
      };
      delete dynamic.inputProps.type;
      if ((_c = fieldInfo.value) == null ? void 0 : _c.choices) {
        delete dynamic.inputProps.choices;
        dynamic.is = "select";
        let items = (_d = fieldInfo.value) == null ? void 0 : _d.choices;
        if (typeof items === "string") {
          switch (items) {
            case "$COUNTRIES":
              items = Object.entries(countries).map(([k, v]) => ({
                text: v,
                value: k
              }));
              break;
            case "$CONTINENTS":
              items = Object.entries(continents).map(([k, v]) => ({
                text: v,
                value: k
              }));
              break;
            case "$LANGUAGES":
              items = Object.entries(languages).map(([k, v]) => ({
                text: v,
                value: k
              }));
              break;
          }
        }
        dynamic.inputProps.items = items;
      } else if ((_e = fieldInfo.value) == null ? void 0 : _e.interface) {
        delete dynamic.inputProps.interface;
        dynamic.is = "interface-" + ((_f = fieldInfo.value) == null ? void 0 : _f.interface);
      } else {
        dynamic.is = "interface-" + inputTypes[((_g = fieldInfo.value) == null ? void 0 : _g.type) || "string"];
      }
      return dynamic;
    });
    const value = computed({
      get() {
        const fieldPath = getField(props.field);
        const comparator = getComparator(props.field);
        const value2 = get$1(props.field, `${fieldPath}.${comparator}`);
        if (["_in", "_nin"].includes(getComparator(props.field))) {
          return [...value2.filter((val) => val !== null && val !== ""), null];
        } else {
          return value2;
        }
      },
      set(newVal) {
        const fieldPath = getField(props.field);
        const comparator = getComparator(props.field);
        let value2;
        if (["_in", "_nin"].includes(comparator)) {
          value2 = newVal.filter((val) => val !== null && val !== "");
        } else {
          value2 = newVal;
        }
        emit("update:field", fieldToFilter(fieldPath, comparator, value2));
      }
    });
    function setValueAt(index, newVal) {
      let newArray = Array.isArray(value.value) ? clone(value.value) : new Array(index + 1);
      newArray[index] = newVal;
      value.value = newArray;
    }
    return (_ctx, _cache) => {
      return ["_contains", "_ncontains", "_starts_with", "_nstarts_with", "_ends_with", "_nends_with"].includes(
        unref(getComparator)(__props.field)
      ) ? (openBlock(), createBlock(InputComponent, {
        key: 0,
        is: "interface-input",
        value: value.value,
        onInput: _cache[0] || (_cache[0] = ($event) => value.value = $event)
      }, null, 8, ["value"])) : ["_eq", "_neq", "_lt", "_gt", "_lte", "_gte"].includes(unref(getComparator)(__props.field)) ? (openBlock(), createBlock(InputComponent, mergeProps({ key: 1 }, fieldInterface.value, {
        value: value.value,
        onInput: _cache[1] || (_cache[1] = ($event) => value.value = $event)
      }), null, 16, ["value"])) : ["_in", "_nin"].includes(unref(getComparator)(__props.field)) ? (openBlock(), createElementBlock(
        "div",
        {
          key: 2,
          class: normalizeClass(["list", { moveComma: fieldInterface.value.is === "interface-input" }])
        },
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(value.value, (val, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "value"
              }, [
                createVNode(InputComponent, mergeProps({ ref_for: true }, fieldInterface.value, {
                  value: val,
                  focus: false,
                  onInput: ($event) => setValueAt(index, $event)
                }), null, 16, ["value", "onInput"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : ["_between", "_nbetween"].includes(unref(getComparator)(__props.field)) ? (openBlock(), createElementBlock(
        Fragment,
        { key: 3 },
        [
          createVNode(InputComponent, mergeProps(fieldInterface.value, {
            value: value.value[0],
            onInput: _cache[2] || (_cache[2] = ($event) => setValueAt(0, $event))
          }), null, 16, ["value"]),
          createElementVNode(
            "div",
            _hoisted_1$2,
            toDisplayString(unref(t)("interfaces.filter.and")),
            1
            /* TEXT */
          ),
          createVNode(InputComponent, mergeProps(fieldInterface.value, {
            value: value.value[1],
            onInput: _cache[3] || (_cache[3] = ($event) => setValueAt(1, $event))
          }), null, 16, ["value"])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : createCommentVNode("v-if", true);
    };
  }
});

var css$3 = ".value[data-v-0111bf95] {\n  display: flex;\n  align-items: center;\n}\n.value .v-icon[data-v-0111bf95] {\n  margin-right: 8px;\n  margin-left: 12px;\n  color: var(--filter-subdued);\n  cursor: pointer;\n}\n.value .v-icon[data-v-0111bf95]:hover {\n  color: var(--danger);\n}\n\n.list[data-v-0111bf95] {\n  display: flex;\n}\n.list .value[data-v-0111bf95]:not(:last-child)::after {\n  margin-right: 6px;\n  content: \",\";\n}\n.list.moveComma .value[data-v-0111bf95]:not(:last-child)::after {\n  margin: 0 8px 0 -6px;\n}\n\n.and[data-v-0111bf95] {\n  margin: 0px 8px;\n}";
n(css$3,{});

var InputGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0111bf95"], ["__file", "input-group.vue"]]);

const _hoisted_1$1 = {
  key: 0,
  block: "",
  class: "node field"
};
const _hoisted_2$1 = { class: "delete" };
const _hoisted_3 = {
  key: 1,
  class: "node logic"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "text" };
const _hoisted_6 = { class: "delete" };
const _hoisted_7 = {
  key: 0,
  class: "add-sub-filter"
};
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "nodes",
  props: {
    filter: {
      type: Object,
      required: true
    },
    tree: Object,
    branches: Array,
    depth: {
      type: Number,
      default: 1
    },
    inline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["remove-node", "update:filter", "change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const filterSync = computed({
      get() {
        return props.filter;
      },
      set(newVal) {
        emit(`update:filter`, newVal);
      }
    });
    const filterInfo = computed({
      get() {
        return props.filter.map((node, id) => {
          const name = getNodeName(node);
          const isField = name.startsWith("_") === false;
          if (isField) {
            const fieldValue = node[name];
            if (fieldValue && typeof fieldValue === "object" && "_none" in fieldValue) {
              return {
                id,
                name,
                isField: false,
                isNone: true,
                relationshipField: name,
                node
              };
            }
          }
          return isField ? {
            id,
            isField,
            name,
            field: getField(node),
            comparator: getComparator(node),
            node
          } : { id, name, isField, node };
        });
      },
      set(newVal) {
        emit(
          "update:filter",
          newVal.map((val) => val.node)
        );
      }
    });
    function getFieldPreview(node) {
      const fieldKey = getField(node);
      const functionMatch = fieldKey.match(/^(\w+)\((.+)\)$/);
      if (functionMatch && functionMatch[1] && functionMatch[2]) {
        const funcName = functionMatch[1];
        const fieldPath = functionMatch[2];
        console.log(fieldPath);
        return `${funcName.charAt(0).toUpperCase() + funcName.slice(1)} (${prettyPath(fieldPath)})`;
      }
      return prettyPath(fieldKey);
    }
    function prettyPath(path) {
      const fieldParts = path.split(".");
      const fieldNames = fieldParts.map((fieldKey, index) => {
        var _a;
        const pathPrefix = fieldParts.slice(0, index);
        const field = get$1(props.tree, [...pathPrefix, fieldKey].join("."));
        return (_a = (field == null ? void 0 : field.__displayName) || (field == null ? void 0 : field.name)) != null ? _a : fieldKey;
      });
      return fieldNames.join(" -> ");
    }
    function getIndex(item) {
      return props.filter.findIndex((filter) => filter === item);
    }
    function getLogicLabel(nodeInfo) {
      if (nodeInfo.isNone) {
        return `None`;
      } else if (nodeInfo.name === "_and") {
        return t("interfaces.filter.all");
      } else if (nodeInfo.name === "_or") {
        return t("interfaces.filter.any");
      }
      return nodeInfo.name;
    }
    function relationshipDisplayName(nodeInfo) {
      const relationshipTree = get$1(props.tree, nodeInfo.relationshipField);
      return (relationshipTree == null ? void 0 : relationshipTree.__displayName) || (relationshipTree == null ? void 0 : relationshipTree.name) || nodeInfo.relationshipField;
    }
    function stripRelationshipPrefix(filters, relationshipField) {
      return filters.map((filter) => {
        const name = getNodeName(filter);
        if (["_and", "_or", "_none"].includes(name)) {
          return {
            [name]: stripRelationshipPrefix(filter[name], relationshipField)
          };
        }
        if (name.startsWith(relationshipField + ".")) {
          const strippedField = name.substring(relationshipField.length + 1);
          return {
            [strippedField]: filter[name]
          };
        }
        return filter;
      });
    }
    function addRelationshipPrefix(filters, relationshipField) {
      return filters.map((filter) => {
        const name = getNodeName(filter);
        if (["_and", "_or", "_none"].includes(name)) {
          return {
            [name]: addRelationshipPrefix(filter[name], relationshipField)
          };
        }
        if (!name.startsWith(relationshipField + ".")) {
          return {
            [relationshipField + "." + name]: filter[name]
          };
        }
        return filter;
      });
    }
    function getNoneGroupFilters(element, nodeInfo) {
      if (nodeInfo.isNone) {
        const rawFilters = element[nodeInfo.name]._none || [];
        return stripRelationshipPrefix(Array.isArray(rawFilters) ? rawFilters : [rawFilters], nodeInfo.relationshipField);
      }
      return element[nodeInfo.name];
    }
    function getNoneGroupTree(nodeInfo) {
      if (nodeInfo.isNone) {
        const relationshipTree = get$1(props.tree, nodeInfo.relationshipField);
        if (relationshipTree && typeof relationshipTree === "object" && !relationshipTree.type) {
          const tree = { ...relationshipTree };
          delete tree.__displayName;
          delete tree.__isMultipleRelationship;
          return tree;
        }
        return {};
      }
      return props.tree;
    }
    function getNoneGroupBranches(nodeInfo) {
      if (nodeInfo.isNone) {
        const relationshipTree = get$1(props.tree, nodeInfo.relationshipField);
        if (relationshipTree && typeof relationshipTree === "object" && !relationshipTree.type) {
          const tree = { ...relationshipTree };
          delete tree.__displayName;
          delete tree.__isMultipleRelationship;
          return objectToTree(tree);
        }
        return [];
      }
      return props.branches;
    }
    function objectToTree(obj, prefix = "") {
      return Object.keys(obj).map((k) => {
        const propValue = obj[k];
        const key = [prefix, k].filter(Boolean).join(".");
        if (typeof propValue === "object") {
          if (typeof propValue.type === "string") {
            return {
              key,
              name: typeof propValue.name === "string" ? propValue.name : k
            };
          } else {
            const nestedChildren = objectToTree(propValue, key);
            return {
              key,
              name: typeof propValue.__displayName === "string" ? propValue.__displayName : typeof propValue.name === "string" ? propValue.name : k,
              children: nestedChildren
            };
          }
        }
        return null;
      }).filter(Boolean);
    }
    function addNoneGroupFilter(index, nodeInfo, key) {
      if (!nodeInfo.isNone)
        return;
      const currentFilters = getNoneGroupFilters(filterSync.value[index], nodeInfo);
      let newFilter;
      if (key === "$group") {
        newFilter = { _and: [] };
      } else {
        newFilter = set({}, key, { _eq: null });
      }
      updateNoneGroup(index, nodeInfo, [...currentFilters, newFilter]);
    }
    function updateNoneGroup(index, nodeInfo, newFilters) {
      if (nodeInfo.isNone) {
        const prefixedFilters = addRelationshipPrefix(newFilters, nodeInfo.relationshipField);
        filterSync.value = filterSync.value.map((filter, filterIndex) => {
          if (filterIndex === index) {
            return {
              [nodeInfo.relationshipField]: {
                _none: prefixedFilters
              }
            };
          }
          return filter;
        });
      } else {
        replaceNode(index, { [nodeInfo.name]: newFilters });
      }
    }
    function toggleLogic(index) {
      const nodeInfo = filterInfo.value[index];
      if (filterInfo.value[index].isField)
        return;
      if (nodeInfo.isNone)
        return;
      if ("_and" in nodeInfo.node) {
        filterSync.value = filterSync.value.map((filter, filterIndex) => {
          if (filterIndex === index) {
            return { _or: nodeInfo.node._and };
          }
          return filter;
        });
      } else {
        filterSync.value = filterSync.value.map((filter, filterIndex) => {
          if (filterIndex === index) {
            return { _and: nodeInfo.node._or };
          }
          return filter;
        });
      }
    }
    function updateComparator(index, operator) {
      const nodeInfo = filterInfo.value[index];
      if (nodeInfo.isField === false)
        return;
      const valuePath = nodeInfo.field + "." + nodeInfo.comparator;
      let value = get$1(nodeInfo.node, valuePath);
      switch (operator) {
        case "_in":
        case "_nin":
          update(toArray(value) || []);
          break;
        case "_between":
        case "_nbetween":
          update((toArray(value) || []).slice(0, 2));
          break;
        case "_null":
        case "_nnull":
        case "_empty":
        case "_nempty":
          update(true);
          break;
        case "_intersects":
        case "_nintersects":
        case "_intersects_bbox":
        case "_nintersects_bbox":
          if (["_intersects", "_nintersects", "_intersects_bbox", "_nintersects_bbox"].includes(nodeInfo.comparator)) {
            update(value);
          } else {
            update(null);
          }
          break;
        default:
          update(Array.isArray(value) ? value[0] : value);
          break;
      }
      function update(value2) {
        if (nodeInfo.isField === false)
          return;
        filterSync.value = filterSync.value.map((filter, filterIndex) => {
          if (filterIndex === index)
            return fieldToFilter(nodeInfo.field, operator, value2);
          return filter;
        });
      }
    }
    function updateField(index, newField) {
      if (newField.includes(".$")) {
        const [path, func] = newField.split(".$");
        switch (func) {
          case "none":
            return replaceNode(index, { [path]: { _none: [] } });
          default:
            return replaceNode(index, { [`${func}(${path})`]: { _eq: null } });
        }
      }
      const nodeInfo = filterInfo.value[index];
      const oldFieldInfo = get$1(props.tree, nodeInfo.name);
      const newFunctionMatch = newField.match(/^(\w+)\((.+)\)$/);
      let newFieldInfo = newFunctionMatch && newFunctionMatch[1] === "count" ? { type: "integer" } : get$1(props.tree, newField);
      if (nodeInfo.isField === false)
        return;
      const oldFunctionMatch = nodeInfo.field.match(/^(\w+)\((.+)\)$/);
      const oldFieldType = oldFunctionMatch && oldFunctionMatch[1] === "count" ? "integer" : oldFieldInfo == null ? void 0 : oldFieldInfo.type;
      const valuePath = nodeInfo.field + "." + nodeInfo.comparator;
      let value = get$1(nodeInfo.node, valuePath);
      let comparator = nodeInfo.comparator;
      if (oldFieldType !== (newFieldInfo == null ? void 0 : newFieldInfo.type)) {
        value = null;
        const opts = getCompareOptions(newField);
        if (!opts.length)
          return;
        comparator = opts[0].value;
      }
      filterSync.value = filterSync.value.map((filter, filterIndex) => {
        if (filterIndex === index)
          return fieldToFilter(newField, comparator, value);
        return filter;
      });
    }
    function replaceNode(index, newFilter) {
      filterSync.value = filterSync.value.map((val, filterIndex) => {
        if (filterIndex === index)
          return newFilter;
        return val;
      });
    }
    function getCompareOptions(name) {
      const functionMatch = name.match(/^(\w+)\((.+)\)$/);
      if (functionMatch && functionMatch[1] && functionMatch[2]) {
        const funcName = functionMatch[1];
        if (funcName === "count") {
          const operators2 = getFilterOperatorsForType("integer");
          return operators2.map((type) => ({
            text: t(`operators.${type}`),
            value: `_${type}`
          }));
        }
      }
      const fieldInfo = get$1(props.tree, name);
      if (!fieldInfo)
        return [];
      let operators = Array.isArray(fieldInfo.operators) && fieldInfo.operators.length > 0 ? fieldInfo.operators : getFilterOperatorsForType(fieldInfo.type || "string");
      if (fieldInfo.__isMultipleRelationship) {
        operators.push("none");
      }
      return operators.map((type) => ({
        text: t(`operators.${type}`),
        value: `_${type}`
      }));
    }
    return (_ctx, _cache) => {
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_select = resolveComponent("v-select");
      const _component_nodes = resolveComponent("nodes", true);
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(unref(Draggable), {
        tag: "ul",
        draggable: ".row",
        handle: ".drag-handle",
        class: "group",
        list: filterSync.value,
        disabled: __props.disabled,
        group: { name: "g1" },
        "item-key": getIndex,
        "swap-threshold": 0.3,
        "force-fallback": true,
        onChange: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("change"))
      }, {
        item: withCtx(({ element, index }) => [
          createElementVNode(
            "li",
            {
              class: normalizeClass(["row", { disabled: __props.disabled }])
            },
            [
              filterInfo.value[index].isField ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(["node-content", { inline: __props.inline }])
                  },
                  [
                    createVNode(_component_v_icon, {
                      name: "drag_indicator",
                      class: "drag-handle",
                      small: ""
                    }),
                    createVNode(_component_v_select, {
                      inline: "",
                      class: "name",
                      "item-text": "name",
                      "item-value": "key",
                      placement: "bottom-start",
                      "full-width": false,
                      "model-value": filterInfo.value[index].field,
                      items: __props.branches,
                      mandatory: false,
                      "groups-clickable": true,
                      "onUpdate:modelValue": ($event) => updateField(index, $event)
                    }, {
                      preview: withCtx(() => [
                        createTextVNode(
                          toDisplayString(getFieldPreview(element)),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["model-value", "items", "onUpdate:modelValue"]),
                    createVNode(_component_v_select, {
                      inline: "",
                      class: "comparator",
                      placement: "bottom-start",
                      "model-value": filterInfo.value[index].comparator,
                      items: getCompareOptions(filterInfo.value[index].field),
                      "onUpdate:modelValue": ($event) => updateComparator(index, $event)
                    }, null, 8, ["model-value", "items", "onUpdate:modelValue"]),
                    createVNode(InputGroup, {
                      field: element,
                      tree: __props.tree,
                      "onUpdate:field": ($event) => replaceNode(index, $event)
                    }, null, 8, ["field", "tree", "onUpdate:field"]),
                    createElementVNode("span", _hoisted_2$1, [
                      withDirectives(createVNode(_component_v_icon, {
                        name: "close",
                        small: "",
                        clickable: "",
                        onClick: ($event) => _ctx.$emit("remove-node", [index])
                      }, null, 8, ["onClick"]), [
                        [_directive_tooltip, unref(t)("delete_label")]
                      ])
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ])) : (openBlock(), createElementBlock("div", _hoisted_3, [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(["node-content", { inline: __props.inline }])
                  },
                  [
                    createVNode(_component_v_icon, {
                      name: "drag_indicator",
                      class: "drag-handle",
                      small: ""
                    }),
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass(["logic-type", {
                          or: filterInfo.value[index].name === "_or",
                          none: filterInfo.value[index].isNone
                        }])
                      },
                      [
                        createElementVNode("span", {
                          class: "key",
                          onClick: ($event) => toggleLogic(index)
                        }, toDisplayString(getLogicLabel(filterInfo.value[index])), 9, _hoisted_4),
                        createElementVNode("span", _hoisted_5, [
                          createTextVNode(
                            toDisplayString(unref(t)("interfaces.filter.of_the_following")) + " ",
                            1
                            /* TEXT */
                          ),
                          createElementVNode(
                            "b",
                            null,
                            toDisplayString(relationshipDisplayName(filterInfo.value[index])),
                            1
                            /* TEXT */
                          )
                        ])
                      ],
                      2
                      /* CLASS */
                    ),
                    createElementVNode("span", _hoisted_6, [
                      withDirectives(createVNode(_component_v_icon, {
                        name: "close",
                        small: "",
                        clickable: "",
                        onClick: ($event) => _ctx.$emit("remove-node", [index])
                      }, null, 8, ["onClick"]), [
                        [_directive_tooltip, unref(t)("delete_label")]
                      ])
                    ]),
                    createCommentVNode(" Add Filter button for _none groups "),
                    filterInfo.value[index].isNone ? (openBlock(), createElementBlock("div", _hoisted_7, [
                      createVNode(_component_v_select, {
                        inline: "",
                        "item-text": "name",
                        "item-value": "key",
                        placement: "bottom-start",
                        class: "add-filter",
                        placeholder: unref(t)("interfaces.filter.add_filter"),
                        "model-value": null,
                        items: [
                          { key: "$group", name: unref(t)("interfaces.filter.add_group") },
                          { divider: true },
                          ...getNoneGroupBranches(filterInfo.value[index])
                        ],
                        mandatory: false,
                        "groups-clickable": true,
                        "onUpdate:modelValue": ($event) => addNoneGroupFilter(index, filterInfo.value[index], $event)
                      }, null, 8, ["placeholder", "items", "onUpdate:modelValue"])
                    ])) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                ),
                createVNode(_component_nodes, {
                  filter: getNoneGroupFilters(element, filterInfo.value[index]),
                  depth: __props.depth + 1,
                  inline: __props.inline,
                  tree: getNoneGroupTree(filterInfo.value[index]),
                  branches: getNoneGroupBranches(filterInfo.value[index]),
                  onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("change")),
                  onRemoveNode: ($event) => _ctx.$emit("remove-node", [
                    `${index}.${filterInfo.value[index].isNone ? filterInfo.value[index].name + "._none" : filterInfo.value[index].name}`,
                    ...$event
                  ]),
                  "onUpdate:filter": ($event) => updateNoneGroup(index, filterInfo.value[index], $event)
                }, null, 8, ["filter", "depth", "inline", "tree", "branches", "onRemoveNode", "onUpdate:filter"])
              ]))
            ],
            2
            /* CLASS */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["list", "disabled"]);
    };
  }
});

var css$2 = ".node-content[data-v-362459c5] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: fit-content;\n  margin-right: 18px;\n  margin-bottom: 8px;\n  padding: 2px 6px;\n  padding-right: 8px;\n  background-color: var(--filter-background);\n  border: var(--filter-border-width) solid var(--filter-border-color);\n  border-radius: 100px;\n  transition: border-color var(--fast) var(--transition);\n}\n.node-content .logic-type[data-v-362459c5] {\n  color: var(--filter-subdued);\n}\n.node-content .logic-type .key[data-v-362459c5] {\n  margin-right: 4px;\n  padding: 2px 6px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: var(--fast) var(--transition);\n  transition-property: color, background-color;\n  color: var(--blue-125);\n  background-color: var(--blue-10);\n}\n.node-content .logic-type .key[data-v-362459c5]:hover {\n  background-color: var(--blue-25);\n}\n.node-content .logic-type.or .key[data-v-362459c5] {\n  color: var(--orange-125);\n  background-color: var(--orange-10);\n}\n.node-content .logic-type.or .key[data-v-362459c5]:hover {\n  background-color: var(--orange-25);\n}\n.node-content .logic-type.none .key[data-v-362459c5] {\n  color: var(--red-125);\n  background-color: var(--red-10);\n}\n.node-content .logic-type.none .key[data-v-362459c5]:hover {\n  background-color: var(--red-25);\n}\n.node-content .add-sub-filter[data-v-362459c5] {\n  padding: 0 10px;\n  margin-left: 10px;\n  font-weight: 500;\n}\n.node-content .add-sub-filter .add-filter[data-v-362459c5] {\n  --v-select-placeholder-color: var(--secondary);\n}\n.node-content .name[data-v-362459c5],\n.node-content .comparator[data-v-362459c5] {\n  position: relative;\n  z-index: 2;\n  display: inline-block;\n  margin-right: 8px;\n}\n.node-content .name[data-v-362459c5]::before,\n.node-content .comparator[data-v-362459c5]::before {\n  position: absolute;\n  top: 0px;\n  left: -4px;\n  z-index: -1;\n  width: calc(100% + 8px);\n  height: 100%;\n  background-color: var(--filter-background);\n  border-radius: 6px;\n  opacity: 0;\n  transition: opacity var(--fast) var(--transition);\n  content: \"\";\n  pointer-events: none;\n}\n.node-content .name[data-v-362459c5]:hover::before,\n.node-content .comparator[data-v-362459c5]:hover::before {\n  opacity: 1;\n}\n.node-content .comparator[data-v-362459c5] {\n  font-weight: 700;\n}\n.node-content .value[data-v-362459c5] {\n  color: var(--green);\n}\n.node-content .delete[data-v-362459c5] {\n  --v-icon-color: var(--filter-subdued);\n  --v-icon-color-hover: var(--danger);\n  position: absolute;\n  top: 50%;\n  left: 100%;\n  padding-left: 4px;\n  transform: translateY(-50%);\n  opacity: 0;\n  transition: opacity var(--fast) var(--transition);\n}\n.node-content:hover[data-v-362459c5] {\n  border-color: var(--filter-border--hover);\n}\n.node-content:hover .delete[data-v-362459c5], .node-content:hover[data-v-362459c5]:hover {\n  opacity: 1;\n}\n.node-content .drag-handle[data-v-362459c5] {\n  --v-icon-color: var(--filter-subdued);\n  margin-right: 4px;\n  cursor: grab;\n}\n.node-content.inline[data-v-362459c5] {\n  width: auto;\n  margin-right: 0;\n  padding-right: 12px;\n}\n.node-content.inline .delete[data-v-362459c5] {\n  right: 8px;\n  left: unset;\n  background-color: var(--filter-background);\n}\n\n.row.disabled .drag-handle[data-v-362459c5],\n.row.disabled .delete[data-v-362459c5] {\n  display: none;\n}\n\n.group[data-v-362459c5] .sortable-ghost .node .node-content {\n  background-color: var(--primary-alt);\n  border-color: var(--primary);\n}\n.group[data-v-362459c5] .sortable-ghost .node .node-content > * {\n  opacity: 0;\n}";
n(css$2,{});

var Nodes = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-362459c5"], ["__file", "nodes.vue"]]);

const _hoisted_1 = { class: "buttons" };
const _hoisted_2 = { class: "buttons" };
var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "interface",
  props: {
    value: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    properties: {
      type: String,
      default: null
    },
    useCollection: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: ["input"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const { useFieldsStore, useRelationsStore } = useStores();
    const innerValue = computed({
      get() {
        if (!props.value || isEmpty(props.value))
          return [];
        const name = getNodeName(props.value);
        if (name === "_and") {
          return cloneDeep(props.value["_and"]);
        } else {
          return cloneDeep([props.value]);
        }
      },
      set(newVal) {
        switch (newVal.length) {
          case 0:
            emit("input", null);
            break;
          case 1:
            emit("input", newVal[0]);
            break;
          default:
            emit("input", { _and: newVal });
            break;
        }
      }
    });
    function buildPropertiesFromCollection(collectionName, depth = 0, visitedCollections = /* @__PURE__ */ new Set()) {
      if (depth >= 3 || visitedCollections.has(collectionName)) {
        return {};
      }
      const fieldsStore = useFieldsStore();
      const relationsStore = useRelationsStore();
      const fields = fieldsStore.getFieldsForCollection(collectionName);
      if (!fields)
        return {};
      const currentVisited = new Set(visitedCollections);
      currentVisited.add(collectionName);
      const properties = {};
      fields.forEach((field) => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (field.field.startsWith("$"))
          return;
        if (field.type === "alias" && ((_b = (_a = field.meta) == null ? void 0 : _a.special) == null ? void 0 : _b.includes("group")))
          return;
        const special = (_c = field.meta) == null ? void 0 : _c.special;
        let relatedCollection = null;
        if (depth === 0) {
          console.log(`Field: ${field.field}, Type: ${field.type}, Special: ${(special == null ? void 0 : special.join(", ")) || "none"}`);
        }
        if (special == null ? void 0 : special.includes("m2o")) {
          const relations = relationsStore.getRelationsForField(collectionName, field.field);
          if (relations == null ? void 0 : relations[0]) {
            relatedCollection = relations[0].related_collection || ((_d = relations[0].meta) == null ? void 0 : _d.one_collection);
          }
        } else if (special == null ? void 0 : special.includes("o2m")) {
          const allRelations = relationsStore.relations;
          const reverseRelation = allRelations.find(
            (r) => {
              var _a2, _b2;
              return ((_a2 = r.meta) == null ? void 0 : _a2.one_field) === field.field && ((_b2 = r.meta) == null ? void 0 : _b2.one_collection) === collectionName;
            }
          );
          if (reverseRelation) {
            relatedCollection = reverseRelation.collection;
          }
        } else if (special == null ? void 0 : special.includes("m2m")) {
          const allRelations = relationsStore.relations;
          const reverseRelation = allRelations.find(
            (r) => {
              var _a2, _b2;
              return ((_a2 = r.meta) == null ? void 0 : _a2.one_field) === field.field && ((_b2 = r.meta) == null ? void 0 : _b2.one_collection) === collectionName;
            }
          );
          if (reverseRelation) {
            const junctionCollection = reverseRelation.collection;
            const junctionRelations = relationsStore.getRelationsForCollection(junctionCollection);
            const otherSide = junctionRelations.find(
              (r) => r.collection === junctionCollection && r.related_collection !== collectionName
            );
            if (otherSide) {
              relatedCollection = otherSide.related_collection;
            }
          }
        } else {
          const relations = relationsStore.getRelationsForField(collectionName, field.field);
          if (relations == null ? void 0 : relations[0]) {
            relatedCollection = relations[0].related_collection || ((_e = relations[0].meta) == null ? void 0 : _e.one_collection);
          }
        }
        if (depth === 0 && relatedCollection) {
          console.log(`  \u2192 Related to: ${relatedCollection}`);
        }
        if (relatedCollection && relatedCollection !== collectionName) {
          const nestedProps = buildPropertiesFromCollection(relatedCollection, depth + 1, currentVisited);
          if (Object.keys(nestedProps).length > 0) {
            const isMultipleRelationship = (special == null ? void 0 : special.includes("o2m")) || (special == null ? void 0 : special.includes("m2m"));
            properties[field.field] = {
              ...nestedProps,
              __displayName: typeof field.name === "string" ? field.name : field.field,
              __isMultipleRelationship: isMultipleRelationship
            };
            if (depth === 0) {
              console.log(
                `  \u2705 Added nested properties with ${Object.keys(nestedProps).length} fields (${special == null ? void 0 : special.join(", ")})`
              );
            }
          }
        } else {
          const fieldName = typeof field.name === "string" ? field.name : field.field;
          properties[field.field] = {
            name: fieldName,
            type: field.type
          };
          if ((_g = (_f = field.meta) == null ? void 0 : _f.options) == null ? void 0 : _g.choices) {
            properties[field.field].choices = field.meta.options.choices;
          }
        }
      });
      return properties;
    }
    const effectiveProperties = computed(() => {
      if (props.useCollection) {
        return buildPropertiesFromCollection(props.useCollection);
      }
      if (props.properties) {
        try {
          return typeof props.properties === "string" ? JSON.parse(props.properties) : props.properties;
        } catch (e) {
          console.error("Error parsing properties:", e);
        }
      }
      return null;
    });
    const tree = ref(null);
    const branches = ref([]);
    watch(
      () => effectiveProperties.value,
      (newProps) => {
        if (newProps) {
          try {
            tree.value = newProps;
            branches.value = objectToTree(tree.value);
          } catch (e) {
            console.error("Error building tree:", e);
          }
        } else {
          tree.value = null;
          branches.value = [];
        }
      },
      { immediate: true }
    );
    const fieldOptions = computed(() => {
      return [{ key: "$group", name: t("interfaces.filter.add_group") }, { divider: true }, ...branches.value || []];
    });
    function objectToTree(obj, prefix = "") {
      return Object.keys(obj).map((k) => {
        const propValue = obj[k];
        const key = [prefix, k].filter(Boolean).join(".");
        if (k === "__displayName")
          return propValue;
        if (typeof propValue === "string") {
          obj[k] = {
            name: k,
            type: propValue
          };
          if (propValue === "dateTime" || propValue === "timestamp") {
            const intervals = ["year", "month", "day", "hour", "minute", "second"];
            const children = [{ key, name: "raw" }];
            intervals.forEach((interval) => {
              const fn = `${interval}(${k})`;
              const key2 = [prefix, fn].filter(Boolean).join(".");
              obj[fn] = { key: key2, name: interval, type: "integer" };
              children.push(obj[fn]);
            });
            return {
              key,
              name: k,
              selectable: true,
              children
            };
          }
          return {
            key,
            name: k
          };
        }
        if (typeof propValue === "object") {
          if (typeof propValue.type === "string") {
            const fieldName = typeof propValue.name === "string" ? propValue.name : k;
            return {
              key,
              name: fieldName
            };
          } else {
            const allNestedChildren = objectToTree(propValue, key);
            const nestedChildren = allNestedChildren.filter(
              (child) => child && child.key !== `${key}.__displayName` && child.key !== `${key}.__isMultipleRelationship`
            );
            let specialChildren;
            if (propValue.__isMultipleRelationship === true) {
              specialChildren = [
                { key: `${key}.$count`, name: "# Count", operator: "count", selectable: true },
                { key: `${key}.$none`, name: "\u2205 None", operator: "_none", selectable: true },
                { divider: true }
              ];
            }
            let fieldName = k;
            if (typeof propValue.__displayName === "string") {
              fieldName = propValue.__displayName;
            } else if (typeof propValue.name === "string") {
              fieldName = propValue.name;
            }
            return {
              key,
              name: fieldName,
              children: specialChildren ? [...specialChildren, ...nestedChildren] : nestedChildren
            };
          }
        }
        return null;
      }).filter(Boolean);
    }
    function emitValue() {
      if (innerValue.value.length === 0) {
        emit("input", null);
      } else {
        emit("input", { _and: innerValue.value });
      }
    }
    function addNode(key) {
      if (key === "$group") {
        innerValue.value = innerValue.value.concat({ _and: [] });
      } else if (key.endsWith(".$none")) {
        const fieldPath = key.replace(/\.\$none$/, "");
        const node = set({}, fieldPath, { _none: [] });
        innerValue.value = innerValue.value.concat(node);
      } else if (key.endsWith(".$count")) {
        const fieldPath = key.replace(/\.\$count$/, "");
        const countKey = `count(${fieldPath})`;
        const node = { [countKey]: { _eq: null } };
        innerValue.value = innerValue.value.concat(node);
      } else {
        const node = set({}, key, { ["_eq"]: null });
        innerValue.value = innerValue.value.concat(node);
      }
    }
    function removeNode(ids) {
      const id = ids.pop();
      if (ids.length === 0) {
        innerValue.value = innerValue.value.filter((node, index) => index !== Number(id));
        return;
      }
      let list = get$1(innerValue.value, ids.join("."));
      list = list.filter((node, index) => index !== Number(id));
      innerValue.value = set(innerValue.value, ids.join("."), list);
    }
    return (_ctx, _cache) => {
      const _component_v_notice = resolveComponent("v-notice");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_select = resolveComponent("v-select");
      const _component_v_list = resolveComponent("v-list");
      return !tree.value ? (openBlock(), createBlock(_component_v_notice, {
        key: 0,
        type: "warning"
      }, {
        default: withCtx(() => [..._cache[4] || (_cache[4] = [
          createTextVNode(
            " Properties not setup correctly! ",
            -1
            /* CACHED */
          )
        ])]),
        _: 1
        /* STABLE */
      })) : (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: normalizeClass(["rules-filter-interface", { inline: __props.inline, disabled: __props.disabled, empty: innerValue.value.length === 0 }])
        },
        [
          innerValue.value.length === 0 ? (openBlock(), createBlock(_component_v_notice, {
            key: 0,
            type: "info"
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString(unref(t)("interfaces.filter.no_rules")) + " ",
                1
                /* TEXT */
              ),
              createElementVNode("div", _hoisted_1, [
                createVNode(_component_v_select, {
                  inline: !__props.inline,
                  "item-text": "name",
                  "item-value": "key",
                  placement: "bottom-start",
                  class: "add-filter",
                  placeholder: unref(t)("interfaces.filter.add_filter"),
                  "full-width": __props.inline,
                  "model-value": null,
                  items: fieldOptions.value,
                  mandatory: false,
                  "groups-clickable": true,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addNode($event))
                }, createSlots({
                  _: 2
                  /* DYNAMIC */
                }, [
                  __props.inline ? {
                    name: "prepend",
                    fn: withCtx(() => [
                      createVNode(_component_v_icon, {
                        name: "add",
                        small: ""
                      })
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["inline", "placeholder", "full-width", "items"])
              ])
            ]),
            _: 1
            /* STABLE */
          })) : (openBlock(), createBlock(_component_v_list, {
            key: 1,
            mandatory: true
          }, {
            default: withCtx(() => [
              createVNode(Nodes, {
                filter: innerValue.value,
                "onUpdate:filter": _cache[1] || (_cache[1] = ($event) => innerValue.value = $event),
                depth: 1,
                tree: tree.value,
                branches: branches.value,
                inline: __props.inline,
                disabled: __props.disabled,
                onRemoveNode: _cache[2] || (_cache[2] = ($event) => removeNode($event)),
                onChange: emitValue
              }, null, 8, ["filter", "tree", "branches", "inline", "disabled"]),
              createElementVNode("div", _hoisted_2, [
                createVNode(_component_v_select, {
                  inline: !__props.inline,
                  "item-text": "name",
                  "item-value": "key",
                  placement: "bottom-start",
                  class: "add-filter",
                  placeholder: unref(t)("interfaces.filter.add_filter"),
                  "full-width": __props.inline,
                  "model-value": null,
                  items: fieldOptions.value,
                  mandatory: false,
                  "groups-clickable": true,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addNode($event))
                }, createSlots({
                  _: 2
                  /* DYNAMIC */
                }, [
                  __props.inline ? {
                    name: "prepend",
                    fn: withCtx(() => [
                      createVNode(_component_v_icon, {
                        name: "add",
                        small: ""
                      })
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["inline", "placeholder", "full-width", "items"])
              ])
            ]),
            _: 1
            /* STABLE */
          }))
        ],
        2
        /* CLASS */
      ));
    };
  }
});

var css$1 = "\n.v-list.list {\n\t--v-list-min-width: 148px;\n}\n.rules-filter-interface {\n\t--filter-background: var(--theme--background);\n\t--filter-color: var(--theme--foreground);\n\t--filter-subdued: var(--theme--foreground-subdued);\n\t--filter-border-width: var(--theme--border-width);\n\t--filter-border-color: var(--theme--form--field--input--border-color);\n\t--filter-border--hover: var(--theme--form--field--input--border-color-hover);\n\t--filter-padding: var(--theme--form--field--input--padding, 8px);\n}\n";
n(css$1,{});

var css = ".rules-filter-interface [data-v-5ae165e0] ul, .rules-filter-interface [data-v-5ae165e0] li {\n  list-style: none;\n}\n.rules-filter-interface [data-v-5ae165e0] .group {\n  margin-left: 18px;\n  padding-left: 10px;\n  border-left: var(--filter-border-width) solid var(--filter-border-color);\n}\n.rules-filter-interface [data-v-5ae165e0] .node-content .v-select.comparator .inline-display, .rules-filter-interface [data-v-5ae165e0] .node-content .v-select.name .inline-display {\n  padding-right: 0;\n}\n.rules-filter-interface [data-v-5ae165e0] .node-content .v-select.comparator .inline-display span.v-icon, .rules-filter-interface [data-v-5ae165e0] .node-content .v-select.name .inline-display span.v-icon {\n  display: none;\n}\n.rules-filter-interface .v-list[data-v-5ae165e0] {\n  margin: 0px 0px 10px;\n  padding: var(--filter-padding);\n  border: var(--filter-border-width) solid var(--filter-border-color);\n}\n.rules-filter-interface .v-list[data-v-5ae165e0] > .group {\n  margin-left: 0px;\n  padding-left: 0px;\n  border-left: none;\n}\n.rules-filter-interface .buttons[data-v-5ae165e0] {\n  padding: 0 10px;\n  font-weight: 600;\n}\n.rules-filter-interface .add-filter[data-v-5ae165e0] {\n  --v-select-placeholder-color: var(--primary);\n}\n.rules-filter-interface.inline .v-list[data-v-5ae165e0] {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n.rules-filter-interface.inline.empty .v-list[data-v-5ae165e0] {\n  display: none;\n}\n.rules-filter-interface.inline .buttons[data-v-5ae165e0] {\n  margin: 0;\n  padding: 0;\n}\n.rules-filter-interface.inline .add-filter[data-v-5ae165e0] {\n  width: 100%;\n}\n.rules-filter-interface.inline .add-filter [data-v-5ae165e0] .v-input {\n  position: relative;\n  width: 100%;\n  height: 30px;\n  padding: 0;\n  background-color: var(--theme--background);\n  color: var(--theme--forground);\n  border: var(--filter-border-width) solid var(--filter-border-color);\n  border-radius: 100px;\n  transition: border-color var(--fast) var(--transition);\n}\n.rules-filter-interface.inline .add-filter [data-v-5ae165e0] .v-input .input {\n  padding-right: 5px;\n  padding-left: 6px;\n  background: transparent;\n  border: 0;\n}\n.rules-filter-interface.inline .add-filter [data-v-5ae165e0] .v-input .input .prepend {\n  margin-right: 4px;\n}\n.rules-filter-interface.disabled .buttons[data-v-5ae165e0] {\n  display: none;\n}";
n(css,{});

var InterfaceComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ae165e0"], ["__file", "interface.vue"]]);

var index = defineInterface({
  id: "filters",
  name: "Filters&Rules",
  description: "A filter interface for creating rules on given properties",
  icon: "search",
  component: InterfaceComponent,
  types: ["json"],
  group: "selection",
  options: [
    {
      field: "useCollection",
      type: "string",
      name: "$t:collection",
      meta: {
        interface: "system-collection",
        options: {
          includeSystem: true,
          includeSingleton: false
        },
        width: "full",
        note: "Select a collection to use its fields as the schema. If not set, custom properties below will be used."
      }
    },
    {
      field: "properties",
      name: "Custom Properties",
      type: "json",
      meta: {
        interface: "code",
        options: {
          language: "json",
          template: JSON.stringify(
            {
              name: {
                name: "Full name",
                type: "string",
                operators: ["eq", "neq"]
              },
              age: "integer",
              gender: {
                type: "string",
                choices: [
                  {
                    text: "Male",
                    value: "male"
                  },
                  {
                    text: "Female",
                    value: "female"
                  }
                ]
              },
              country: {
                type: "string",
                choices: "$COUNTRIES"
              },
              meta: {
                now: "dateTime",
                active: "boolean"
              }
            },
            null,
            4
          )
        },
        note: "Custom schema definition. Only used if no collection is selected above."
      },
      schema: {
        default_value: `{}`
      }
    }
  ]
});

export { index as default };
