import React, {Component} from 'react';
import '../App.css';

class Infected extends Component {

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
            
            <a href="/register" class="btn btn-primary">SignUp</a>
            <a href="/SignIn" class="btn btn-primary">Login</a>
            </div>
        )
    }
}

export default Infected;
