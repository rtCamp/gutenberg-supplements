// Initialize required components
const {Component} = wp.element;
const {InspectorControls, RichText, AlignmentToolbar, BlockControls, BlockAlignmentToolbar} = wp.blocks;
const {RangeControl, Toolbar} = wp.components;
const {__} = wp.i18n;

const FormatControl = wp.components.withSpokenMessages('FormatControl');

// Edit class for edit method of registeredBlockType
class Edit extends Component {

    // Constructor
    constructor() {

        super(...arguments);

        this.state = {
            colState: -1,
            colFocus: '',
            textFormats: [],

        };

        this.changeNumOfCols = this.changeNumOfCols.bind(this);
        this.changeColState = this.changeColState.bind(this);
        this.changeQuestionContent = this.changeQuestionContent.bind(this);
        this.changeAnswerContent = this.changeAnswerContent.bind(this);

    }


    changeNumOfCols(e) {

        const {attributes, setAttributes} = this.props;
        const {state, setState} = this;

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
            answers: answers,
            numOfCols: e,
        });
    }


    changeColState(i, e) {
        this.setState((prevState) => {
            if (prevState.colState === i) {
                return {colState: -1};
            }
            return {colState: i};
        });
    }


    changeQuestionContent(i, e) {

        let questions = this.props.attributes.questions.slice(0);

        questions[i] = {data: e};

        this.props.setAttributes({
            questions: questions,
        });

    }


    changeAnswerContent(i, e) {

        let answers = this.props.attributes.answers.slice(0);
        answers[i] = {data: e};

        this.props.setAttributes({
            answers: answers
        });

    }


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
                        isSelected={isSelected && colState && state.colFocus === 'question'}
                    />
                </h4>
            );


            let style = {
                maxHeight: colState ? '12em' : '0',
                minHeight: colState ? '12em' : '0',
            };
            if (error) {
                style.border = '0.1em solid rgba(241, 18, 18, 0.48)';
                style.borderTop = 'none';
            }


            let answer = (
                <div className={'faq-panel'} style={style}>
                    {
                        isSelected && colState && state.colFocus === 'answer' && (
                            <AlignmentToolbar
                                onChange={(e) => {
                                    let formats = state.textFormats.slice(0);
                                    formats[i] = e;
                                    this.setState({
                                        formats: formats
                                    });
                                }}
                            />
                        )
                    }
                    <FormatControl
                        key={'controls_' + i}
                        isSelected={true}
                    />
                    <RichText
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
