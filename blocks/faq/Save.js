// Initialize required components
const {Component} = wp.element;

// Save class for save method of registeredBlockType
class Save extends Component {

    // Constructor
    constructor() {

        super(...arguments);


    }

    // Render the output of save method
    render() {
        const {attributes} = this.props;

        console.log(attributes.answers);


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