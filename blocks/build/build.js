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

__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(8);
module.exports = __webpack_require__(11);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);




var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;


registerBlockType('rtgb/highlight-box', {

	title: __('Highlight Box'),
	icon: 'admin-customizer',
	category: 'layout',
	description: __('Use to display highlight box with action button.'),

	attributes: {

		blockAlign: {
			type: 'string',
			field: {
				type: 'block-alignment-toolbar',
				placement: 'block-controls',
				controls: ['wide', 'full']
			}
		},

		textAlign: {
			type: 'string',
			field: {
				type: 'alignment-toolbar',
				placement: 'block-controls'
			}
		},

		backgroundImage: {
			type: 'object',
			field: {
				type: 'media-icon',
				mediaType: 'image',
				placement: 'block-controls'
			}
		},

		title: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'highlight-title',
				placeholder: __('Title'),
				tagName: 'h2',
				formattingControls: []
			},
			selector: '.highlight-title',
			source: 'children'
		},

		content: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'highlight-content',
				placeholder: __('Content'),
				tagName: 'div',
				multiline: 'p',
				inlineToolbar: false
			},
			selector: '.highlight-content',
			source: 'children'
		},

		button: {
			type: 'array',
			field: {
				type: 'button-editable',
				formattingControls: [],
				helperFields: {
					link: 'buttonEditableLink',
					backgroundColor: 'buttonBgColor',
					color: 'buttonTextColor'
				}
			},
			source: 'children',
			selector: '.button'
		},

		bgColor: {
			type: 'string',
			field: {
				type: 'color',
				title: __('Background Color'),
				placement: 'inspector'
			}
		},

		textColor: {
			type: 'string',
			field: {
				type: 'color',
				title: __('Text Color'),
				placement: 'inspector'
			}
		},

		buttonEditableLink: {
			type: 'string',
			field: {
				type: 'link'
			}
		},

		buttonBgColor: {
			type: 'string',
			field: {
				type: 'color',
				title: __('Button Background Color'),
				placement: 'inspector'
			}
		},

		buttonTextColor: {
			type: 'string',
			field: {
				type: 'color',
				title: __('Button Text Color'),
				placement: 'inspector'
			}
		},
		dimRatio: {
			type: 'string',
			field: {
				type: 'range',
				label: __('Background Dimness'),
				placement: 'inspector',
				min: 0,
				max: 100,
				step: 10
			},
			default: 0
		}
	},

	edit: function edit(props, middleware) {
		var _props$attributes = props.attributes,
		    bgColor = _props$attributes.bgColor,
		    textColor = _props$attributes.textColor,
		    blockAlign = _props$attributes.blockAlign,
		    textAlign = _props$attributes.textAlign,
		    backgroundImage = _props$attributes.backgroundImage,
		    dimRatio = _props$attributes.dimRatio,
		    className = props.className;


		var dataTextAlign = textAlign ? ' text-' + textAlign : '';
		var dataBlockAlign = blockAlign ? ' align' + blockAlign : '';
		var backgroundImageUrl = backgroundImage ? 'url(' + backgroundImage.url + ')' : undefined;

		var classes = __WEBPACK_IMPORTED_MODULE_2_classnames___default()(className, 'highlight-box-wrapper', dataBlockAlign, dataTextAlign, dimRatioToClass(dimRatio), {
			'has-background-dim': dimRatio !== 0,
			'has-background': bgColor,
			'has-background-image': backgroundImage !== undefined
		});

		var style = {
			backgroundColor: bgColor,
			backgroundImage: backgroundImageUrl,
			color: textColor
		};

		return wp.element.createElement(
			'div',
			{ className: classes, style: style },
			middleware.blockControls,
			middleware.inspectorControls,
			wp.element.createElement(
				'div',
				{ className: 'container' },
				middleware.fields.title,
				middleware.fields.content,
				middleware.fields.button
			)
		);
	},


	save: function save(props) {
		var _props$attributes2 = props.attributes,
		    title = _props$attributes2.title,
		    content = _props$attributes2.content,
		    bgColor = _props$attributes2.bgColor,
		    textColor = _props$attributes2.textColor,
		    blockAlign = _props$attributes2.blockAlign,
		    textAlign = _props$attributes2.textAlign,
		    button = _props$attributes2.button,
		    buttonEditableLink = _props$attributes2.buttonEditableLink,
		    buttonTextColor = _props$attributes2.buttonTextColor,
		    buttonBgColor = _props$attributes2.buttonBgColor,
		    backgroundImage = _props$attributes2.backgroundImage,
		    dimRatio = _props$attributes2.dimRatio,
		    className = props.className;


		var dataTextAlign = textAlign ? ' text-' + textAlign : '';
		var dataBlockAlign = blockAlign ? ' align' + blockAlign : '';
		var backgroundImageUrl = backgroundImage ? 'url(' + backgroundImage.url + ')' : undefined;

		var classes = __WEBPACK_IMPORTED_MODULE_2_classnames___default()(className, 'highlight-box-wrapper', dataBlockAlign, dataTextAlign, dimRatioToClass(dimRatio), {
			'has-background-dim': dimRatio !== 0,
			'has-background': bgColor,
			'has-background-image': backgroundImage !== undefined
		});

		var style = {
			backgroundColor: bgColor,
			backgroundImage: backgroundImageUrl,
			color: textColor
		};

		return wp.element.createElement(
			'div',
			{ className: classes, style: style },
			wp.element.createElement(
				'div',
				{ className: 'container' },
				wp.element.createElement(
					'h2',
					{ className: 'highlight-title' },
					title
				),
				wp.element.createElement(
					'div',
					{ className: 'highlight-content' },
					content
				),
				button && buttonEditableLink ? wp.element.createElement(
					'a',
					{ href: buttonEditableLink, className: 'button', style: { backgroundColor: buttonBgColor, color: buttonTextColor } },
					button
				) : ''
			)
		);
	}

});

function dimRatioToClass(ratio) {
	return ratio === 0 || ratio === 50 ? null : 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);



var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;


registerBlockType('rtgb/showcase', {

	title: __('Showcase'),
	icon: 'portfolio',
	category: 'layout',
	description: __('Use for showcase'),

	attributes: {

		showCaseTitle: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'showcase-title',
				placeholder: __('Showcase Title'),
				tagName: 'h3',
				inlineToolbar: false
			},
			selector: '.showcase-title',
			source: 'children'
		},

		showCaseContent: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'showcase-content',
				placeholder: __('Showcase description'),
				tagName: 'div',
				multiline: 'p',
				inlineToolbar: false
			},
			selector: '.showcase-content',
			source: 'children'
		},

		showCaseImage: {
			type: 'object',
			field: {
				type: 'image',
				buttonText: __('Upload'),
				inputUrl: false,
				imagePlaceholder: true,
				removeButtonText: __('Remove')
			}
		},

		showCaseLink: {
			type: 'string',
			field: {
				type: 'link',
				placement: 'inspector',
				label: __('Showcase link')
			}
		}
	},

	deprecated: [{
		save: function save(props) {
			var _props$attributes = props.attributes,
			    showCaseImage = _props$attributes.showCaseImage,
			    showCaseTitle = _props$attributes.showCaseTitle,
			    showCaseContent = _props$attributes.showCaseContent,
			    showCaseLink = _props$attributes.showCaseLink;


			var className = props.className ? props.className : '';
			var imageContent = '';

			imageContent = wp.element.createElement(
				'div',
				{ className: 'image-container' },
				wp.element.createElement(
					'figure',
					null,
					wp.element.createElement('img', { src: showCaseImage.url, alt: showCaseImage.title })
				)
			);

			return wp.element.createElement(
				'div',
				{ className: className + ' showcase-wrapper alignwide' },
				imageContent,
				wp.element.createElement(
					'div',
					{ className: 'info-container' },
					showCaseLink ? wp.element.createElement(
						'h3',
						null,
						wp.element.createElement(
							'a',
							{ href: showCaseLink, className: 'showcase-title' },
							showCaseTitle
						)
					) : wp.element.createElement(
						'h3',
						{ className: 'showcase-title' },
						showCaseTitle
					),
					wp.element.createElement(
						'div',
						{ className: 'showcase-content' },
						showCaseContent
					),
					showCaseLink ? wp.element.createElement(
						'a',
						{
							href: showCaseLink,
							title: __('Read More'),
							className: 'button secondary' },
						__('Read More')
					) : ''
				)
			);
		},

		attributes: {
			showCaseTitle: {
				type: 'array',
				field: {
					type: 'rich-text',
					className: 'showcase-title',
					placeholder: __('Showcase Title'),
					tagName: 'h3'
				},
				selector: '.showcase-title',
				source: 'children'
			},

			showCaseContent: {
				type: 'array',
				field: {
					type: 'rich-text',
					className: 'showcase-content',
					placeholder: __('Showcase description'),
					tagName: 'div',
					multiline: 'p'
				},
				selector: '.showcase-content',
				source: 'children'
			},

			showCaseImage: {
				type: 'object',
				field: {
					type: 'image',
					buttonText: __('Upload'),
					imagePlaceholder: true,
					removeButtonText: __('Remove')
				}
			},

			showCaseLink: {
				type: 'string',
				field: {
					type: 'link',
					placement: 'inspector',
					label: __('Showcase link')
				}
			}
		}
	}],

	getEditWrapperProps: function getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},
	edit: function edit(props, middleware) {
		var showCaseLink = props.attributes.showCaseLink;


		var className = props.className ? props.className : '';

		return wp.element.createElement(
			'div',
			{ className: className + ' showcase-wrapper alignwide' },
			wp.element.createElement(
				'div',
				{ className: 'image-container' },
				middleware.fields.showCaseImage
			),
			wp.element.createElement(
				'div',
				{ className: 'info-container' },
				middleware.inspectorControls,
				middleware.fields.showCaseTitle,
				middleware.fields.showCaseContent,
				showCaseLink ? wp.element.createElement(
					'a',
					{ href: showCaseLink, title: __('Read More'), className: 'button secondary' },
					__('Read More')
				) : ''
			)
		);
	},
	save: function save(props) {
		var _props$attributes2 = props.attributes,
		    showCaseImage = _props$attributes2.showCaseImage,
		    showCaseTitle = _props$attributes2.showCaseTitle,
		    showCaseContent = _props$attributes2.showCaseContent,
		    showCaseLink = _props$attributes2.showCaseLink;


		var className = props.className ? props.className : '';
		var imageContent = '';

		if (showCaseImage) {
			var imageSrc = wp.element.createElement(
				'figure',
				null,
				wp.element.createElement('img', { src: showCaseImage.url, alt: showCaseImage.title })
			);

			imageContent = wp.element.createElement(
				'div',
				{ className: 'image-container' },
				showCaseLink ? wp.element.createElement(
					'a',
					{ href: showCaseLink },
					imageSrc
				) : imageSrc
			);
		}

		return wp.element.createElement(
			'div',
			{ className: className + ' showcase-wrapper alignwide' },
			imageContent,
			wp.element.createElement(
				'div',
				{ className: 'info-container' },
				showCaseLink ? wp.element.createElement(
					'h3',
					null,
					wp.element.createElement(
						'a',
						{ href: showCaseLink, className: 'showcase-title' },
						showCaseTitle
					)
				) : wp.element.createElement(
					'h3',
					{ className: 'showcase-title' },
					showCaseTitle
				),
				wp.element.createElement(
					'div',
					{ className: 'showcase-content' },
					showCaseContent
				),
				showCaseLink ? wp.element.createElement(
					'a',
					{ href: showCaseLink, title: __('Read More'), className: 'button secondary' },
					__('Read More')
				) : ''
			)
		);
	}
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);



var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;


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
				placeholder: false,
				fileUpload: false,
				inputUrl: false,
				mediaButtonText: __('Upload'),
				removeButtonText: __('Remove')
			}
		},

		content: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-content',
				inlineToolbar: false,
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
				inlineToolbar: false,
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
				inlineToolbar: false,
				placeholder: __('Company'),
				tagName: 'p'
			},
			selector: '.testimonial-company',
			source: 'children'
		},

		align: {
			type: 'string',
			field: {
				type: 'block-alignment-toolbar',
				placement: 'block-controls',
				controls: ['wide', 'full']
			}
		},

		bgColor: {
			type: 'string',
			field: {
				type: 'color',
				title: __('Background Color'),
				placement: 'inspector'
			}
		},

		textColor: {
			type: 'string',
			field: {
				type: 'color',
				title: __('Text Color'),
				placement: 'inspector'
			}
		}
	},

	edit: function edit(props, middleware) {
		var _props$attributes = props.attributes,
		    bgColor = _props$attributes.bgColor,
		    textColor = _props$attributes.textColor,
		    align = _props$attributes.align,
		    className = props.className;


		var hasBackground = bgColor ? ' has-background' : '';
		var dataAlign = align ? ' align' + align : '';

		return [middleware.inspectorControls, middleware.blockControls, wp.element.createElement(
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
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);
/* global moment */




/* Set up variables */
var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;

/* Register block type */

registerBlockType('rtgb/timeline', {

	title: __('Timeline'),
	icon: 'list-view',
	category: 'common',
	description: __('Used to show WordPress contributors list'),

	attributes: {

		title: {
			type: 'array',
			source: 'children',
			selector: '.timelineTitle',
			field: {
				type: 'rich-text',
				className: 'timeline-title',
				placeholder: __('Enter title'),
				tagName: 'h4',
				formattingControls: []
			}
		},

		content: {
			type: 'array',
			source: 'children',
			selector: '.contributor',
			field: {
				type: 'rich-text',
				className: 'contributor',
				placeholder: __('Enter timeline description'),
				tagName: 'p',
				formattingControls: []
			}
		},

		releaseDate: {
			type: 'string',
			source: 'attribute',
			attribute: 'datetime',
			selector: '.timeline-date',
			field: {
				type: 'date',
				label: __('Select Date'),
				placement: 'inspector'
			}
		},

		releaseType: {
			type: 'string',
			field: {
				type: 'radio',
				label: __('Type'),
				placement: 'inspector',
				options: [{
					value: 'major',
					label: __('Major')
				}, {
					value: 'minor',
					label: __('Minor')
				}]
			},
			default: 'major'
		},

		newsLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-news-link',
			field: {
				type: 'link',
				placement: 'inspector',
				label: __('Enter News Link')
			}
		},

		blogLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-blog-link',
			field: {
				type: 'link',
				placement: 'inspector',
				label: __('Enter Blog Link')
			}
		}

	},

	edit: function edit(props, middleware) {
		var _props$attributes = props.attributes,
		    newsLink = _props$attributes.newsLink,
		    blogLink = _props$attributes.blogLink,
		    releaseDate = _props$attributes.releaseDate;


		var className = props.className ? props.className : '';
		var releaseType = props.attributes.releaseType ? props.attributes.releaseType : 'major';

		return wp.element.createElement(
			'div',
			{ className: className + ' timeline-' + releaseType },
			middleware.inspectorControls,
			wp.element.createElement(
				'div',
				{ className: 'timeline-container' },
				wp.element.createElement(
					'time',
					{ className: 'timeline-date', dateTime: releaseDate },
					!!releaseDate && moment(releaseDate).local().format('MMM, Y')
				),
				wp.element.createElement('div', { className: 'separator' }),
				wp.element.createElement(
					'div',
					{ className: 'content-wrap' },
					wp.element.createElement(
						'div',
						{ className: 'content-inner' },
						middleware.fields.title,
						middleware.fields.content,
						wp.element.createElement(
							'div',
							{ className: 'postlinks' },
							!!(newsLink || blogLink) && wp.element.createElement(
								'strong',
								null,
								__('Links:')
							),
							!!newsLink && wp.element.createElement(
								'a',
								{ href: newsLink, className: 'timeline-news-link' },
								__('News')
							),
							!!blogLink && wp.element.createElement(
								'a',
								{ href: blogLink, className: 'timeline-blog-link' },
								__('Blog')
							)
						)
					)
				)
			)
		);
	},


	save: function save(props) {
		var _props$attributes2 = props.attributes,
		    title = _props$attributes2.title,
		    content = _props$attributes2.content,
		    releaseDate = _props$attributes2.releaseDate,
		    newsLink = _props$attributes2.newsLink,
		    blogLink = _props$attributes2.blogLink;


		var className = props.className ? props.className : '';
		var releaseType = props.attributes.releaseType ? props.attributes.releaseType : 'major';

		return wp.element.createElement(
			'div',
			{ className: className + ' timeline-' + releaseType },
			wp.element.createElement(
				'div',
				{ className: 'timeline-container' },
				wp.element.createElement(
					'time',
					{ className: 'timeline-date', dateTime: releaseDate },
					!!releaseDate && moment(releaseDate).local().format('MMM, Y')
				),
				wp.element.createElement('div', { className: 'separator' }),
				wp.element.createElement(
					'div',
					{ className: 'content-wrap' },
					wp.element.createElement(
						'div',
						{ className: 'content-inner' },
						wp.element.createElement(
							'h4',
							{ className: 'timeline-title' },
							wp.element.createElement(
								'span',
								{ className: 'timelineTitle' },
								title
							),
							!!'minor' === releaseType && wp.element.createElement(
								'span',
								{ className: 'minor-release' },
								__('(Minor Release)')
							)
						),
						wp.element.createElement(
							'p',
							{ className: 'timeline-description' },
							wp.element.createElement(
								'span',
								{ className: 'contributor' },
								content
							)
						),
						wp.element.createElement(
							'div',
							{ className: 'postlinks' },
							!!(newsLink || blogLink) && wp.element.createElement(
								'strong',
								null,
								__('Links:')
							),
							!!newsLink && wp.element.createElement(
								'a',
								{ href: newsLink, className: 'timeline-news-link' },
								__('News')
							),
							!!blogLink && wp.element.createElement(
								'a',
								{ href: blogLink, className: 'timeline-blog-link' },
								__('Blog')
							)
						)
					)
				)
			)
		);
	}

});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);