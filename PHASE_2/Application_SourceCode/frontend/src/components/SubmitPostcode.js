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
                <input id="in"></input>
                <button class="Button Button1" onClick={this.submit.bind(this)}>submit</button>
            </div>
        )
    }
}

export default SubmitPostcode;
