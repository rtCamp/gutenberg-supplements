import './style.scss';
import './editor.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( 'rtgb/highlight-box', {

	title: __( 'Highlight Box' ),
	icon: 'admin-customizer',
	category: 'layout',
	description: __( 'Use to display highlight box with action button.' ),

	attributes: {

		blockAlign: {
			type: 'string',
			field: {
				type: 'block-alignment-toolbar',
				placement: 'block-controls',
				controls: [ 'wide', 'full' ],
			},
		},

		textAlign: {
			type: 'string',
			field: {
				type: 'alignment-toolbar',
				placement: 'block-controls',
			},
		},

		backgroundImage: {
			type: 'object',
			field: {
				type: 'media-icon',
				mediaType: 'image',
				placement: 'block-controls',
			},
		},

		title: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'highlight-title',
				placeholder: __( 'Title' ),
				tagName: 'h2',
				formattingControls: [ '' ],
			},
			selector: '.highlight-title',
			source: 'children',
		},

		content: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'highlight-content',
				placeholder: __( 'Content' ),
				tagName: 'div',
				multiline: 'p',
				inlineToolbar: false,
			},
			selector: '.highlight-content',
			source: 'children',
		},

		button: {
			type: 'array',
			field: {
				type: 'button-editable',
				formattingControls: [ '' ],
				helperFields: {
					link: 'buttonEditableLink',
					backgroundColor: 'buttonBgColor',
					color: 'buttonTextColor',
				},
			},
			source: 'children',
			selector: '.button',
		},

		bgColor: {
			type: 'string',
			field: {
				type: 'color',
				label: __( 'Background Color' ),
				placement: 'inspector',
			},
		},

		textColor: {
			type: 'string',
			field: {
				type: 'color',
				label: __( 'Text Color' ),
				placement: 'inspector',
			},
		},

		buttonEditableLink: {
			type: 'string',
			field: {
				type: 'link',
			},
		},

		buttonBgColor: {
			type: 'string',
			field: {
				type: 'color',
				label: __( 'Button Background Color' ),
				placement: 'inspector',
			},
		},

		buttonTextColor: {
			type: 'string',
			field: {
				type: 'color',
				label: __( 'Button Text Color' ),
				placement: 'inspector',
			},
		},
		dimRatio: {
			type: 'string',
			field: {
				type: 'range',
				label: __( 'Background Dimness' ),
				placement: 'inspector',
				min: 0,
				max: 100,
				step: 10,
			},
			default: 0,
		},
	},

	edit: props => {
		const {
			attributes: {
				bgColor,
				textColor,
				blockAlign,
				textAlign,
				backgroundImage,
				dimRatio,
			},
			className,
			middleware,
		} = props;

		const dataTextAlign = textAlign ? ' text-' + textAlign : '';
		const dataBlockAlign = blockAlign ? ' align' + blockAlign : '';
		const backgroundImageUrl = backgroundImage ? 'url(' + backgroundImage.url + ')' : undefined;

		const classes = classnames(
			className,
			'highlight-box-wrapper',
			dataBlockAlign,
			dataTextAlign,
			dimRatioToClass( dimRatio ),
			{
				'has-background-dim': dimRatio !== 0,
				'has-background': bgColor,
				'has-background-image': backgroundImage !== undefined,
			}
		);

		const style = {
			backgroundColor: bgColor,
			backgroundImage: backgroundImageUrl,
			color: textColor,
		};

		return (
			<div className={ classes } style={ style }>
				{ middleware.blockControls }
				{ middleware.inspectorControls }
				<div className="container">
					{ middleware.fields.title }
					{ middleware.fields.content }
					{ middleware.fields.button }
				</div>
			</div>
		);
	},

	save: props => {
		const {
			attributes: {
				title,
				content,
				bgColor,
				textColor,
				blockAlign,
				textAlign,
				button,
				buttonEditableLink,
				buttonTextColor,
				buttonBgColor,
				backgroundImage,
				dimRatio,
			},
			className,
		} = props;

		const dataTextAlign = textAlign ? ' text-' + textAlign : '';
		const dataBlockAlign = blockAlign ? ' align' + blockAlign : '';
		const backgroundImageUrl = backgroundImage ? 'url(' + backgroundImage.url + ')' : undefined;

		const classes = classnames(
			className,
			'highlight-box-wrapper',
			dataBlockAlign,
			dataTextAlign,
			dimRatioToClass( dimRatio ),
			{
				'has-background-dim': dimRatio !== 0,
				'has-background': bgColor,
				'has-background-image': backgroundImage !== undefined,
			}
		);

		const style = {
			backgroundColor: bgColor,
			backgroundImage: backgroundImageUrl,
			color: textColor,
		};

		return (
			<div className={ classes } style={ style }>
				<div className="container">
					<h2 className="highlight-title">{ title }</h2>
					<div className="highlight-content">{ content }</div>
					{ button && buttonEditableLink ? <a href={ buttonEditableLink } className="button" style={ { backgroundColor: buttonBgColor, color: buttonTextColor } }>{ button }</a> : '' }
				</div>
			</div>
		);
	},

} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ? null : 'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}
