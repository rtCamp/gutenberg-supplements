import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

registerBlockType( 'rtgb/case-study-excerpt', {

	title: __( 'Case Study Excerpt' ),
	icon: 'search',
	category: 'layout',
	description: __( 'Used for case study archive page' ),

	attributes: {

		caseStudyTitle: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'case-study-title',
				placeholder: __( 'Case Study Title' ),
				tagName: 'h3',
			},
			selector: '.case-study-title',
			source: 'children',
		},

		caseStudyContent: {
			type: 'array',
			field: {
				type: 'rich-text',
				className: 'case-study-content',
				placeholder: __( 'Case Study Title' ),
				tagName: 'div',
				multiline: 'p',
			},
			selector: '.case-study-content',
			source: 'children',
		},

		caseStudyImage: {
			type: 'object',
			field: {
				type: 'image',
				buttonText: __( 'Upload' ),
				imagePlaceholder: true,
				removeButtonText: __( 'Remove' ),
			},
		},

		caseStudyLink: {
			type: 'string',
			field: {
				type: 'link',
				placement: 'inspector',
			},
		},
	},

	getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},

	edit( props, middleware ) {
		const {
			attributes: {
				caseStudyLink
			}
		} = props;

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' case-study-wrapper alignwide' }>
				<div className="image-container">
					{ middleware.fields.caseStudyImage }
				</div>

				<div className="info-container">
					{ middleware.inspectorControls }
					{ middleware.fields.caseStudyTitle }
					{ middleware.fields.caseStudyContent }
					{ middleware.fields.caseStudyLink }
					{ caseStudyLink ? <a href={ caseStudyLink } className="button secondary">{ __( 'Read More' ) }</a> : '' }
				</div>
			</div>
		);
	},

	save( props ) {
		const {
			attributes: {
				caseStudyImage,
				caseStudyTitle,
				caseStudyContent,
				caseStudyLink
			}
		} = props;

		const className = props.className ? props.className : '';
		let imageContent = '';

		if ( caseStudyImage ) {
			imageContent = (
				<div className="image-container">
					<figure>
						<img src={ caseStudyImage.url } alt={ caseStudyImage.title } />
					</figure>
				</div>
			);
		}

		return(
			<div className={ className + ' case-study-wrapper alignwide' }>
				{ imageContent }
				<div className="info-container">
					<h3 className="case-study-title">{ caseStudyTitle ? caseStudyTitle : '' }</h3>
					<div className="case-study-content">{ caseStudyContent ? caseStudyContent : '' }</div>
					{ caseStudyLink ? <a href={ caseStudyLink } className="button secondary">{ __( 'Read More' ) }</a> : '' }
				</div>
			</div>
		);
	}
});
