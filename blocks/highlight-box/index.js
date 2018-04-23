//import './style.scss';
import './editor.scss';

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
				inlineToolbar: false,
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
				innerFields: {
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
	},

	edit: props => {
		const {
			attributes: {
				bgColor,
				textColor,
				blockAlign,
				textAlign,
				backgroundImage,
			},
			className,
			middleware,
		} = props;

		const hasBackground = bgColor || backgroundImage ? ' has-background' : '';
		const dataTextAlign = textAlign ? ' text-' + textAlign : '';
		const dataBlockAlign = blockAlign ? ' align' + blockAlign : '';
		const backgroundImageUrl = backgroundImage ? 'url(' + backgroundImage.url + ')' : null;

		return (
			<div className={ className + ' highlight-box-wrapper ' + hasBackground + dataBlockAlign + dataTextAlign } style={ { backgroundColor: bgColor, color: textColor, backgroundImage: backgroundImageUrl } }>
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
			},
			className,
		} = props;

		const hasBackground = bgColor ? ' has-background' : '';
		const dataTextAlign = textAlign ? ' text-' + textAlign : '';
		const dataBlockAlign = blockAlign ? ' align' + blockAlign : '';
		const backgroundImageUrl = backgroundImage ? 'url(' + backgroundImage.url + ')' : null;

		return (
			<div className={ className + ' highlight-box-wrapper ' + hasBackground + dataBlockAlign + dataTextAlign } style={ { backgroundColor: bgColor, color: textColor, backgroundImage: backgroundImageUrl } }>
				<div className="container">
					<h2 className="highlight-title">{ title }</h2>
					<div className="highlight-content">{ content }</div>
					{ button && buttonEditableLink ? <a href={ buttonEditableLink } className="button" style={ { backgroundColor: buttonBgColor, color: buttonTextColor } }>{ button }</a> : '' }
				</div>
			</div>
		);
	},

} );
