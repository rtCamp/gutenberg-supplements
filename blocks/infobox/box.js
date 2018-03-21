import iconsList from './icons';

const { Component } = wp.element;

const { __ } = wp.i18n;
const {
	RichText,
} = wp.blocks;

const {
	DropdownMenu,
} = wp.components;

class Box extends Component {
	constructor( props ) {
		super( ...props );
	}

	render() {
		const props = this.props;
		const { focused, index, setIcon, setFocus } = props;
		const focusedRichText = focused ? focused.RichText || `${ index }-title` : null;

		return (
			<div className={ 'rt-box icon-position-' + props.iconPosition } key={ index }>
				<div className={ 'icons-wrapper align-' + props.align }>
					<span>
						<DropdownMenu
							icon={ props.fontelloIcon ? props.fontelloIcon : 'move' }
							label={ __( 'Select Icon' ) }
							menuLabel="rtgs-icons"
							controls={ iconsList( setIcon ) }
						/>
					</span>
				</div>

				<div className="content-inner">
					<RichText
						className={ 'infoboxTitle' }
						tagName={ 'h4' }
						onChange={ props.onChangeTitle }
						value={ props.infoboxTitle }
						style={ { textAlign: props.align } }
						placeholder={ __( 'Enter Title' ) }
						focus={ focusedRichText === `${ index }-title` }
						onFocus={ ( _focus ) => setFocus( _.extend( {}, _focus, { RichText: `${ index }-title` } ) ) }
					/>

					<RichText
						tagName={ 'p' }
						className={ 'infoboxContent' }
						placeholder={ __( 'Enter Description' ) }
						value={ props.infoboxContent }
						style={ { textAlign: props.align } }
						onChange={ props.onChangeContent }
						focus={ focusedRichText === `${ index }-content` }
						onFocus={ ( _focus ) => setFocus( _.extend( {}, _focus, { RichText: `${ index }-content` } ) ) }
					/>
				</div>
			</div>
		);
	}
}

export default Box;
