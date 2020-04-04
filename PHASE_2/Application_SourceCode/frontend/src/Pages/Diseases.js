import React, {Component} from 'react';
import '../App.css';
import AllDiseases from './AllDiseases';
import DiseasePage from './DiseasePage';

class Diseases extends Component {

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
            {this.state.disease === '' && <AllDiseases changeDisease={this.changeDisease.bind(this)}/>}
            {this.state.disease !== '' && <DiseasePage disease={this.state.disease} changeDisease={this.changeDisease.bind(this)}/>}
            </div>
        )
    }
}

export default Diseases;
