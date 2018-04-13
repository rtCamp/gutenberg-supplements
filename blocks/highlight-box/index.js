//import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
} = wp.blocks;

registerBlockType( 'rtgb/highlight-box', {

	title: __( 'Highlight Box' ),
	icon: 'admin-customizer',
	category: 'layout',
	description: __( 'Use to display highlight box with action button.' ),

	attributes: {

		title: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'highlight-title',
				placeholder: __( 'Title' ),
				tagName: 'h2',
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
			},
			selector: '.highlight-content',
			source: 'children',
		},

		button: {
			type: 'object',
			field: {
				type: 'button-editable',
			},
			selector: '.button',
		},

		textAlign: {
			type: 'string',
			default: 'center',
		},

		blockAlign: {
			type: 'string',
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

	getEditWrapperProps( attributes ) {
		const { blockAlign } = attributes;

		if ( 'full' === blockAlign || 'center' === blockAlign || 'wide' === blockAlign ) {
			return { 'data-align': blockAlign };
		}
	},

	edit: props => {
		const {
			attributes: {
				bgColor,
				textColor,
				blockAlign,
				textAlign,
				buttonTextColor,
				buttonBgColor,
			},
			className,
			isSelected,
			middleware,
			setAttributes,
		} = props;

		const hasBackground = bgColor ? ' has-background' : '';
		const dataTextAlign = textAlign ? ' text-' + textAlign : '';
		const dataBlockAlign = blockAlign ? ' align' + blockAlign : '';

		const controls = isSelected && [
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ blockAlign }
					onChange={ ( newBlockAlign ) => {
						setAttributes( { blockAlign: newBlockAlign } );
					} }
					controls={ [ 'center', 'wide', 'full' ] }
				/>

				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( newTextAlign ) => {
						setAttributes( { textAlign: newTextAlign } );
					} }
				/>
			</BlockControls>,
		];

		middleware.fields.button.props.style = {
			backgroundColor: buttonBgColor,
			color: buttonTextColor,
		};

		return (
			<div className={ className + ' highlight-box-wrapper ' + hasBackground + dataBlockAlign + dataTextAlign } style={ { backgroundColor: bgColor, color: textColor } }>
				{ middleware.inspectorControls }
				{ controls }
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
				button,
				bgColor,
				textColor,
				blockAlign,
				textAlign,
				buttonTextColor,
				buttonBgColor,
			},
			className,
		} = props;

		const hasBackground = bgColor ? ' has-background' : '';
		const dataTextAlign = textAlign ? ' text-' + textAlign : '';
		const dataBlockAlign = blockAlign ? ' align' + blockAlign : '';

		return (
			<div className={ className + ' highlight-box-wrapper ' + hasBackground + dataBlockAlign + dataTextAlign } style={ { backgroundColor: bgColor, color: textColor } }>
				<div className="container">
					<h2 className="highlight-title">{ title }</h2>
					<div className="highlight-content">{ content }</div>
					<a href={ button.link } className="button" style={ { backgroundColor: buttonBgColor, color: buttonTextColor } }>{ button.text }</a>
				</div>
			</div>
		);
	},

} );
