/**
 * Infobox with Icon
 */

import { isString } from 'lodash';

import './style.scss';
import './editor.scss';

/* Set up variables */
const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
} = wp.blocks;

const {
	SelectControl,
	DropdownMenu,
	RangeControl,
} = wp.components;

/* Register block type */
registerBlockType( 'rtgb/infobox', {

	title: __( 'Info Box' ),
	icon: 'info',
	category: 'common',
	description: __( 'Used to show icon with title and description.' ),

	attributes: {
		align: {
			type: 'string',
			default: 'center',
		},

		infoboxTitle: {
			type: 'array',
			source: 'children',
			selector: '.infoboxTitle',
		},

		infoboxContent: {
			type: 'array',
			source: 'children',
			selector: '.infoboxContent',
		},

		fontelloIcon: {
			type: 'array',
			source: 'children',
			selector: '.icons-wrapper',
		},

		iconPosition: {
			type: 'select',
			default: 'top',
		},
	},

	edit: props => {
		const {
			attributes: {
				infoboxTitle,
				infoboxContent,
				fontelloIcon,
				iconPosition,
				align,
			},
			focus,
			setFocus,
			setAttributes,
			isSelected,
		} = props;

		const availablePosition = [
			{ value: 'top', label: __( 'Top' ) },
			{ value: 'left', label: __( 'Left' ) },
			{ value: 'right', label: __( 'Right' ) },
			{ value: 'bottom', label: __( 'Bottom' ) },
		];

		/* Event handlers */
		const setIcon = newFontelloIcon => {
			setAttributes( { fontelloIcon: newFontelloIcon } );
		};

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' infobox-wrapper icon-position-' + iconPosition }>
				{
					!! focus && (
						<InspectorControls key={ 'inspector' }>
							<SelectControl
								type={ 'select' }
								label={ __( 'Icon Position' ) }
								value={ iconPosition }
								onChange={ ( newIconPosition ) => setAttributes( { iconPosition: newIconPosition } ) }
								options={ availablePosition }
							/>
						</InspectorControls>
					)
				}

				{
					isSelected && (
						<BlockControls key="controls">
							<AlignmentToolbar
								value={ align }
								onChange={ ( nextAlign ) => {
									setAttributes( { align: nextAlign } );
								} }
							/>
						</BlockControls>
					)
				}

				<div className={ 'icons-wrapper align-' + align }>
					<DropdownMenu
						icon={ fontelloIcon ? fontelloIcon : 'move' }
						label={ __( 'Select Icon' ) }
						menuLabel="rtgs-icons"
						controls={ [
							{
								title: 'Move',
								icon: 'move',
								onClick: () => setIcon( 'move' ),
							},
							{
								title: 'icon-facebook',
								icon: <i className="icon-facebook"></i>,
								onClick: () => setIcon( <i className="icon-facebook"></i> ),
							},
							{
								title: 'icon-twitter',
								icon: <i className="icon-twitter"></i>,
								onClick: () => setIcon( <i className="icon-twitter"></i> ),
							},
							{
								title: 'icon-github',
								icon: <i className="icon-github"></i>,
								onClick: () => setIcon( <i className="icon-github"></i> ),
							},
							{
								title: 'icon-wordpress',
								icon: <i className="icon-wordpress"></i>,
								onClick: () => setIcon( <i className="icon-wordpress"></i> ),
							},
							{
								title: 'icon-linkedin',
								icon: <i className="icon-linkedin"></i>,
								onClick: () => setIcon( <i className="icon-linkedin"></i> ),
							},
							{
								title: 'icon-google_plus',
								icon: <i className="icon-google_plus"></i>,
								onClick: () => setIcon( <i className="icon-google_plus"></i> ),
							},
							{
								title: 'icon-design-icon',
								icon: <i className="icon-design-icon"></i>,
								onClick: () => setIcon( <i className="icon-design-icon"></i> ),
							},
							{
								title: 'icon-development-icon',
								icon: <i className="icon-development-icon"></i>,
								onClick: () => setIcon( <i className="icon-development-icon"></i> ),
							},
							{
								title: 'icon-growth-icon',
								icon: <i className="icon-growth-icon"></i>,
								onClick: () => setIcon( <i className="icon-growth-icon"></i> ),
							},
							{
								title: 'icon-planning-icon',
								icon: <i className="icon-planning-icon"></i>,
								onClick: () => setIcon( <i className="icon-planning-icon"></i> ),
							},
							{
								title: 'icon-align-justify',
								icon: <i className="icon-align-justify"></i>,
								onClick: () => setIcon( <i className="icon-align-justify"></i> ),
							},
							{
								title: 'icon-attention',
								icon: <i className="icon-attention"></i>,
								onClick: () => setIcon( <i className="icon-attention"></i> ),
							},
							{
								title: 'icon-block',
								icon: <i className="icon-block"></i>,
								onClick: () => setIcon( <i className="icon-block"></i> ),
							},
							{
								title: 'icon-info',
								icon: <i className="icon-info"></i>,
								onClick: () => setIcon( <i className="icon-info"></i> ),
							},
							{
								title: 'icon-check',
								icon: <i className="icon-check"></i>,
								onClick: () => setIcon( <i className="icon-check"></i> ),
							},
							{
								title: 'icon-quote-left',
								icon: <i className="icon-quote-left"></i>,
								onClick: () => setIcon( <i className="icon-quote-left"></i> ),
							},
							{
								title: 'icon-quote-right',
								icon: <i className="icon-quote-right"></i>,
								onClick: () => setIcon( <i className="icon-quote-right"></i> ),
							},
							{
								title: 'icon-flag',
								icon: <i className="icon-flag"></i>,
								onClick: () => setIcon( <i className="icon-flag"></i> ),
							},
							{
								title: 'icon-user-icon',
								icon: <i className="icon-user-icon"></i>,
								onClick: () => setIcon( <i className="icon-user-icon"></i> ),
							},
							{
								title: 'icon-cart-icon',
								icon: <i className="icon-cart-icon"></i>,
								onClick: () => setIcon( <i className="icon-cart-icon"></i> ),
							},
							{
								title: 'icon-cog',
								icon: <i className="icon-cog"></i>,
								onClick: () => setIcon( <i className="icon-cog"></i> ),
							},
							{
								title: 'icon-move',
								icon: <i className="icon-move"></i>,
								onClick: () => setIcon( <i className="icon-move"></i> ),
							},
							{
								title: 'icon-mail',
								icon: <i className="icon-mail"></i>,
								onClick: () => setIcon( <i className="icon-mail"></i> ),
							},
							{
								title: 'icon-note',
								icon: <i className="icon-note"></i>,
								onClick: () => setIcon( <i className="icon-note"></i> ),
							},
							{
								title: 'icon-down-open-mini',
								icon: <i className="icon-down-open-mini"></i>,
								onClick: () => setIcon( <i className="icon-down-open-mini"></i> ),
							},
							{
								title: 'icon-hdd',
								icon: <i className="icon-hdd"></i>,
								onClick: () => setIcon( <i className="icon-hdd"></i> ),
							},
							{
								title: 'icon-gauge',
								icon: <i className="icon-gauge"></i>,
								onClick: () => setIcon( <i className="icon-gauge"></i> ),
							},
							{
								title: 'icon-doc',
								icon: <i className="icon-doc"></i>,
								onClick: () => setIcon( <i className="icon-doc"></i> ),
							},
							{
								title: 'icon-download-cloud',
								icon: <i className="icon-download-cloud"></i>,
								onClick: () => setIcon( <i className="icon-download-cloud"></i> ),
							},
							{
								title: 'icon-floppy',
								icon: <i className="icon-floppy"></i>,
								onClick: () => setIcon( <i className="icon-floppy"></i> ),
							},
							{
								title: 'icon-signal',
								icon: <i className="icon-signal"></i>,
								onClick: () => setIcon( <i className="icon-signal"></i> ),
							},
							{
								title: 'icon-chat-alt',
								icon: <i className="icon-chat-alt"></i>,
								onClick: () => setIcon( <i className="icon-chat-alt"></i> ),
							},
							{
								title: 'icon-user-circle-o',
								icon: <i className="icon-user-circle-o"></i>,
								onClick: () => setIcon( <i className="icon-user-circle-o"></i> ),
							},
							{
								title: 'icon-handshake-o',
								icon: <i className="icon-handshake-o"></i>,
								onClick: () => setIcon( <i className="icon-handshake-o"></i> ),
							},
							{
								title: 'icon-chart-bar',
								icon: <i className="icon-chart-bar"></i>,
								onClick: () => setIcon( <i className="icon-chart-bar"></i> ),
							},
							{
								title: 'icon-browser',
								icon: <i className="icon-browser"></i>,
								onClick: () => setIcon( <i className="icon-browser"></i> ),
							},
							{
								title: 'icon-internet',
								icon: <i className="icon-internet"></i>,
								onClick: () => setIcon( <i className="icon-internet"></i> ),
							},
							{
								title: 'icon-list',
								icon: <i className="icon-list"></i>,
								onClick: () => setIcon( <i className="icon-list"></i> ),
							},
							{
								title: 'icon-repair',
								icon: <i className="icon-repair"></i>,
								onClick: () => setIcon( <i className="icon-repair"></i> ),
							},
							{
								title: 'icon-speech-bubble',
								icon: <i className="icon-speech-bubble"></i>,
								onClick: () => setIcon( <i className="icon-speech-bubble"></i> ),
							},
							{
								title: 'icon-success',
								icon: <i className="icon-success"></i>,
								onClick: () => setIcon( <i className="icon-success"></i> ),
							},
							{
								title: 'icon-rss',
								icon: <i className="icon-rss"></i>,
								onClick: () => setIcon( <i className="icon-rss"></i> ),
							},

						] }
					/>
				</div>

				<div className="content-inner">
					<RichText
						className={ 'infoboxTitle' }
						tagName={ 'h4' }
						onChange={ ( newInfoboxTitle ) => setAttributes( { infoboxTitle: newInfoboxTitle } ) }
						value={ infoboxTitle }
						focus={ focus }
						placeholder={ __( 'Enter Title' ) }
						onFocus={ setFocus }
						style={ { textAlign: align } }
					/>

					<RichText
						tagName={ 'p' }
						className={ 'infoboxContent' }
						placeholder={ __( 'Enter Description' ) }
						value={ infoboxContent }
						onChange={ ( newInfoboxContent ) => setAttributes( { infoboxContent: newInfoboxContent } ) }
						focus={ focus }
						onFocus={ setFocus }
						style={ { textAlign: align } }
					/>
				</div>

			</div>
		);
	},

	save: props => {
		const {
			attributes: {
				infoboxTitle,
				infoboxContent,
				fontelloIcon,
				iconPosition,
				align,
			},
		} = props;

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' infobox-wrapper icon-position-' + iconPosition }>
				<div className={ 'icons-wrapper align-' + align }>
					{ isString( fontelloIcon ) ? <span className={ 'dashicons dashicons-' + fontelloIcon }></span> : fontelloIcon }
				</div>
				<div className="content-inner">
					<h4 className="infoboxTitle" style={ { textAlign: align } }>{ infoboxTitle }</h4>
					<p className="infoboxContent" style={ { textAlign: align } }>{ infoboxContent }</p>
				</div>
			</div>
		);
	},
} );
