/**
 * Infobox with Icon
 */

import { isString } from 'lodash';

import './style.scss';
import './editor.scss';

import InfoBox from './block';

/* Set up variables */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

/* Register block type */
registerBlockType( 'rtgb/infobox', {

	title: __( 'Info Box' ),
	icon: 'info',
	category: 'common',
	description: __( 'Used to show icon with title and description.' ),

	attributes: {
		box: {
			type: 'array',
			source: 'query',
			selector: '.rt-box',
			query: {
				infoboxTitle: {
					source: 'children',
					selector: '.infoboxTitle',
				},

				infoboxContent: {
					source: 'children',
					selector: '.infoboxContent',
				},

				fontelloIcon: {
					type: 'array',
					source: 'children',
					selector: '.icons-wrapper span',
				},
			},
			default: [ {}, {}, {} ],
		},

		blockAlign: {
			type: 'string',
			default: 'wide',
		},

		iconPosition: {
			type: 'select',
			default: 'top',
		},

		align: {
			type: 'string',
			default: 'center',
		},

		boxCount: {
			type: 'number',
			default: 3,
		},
	},

	getEditWrapperProps( attributes ) {
		const { blockAlign } = attributes;

		if ( 'wide' === blockAlign || 'full' === blockAlign ) {
			return { 'data-align': blockAlign };
		}
	},

	edit: InfoBox,

	save: props => {
		//const box = props.attributes.box || [];

		const {
			attributes: {
				infoboxTitle,
				infoboxContent,
				fontelloIcon,
				iconPosition,
				align,
				blockAlign,
				boxCount,
			},
		} = props;

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' infobox-wrapper icon-position-' + iconPosition + ' align' + blockAlign + ' has-box-' + boxCount }>
				<div className={ 'icons-wrapper align-' + align }>
					{ isString( fontelloIcon ) ? <span className={ 'dashicons dashicons-' + fontelloIcon }></span> : fontelloIcon }
				</div>
				<div className="content-inner" style={ { textAlign: align } }>
					<h4 className="infoboxTitle" style={ { textAlign: align } }>{ infoboxTitle }</h4>
					<p className="infoboxContent" style={ { textAlign: align } }>{ infoboxContent }</p>
				</div>
			</div>
		);
	},
} );
