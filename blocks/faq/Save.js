/**
 * Declare required elements
 */
const {Component} = wp.element;

/**
 * Save component of block
 */
class Save extends Component {

	/**
     * Save constructor
	 */
	constructor() {

        super(...arguments);


    }


	/**
     *
     * Render the html
     *
	 * @returns Array
	 */
	render() {

        const {attributes} = this.props;


        let columns = [], length = attributes.questions.length < attributes.numOfCols ? attributes.questions.length : attributes.numOfCols;
        for( let i=0;i<length;i++ ){

            if( attributes.questions[i].data.length === 0 || attributes.answers[i].data.length === 0 ){
                continue;
            }

            columns.push(<h4 style={{textAlign: attributes.questionAlign[i]?attributes.questionAlign[i]:'none' }} className={'faq-question'}>{attributes.questions[i].data}</h4>);
            columns.push(<div style={{textAlign: attributes.answerAlign[i]?attributes.answerAlign[i]:'none' }} className={'faq-panel'}>{attributes.answers[i].data}</div>);
        }

        return (
            <div className={"wp-faq-list"}>

                {columns}

            </div>
        );
    }

}

export default Save;