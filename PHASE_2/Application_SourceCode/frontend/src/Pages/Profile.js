import React, { Component } from "react";
import firebase from '../components/Firebase/config.js'

const db = firebase.firestore();

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first: "",
            last: "",
            email: props.email,
            num: "",
            home: "",
            dob: "",
            sex: ""
        }
    }

    setFirstName(e) {
        e.preventDefault();
        let input = document.getElementById('first');
        this.setState({first: input.value})
    }

    setLastName(e) {
        e.preventDefault();
        let input = document.getElementById('last');
        this.setState({last: input.value})
    }

    setEmail(e) {
        e.preventDefault();
        let input = document.getElementById('email');
        this.setState({email: input.value})
    }

    setNum(e) {
        e.preventDefault();
        let input = document.getElementById('num');
        this.setState({num: input.value})
    }

    setHome(e) {
        e.preventDefault();
        let input = document.getElementById('home');
        this.setState({home: input.value})
    }

    setDOB(e) {
        e.preventDefault();
        let input = document.getElementById('dob');
        this.setState({dob: input.value})
    }

    setSex(e) {
        e.preventDefault();
        let input = document.getElementById('sex');
        this.setState({sex: input.value})
    }

    componentDidMount() {
        db.collection('users').doc(this.state.email).get()
        .then(doc => {
            if (!doc.exists) {
            } else {
                if (doc.data().first_name !== undefined) {
                    this.setState({first: doc.data().first_name});
                }
                if (doc.data().last_name !== undefined) {
                    this.setState({last: doc.data().last_name});
                }
                if (doc.data().phone_number !== undefined) {
                    this.setState({num: doc.data().phone_number});
                }
                if (doc.data().home_address !== undefined) {
                    this.setState({home: doc.data().home_address});
                }
                if (doc.data().date_of_birth !== undefined) {
                    this.setState({dob: doc.data().date_of_birth});
                }
                if (doc.data().gender !== undefined) {
                    this.setState({sex: doc.data().gender});
                }
            }
        })
        .catch(err => {
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.first !== this.state.first) {
            db.collection('users').doc(this.state.email).set({
                first_name: this.state.first
            }, {merge: true});
        } else if (prevState.last !== this.state.last) {
            db.collection('users').doc(this.state.email).set({
                last_name: this.state.last
            }, {merge: true});
        } else if (prevState.num !== this.state.num) {
            db.collection('users').doc(this.state.email).set({
                phone_number: this.state.num
            }, {merge: true});
        } else if (prevState.home !== this.state.home) {
            db.collection('users').doc(this.state.email).set({
                home_address: this.state.home
            }, {merge: true});
        } else if (prevState.dob !== this.state.dob) {
            db.collection('users').doc(this.state.email).set({
                date_of_birth: this.state.dob
            }, {merge: true});
        } else if (prevState.sex !== this.state.sex) {
            db.collection('users').doc(this.state.email).set({
                gender: this.state.sex
            }, {merge: true});
        }
    }


    render() {
        return (
            <div className="mt-8 text-black">
                <h1 style={{margin: 20}} className="text-3xl mb-2 text-center font-bold">My Profile</h1>
                <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8" style={{marginBottom: "50px"}}>
                    <form className="text-black">
                    { this.state.first === '' && <div>
                        <label className="block">
                            First Name
                        </label>
                        <div className="FlexRow">
                            <input id="first" placeholder=''/>
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setFirstName(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.first !== '' && <div>
                        <label className="block">
                            First Name
                        </label>
                        <div className="FlexRow">
                            <input id="first" value={this.state.first} disabled/>
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setFirstName(e)} disabled>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.last === '' && <div>
                        <label className="block">
                            Last Name
                        </label>
                        <div className="FlexRow">
                            <input id="last" placeholder='' />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setLastName(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.last !== '' && <div>
                        <label className="block">
                            Last Name
                        </label>
                        <div className="FlexRow">
                            <input id="last" value={this.state.last} disabled/>
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setLastName(e)} disabled>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    <div>
                        <label className="block">
                            Email Address
                        </label>
                        <div className="FlexRow">
                            <input id="email" value={this.state.email} disabled/>
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setEmail(e)} disabled>
                                Confirm Change
                            </button>
                        </div>
                    </div>
                    { this.state.num === '' &&  <div>
                        <label className="block">
                            Contact Number
                        </label>
                        <div className="FlexRow">
                            <input id="num" placeholder='E.g: 0412 345 678' />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setNum(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.num !== '' &&  <div>
                        <label className="block">
                            Contact Number
                        </label>
                        <div className="FlexRow">
                            <input id="num" defaultValue={this.state.num} />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setNum(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.home === '' && <div>
                        <label className="block">
                            Home Address
                        </label>
                        <div className="FlexRow">
                            <input id="home" placeholder='E.g: 123 Smith Street, Suburb' />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setHome(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.home !== '' && <div>
                        <label className="block">
                            Home Address
                        </label>
                        <div className="FlexRow">
                            <input id="home" value={this.state.home} />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setHome(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.dob === '' && <div>
                        <label className="block">
                            Date of Birth
                        </label>
                        <div className="FlexRow">
                            <input id="dob" type="date" min="1920-01-01" max="2020-04-27"/>
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setDOB(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.dob !== '' && <div>
                        <label className="block">
                            Date of Birth
                        </label>
                        <div className="FlexRow">
                            <input id="dob" value={this.state.dob} type="date" min="1920-01-01" max="2020-04-27" disabled/>
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setDOB(e)} disabled>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.sex === '' && <div>
                        <label className="block">
                            Sex/Gender
                        </label>
                        <div className="FlexRow">
                            <input id="sex" />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setSex(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    { this.state.sex !== '' && <div>
                        <label className="block">
                            Sex/Gender
                        </label>
                        <div className="FlexRow">
                            <input id="sex" value={this.state.sex} />
                            <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white" style={{width: "50%", height: "50%"}} onClick={(e) => this.setSex(e)}>
                                Confirm Change
                            </button>
                        </div>
                    </div>}
                    </form>
                </div>
            </div>
        )
    }
}
