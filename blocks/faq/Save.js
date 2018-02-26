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

            columns.push(<h4 className={'faq-question'}>{this.props.attributes.questions[i].data}</h4>);
            columns.push(<div className={'faq-panel'}>{this.props.attributes.answers[i].data}</div>);
        }

        return (
            <div className={"wp-faq-list"}>

                {columns}

            </div>
        );
    }

}

export default Save;