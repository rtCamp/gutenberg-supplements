import Box from './box';
import iconsList from './icons';

const { __ } = wp.i18n;
const {
	InspectorControls,
	BlockAlignmentToolbar,
	AlignmentToolbar,
} = wp.blocks;

const {
	SelectControl,
	RangeControl,
} = wp.components;

const { Component } = wp.element;

class InfoBox extends Component {
	constructor( props ) {
		super( ...props );

		this.setBoxAttributes = this.setBoxAttributes.bind( this );
	}

	setBoxAttributes( index, dataObject ) {
		const { attributes } = this.props;
		const existingData = attributes.box.slice( 0 ) || [];

		if ( existingData[ index ] ) {
			existingData[ index ] = _.extend( existingData[ index ], dataObject );
		} else {
			existingData[ index ] = dataObject;
		}

		this.props.setAttributes( {
			box: existingData,
		} );
	}

	render() {
		const props = this.props;

		const { attributes, focus, setFocus, setAttributes } = props;

		const availablePosition = [
			{ value: 'top', label: __( 'Top' ) },
			{ value: 'left', label: __( 'Left' ) },
			{ value: 'right', label: __( 'Right' ) },
			{ value: 'bottom', label: __( 'Bottom' ) },
		];

		/* Event handlers */
		const className = props.className ? props.className : '';

		const setIcon = newFontelloIcon => {
			setAttributes( { fontelloIcon: newFontelloIcon } );
		};

		const infoboxes = [];

		for ( let index = 0; index < attributes.boxCount; index++ ) {
			infoboxes.push( (
				<Box
					onChangeTitle={ ( infoboxTitle ) => this.setBoxAttributes( index, { infoboxTitle } ) }
					onChangeContent={ ( infoboxContent ) => this.setBoxAttributes( index, { infoboxContent } ) }
					focused={ focus }
					setFocus={ setFocus }
					index={ index }
					fontelloIcon={ attributes.fontelloIcon }
					setIcon={ setIcon }
					align={ attributes.align }
					iconPosition={ attributes.iconPosition }
				/>
			) );
		}

		return (
			<div className={ className + ' infobox-wrapper align' + attributes.blockAlign + ' has-box-' + attributes.boxCount }>
				{
					!! focus && (
						<InspectorControls key={ 'inspector' }>
							<SelectControl
								type={ 'select' }
								label={ __( 'Icon Position' ) }
								value={ attributes.iconPosition }
								onChange={ ( newIconPosition ) => setAttributes( { iconPosition: newIconPosition } ) }
								options={ availablePosition }
							/>

							<RangeControl
								label={ 'No of boxes' }
								onChange={ ( newBoxCount ) => setAttributes( { boxCount: newBoxCount } ) }
								value={ attributes.boxCount }
								min={ 3 }
								max={ 15 }
							/>

							<h4>{ __( 'Block Alignment:' ) }</h4>
							<BlockAlignmentToolbar
								value={ attributes.blockAlign }
								onChange={ ( newBlockAlign ) => {
									setAttributes( { blockAlign: newBlockAlign } );
								} }
								controls={ [ 'wide', 'full' ] }
							/>

							<h4>{ __( 'Text Alignment:' ) }</h4>
							<AlignmentToolbar
								value={ attributes.align }
								onChange={ ( textAlign ) => {
									setAttributes( { align: textAlign } );
								} }
							/>
						</InspectorControls>
					)
				}

				{ infoboxes }

			</div>
		);
	}
}

export default InfoBox;
