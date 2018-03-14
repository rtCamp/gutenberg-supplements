import './style.scss';
import './editor.scss';

/* Set up variables */
const { __ } = wp.i18n;
const {
		  registerBlockType,
		  RichText,
		  source: { children },
		  InspectorControls,
	  } = wp.blocks;

const {
		  SelectControl,
		  TextControl
	  } = wp.components;

/* Register block type */
registerBlockType( 'rtgb/timeline', {

	title: __( 'Timeline' ),
	icon: 'list-view',
	category: 'common',
	description: __( 'Used to show WordPress contributors list' ),

	attributes: {

		timelineTitle: {
			type: 'array',
			source: 'children',
			selector: '.timelineTitle',
		},

		timelineContent : {
			type: 'array',
			source: 'children',
			selector: '.contributor',
		},

		releaseType: {
			type: 'select',
			default: 'major'
		},

		releaseDate: {
			type: 'string',
			source: 'attribute',
			attribute: 'datetime',
			selector: '.timeline-date',
		},

		newslink: {
			type: 'url',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-news-link',
		},

		bloglink: {
			type: 'url',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-blog-link',
		},

	},

	edit: props => {

		const {
			attributes: {
				releaseType,
				releaseDate,
				timelineTitle,
				timelineContent,
				newslink,
				bloglink,
			},
			focus,
			setFocus
		} = props;

		const availableTypes = [
			{ value: 'major', label: __( 'Major Release' ) },
			{ value: 'minor', label: __( 'Minor Release' ) },
		];

		/* Event handlers */
		const onChangeType = newreleaseType => {
			props.setAttributes( { releaseType: newreleaseType } );
		};

		const onChangeDate = newreleaseDate => {
			props.setAttributes( { releaseDate: newreleaseDate } );
		};

		const onTitleChange = newtimelineTitle => {
			props.setAttributes( { timelineTitle: newtimelineTitle } );
		};

		const onContentChange = newtimelineContent => {
			props.setAttributes( { timelineContent: newtimelineContent } );
		};

		const onChangenewslink = newnewslink => {
			props.setAttributes( { newslink: newnewslink } );
		};

		const onChangebloglink = newbloglink => {
			props.setAttributes( { bloglink: newbloglink } );
		};

		const onFocusTitle = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'timelineTitle' } ) );
		};

		const onFocusContent = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'timelineContent' } ) );
		};

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' timeline-' + releaseType }>
				{
					!! focus && (
						<InspectorControls key={ 'inspector' }>

							<SelectControl
								type={ 'select' }
								label={ __( 'WordPress Release Type' ) }
								value={ releaseType }
								onChange={ onChangeType }
								options={ availableTypes }
							/>

							<TextControl
								type={ 'date' }
								label={ __( 'Set Release Date' ) }
								value={ releaseDate ? releaseDate : null }
								onChange={ onChangeDate }
							/>

							<TextControl
								type={ 'url' }
								label={ __( 'News article link' ) }
								value={ newslink }
								onChange={ onChangenewslink }
							/>

							<TextControl
								type={ 'url' }
								label={ __( 'Blog article link' ) }
								value={ bloglink }
								onChange={ onChangebloglink }
							/>

						</InspectorControls>
					)
				}

				<div className={ 'timeline-container' }>
					<time className='timeline-date' datetime={ releaseDate }>
						{
							releaseDate ? moment( releaseDate ).local().format( 'MMM, Y' ) : ''
						}
					</time>

					<div className="separator"></div>

					<div className="content-wrap">
						<div className="content-inner">
							<RichText
								className={ 'timeline-title' }
								tagName={ 'h3' }
								onChange={ onTitleChange }
								value={ timelineTitle }
								focus={ setFocus }
								placeholder={ __( 'Title' ) }
								onFocus={ onFocusTitle }
							/>

							<RichText
								tagName={ 'p' }
								className={ 'timeline-description' }
								placeholder={ __( 'Enter contributors list here' ) }
								value={ timelineContent }
								onChange={ onContentChange }
								focus={ setFocus }
								onFocus={ onFocusContent }
							/>

							<div className='postlinks'>
								{ ( newslink || bloglink ) ? <strong>Links: </strong> : null }
								{
									newslink ? <a href={ newslink } className='timeline-news-link'>{ __( 'News' ) }</a> : ''
								}
								{
									bloglink ? <a href={ bloglink } className='timeline-blog-link'>{ __( 'Blog' ) }</a> : ''
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save: props => {

		const {
			attributes: {
				releaseType,
				releaseDate,
				timelineTitle,
				timelineContent,
				newslink,
				bloglink
			}
		} = props;

		const className = props.className ? props.className : '';

		return (
			<div className={ className + ' timeline-' + releaseType }>
				<div className={ 'timeline-container' }>
					<time className='timeline-date' datetime={ releaseDate }>
						{
							releaseDate ? moment( releaseDate ).local().format( 'MMM, Y' ) : ''
						}
					</time>

					<div className="separator"></div>

					<div className='content-wrap'>
						<div className="content-inner">
							<h3 className='timeline-title'>
								<span className='timelineTitle'>
									{ timelineTitle }
								</span>
								{
									( 'minor' === releaseType ) ? <span className='minor-release'>(Minor Release)</span> : ''
								}
							</h3>
							<p className='timeline-description' title='Contributors'>
								<span class="dashicons dashicons-groups"></span>
								<span className="contributor">
									{ timelineContent }
								</span>
							</p>
							<div className='postlinks'>
								{ ( newslink || bloglink ) ? <strong>Links: </strong> : null }

								{
									newslink ? <a href={ newslink } className='timeline-news-link'>{ __( 'News' ) }</a> : ''
								}
								{
									bloglink ? <a href={ bloglink } className='timeline-blog-link'>{ __( 'Blog' ) }</a> : ''
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
