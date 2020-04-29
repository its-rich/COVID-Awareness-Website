import React, {Component} from 'react';
import SignIn from './SignIn.js'
import Latest from './Latest.js'
import Summary from './Summary.js'
import firebase from "../components/Firebase/config.js";
import '../App.css';

class Infected extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uid: this.props.uid,
            email: this.props.email
        }
    }

    updateEmail = (email) => {
        this.setState({email: email});
    }

    updateUID = (uid) => {
        this.setState({uid: uid});
    }

    render() {
        return (
            <div>
            {this.state.uid === undefined && <SignIn updateUID={this.updateUID.bind(this)}/> }
            {this.state.uid !== undefined  && this.state.uid !== "a8Cr03JSL4TAgSFlk57XiRZ5DCk1" && <Latest uid={this.state.uid} email={this.state.email}/>}
            {this.state.uid !== undefined  && this.state.uid === "a8Cr03JSL4TAgSFlk57XiRZ5DCk1" && <Summary uid={this.state.uid}/>}
            </div>
        )
    }
}



export default Infected;
