import React from 'react';
import '../App.css';
import RiskGraph from '../components/RiskGraph.js';
import Submit from './submit.js'

class Risk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postcode: "2228"
        };
    }

    handleChange = (e) => {
        this.setState({postcode: e.target.value});
        console.log(e.target.value);
        console.log("state = " + this.state.postcode);
        e.preventDefault();
    }
    handleSubmit= (e) => {
        e.preventDefault();
    }

    submit = (v) => {
        this.setState({postcode: v});
    }

    render(){
        return(
            <div className="postcodepage">
                <Submit submit={this.submit.bind(this)}/>
                <RiskGraph postcode={this.state.postcode}/>
            </div>
        )
    }
}

// <form onSubmit={this.handleSubmit}>
//     <label> Postcode:
//     <input type="number" value={this.state.postcode} onChange={this.handleChange} />
//     </label>
//     <input type="submit" value="Submit" />
// </form>

export default (Risk);
