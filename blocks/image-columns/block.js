/**
 * Contains image columns component.
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blocks;
const { RangeControl, ToggleControl } = wp.blocks.InspectorControls;

import ImageColumn from './image-column';

console.log( ImageColumn );
class ImageColumnBlock extends Component {

	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.setColumnsAttributes = this.setColumnsAttributes.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.toggleShowSubHeading = this.toggleShowSubHeading.bind( this );
		this.toggleShowReadMore = this.toggleShowReadMore.bind( this );
	}

	onSelectImage( index, media ) {
		this.setColumnsAttributes( index, {
			mediaURL: media.sizes.medium ? media.sizes.medium.url : media.url,
			mediaID: media.id,
		} );
	}

	setColumnsAttributes( index, dataObject ) {
		const { attributes } = this.props;
		let existingData = attributes.columns.slice( 0 ) || [];

		if ( existingData[ index ] ) {
			existingData[ index ] = _.extend( existingData[ index ], dataObject );
		} else {
			existingData[ index ] = dataObject;
		}

		this.props.setAttributes( {
			columns: existingData,
		} );
	}

	onRemoveImage( index ) {
		this.setColumnsAttributes( index, { mediaID: '', mediaURL: '' } );
	}

	toggleShowSubHeading() {
		this.props.setAttributes( {
			showSubHeading: ! this.props.attributes.showSubHeading
		} );
	}

	toggleShowReadMore() {
		this.props.setAttributes( {
			showReadMore: ! this.props.attributes.showReadMore
		} );
	}

	render() {
		const { focus, setFocus, attributes, setAttributes } = this.props;
		const imageColumns = [];

		const inspectorControls = focus && (
			<InspectorControls key="inspector">
				<h3>{ __( 'Settings' ) }</h3>
				<RangeControl
					label={ __( 'Columns' ) }
					value={ attributes.columnCount }
					onChange={ ( value ) => setAttributes( { columnCount: value } ) }
					min={ 1 }
					max={ 5 }
				/>
				<ToggleControl
					label={ __( 'Show Sub Heading' ) }
					checked={ attributes.showSubHeading }
					onChange={ this.toggleShowSubHeading }
				/>
				<ToggleControl
					label={ __( 'Show Read More' ) }
					checked={ attributes.showReadMore }
					onChange={ this.toggleShowReadMore }
				/>
			</InspectorControls>
		);

		for ( let index = 0; index < attributes.columnCount; index++ ) {
			let columnClass = `column-${ index } single-column`;
			let imageColumnKey = `column-${ index }`;

			const columnAttributes = attributes.columns[ index ] || {};

			imageColumns.push(
				<ImageColumn
					onSelectImage={ ( media ) => this.onSelectImage( index, media ) }
					onChangeTitle={ ( title ) => this.setColumnsAttributes( index, { title } ) }
					onChangeSubTitle={ ( subHeading ) => this.setColumnsAttributes( index, { subHeading } ) }
					onChangeContent={ ( content ) => this.setColumnsAttributes( index, { content } ) }
					onChangeReadMore={ ( readMore ) => this.setColumnsAttributes( index, { readMore } ) }
					onRemove={ () => { this.onRemoveImage( index ); } }
					className={ columnClass }
					attributes={ columnAttributes }
					showSubHeading={ attributes.showSubHeading }
					showReadMore={ attributes.showReadMore }
					focused={ focus }
					setFocus={ setFocus }
					key={ imageColumnKey }
					index={ index }
				/>
			);
		}

		return [
			inspectorControls,
			<div className="rt-image-columns" key="image-columns">
				{ imageColumns }
			</div>,
		];
	}
}

export default ImageColumnBlock;
