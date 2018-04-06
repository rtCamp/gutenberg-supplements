/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(18)('wks');
var uid = __webpack_require__(14);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(33);
var toPrimitive = __webpack_require__(20);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(19);
var hide = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(12);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(69);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(18)('keys');
var uid = __webpack_require__(14);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(60);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(68);
var enumBugKeys = __webpack_require__(26);
var IE_PROTO = __webpack_require__(17)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(4);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(22);
var wksExt = __webpack_require__(28);
var defineProperty = __webpack_require__(3).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(4);
var toObject = __webpack_require__(15);
var IE_PROTO = __webpack_require__(17)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(61);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(38);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(64);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(77);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(66)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(41);
var hide = __webpack_require__(7);
var has = __webpack_require__(4);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(67);
var setToStringTag = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(32);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(4);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(70)(false);
var IE_PROTO = __webpack_require__(17)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(42);
var hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(12);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(20);
var has = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(33);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(87);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(91);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(38);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(52);
__webpack_require__(55);
__webpack_require__(106);
module.exports = __webpack_require__(109);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);



var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;


registerBlockType('rtgb/case-study-excerpt', {

	title: __('Case Study Excerpt'),
	icon: 'search',
	category: 'layout',
	description: __('Used for case study archive page'),

	attributes: {

		caseStudyTitle: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'case-study-title',
				placeholder: __('Case Study Title'),
				tagName: 'h3'
			},
			selector: '.case-study-title',
			source: 'children'
		},

		caseStudyContent: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'case-study-content',
				placeholder: __('Case Study Title'),
				tagName: 'div',
				multiline: 'p'
			},
			selector: '.case-study-content',
			source: 'children'
		},

		caseStudyImage: {
			type: 'object',
			field: {
				type: 'image',
				buttonText: __('Upload'),
				imagePlaceholder: true,
				removeButtonText: __('Remove')
			}
		},

		caseStudyLink: {
			type: 'string',
			field: {
				type: 'link',
				placement: __('inspector'),
				label: __('Case study link')
			}
		}
	},

	getEditWrapperProps: function getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},
	edit: function edit(props, middleware) {
		var caseStudyLink = props.attributes.caseStudyLink;


		var className = props.className ? props.className : '';

		return wp.element.createElement(
			'div',
			{ className: className + ' case-study-wrapper alignwide' },
			wp.element.createElement(
				'div',
				{ className: 'image-container' },
				middleware.fields.caseStudyImage
			),
			wp.element.createElement(
				'div',
				{ className: 'info-container' },
				middleware.inspectorControls,
				middleware.fields.caseStudyTitle,
				middleware.fields.caseStudyContent,
				wp.element.createElement(
					'div',
					null,
					middleware.fields.caseStudyLink
				),
				caseStudyLink ? wp.element.createElement(
					'a',
					{ href: caseStudyLink, className: 'button secondary' },
					__('Read More')
				) : ''
			)
		);
	},
	save: function save(props) {
		var _props$attributes = props.attributes,
		    caseStudyImage = _props$attributes.caseStudyImage,
		    caseStudyTitle = _props$attributes.caseStudyTitle,
		    caseStudyContent = _props$attributes.caseStudyContent,
		    caseStudyLink = _props$attributes.caseStudyLink;


		var className = props.className ? props.className : '';
		var imageContent = '';

		if (caseStudyImage) {
			imageContent = wp.element.createElement(
				'div',
				{ className: 'image-container' },
				wp.element.createElement(
					'figure',
					null,
					wp.element.createElement('img', { src: caseStudyImage.url, alt: caseStudyImage.title })
				)
			);
		}

		return wp.element.createElement(
			'div',
			{ className: className + ' case-study-wrapper alignwide' },
			imageContent,
			wp.element.createElement(
				'div',
				{ className: 'info-container' },
				wp.element.createElement(
					'h3',
					{ className: 'case-study-title' },
					caseStudyTitle ? caseStudyTitle : ''
				),
				wp.element.createElement(
					'div',
					{ className: 'case-study-content' },
					caseStudyContent ? caseStudyContent : ''
				),
				caseStudyLink ? wp.element.createElement(
					'a',
					{ href: caseStudyLink, className: 'button secondary' },
					__('Read More')
				) : ''
			)
		);
	}
});

/***/ }),
/* 50 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_scss__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__editor_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_scss__);



/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);



var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;


registerBlockType('rtgb/image-columns', {
	title: __('Image Columns'),
	icon: 'index-card',
	category: 'layout',

	attributes: {
		columns: {
			type: 'array',
			source: 'query',
			selector: '.rt-column',
			query: {
				mediaID: {
					type: 'number',
					source: 'attribute',
					selector: '.rt-header-content img',
					attribute: 'data-media-id'
				},
				mediaURL: {
					type: 'string',
					source: 'attribute',
					selector: '.rt-header-content img',
					attribute: 'src'
				},
				title: {
					source: 'children',
					selector: '.rt-column-title'
				},
				subHeading: {
					source: 'children',
					selector: '.rt-column-sub-heading'
				},
				content: {
					source: 'children',
					selector: '.rt-column-content'
				},
				readMore: {
					source: 'children',
					selector: '.rt-read-more'
				}
			},
			default: [{}, {}, {}]
		},
		columnCount: {
			type: 'number',
			default: 3
		},
		showSubHeading: {
			type: 'boolean',
			default: false
		},
		showReadMore: {
			type: 'boolean',
			default: true
		}
	},

	edit: __WEBPACK_IMPORTED_MODULE_0__block__["a" /* default */],

	save: function save(props) {
		var columns = props.attributes.columns || [];
		var columnCount = props.attributes.columnCount;
		var className = props.className;
		var imageColumns = [];

		if (!columns.length) {
			return null;
		}

		_.each(columns, function (column, index) {
			var columnClass = 'rt-column rt-column-' + index;
			var columnKey = 'rt-column-' + index;

			if (index + 1 > columnCount) {
				return;
			}

			imageColumns.push(wp.element.createElement(
				'li',
				{ key: columnKey, className: columnClass },
				wp.element.createElement(
					'figure',
					{ className: 'rt-header-content' },
					wp.element.createElement('img', { src: column.mediaURL, 'data-media-id': column.mediaID, alt: '' })
				),
				wp.element.createElement(
					'h3',
					{ className: 'rt-column-title' },
					column.title
				),
				props.attributes.showSubHeading && wp.element.createElement(
					'p',
					{ className: 'rt-column-sub-heading' },
					column.subHeading
				),
				wp.element.createElement(
					'div',
					{ className: 'rt-column-content' },
					column.content
				),
				props.attributes.showReadMore && wp.element.createElement(
					'div',
					{ className: 'rt-read-more' },
					column.readMore
				)
			));
		});

		return wp.element.createElement(
			'ul',
			{ className: className, key: 'rt-image-columns' },
			imageColumns
		);
	}
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__image_column__ = __webpack_require__(94);





/**
 * Contains image columns component.
 */

var __ = wp.i18n.__;
var Component = wp.element.Component;
var InspectorControls = wp.blocks.InspectorControls;
var _wp$blocks$InspectorC = wp.blocks.InspectorControls,
    RangeControl = _wp$blocks$InspectorC.RangeControl,
    ToggleControl = _wp$blocks$InspectorC.ToggleControl;




var ImageColumnBlock = function (_Component) {
	__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(ImageColumnBlock, _Component);

	function ImageColumnBlock() {
		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ImageColumnBlock);

		var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ImageColumnBlock.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(ImageColumnBlock)).apply(this, arguments));

		_this.onSelectImage = _this.onSelectImage.bind(_this);
		_this.setColumnsAttributes = _this.setColumnsAttributes.bind(_this);
		_this.onRemoveImage = _this.onRemoveImage.bind(_this);
		_this.toggleShowSubHeading = _this.toggleShowSubHeading.bind(_this);
		_this.toggleShowReadMore = _this.toggleShowReadMore.bind(_this);
		return _this;
	}

	__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ImageColumnBlock, [{
		key: 'onSelectImage',
		value: function onSelectImage(index, media) {
			this.setColumnsAttributes(index, {
				mediaURL: media.sizes.medium ? media.sizes.medium.url : media.url,
				mediaID: media.id
			});
		}
	}, {
		key: 'setColumnsAttributes',
		value: function setColumnsAttributes(index, dataObject) {
			var attributes = this.props.attributes;

			var existingData = attributes.columns.slice(0) || [];

			if (existingData[index]) {
				existingData[index] = _.extend(existingData[index], dataObject);
			} else {
				existingData[index] = dataObject;
			}

			this.props.setAttributes({
				columns: existingData
			});
		}
	}, {
		key: 'onRemoveImage',
		value: function onRemoveImage(index) {
			this.setColumnsAttributes(index, { mediaID: '', mediaURL: '' });
		}
	}, {
		key: 'toggleShowSubHeading',
		value: function toggleShowSubHeading() {
			this.props.setAttributes({
				showSubHeading: !this.props.attributes.showSubHeading
			});
		}
	}, {
		key: 'toggleShowReadMore',
		value: function toggleShowReadMore() {
			this.props.setAttributes({
				showReadMore: !this.props.attributes.showReadMore
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    focus = _props.focus,
			    setFocus = _props.setFocus,
			    attributes = _props.attributes,
			    setAttributes = _props.setAttributes;

			var imageColumns = [];

			var inspectorControls = focus && wp.element.createElement(
				InspectorControls,
				{ key: 'inspector' },
				wp.element.createElement(
					'h3',
					null,
					__('Settings')
				),
				wp.element.createElement(RangeControl, {
					label: __('Columns'),
					value: attributes.columnCount,
					onChange: function onChange(value) {
						return setAttributes({ columnCount: value });
					},
					min: 1,
					max: 5
				}),
				wp.element.createElement(ToggleControl, {
					label: __('Show Sub Heading'),
					checked: attributes.showSubHeading,
					onChange: this.toggleShowSubHeading
				}),
				wp.element.createElement(ToggleControl, {
					label: __('Show Read More'),
					checked: attributes.showReadMore,
					onChange: this.toggleShowReadMore
				})
			);

			var _loop = function _loop(index) {
				var columnClass = 'column-' + index + ' single-column';
				var imageColumnKey = 'column-' + index;

				var columnAttributes = attributes.columns[index] || {};

				imageColumns.push(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_5__image_column__["a" /* default */], {
					onSelectImage: function onSelectImage(media) {
						return _this2.onSelectImage(index, media);
					},
					onChangeTitle: function onChangeTitle(title) {
						return _this2.setColumnsAttributes(index, { title: title });
					},
					onChangeSubTitle: function onChangeSubTitle(subHeading) {
						return _this2.setColumnsAttributes(index, { subHeading: subHeading });
					},
					onChangeContent: function onChangeContent(content) {
						return _this2.setColumnsAttributes(index, { content: content });
					},
					onChangeReadMore: function onChangeReadMore(readMore) {
						return _this2.setColumnsAttributes(index, { readMore: readMore });
					},
					onRemove: function onRemove() {
						return _this2.onRemoveImage(index);
					},
					className: columnClass,
					attributes: columnAttributes,
					showSubHeading: attributes.showSubHeading,
					showReadMore: attributes.showReadMore,
					focused: focus,
					setFocus: setFocus,
					key: imageColumnKey,
					index: index
				}));
			};

			for (var index = 0; index < attributes.columnCount; index++) {
				_loop(index);
			}

			return [inspectorControls, wp.element.createElement(
				'div',
				{ className: 'rt-image-columns', key: 'image-columns' },
				imageColumns
			)];
		}
	}]);

	return ImageColumnBlock;
}(Component);

/* harmony default export */ __webpack_exports__["a"] = (ImageColumnBlock);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(15);
var $getPrototypeOf = __webpack_require__(32);

__webpack_require__(59)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(5);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(73);
module.exports = __webpack_require__(28).f('iterator');


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(23);
var descriptor = __webpack_require__(12);
var setToStringTag = __webpack_require__(27);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(24);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(25);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(71);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
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
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
var global = __webpack_require__(2);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(75);
var step = __webpack_require__(76);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(84);
__webpack_require__(85);
__webpack_require__(86);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(41);
var META = __webpack_require__(80).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(18);
var setToStringTag = __webpack_require__(27);
var uid = __webpack_require__(14);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(28);
var wksDefine = __webpack_require__(29);
var enumKeys = __webpack_require__(81);
var isArray = __webpack_require__(82);
var anObject = __webpack_require__(8);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(20);
var createDesc = __webpack_require__(12);
var _create = __webpack_require__(23);
var gOPNExt = __webpack_require__(83);
var $GOPD = __webpack_require__(46);
var $DP = __webpack_require__(3);
var $keys = __webpack_require__(24);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(45).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(44).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(22)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(14)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(4);
var setDesc = __webpack_require__(3).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(44);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(25);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10);
var gOPN = __webpack_require__(45).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {



/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('asyncIterator');


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('observable');


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(90).set });


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(9);
var anObject = __webpack_require__(8);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(19)(Function.call, __webpack_require__(46).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(93);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(23) });


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);






/**
 * Contains Image Column
 */

var __ = wp.i18n.__;
var Component = wp.element.Component;
var _wp$blocks = wp.blocks,
    Editable = _wp$blocks.Editable,
    MediaUpload = _wp$blocks.MediaUpload;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    IconButton = _wp$components.IconButton,
    Placeholder = _wp$components.Placeholder;

// Alias of editable remove Editable as it will no longer available
// @todo import RichText instead of Editable

var RichText = Editable;

var ImageColumn = function (_Component) {
	__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(ImageColumn, _Component);

	function ImageColumn(props) {
		var _ref;

		__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ImageColumn);

		return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = ImageColumn.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(ImageColumn)).call.apply(_ref, [this].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(props))));
	}

	__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ImageColumn, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    attributes = _props.attributes,
			    focused = _props.focused,
			    setFocus = _props.setFocus,
			    index = _props.index,
			    onRemove = _props.onRemove;

			var focusedRichText = focused ? focused.RichText || index + "-title" : null;

			return wp.element.createElement(
				"div",
				{ className: this.props.className, key: "image-columns-container" },
				attributes.mediaID && wp.element.createElement(
					"figure",
					null,
					wp.element.createElement(IconButton, {
						key: "icon-button",
						icon: "no-alt",
						onClick: onRemove,
						className: "rt-remove-image-button",
						label: __('Remove Image')
					}),
					wp.element.createElement("img", { src: attributes.mediaURL, alt: "" })
				),
				!attributes.mediaID && wp.element.createElement(
					Placeholder,
					{
						key: "placeholder",
						icon: "media-image",
						label: __('Thumbnail'),
						instructions: __('Upload or choose from media library'),
						className: "rt-image-placeholder" },
					wp.element.createElement(MediaUpload, {
						onSelect: this.props.onSelectImage,
						type: "image",
						value: attributes.mediaID,
						render: function render(_ref2) {
							var open = _ref2.open;
							return wp.element.createElement(
								Button,
								{ key: "button", className: attributes.mediaID ? 'image-button' : 'button button-large', onClick: open },
								!attributes.mediaID ? __('Choose') : ''
							);
						}
					})
				),
				wp.element.createElement(RichText, {
					tagName: "h3",
					onChange: this.props.onChangeTitle,
					value: attributes.title,
					placeholder: __('Enter Title...'),
					focus: focusedRichText === index + "-title",
					onFocus: function onFocus(focus) {
						return setFocus(_.extend({}, focus, { RichText: index + "-title" }));
					}
				}),
				this.props.showSubHeading && wp.element.createElement(RichText, {
					onChange: this.props.onChangeSubTitle,
					value: attributes.subHeading,
					placeholder: __('Enter Sub Title...'),
					focus: focusedRichText === index + "-sub-title",
					onFocus: function onFocus(focus) {
						return setFocus(_.extend({}, focus, { RichText: index + "-sub-title" }));
					},
					inlineToolbar: true
				}),
				wp.element.createElement(RichText, {
					onChange: this.props.onChangeContent,
					value: attributes.content,
					placeholder: __('Enter Content...'),
					focus: focusedRichText === index + "-content",
					onFocus: function onFocus(focus) {
						return setFocus(_.extend({}, focus, { RichText: index + "-content" }));
					},
					inlineToolbar: true
				}),
				this.props.showReadMore && wp.element.createElement(RichText, {
					onChange: this.props.onChangeReadMore,
					value: attributes.readMore ? attributes.readMore : __('Read More'),
					placeholder: __('Read More Text and Link...'),
					focus: focusedRichText === index + "-readmore",
					onFocus: function onFocus(focus) {
						return setFocus(_.extend({}, focus, { RichText: index + "-readmore" }));
					},
					inlineToolbar: true
				})
			);
		}
	}]);

	return ImageColumn;
}(Component);

/* harmony default export */ __webpack_exports__["a"] = (ImageColumn);

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(96);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(98);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(19);
var $export = __webpack_require__(5);
var toObject = __webpack_require__(15);
var call = __webpack_require__(99);
var isArrayIter = __webpack_require__(100);
var toLength = __webpack_require__(43);
var createProperty = __webpack_require__(101);
var getIterFn = __webpack_require__(102);

$export($export.S + $export.F * !__webpack_require__(104)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3);
var createDesc = __webpack_require__(12);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(103);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(25);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 105 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);



var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    BlockControls = _wp$blocks.BlockControls,
    BlockAlignmentToolbar = _wp$blocks.BlockAlignmentToolbar;


registerBlockType('rtgb/testimonial', {

	title: __('Testimonial'),
	icon: 'format-status',
	category: 'layout',
	description: __('Display a testimonial with a picture, text, name and company'),

	attributes: {

		image: {
			type: 'object',
			field: {
				type: 'image',
				buttonText: __('Upload'),
				removeButtonText: __('Remove')
			}
		},

		content: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-content',
				placeholder: __('Write testimonial content here'),
				tagName: 'div'
			},
			selector: '.testimonial-content',
			source: 'children'
		},

		name: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-name',
				placeholder: __('Name'),
				tagName: 'p'
			},
			selector: '.testimonial-name',
			source: 'children'
		},

		companyName: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-company',
				placeholder: __('Company'),
				tagName: 'p'
			},
			selector: '.testimonial-company',
			source: 'children'
		},

		align: {
			type: 'string'
		},

		bgColor: {
			type: 'string',
			field: {
				type: 'color',
				label: __('Background Color'),
				placement: 'inspector'
			}
		},

		textColor: {
			type: 'string',
			field: {
				type: 'color',
				label: __('Text Color'),
				placement: 'inspector'
			}
		}
	},

	getEditWrapperProps: function getEditWrapperProps(attributes) {
		var align = attributes.align;

		if ('full' === align || 'wide' === align) {
			return { 'data-align': align };
		}
	},
	edit: function edit(props, middleware) {
		var _props$attributes = props.attributes,
		    bgColor = _props$attributes.bgColor,
		    textColor = _props$attributes.textColor,
		    align = _props$attributes.align,
		    className = props.className,
		    isSelected = props.isSelected;


		var hasBackground = bgColor ? ' has-background' : '';
		var dataAlign = align ? ' align' + align : '';
		var blockControls = isSelected && wp.element.createElement(
			BlockControls,
			{ key: 'controls' },
			wp.element.createElement(BlockAlignmentToolbar, {
				value: align,
				onChange: function onChange(nextAlign) {
					props.setAttributes({ align: nextAlign });
				},
				controls: ['wide', 'center', 'full']
			})
		);

		return [middleware.inspectorControls, blockControls, wp.element.createElement(
			'blockquote',
			{ key: 'quote', className: className },
			wp.element.createElement(
				'div',
				{ className: className + ' testimonial-wrapper-bg' + hasBackground + dataAlign, style: { backgroundColor: bgColor, color: textColor } },
				wp.element.createElement(
					'div',
					{ className: className + ' testimonial-wrapper' },
					wp.element.createElement(
						'div',
						{ className: 'testimonial-image' },
						middleware.fields.image
					),
					wp.element.createElement(
						'div',
						{ className: 'testimonial-details' },
						middleware.fields.content,
						wp.element.createElement(
							'div',
							{ className: 'testimonial-signature', style: { color: textColor } },
							middleware.fields.name,
							middleware.fields.companyName
						)
					)
				)
			)
		)];
	},
	save: function save(props) {
		var _props$attributes2 = props.attributes,
		    image = _props$attributes2.image,
		    content = _props$attributes2.content,
		    name = _props$attributes2.name,
		    companyName = _props$attributes2.companyName,
		    bgColor = _props$attributes2.bgColor,
		    align = _props$attributes2.align,
		    textColor = _props$attributes2.textColor;


		var className = props.className ? props.className : '';
		var hasBackground = bgColor ? ' has-background' : '';
		var dataAlign = align ? ' align' + align : '';
		var hasImage = !image ? ' no-image' : '';
		var imageContent = '';

		if (image) {
			imageContent = wp.element.createElement(
				'div',
				{ className: 'testimonial-image' },
				wp.element.createElement(
					'figure',
					null,
					wp.element.createElement('img', { src: image.url, alt: image.title })
				)
			);
		}

		return wp.element.createElement(
			'div',
			{ className: className + ' testimonial-wrapper-bg' + hasBackground + dataAlign, style: { backgroundColor: bgColor, color: textColor } },
			wp.element.createElement(
				'div',
				{ className: 'testimonial-wrapper' + hasImage },
				imageContent,
				wp.element.createElement(
					'div',
					{ className: 'testimonial-details' },
					wp.element.createElement(
						'div',
						{ className: 'testimonial-content' },
						content
					),
					wp.element.createElement(
						'div',
						{ className: 'testimonial-signature' },
						wp.element.createElement(
							'p',
							{ className: 'testimonial-name' },
							name
						),
						wp.element.createElement(
							'p',
							{ className: 'testimonial-company' },
							companyName
						)
					)
				)
			)
		);
	}
});

/***/ }),
/* 107 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);
/* global moment */




/* Set up variables */
var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    RichText = _wp$blocks.RichText,
    InspectorControls = _wp$blocks.InspectorControls;
var _wp$components = wp.components,
    SelectControl = _wp$components.SelectControl,
    TextControl = _wp$components.TextControl;

/* Register block type */

registerBlockType('rtgb/timeline', {

	title: __('Timeline'),
	icon: 'list-view',
	category: 'common',
	description: __('Used to show WordPress contributors list'),

	attributes: {

		timelineTitle: {
			type: 'array',
			source: 'children',
			selector: '.timelineTitle'
		},

		timelineContent: {
			type: 'array',
			source: 'children',
			selector: '.contributor'
		},

		releaseType: {
			type: 'select',
			default: 'major'
		},

		releaseDate: {
			type: 'string',
			source: 'attribute',
			attribute: 'datetime',
			selector: '.timeline-date'
		},

		newslink: {
			type: 'url',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-news-link'
		},

		bloglink: {
			type: 'url',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-blog-link'
		}

	},

	edit: function edit(props) {
		var _props$attributes = props.attributes,
		    releaseType = _props$attributes.releaseType,
		    releaseDate = _props$attributes.releaseDate,
		    timelineTitle = _props$attributes.timelineTitle,
		    timelineContent = _props$attributes.timelineContent,
		    newslink = _props$attributes.newslink,
		    bloglink = _props$attributes.bloglink,
		    focus = props.focus,
		    setFocus = props.setFocus;


		var availableTypes = [{ value: 'major', label: __('Major Release') }, { value: 'minor', label: __('Minor Release') }];

		/* Event handlers */
		var onChangeType = function onChangeType(newreleaseType) {
			props.setAttributes({ releaseType: newreleaseType });
		};

		var onChangeDate = function onChangeDate(newreleaseDate) {
			props.setAttributes({ releaseDate: newreleaseDate });
		};

		var onTitleChange = function onTitleChange(newtimelineTitle) {
			props.setAttributes({ timelineTitle: newtimelineTitle });
		};

		var onContentChange = function onContentChange(newtimelineContent) {
			props.setAttributes({ timelineContent: newtimelineContent });
		};

		var onChangenewslink = function onChangenewslink(newnewslink) {
			props.setAttributes({ newslink: newnewslink });
		};

		var onChangebloglink = function onChangebloglink(newbloglink) {
			props.setAttributes({ bloglink: newbloglink });
		};

		var onFocusTitle = function onFocusTitle(_focus) {
			props.setFocus(_.extend({}, _focus, { editable: 'timelineTitle' }));
		};

		var onFocusContent = function onFocusContent(_focus) {
			props.setFocus(_.extend({}, _focus, { editable: 'timelineContent' }));
		};

		var className = props.className ? props.className : '';

		return wp.element.createElement(
			'div',
			{ className: className + ' timeline-' + releaseType },
			!!focus && wp.element.createElement(
				InspectorControls,
				{ key: 'inspector' },
				wp.element.createElement(SelectControl, {
					type: 'select',
					label: __('WordPress Release Type'),
					value: releaseType,
					onChange: onChangeType,
					options: availableTypes
				}),
				wp.element.createElement(TextControl, {
					type: 'date',
					label: __('Set Release Date'),
					value: releaseDate ? releaseDate : null,
					onChange: onChangeDate,
					'class': 'timeline-date'
				}),
				wp.element.createElement(TextControl, {
					type: 'url',
					label: __('News article link'),
					value: newslink,
					onChange: onChangenewslink
				}),
				wp.element.createElement(TextControl, {
					type: 'url',
					label: __('Blog article link'),
					value: bloglink,
					onChange: onChangebloglink
				})
			),
			wp.element.createElement(
				'div',
				{ className: 'timeline-container' },
				wp.element.createElement(
					'time',
					{ className: 'timeline-date', dateTime: releaseDate },
					releaseDate ? moment(releaseDate).local().format('MMM, Y') : ''
				),
				wp.element.createElement('div', { className: 'separator' }),
				wp.element.createElement(
					'div',
					{ className: 'content-wrap' },
					wp.element.createElement(
						'div',
						{ className: 'content-inner' },
						wp.element.createElement(RichText, {
							className: 'timeline-title',
							tagName: 'h3',
							onChange: onTitleChange,
							value: timelineTitle,
							focus: setFocus,
							placeholder: __('Title'),
							onFocus: onFocusTitle
						}),
						wp.element.createElement(RichText, {
							tagName: 'p',
							className: 'timeline-description',
							placeholder: __('Enter contributors list here'),
							value: timelineContent,
							onChange: onContentChange,
							focus: setFocus,
							onFocus: onFocusContent
						}),
						wp.element.createElement(
							'div',
							{ className: 'postlinks' },
							newslink || bloglink ? wp.element.createElement(
								'strong',
								null,
								'Links: '
							) : null,
							newslink ? wp.element.createElement(
								'a',
								{ href: newslink, className: 'timeline-news-link' },
								__('News')
							) : '',
							bloglink ? wp.element.createElement(
								'a',
								{ href: bloglink, className: 'timeline-blog-link' },
								__('Blog')
							) : ''
						)
					)
				)
			)
		);
	},

	save: function save(props) {
		var _props$attributes2 = props.attributes,
		    releaseType = _props$attributes2.releaseType,
		    releaseDate = _props$attributes2.releaseDate,
		    timelineTitle = _props$attributes2.timelineTitle,
		    timelineContent = _props$attributes2.timelineContent,
		    newslink = _props$attributes2.newslink,
		    bloglink = _props$attributes2.bloglink;


		var className = props.className ? props.className : '';

		return wp.element.createElement(
			'div',
			{ className: className + ' timeline-' + releaseType },
			wp.element.createElement(
				'div',
				{ className: 'timeline-container' },
				wp.element.createElement(
					'time',
					{ className: 'timeline-date', dateTime: releaseDate },
					releaseDate ? moment(releaseDate).local().format('MMM, Y') : ''
				),
				wp.element.createElement('div', { className: 'separator' }),
				wp.element.createElement(
					'div',
					{ className: 'content-wrap' },
					wp.element.createElement(
						'div',
						{ className: 'content-inner' },
						wp.element.createElement(
							'h3',
							{ className: 'timeline-title' },
							wp.element.createElement(
								'span',
								{ className: 'timelineTitle' },
								timelineTitle
							),
							'minor' === releaseType ? wp.element.createElement(
								'span',
								{ className: 'minor-release' },
								__('(Minor Release)')
							) : ''
						),
						wp.element.createElement(
							'p',
							{ className: 'timeline-description', title: 'Contributors' },
							wp.element.createElement('span', { className: 'dashicons dashicons-groups' }),
							wp.element.createElement(
								'span',
								{ className: 'contributor' },
								timelineContent
							)
						),
						wp.element.createElement(
							'div',
							{ className: 'postlinks' },
							newslink || bloglink ? wp.element.createElement(
								'strong',
								null,
								'Links: '
							) : null,
							newslink ? wp.element.createElement(
								'a',
								{ href: newslink, className: 'timeline-news-link' },
								__('News')
							) : '',
							bloglink ? wp.element.createElement(
								'a',
								{ href: bloglink, className: 'timeline-blog-link' },
								__('Blog')
							) : ''
						)
					)
				)
			)
		);
	}
});

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);