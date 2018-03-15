import ImageColumnBlock from './block';
import './style.css';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'rtgb/image-columns', {
	title: __( 'Image Columns' ),
	icon: 'index-card',
	category: 'layout',

	attributes: {
		columns: {
			type: 'array',
			source: 'query',
			selector: '.rt-column',
			query: {
				mediaID: {
					type: 'number',
					source: 'attribute',
					selector: '.rt-header-content img',
					attribute: 'data-media-id',
				},
				mediaURL: {
					type: 'string',
					source: 'attribute',
					selector: '.rt-header-content img',
					attribute: 'src',
				},
				title: {
					source: 'children',
					selector: '.rt-column-title',
				},
				subHeading: {
					source: 'children',
					selector: '.rt-column-sub-heading',
				},
				content: {
					source: 'children',
					selector: '.rt-column-content',
				},
				readMore: {
					source: 'children',
					selector: '.rt-read-more',
				},
			},
			default: [ {}, {}, {} ],
		},
		columnCount: {
			type: 'number',
			default: 3,
		},
		showSubHeading: {
			type: 'boolean',
			default: false,
		},
		showReadMore: {
			type: 'boolean',
			default: true,
		},
	},

	edit: ImageColumnBlock,

	save: props => {
		const columns = props.attributes.columns || [];
		const columnCount = props.attributes.columnCount;
		const className = props.className;
		const imageColumns = [];

		if ( ! columns.length ) {
			return null;
		}

		_.each( columns, function( column, index ) {
			const columnClass = `rt-column rt-column-${ index }`;
			const columnKey = `rt-column-${ index }`;

			if ( index + 1 > columnCount ) {
				return;
			}

			imageColumns.push(
				<li key={ columnKey } className={ columnClass }>
					<figure className="rt-header-content">
						<img src={ column.mediaURL } data-media-id={ column.mediaID } alt="" />
					</figure>
					<h3 className="rt-column-title" >
						{ column.title }
					</h3>
					{ props.attributes.showSubHeading && (
						<p className="rt-column-sub-heading">
							{ column.subHeading }
						</p>
					) }
					<div className="rt-column-content">
						{ column.content }
					</div>
					{ props.attributes.showReadMore && (
						<div className="rt-read-more">
							{ column.readMore }
						</div>
					) }
				</li>
			);
		} );

		return (
			<ul className={ className } key="rt-image-columns" >
				{ imageColumns }
			</ul>
		);
	},
} );
