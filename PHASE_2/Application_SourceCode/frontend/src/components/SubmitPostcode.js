import React from 'react';

class SubmitPostcode extends React.Component {

    submit = () => {
        let code = document.getElementById("in").value;
        if (code.length != 4) {
            return;
        }
        this.props.submit(code);
    }

    render(){
        return(
            <div className="postcodepage">
                <div className="postcodeTitle"> COVID-19 Suburb Checker </div>
                <input id="in" className="input-field col s6" style={{width: "5%"}} type="number" value={this.props.postcode}></input>
                <button className="waves-effect waves-light btn" onClick={this.submit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default SubmitPostcode;
