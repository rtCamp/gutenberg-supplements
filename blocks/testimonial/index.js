import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( 'rtgb/testimonial', {

	title: __( 'Testimonial' ),
	icon: 'format-status',
	category: 'layout',
	description: __( 'Display a testimonial with a picture, text, name and company' ),

	attributes: {

		image: {
			type: 'object',
			field: {
				type: 'image',
				placeholderText: null,
			},
		},

		content: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-content',
				placeholder: __( 'Write testimonial content here' ),
				tagName: 'div',
			},
			selector: '.testimonial-content',
			source: 'children',
		},

		name: {
			type: 'array',
			field: {
				type: 'rich-text',
				formattingControls: [ '' ],
				className: 'testimonial-name',
				placeholder: __( 'Name' ),
				tagName: 'p',
			},
			selector: '.testimonial-name',
			source: 'children',
		},

		companyName: {
			type: 'array',
			field: {
				type: 'rich-text',
				formattingControls: [ '' ],
				className: 'testimonial-company',
				placeholder: __( 'Company' ),
				tagName: 'p',
			},
			selector: '.testimonial-company',
			source: 'children',
		},

		align: {
			type: 'string',
			field: {
				type: 'block-alignment-toolbar',
				placement: 'block-controls',
				controls: [ 'wide', 'full' ],
			},
			default: 'center',
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
	},

	edit( props ) {
		const {
			attributes: {
				bgColor,
				textColor,
				align,
			},
			className,
			middleware,
		} = props;

		const hasBackground = bgColor ? ' has-background' : '';
		const dataAlign = align ? ' align' + align : '';

		return [
			<div className={ className + ' testimonial-wrapper-bg' + hasBackground + dataAlign } style={ { backgroundColor: bgColor, color: textColor } } >
				{ middleware.blockControls }
				{ middleware.inspectorControls }
				<div className={ className + ' testimonial-wrapper' } >
					<div className="testimonial-image">
						{ middleware.fields.image }
					</div>
					<div className="testimonial-details">
						{ middleware.fields.content }
						<div className="testimonial-signature" style={ { color: textColor } }>
							{ middleware.fields.name }
							{ middleware.fields.companyName }
						</div>
					</div>
				</div>
			</div>
		];
	},

	save( props ) {
		const {
			attributes: {
				image,
				content,
				name,
				companyName,
				bgColor,
				align,
				textColor,
			},
		} = props;

		const className = props.className ? props.className : '';
		const hasBackground = bgColor ? ' has-background' : '';
		const dataAlign = align ? ' align' + align : '';
		const hasImage = ! image ? ' no-image' : '';
		let imageContent = '';

		if ( image ) {
			imageContent = (
				<div className="testimonial-image">
					<figure>
						<img src={ image.url } alt={ image.title } />
					</figure>
				</div>
			);
		}

		return (
			<div className={ className + ' testimonial-wrapper-bg' + hasBackground + dataAlign } style={ { backgroundColor: bgColor, color: textColor } } >
				<div className={ 'testimonial-wrapper' + hasImage }>
					{ imageContent }
					<div className="testimonial-details">
						<div className="testimonial-content">
							{ content }
						</div>
						<div className="testimonial-signature">
							<p className="testimonial-name">{ name }</p>
							<p className="testimonial-company">{ companyName }</p>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
