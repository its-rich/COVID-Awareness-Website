import React from 'react';

class Submit extends React.Component {

    submit = () => {
        console.log(document.getElementById("in").value);
        this.props.submit(document.getElementById("in").value);
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

export default Submit
