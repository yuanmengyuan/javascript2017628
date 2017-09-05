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


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

{
    var _obj, _obj2;

    //01:当对象中的属性名和属性值相同的时候，可以只写一个；
    var name = "leilei";
    var sex = 'gril';
    var obj = {
        name: name,
        sex: sex
    };
    //console.log(obj)
    //02:对象中的属性名可以是变量；变量需要配合[];
    var obj2 = (_obj = {}, _defineProperty(_obj, name, 123), _defineProperty(_obj, 'name', 456), _defineProperty(_obj, 'say', 'hello'), _obj);
    //03:对象中函数的写法
    var obj3 = (_obj2 = {}, _defineProperty(_obj2, name, 'love vivian'), _defineProperty(_obj2, 'fn', function fn() {
        alert(this[name]);
    }), _obj2);
    //obj3.fn();
    //04：Object.is() 是严格比较；

    //console.log(Object.is(123,'123')) //它们数据类型不一样
    //console.log(Object.is([],[]))//地址不同
    //console.log(Object.is(NaN,NaN))
}
{
    // 05:对象克隆 Object.assign;
    var obj1 = {
        name: 'haha',
        hobby: 'ball'
    };
    /*let obj2={};
    for(var attr in obj1){
        obj2[attr]=obj1[attr];
    }*/
    var _obj3 = Object.assign({}, obj1);
    _obj3.name = 'vivian';
    //console.log(obj2);
    //console.log(obj1);
    //06对象的遍历；keys values entries
    /*for(let key of Object.keys(obj2)){
        console.log(key)
    }*/
    /*for(let val of Object.values(obj2)){
        console.log(val);
    }*/
    /*for(let [index,val] of Object.entries(obj2)){
        console.log(index,val)
    }*/
}
{
    //07:defineProperty() 涉及双向数据绑定的知识；
    var oTxt = document.getElementById('txt');
    var oDiv = document.getElementById('div');
    var _obj4 = {};
    Object.defineProperty(_obj4, 'a', {
        get: function get() {
            console.log('get init');
            return 233;
        },
        set: function set(newAry) {
            console.log('set init');
            oDiv.innerHTML = newAry;
            oTxt.value = newAry;
        }
    });
    oTxt.addEventListener('keyup', function () {
        //改数据
        _obj4.a = this.value;
    });
    _obj4.a = '334555';
    console.log(_obj4.a);
}

/***/ })
/******/ ]);