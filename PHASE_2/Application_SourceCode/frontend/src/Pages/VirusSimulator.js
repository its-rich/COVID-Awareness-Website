import React, {Component} from 'react';
import '../App.css';

class VirusSimulator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: ''
        }
    }

    changeDisease = (disease) => {
        this.setState({disease: disease})
    }

    render(){
        return (
            <div>
            </div>
        )
    }
}

export default VirusSimulator;
