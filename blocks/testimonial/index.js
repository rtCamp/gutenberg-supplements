import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
	BlockControls,
	BlockAlignmentToolbar
} = wp.blocks;

const {
	Toolbar
} = wp.components;


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
				buttonText: __( 'Upload' ),
				removeButtonText: __( 'Remove' ),
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
				className: 'testimonial-name',
				placeholder: 'Name',
				tagName: 'p',
			},
			selector: '.testimonial-name',
			source: 'children',
		},

		companyName: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'testimonial-company',
				placeholder: 'Company',
				tagName: 'p',
			},
			selector: '.testimonial-company',
			source: 'children',
		},

		align: {
			type: 'string',
			default: 'none',
		},

		bgColor: {
			type: 'string',
			field: {
				type: 'color',
				label: 'Background Color',
				placement: 'inspector',
			},
		},

		textColor: {
			type: 'string',
			field: {
				type: 'color',
				label: 'Text Color',
				placement: 'inspector',
			},
		},
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit( props, middleware ) {
		const {
			attributes: {
				bgColor,
				textColor,
				align,
			},
			focus,
		} = props;

		const className = props.className ? props.className : '';
		const hasBackground = bgColor ? ' has-background' : '';
		const dataAlign = align ? align : '';

		return [
			middleware.inspectorControls,
			( focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							props.setAttributes( { align: nextAlign } );
						} }
						controls={ [ 'full' ] }
					/>
				</BlockControls>
			) ),
			<blockquote key="quote" className={ className }>
				<div className={ className + ' testimonial-wrapper-bg' } data-align={ dataAlign } style={ { backgroundColor: bgColor, color: textColor } } >
					<div className={ className + ' testimonial-wrapper' +  hasBackground } >
						<div className='testimonial-image'>
							{ middleware.fields.image }
						</div>
						<div className='testimonial-details'>
							{ middleware.fields.content }
							<div className='testimonial-signature' style={ { color: textColor } }>
								{ middleware.fields.name }
								{ middleware.fields.companyName }
							</div>
						</div>
					</div>
				</div>
			</blockquote>,
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
				textColor
			}
		} = props;

		const className     = props.className ? props.className : '';
		const hasBackground = bgColor ? ' has-background' : '';
		const dataAlign     = align ? align : '';
		const hasImage      = ! image ? ' no-image' : '';
		let imageContent    = '';

		if ( image ) {
			imageContent = (
				<div className='testimonial-image'>
					<figure>
						<img src={ image.url } alt={ image.title } />
					</figure>
				</div>
			);
		}

		return(
			<div className={ className + ' testimonial-wrapper-bg' } data-align={ dataAlign } style={ { backgroundColor: bgColor, color: textColor } } >
				<div className={'testimonial-wrapper' + hasBackground + hasImage }>
					{ imageContent }
					<div className='testimonial-details'>
						<div className='testimonial-content'>
							{ content }
						</div>
						<div className='testimonial-signature'>
							<p className="testimonial-name">{ name }</p>
							<p className="testimonial-company">{ companyName }</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
