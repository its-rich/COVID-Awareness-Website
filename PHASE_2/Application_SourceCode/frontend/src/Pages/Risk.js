import React from 'react';
import '../App.css';
import RiskGraph from '../components/RiskGraph.js';
import SubmitPostcode from '../components/SubmitPostcode.js'
import SocialDistancing from './SocialDistancing.js'

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
                <SocialDistancing />
            </div>
        )
    }
}


export default Risk;
