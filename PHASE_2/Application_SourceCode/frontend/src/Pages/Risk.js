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
        alert(this.state.postcode);
        e.preventDefault();
        
    }
    graph() {
        return (<RiskGraph postcode={this.state.postcode}/>);
    }

    render(){

        return(
            <div className="title">
                <p> COVID-19 Suburb Checker </p>
                <form onSubmit={this.handleSubmit}>
                    <label> Postcode:
                    <input type="number" value={this.state.postcode} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {this.graph()}
            </div>


        )
    }
}
export default (Risk);
