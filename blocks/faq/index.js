// Edit and Save class, located in /block directory

import Edit from "./Edit.js";
import Save from "./Save.js";


// Initializing required components
const {registerBlockType} = wp.blocks;
const {__} = wp.i18n;


// Registering faq block
registerBlockType(
    'st-faq/st-faq-block',
    {
        title: __('ST Faq'),
        category: 'layout',
        icon: 'format-quote',
        keywords: [__('faq'), __('question')],

        attributes: {

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
            questionAlign: {
                type: 'array',
                default: [],
            },
            answerAlign: {
                type: 'array',
                default: [],
            },
            numOfCols: {
                type: 'number',
                default: 1,
            },
        },

        // Edit is located inside /block/ directory
        edit: Edit,

        // Save is located inside /block/ directory
        save: Save,
    }
);
