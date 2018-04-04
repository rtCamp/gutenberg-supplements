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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);



var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    RichText = _wp$blocks.RichText,
    InspectorControls = _wp$blocks.InspectorControls,
    MediaUpload = _wp$blocks.MediaUpload,
    BlockControls = _wp$blocks.BlockControls;
var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    Placeholder = _wp$components.Placeholder,
    Button = _wp$components.Button,
    Toolbar = _wp$components.Toolbar,
    IconButton = _wp$components.IconButton;


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
				placement: 'inspector'
			}
		}
	},

	getEditWrapperProps: function getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},
	edit: function edit(props, middleware) {
		var caseStudyLink = props.attributes.caseStudyLink;


		var className = props.className ? props.className : '';

		console.log();

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
				middleware.fields.caseStudyLink,
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
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);