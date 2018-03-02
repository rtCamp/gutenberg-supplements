/**
 * Declare required elements
 */
const {Component} = wp.element;
const {InspectorControls, RichText, AlignmentToolbar, BlockControls} = wp.blocks;
const {RangeControl} = wp.components;
const {__} = wp.i18n;

/**
 * Edit component of block
 */
class Edit extends Component {

	/**
	 * Edit constructor
	 */
	constructor() {

		super(...arguments);

		this.state = {
			colState: -1,
			colFocus: '',
			height  : 0,
		};

		this.changeNumOfCols = this.changeNumOfCols.bind(this);
		this.changeColState = this.changeColState.bind(this);
		this.changeQuestionContent = this.changeQuestionContent.bind(this);
		this.changeAnswerContent = this.changeAnswerContent.bind(this);

	}


	/**
	 *
	 * Change number of FAQs
	 *
	 * @param e
	 */
	changeNumOfCols(e) {

		console.log('num of cols called');

		const {attributes, setAttributes} = this.props;

		let questions = attributes.questions.slice(0);
		let answers = attributes.answers.slice(0);

		if (e > questions.length) {

			for (let i = 0; i < e - questions.length; i++) {
				questions.push({data: []});
				answers.push({data: []});
			}
		}


		setAttributes({
			questions: questions,
			answers  : answers,
			numOfCols: e,
		});
	}


	/**
	 *
	 * Change FAQ state
	 *
	 * @param i
	 * @param e
	 */
	changeColState(i, e) {
		this.setState((prevState) => {
			if (prevState.colState === i) {
				return {colState: -1, height: 0};
			}

			let div = document.createElement('div');
			div.className = 'edit-post-visual-editor';
			div.style.height = 'auto';
			div.style.padding = '1em 0.6em';
			document.body.appendChild(div);

			if (this.refs[i + '_answer'].props.value.length === 0) {
				div.innerHTML = 'Test Line';
			} else {
				div.innerHTML = ReactDOMServer.renderToStaticMarkup(this.refs[i + '_answer'].props.value);
			}

			let height = (div.scrollHeight) + 'px';
			document.body.removeChild(div);

			return {colState: i, height: height};
		});
	}


	/**
	 *
	 * Change question h4 content
	 *
	 * @param i
	 * @param e
	 */
	changeQuestionContent(i, e) {

		let questions = this.props.attributes.questions.slice(0);

		questions[i] = {data: e};

		this.props.setAttributes({
			questions: questions,
		});

	}


	/**
	 *
	 * Change answer div content
	 *
	 * @param i
	 * @param e
	 */
	changeAnswerContent(i, e) {

		const { props, refs } = this;
		const { attributes, setAttributes } = props;

		let answer_content = 'Test Line';
		if( refs[i + '_answer'] && refs[i + '_answer'].props.value.length !== 0 ){
			answer_content = refs[i + '_answer'].props.value;
		}

		let answers = attributes.answers.slice(0);
		answers[i] = {data: e};

		setAttributes({
			answers: answers
		});

		let div = document.createElement('div');
		document.body.appendChild(div);
		div.className = 'edit-post-visual-editor';
		div.style.height = 'auto';
		div.style.padding = '1em 0.6em';
		div.innerHTML = ReactDOMServer.renderToStaticMarkup(answer_content);
		let height = (div.scrollHeight) + 'px';
		document.body.removeChild(div);

		this.setState({
			height: height
		});

	}


	/**
	 *
	 * Render the html
	 *
	 * @returns Array
	 */
	render() {

		const {attributes, isSelected} = this.props;
		const {state} = this;

		if (attributes.numOfCols > attributes.questions.length) {
			this.changeNumOfCols(attributes.numOfCols);
			return null;
		}

		let columns = [];
		for (let i = 0; i < attributes.numOfCols; i++) {

			let colState = state.colState === i;
			let error = attributes.questions[i].data.length === 0 || attributes.answers[i].data.length === 0;

			let queStyle = {};
			if (error) {
				queStyle.backgroundColor = 'rgba(241, 18, 18, 0.48)';
				queStyle.color = 'white';
			}

			let question = (
				<h4
					className={'faq-question' + (colState ? ' faq-active' : '')}
					onClick={(e) => {
						this.changeColState(i, e)
					}}
					style={queStyle}
				>
					{
						isSelected && colState && state.colFocus === 'question' && (
							<BlockControls>
								<AlignmentToolbar
									onChange={(e) => {
										let formats = attributes.questionAlign.slice(0);
										formats[i] = e;
										this.props.setAttributes({
											questionAlign: formats,
										});
									}}
								/>
							</BlockControls>
						)
					}
					<RichText
						value={attributes.questions[i].data}
						onChange={(e) => {
							this.changeQuestionContent(i, e);
						}}
						placeholder={'Enter question...'}
						keepPlaceholderOnFocus={true}
						onFocus={() => {
							this.setState({
								colFocus: 'question',
							});
						}}
						formattingControls={['bold', 'italic']}
						style={{textAlign: attributes.questionAlign[i] ? attributes.questionAlign[i] : 'none'}}
						isSelected={isSelected && colState && state.colFocus === 'question'}
					/>
				</h4>
			);

			let style = {
				height : colState ? state.height : '0',
				padding: colState ? '1em 0.6em' : '0 0.6em',
			};
			if (error) {
				style.border = '0.1em solid rgba(241, 18, 18, 0.48)';
				style.borderTop = 'none';
			}


			let answer = (
				<div className={'faq-panel'} style={style}>
					{
						isSelected && colState && state.colFocus === 'answer' && (
							<BlockControls>
								<AlignmentToolbar
									onChange={(e) => {
										let formats = attributes.answerAlign.slice(0);
										formats[i] = e;
										this.props.setAttributes({
											answerAlign: formats,
										});
									}}
								/>
							</BlockControls>
						)
					}
					<RichText
						ref={i + '_answer'}
						value={attributes.answers[i].data}
						onChange={(e) => {
							this.changeAnswerContent(i, e);
						}}
						placeholder={'Enter answer...'}
						keepPlaceholderOnFocus={true}
						onFocus={() => {
							this.setState({
								colFocus: 'answer',
							});
						}}
						style={{textAlign: attributes.answerAlign[i] ? attributes.answerAlign[i] : 'none'}}
						isSelected={isSelected && colState && state.colFocus === 'answer'}
					/>
				</div>
			);

			columns.push(question);
			columns.push(answer);
		}
		columns = (
			<div className={'wp-faq-list'}>
				{columns}
			</div>
		);


		let inspector = (
			<InspectorControls>
				<RangeControl
					label={"Number of FAQs"}
					onChange={this.changeNumOfCols}
					value={attributes.numOfCols}
					min={1}
					max={10}
				/>
			</InspectorControls>
		);

		return [
			isSelected && inspector,
			columns,
		];

	}
}

export default Edit;
