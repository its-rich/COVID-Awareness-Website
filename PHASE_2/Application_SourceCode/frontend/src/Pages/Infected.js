import React, {Component} from 'react';
import SignIn from './SignIn.js'
import Latest from './Latest.js'
import firebase from "../components/Firebase/config.js";
import '../App.css';

class Infected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email
        }
    }

    updateEmail = (email) => {
        this.setState({email: email});
    }

    render() {
        return (
            <div>
            {this.state.email === undefined && <SignIn updateEmail={this.updateEmail.bind(this)}/> }
            {this.state.email !== undefined  && <Latest email={this.state.email}/>}

            </div>
        )
    }
}
// {this.state.email === undefined && <SignIn updateEmail={this.updateEmail.bind(this)}/> }
// {this.state.email === "coronavirus.aus.tracker@gmail.com"}
// {this.state.email !== undefined  && <Latest email={this.state.email}/>}

// auth.onAuthStateChanged(user => {
//     if (user) {
//         this.setState({email: user.email})
//     }
// });

export default Infected;
