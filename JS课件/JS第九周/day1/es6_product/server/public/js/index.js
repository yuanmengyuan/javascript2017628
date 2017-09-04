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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateObject = _taggedTemplateLiteral(["", "\u559C\u6B22\u8BF4", ""], ["", "\u559C\u6B22\u8BF4", ""]),
    _templateObject2 = _taggedTemplateLiteral(["\u4F60\u597D\n\u5317\u4EAC"], ["\u4F60\u597D\\n\u5317\u4EAC"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

{
    var abc = function abc(target, v1, v2) {
        console.log(v2);
    };
    //04:字符串编码的转换
    //05:includes；


    //字符串
    //字符串循环：for...of
    var str = "\u4F60\u597D\u554A\uFF1A\u857E 123";
    /*for(let i=0; i<str.length; i++){
        console.log(str[i]);
    }*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var val = _step.value;
        }
        //console.log(val);

        // let str="rgba("+Math.random(0,255)+","+Math.random(0,255)+","+Math.random(0,255)+",.4)";
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var name = "张蕾";
    var say = "hello";
    //02：模板字符串：1）用撇`` 2）变量${xxx}
    var str2 = name + "\u8BF4\u4E86" + say;
    //console.log(str2);
    //03:标签模板，获取模板字符串中的变量
    abc(_templateObject, name, say);
    var str3 = '你好啊，北京';
    console.log(str3.includes('坏话'));
    //06:repeat重复的
    var str4 = 'hello!';
    str4 = str4.repeat(3);
    console.log(str4);
    //07 填充:padStart前面填充  padEnd后面填充
    var str5 = '8';
    //str5=str5.padStart(3,0);
    str5 = str5.padEnd(3, 88);
    console.log(str5);
    //String.raw 可以让\n之类的失效；
    console.log(String.raw(_templateObject2));
    //startsWidth 和 endsWidth
    var str6 = '你好北京';
    console.log(str6.startsWith('你'));
    console.log(str6.endsWith('你好北京'));
}

/***/ })
/******/ ]);