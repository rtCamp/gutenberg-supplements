import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
	InspectorControls,
	source: { children },
	MediaUpload,
	BlockControls,
} = wp.blocks;

const {
		  TextControl,
		  Placeholder,
		  Button,
		  Toolbar,
		  IconButton,
	  } = wp.components;

registerBlockType( 'rtgb/case-study-excerpt', {

	title: __( 'Case Study Excerpt' ),
	icon: 'search',
	category: 'layout',
	description: __( 'Used for case study archive page' ),

	attributes: {

		caseStudyTitle: {
			type: 'array',
			source: 'children',
			selector: '.case-study-title',
		},

		caseStudyContent: {
			type: 'array',
			source: 'children',
			selector: '.case-study-content',
		},

		caseStudyLink: {
			type: 'url',
			source: 'attribute',
			attribute: 'href',
			selector: '.case-study-link',
		},

		mediaId: {
			type: 'number',
			source: 'attribute',
			selector: 'img',
			attribute: 'id',
		},

		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},

		mediaALT: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
		},

		mediaCaption: {
			type: 'string',
			source: 'children',
			selector: 'figcaption',
		}

	},

	getEditWrapperProps() {
		return { 'data-align': 'wide' };
	},

	edit: props => {
		const {
			attributes: {
				caseStudyTitle,
				caseStudyContent,
				caseStudyLink,
				mediaId,
				mediaURL,
				mediaALT,
				mediaCaption,
			},
			focus,
			setFocus,
			setAttributes,
		} = props;

		const className = props.className ? props.className : '';
		const imageClass = mediaId ? 'image-active' : 'image-inactive';

		return (
			<div className={ className + ' case-study-wrapper alignwide' }>
				{
					!! focus && (
						<InspectorControls key={ 'inspector' }>
							<TextControl
								type={ 'url' }
								label={ __( 'Case study link' ) }
								value={ caseStudyLink }
								onChange={ ( newcaseStudyLink ) => setAttributes( { caseStudyLink: newcaseStudyLink } ) }
							/>
						</InspectorControls>
					)
				}

				{
					!! focus && !! mediaId && (
						<BlockControls key="controls">
							<Toolbar>
								<MediaUpload
									onSelect={
										( media ) => setAttributes( {
											mediaURL: media.url,
											mediaId: media.id,
											mediaALT: media.alt,
											mediaCaption: media.caption,
										} )
									}
									type="image"
									multiple={ false }
									value={ mediaId }
									render={ ( { open } ) => (
										<IconButton
											className="components-toolbar__control"
											label={ __( 'Edit Gallery' ) }
											icon="edit"
											onClick={ open }
										/>
									) }
								/>
							</Toolbar>
						</BlockControls>
					)
				}

				<div className="image-container">
					<div className={ 'case-study-image ' + imageClass }>
						<Placeholder
							className={ className }
							key="image-placeholder"
							icon="format-image"
							label={ __( 'Image' ) }
						>

							<MediaUpload
								type="image"
								multiple={ false }
								value={ mediaId }
								onSelect={
									( media ) => setAttributes( {
										mediaURL: media.url,
										mediaId: media.id,
										mediaALT: media.alt,
										mediaCaption: media.caption,
									} )
								}
								render={
									( { open } ) => (
										<Button onClick={ open }>Upload Image</Button>
									) }
							/>

						</Placeholder>

						<figure key="image">
							<img src={ mediaURL } alt={ mediaALT } id={ mediaId } />
							{ mediaCaption ? <figcaption>{ mediaCaption }</figcaption> : '' }
						</figure>
					</div>
				</div>

				<div className="info-container">
					<RichText
						className={ 'case-study-title' }
						tagName={ 'h3' }
						onChange={ ( newcaseStudyTitle ) => setAttributes( { caseStudyTitle: newcaseStudyTitle } ) }
						value={ caseStudyTitle }
						focus={ focus }
						onFocus={ setFocus }
						placeholder={ __( 'Case Study Title' ) }
					/>

					<RichText
						className='case-study-content'
						onChange={ ( newcaseStudyContent ) => setAttributes( { caseStudyContent: newcaseStudyContent } ) }
						value={ caseStudyContent }
						focus={ focus }
						onFocus={ setFocus }
						multiline="p"
						placeholder={ __( 'Case Study Excerpt' ) }
					/>

					{
						caseStudyLink ? <a href={ caseStudyLink } className="case-study-link button">{ __( 'Read More' ) }</a> : ''
					}

				</div>
			</div>
		);
	},

	save: props => {

		const {
			attributes: {
				caseStudyTitle,
				caseStudyContent,
				caseStudyLink,
				mediaId,
				mediaURL,
				mediaALT,
				mediaCaption,
			}
		} = props;

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' case-study-wrapper alignwide' }>
				<div className="image-container">
					<figure>
						<img src={ mediaURL } alt={ mediaALT } id={ mediaId } />
						{ mediaCaption ? <figcaption>{ mediaCaption }</figcaption> : '' }
					</figure>
				</div>
				<div className="info-container">
					<h3 className="case-study-title">{ caseStudyTitle }</h3>
					<div className="case-study-content">{ caseStudyContent }</div>
					{ caseStudyLink ? <a href={ caseStudyLink } className="case-study-link button">{ __( 'Read More' ) }</a> : '' }
				</div>
			</div>
		);
	},
} );
