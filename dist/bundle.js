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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/javascript/dtl-engine.js":
/*!**************************************!*\
  !*** ./src/javascript/dtl-engine.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/*\n    Author: Binson,\n    Desc: Nothing more than an attempt to build a tiny template engine.. \n    Version: 0.0.1-beta\n*/\n(function (fn) {\n  \"use strict\";\n\n  var dtlEngine = function dtlEngine(strFrag, data) {\n    var formatter = !/[^\\w\\-.:]/.test(strFrag) ? dtlEngine.cache[strFrag] = dtlEngine.cache[strFrag] || dtlEngine(dtlEngine.load(strFrag)) : new Function(dtlEngine.templateData + \",dtlEngine\", \"var _e=dtlEngine.encode\" + dtlEngine.helper + \",_s='\" + strFrag.replace(dtlEngine.syntaxRegExp, dtlEngine.parser) + \"';return _s;\");\n    return data ? formatter(data, dtlEngine) : function (data) {\n      return formatter(data, dtlEngine);\n    };\n  };\n\n  dtlEngine.cache = {};\n\n  dtlEngine.inject = function (id) {\n    return document.getElementById(id).innerHTML;\n  };\n  /*\n     Supported  template syntax are  {%=expression%}.\n  */\n\n\n  dtlEngine.syntaxRegExp = /([\\s'\\\\])(?!(?:[^{]|\\{(?!%))*%\\})|(?:\\{%(=|#)([\\s\\S]+?)%\\})|(\\{%)|(%\\})/g;\n\n  dtlEngine.parser = function (strTpl, specChar, interpolator, evaluatorStart, evaluatorEnd) {\n    if (specChar) {\n      return {\n        \"\\n\": \"\\\\n\",\n        \"\\r\": \"\\\\r\",\n        \"\\t\": \"\\\\t\",\n        \" \": \" \"\n      }[specChar] || \"\\\\\" + specChar;\n    }\n\n    if (interpolator) {\n      if (interpolator === \"=\") {\n        return \"'+_e(\" + evaluatorStart + \")+'\";\n      }\n\n      return \"'+(\" + evaluatorStart + \"==null?'':\" + evaluatorStart + \")+'\";\n    }\n\n    if (evaluatorStart) {\n      return \"';\";\n    }\n\n    if (evaluatorEnd) {\n      return \"_s+='\";\n    }\n  };\n\n  dtlEngine.encodeReg = /[<>&\"'\\x00]/g;\n  dtlEngine.encodeSymbols = {\n    \"<\": \"&lt;\",\n    \">\": \"&gt;\",\n    \"&\": \"&amp;\",\n    '\"': \"&quot;\",\n    \"'\": \"&#39;\"\n  };\n\n  dtlEngine.encode = function (template) {\n    return (template == null ? \"\" : \"\" + template).replace(dtlEngine.encodeReg, function (c) {\n      return dtlEngine.encodeSymbols[c] || \"\";\n    });\n  };\n\n  dtlEngine.templateData = \"td\";\n  dtlEngine.helper = \",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}\" + \",include=function(s,d){_s+=tmpl(s,d);}\";\n\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n      return dtlEngine;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(this);\n\n//# sourceURL=webpack:///./src/javascript/dtl-engine.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/styles.scss */ \"./src/sass/styles.scss\");\n/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ }),

/***/ "./src/sass/styles.scss":
/*!******************************!*\
  !*** ./src/sass/styles.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/styles.scss?");

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./src/javascript/index.js ./src/javascript/dtl-engine.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/javascript/index.js */\"./src/javascript/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/javascript/dtl-engine.js */\"./src/javascript/dtl-engine.js\");\n\n\n//# sourceURL=webpack:///multi_./src/javascript/index.js_./src/javascript/dtl-engine.js?");

/***/ })

/******/ });