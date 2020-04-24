import React, {Component} from 'react';
import SignIn from './SignIn.js'
import { auth } from "../components/Firebase/config.js";
import '../App.css';

class Infected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null
        }
    }

    updateEmail = (email) => {
        this.setState({email: email});
    }

    render() {
        return (
            <div>
            {this.state.email === null && <SignIn updateEmail={this.updateEmail.bind(this)}/> }

            </div>
        )
    }
}

// auth.onAuthStateChanged(user => {
//     if (user) {
//         this.setState({email: user.email})
//     }
// });

export default Infected;
