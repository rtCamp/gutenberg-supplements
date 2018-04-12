/* global moment */

import './style.scss';
import './editor.scss';

/* Set up variables */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

/* Register block type */
registerBlockType( 'rtgb/timeline', {

	title: __( 'Timeline' ),
	icon: 'list-view',
	category: 'common',
	description: __( 'Used to show WordPress contributors list' ),

	attributes: {

		title: {
			type: 'array',
			source: 'children',
			selector: '.timelineTitle',
			field: {
				type: 'rich-text',
				className: 'timeline-title',
				placeholder: __( 'Enter title' ),
				tagName: 'h4',
			},
		},

		content: {
			type: 'array',
			source: 'children',
			selector: '.contributor',
			field: {
				type: 'rich-text',
				className: 'contributor',
				placeholder: __( 'Enter timeline description' ),
				tagName: 'p',
			},
		},

		releaseDate: {
			type: 'string',
			source: 'attribute',
			attribute: 'datetime',
			selector: '.timeline-date',
			field: {
				type: 'date',
				label: __( 'Select Date' ),
				placement: 'inspector',
			},
		},

		releaseType: {
			type: 'string',
			field: {
				type: 'radio',
				label: __( 'Type' ),
				placement: 'inspector',
				default: 'major',
				options: [
					{
						value: 'major',
						label: __( 'Major' ),
					},
					{
						value: 'minor',
						label: __( 'Minor' ),
					},
				],
			},
		},

		newsLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-news-link',
			field: {
				type: 'link',
				placement: 'inspector',
				label: __( 'Enter News Link' ),
			},
		},

		blogLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.timeline-blog-link',
			field: {
				type: 'link',
				placement: 'inspector',
				label: __( 'Enter Blog Link' ),
			},
		},

	},

	edit: props => {
		const {
			attributes: {
				newsLink,
				blogLink,
				releaseDate,
			},
			middleware,
		} = props;

		const className = props.className ? props.className : '';
		const releaseType = props.attributes.releaseType ? props.attributes.releaseType : 'major';

		return (
			<div className={ className + ' timeline-' + releaseType }>
				{ middleware.inspectorControls }

				<div className="timeline-container">
					<time className="timeline-date" dateTime={ releaseDate } >
						{
							!! releaseDate && moment( releaseDate ).local().format( 'MMM, Y' )
						}
					</time>

					<div className="separator" />

					<div className="content-wrap">
						<div className="content-inner">
							{ middleware.fields.title }
							{ middleware.fields.content }

							<div className="postlinks">
								{
									!! ( newsLink || blogLink ) && <strong>{ __( 'Links:' ) }</strong>
								}

								{
									!! newsLink && <a href={ newsLink } className="timeline-news-link">{ __( 'News' ) }</a>
								}

								{
									!! blogLink && <a href={ blogLink } className="timeline-blog-link">{ __( 'Blog' ) }</a>
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
				title,
				content,
				releaseDate,
				newsLink,
				blogLink,
			},
		} = props;

		const className = props.className ? props.className : '';
		const releaseType = props.attributes.releaseType ? props.attributes.releaseType : 'major';

		return (
			<div className={ className + ' timeline-' + releaseType }>
				<div className={ 'timeline-container' }>
					<time className="timeline-date" dateTime={ releaseDate }>
						{
							!! releaseDate && moment( releaseDate ).local().format( 'MMM, Y' )
						}
					</time>

					<div className="separator" />

					<div className="content-wrap">
						<div className="content-inner">
							<h4 className="timeline-title">
								<span className="timelineTitle">{ title }</span>

								{
									!! 'minor' === releaseType && <span className="minor-release">{ __( '(Minor Release)' ) }</span>
								}
							</h4>
							<p className="timeline-description">
								<span className="contributor">
									{ content }
								</span>
							</p>
							<div className="postlinks">
								{
									!! ( newsLink || blogLink ) && <strong>{ __( 'Links:' ) }</strong>
								}

								{
									!! newsLink && <a href={ newsLink } className="timeline-news-link">{ __( 'News' ) }</a>
								}

								{
									!! blogLink && <a href={ blogLink } className="timeline-blog-link">{ __( 'Blog' ) }</a>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

} );
