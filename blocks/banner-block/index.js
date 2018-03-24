import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
	RichText,
	InspectorControls,
	MediaUpload,
	BlockControls,
        AlignmentToolbar,BlockAlignmentToolbar,
        ColorPalette,
} = wp.blocks;

const {
	TextControl,
	Placeholder,
	Button,
	Toolbar,
	IconButton,
        PanelColor,
        ToggleControl
} = wp.components;

registerBlockType( 'rtgb/banner', {

	title: __( 'Banner' ),
	icon: 'cover-image',
	category: 'layout',
	description: __( 'Used for Content with Background.' ),

	attributes: {

		bannerTitle: {
			type: 'array',
			source: 'children',
			selector: '.container-title',
		},

		bannerContent: {
			type: 'array',
			source: 'children',
			selector: '.container-content',
		},

		bannerLink: {
			type: 'url',
			source: 'attribute',
			attribute: 'href',
			selector: '.container-link',
		},
                buttonText:{
                    type: 'string',
                    default: 'Learn More',
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
		},
                content: {
			type: 'array',
			source: 'children',
			selector: 'h1,h2,h3,h4,h5,h6',
		},
		nodeName: {
			type: 'string',
			source: 'property',
			selector: 'h1,h2,h3,h4,h5,h6',
			property: 'nodeName',
			default: 'H2',
		},
                align: {
                        type: 'string',
                        default:'center',
		},
                alignment: {
                        type: 'string',
                        default: 'wide'
		},
                color: {
                        default:'rgb(153,153,153)',
		},
                hasImage: {
                        type: 'boolean',
                        default: false,
                },
	},

	getEditWrapperProps( attributes ) {
		const { alignment } = attributes;
		return { 'data-align': alignment };
	},

	edit: props => {
		const {
			attributes: {
				bannerTitle,
				bannerContent,
				bannerLink,
				mediaId,buttonText,
				mediaURL,
				mediaALT,
				mediaCaption,
                                content,
                                nodeName,
                                align,
                                alignment,
                                color,
                                hasImage,
			},
			focus,
			setFocus,
			setAttributes,
                        isSelected,
		} = props;

		const className = props.className ? props.className : '';
		const imageClass = mediaId ? 'image-active' : 'image-inactive';
                const toggleImage = () => setAttributes( { hasImage: ! hasImage } );
                const style = backgroundStyleBg( hasImage, mediaURL, color );
		const updateAlignment = ( nextAlignment ) => props.setAttributes( { alignment: nextAlignment } );
                
		return (
			<div className={ className + ' container-wrapper alignwide' } dataAlign={ updateAlignment }>
                    {
                            !! focus &&(
                                <BlockControls key="align-controls">
                                    <BlockAlignmentToolbar
                                        value={ props.attributes.alignment }
                                        onChange={ updateAlignment }
                                        controls={ ['wide', 'full'] }
                                    />
                                </BlockControls>
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
                                {
                                 isSelected && (
				<InspectorControls key="inspector">
					<h3>{ __( 'Heading Settings' ) }</h3>
					<p>{ __( 'Level' ) }</p>
					<Toolbar
						controls={
							'123456'.split( '' ).map( ( level ) => ( {
								icon: 'heading',
								title: 'Heading'+level,
								isActive: 'H' + level === nodeName,
								onClick: () => setAttributes( { nodeName: 'H' + level } ),
								subscript: level,
							} ) )
						}
					/>
                                        <ToggleControl
							label={ __( 'Show Image' ) }
							checked={ !! hasImage }
							onChange={ toggleImage }
						/>
                                        <PanelColor title={ __( 'Background Color' ) } colorValue={ color } >
					<ColorPalette
								value={ color }
								onChange={ ( colorValue ) => setAttributes( { color: colorValue } ) }
							/>
					</PanelColor>
					<p>{ __( 'Text Alignment' ) }</p>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
                                        <TextControl
						type={ 'url' }
						label={ __( 'Button link' ) }
						value={ bannerLink }
						onChange={ ( newBannerLink ) => setAttributes( { bannerLink: newBannerLink } ) }
					/>
                                        <TextControl
						type={ 'text' }
						label={ __( 'Button Text' ) }
						value={ buttonText }
						onChange={ ( newbuttonText ) => setAttributes( { buttonText: newbuttonText } ) }
					/>
								
				</InspectorControls>
			)
                                    }
				<div className="image-container" style={ style }>
					{ hasImage ? <div className={ 'container-image ' + imageClass }>
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
									} )
								}
								render={
									( { open } ) => (
										<Button onClick={ open }>{ __( 'Upload Image' ) }</Button>
									) }
							/>

						</Placeholder>
					</div> : ''}
                                        
                                        { ( imageClass === 'image-active' || !hasImage ) ?
                                        <div className="info-container">
                               
					<RichText
                                                key="editable"
						className="container-title"
						tagName={ nodeName.toLowerCase() }
						onChange={ ( newBannerTitle ) => setAttributes( { bannerTitle: newBannerTitle } ) }
						value={ bannerTitle }
						placeholder={ __( 'Title' ) }
                                                style={ { textAlign: align } }
                                                focus={ focus }
						onFocus={ setFocus }
					/>

					<RichText
						className="container-content"
						onChange={ ( newBannerContent ) => setAttributes( { bannerContent: newBannerContent } ) }
						value={ bannerContent }
						focus={ focus }
						onFocus={ setFocus }
                                                style={ { textAlign: align } }
						multiline="p"
						placeholder={ __( 'Content' ) }
					/>

					{
                                        bannerLink ? <div className="button-bg" style={ { textAlign: align } }><a href={ bannerLink } className="container-link button">{ buttonText }</a></div> : ''
					}

                                        </div>
                                        : ''}
                                </div>
                            </div>       
		);
	},

	save: props => {
		const {
			attributes: {
				bannerTitle,
				bannerContent,
				bannerLink,
				mediaId,
				mediaURL,
				mediaALT,
				mediaCaption,
                                nodeName,
                                alignment,
                                hasImage,
                                color,
                                align,
                                buttonText,
			},
		} = props;

		const className = props.className ? props.className : '';
                const Tag = nodeName.toLowerCase();
                const style = backgroundStyleBg( hasImage, mediaURL, color );
                
		return (
			<div className={ `align${ alignment }` + className + ' container-wrapper' } style={ style }>
				<div className={ `align${ align }` + " info-container"}>
					<Tag className="container-title">{ bannerTitle }</Tag>
					<div className="container-content">{ bannerContent }</div>
					{ bannerLink ? <a href={ bannerLink } className="container-link button">{ buttonText }</a> : '' }
				</div>
			</div>
		);
	},
} );
        
function backgroundStyleBg( hasImage, mediaURL, color ) {
	return hasImage ?
		{ backgroundImage: `url(${ mediaURL })` } :
		{ backgroundColor: color };
}