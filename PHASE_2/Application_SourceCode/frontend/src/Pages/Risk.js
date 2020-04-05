import React from 'react';
import '../App.css';
import RiskGraph from '../components/RiskGraph.js';
import SubmitPostcode from '../components/SubmitPostcode.js'

class Risk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postcode: ""
        };
    }

    submit = (v) => {
        this.setState({postcode: v});
    }

    render(){
        return(
            <div className="postcodepage">
                <SubmitPostcode submit={this.submit.bind(this)}/>
                <RiskGraph postcode={this.state.postcode}/>
            </div>
        )
    }
}

export default Risk;
