/**
 * Contains Image Column
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
const { Editable, MediaUpload } = wp.blocks;
const { Button, IconButton, Placeholder } = wp.components;

// Alias of editable remove Editable as it will no longer available
// @todo import RichText instead of Editable
const RichText = Editable;

class ImageColumn extends Component {
	constructor( props ) {
		super( ...props );
	}

	render() {
		const { attributes, focused, setFocus, index, onRemove } = this.props;
		const focusedRichText = focused ? focused.RichText || `${ index }-title` : null;

		return (
			<div className={ this.props.className } key="image-columns-container" >
				{ attributes.mediaID && (
					<figure>
						<IconButton
							key="icon-button"
							icon="no-alt"
							onClick={ onRemove }
							className="rt-remove-image-button"
							label={ __( 'Remove Image' ) }
						/>
						<img src={ attributes.mediaURL } alt="" />
					</figure>
				) }
				{ ! attributes.mediaID && (
					<Placeholder
						key="placeholder"
						icon="media-image"
						label={ __( 'Thumbnail' ) }
						instructions={ __( 'Upload or choose from media library' ) }
						className="rt-image-placeholder">
						<MediaUpload
							onSelect={ this.props.onSelectImage }
							type="image"
							value={ attributes.mediaID }
							render={ ( { open } ) => (
								<Button key="button" className={ attributes.mediaID ? 'image-button' : 'button button-large' } onClick={ open } >
									{ ! attributes.mediaID ? __( 'Choose' ) : '' }
								</Button>
							) }
						/>
					</Placeholder>
				) }
				<RichText
					tagName="h3"
					onChange={ this.props.onChangeTitle }
					value={ attributes.title }
					placeholder={ __( 'Enter Title...' ) }
					focus={ focusedRichText === `${ index }-title` }
					onFocus={ ( focus ) => setFocus( _.extend( {}, focus, { RichText: `${ index }-title` } ) ) }
				/>
				{ this.props.showSubHeading && (
					<RichText
						onChange={ this.props.onChangeSubTitle }
						value={ attributes.subHeading }
						placeholder={ __( 'Enter Sub Title...' ) }
						focus={ focusedRichText === `${ index }-sub-title` }
						onFocus={ ( focus ) => setFocus( _.extend( {}, focus, { RichText: `${ index }-sub-title` } ) ) }
						inlineToolbar
					/>
				) }
				<RichText
					onChange={ this.props.onChangeContent }
					value={ attributes.content }
					placeholder={ __( 'Enter Content...' ) }
					focus={ focusedRichText === `${ index }-content` }
					onFocus={ ( focus ) => setFocus( _.extend( {}, focus, { RichText: `${ index }-content` } ) ) }
					inlineToolbar
				/>
				{ this.props.showReadMore && (
					<RichText
						onChange={ this.props.onChangeReadMore }
						value={ attributes.readMore ? attributes.readMore : __( 'Read More' ) }
						placeholder={ __( 'Read More Text and Link...' ) }
						focus={ focusedRichText === `${ index }-readmore` }
						onFocus={ ( focus ) => setFocus( _.extend( {}, focus, { RichText: `${ index }-readmore` } ) ) }
						inlineToolbar
					/>
				) }
			</div>
		);
	}
}

export default ImageColumn;
