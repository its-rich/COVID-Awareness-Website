import React from 'react';
import '../App.css';
import RiskGraph from '../components/RiskGraph.js';


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

    submit = () => {

    }

    render(){
        return(
            <div className="postcodepage">
                <div className="postcodeTitle"> COVID-19 Suburb Checker </div>
                <input></input>
                <button onClick={this.submit.bind(this)}>submit</button>
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
