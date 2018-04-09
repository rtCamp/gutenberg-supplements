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
__webpack_require__(4);
module.exports = __webpack_require__(7);


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
	},

	getEditWrapperProps: function getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},
	edit: function edit(props) {
		var showCaseLink = props.attributes.showCaseLink,
		    middleware = props.middleware;


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
				middleware.fields.showCaseLink,
				showCaseLink ? wp.element.createElement(
					'a',
					{ href: showCaseLink, title: __('Read More'), className: 'button secondary' },
					__('Read More')
				) : ''
			)
		);
	},
	save: function save(props) {
		var _props$attributes = props.attributes,
		    showCaseImage = _props$attributes.showCaseImage,
		    showCaseTitle = _props$attributes.showCaseTitle,
		    showCaseContent = _props$attributes.showCaseContent,
		    showCaseLink = _props$attributes.showCaseLink;


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
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(6);
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
	edit: function edit(props) {
		var _props$attributes = props.attributes,
		    bgColor = _props$attributes.bgColor,
		    textColor = _props$attributes.textColor,
		    align = _props$attributes.align,
		    className = props.className,
		    isSelected = props.isSelected,
		    middleware = props.middleware;


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
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(9);
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
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);