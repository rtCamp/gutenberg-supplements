/**
 * import Edit and Save components
 */
import Edit from "./Edit.js";
import Save from "./Save.js";


/**
 * Declare required elements
 */
const {registerBlockType} = wp.blocks;
const {__} = wp.i18n;


/**
 * Register FAQ block
 */
registerBlockType(
    'st-faq/st-faq-block',
    {
        title: __('ST Faq'),
        category: 'layout',
        icon: 'format-quote',
        keywords: [__('faq'), __('question')],

        attributes: {

			/**
             * questions content list
			 */
			questions: {
				type: 'array',
                source: 'query',
                selector: 'h4.faq-question',
                query: {
                    data: {
                        source: 'children',
                        selector: '',
                    },
                },
                default: [],
            },

			/**
             * answers content list
			 */
			answers: {
				type: 'array',
                source: 'query',
                selector: 'div.faq-panel',
                query: {
                    data: {
                        source: 'children',
                        selector: '',
                    },
                },
                default: [],
            },

			/**
             * questions content alignment
			 */
			questionAlign: {
				type: 'array',
                default: [],
            },

			/**
			 * answers content alignment
			 */
            answerAlign: {
                type: 'array',
                default: [],
            },

			/**
			 * number of columns
			 */
            numOfCols: {
                type: 'number',
                default: 1,
            },
        },

        edit: Edit,

        save: Save,
    }
);
