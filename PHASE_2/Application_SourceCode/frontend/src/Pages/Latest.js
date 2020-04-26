import React, { Component } from "react";
import firebase from '../components/Firebase/config.js'

const db = firebase.firestore();

export default class Latest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contact_name: [],
            contact_email: [],
            contact_phone: [],
            symptoms: [],
            locations: []
        }
    }

    addContact(e) {
        e.preventDefault();
        let input1 = document.getElementById('contact1');
        let input2 = document.getElementById('contact2');
        let input3 = document.getElementById('contact3');
        let arr1 = this.state.contact_name;
        let arr2 = this.state.contact_email;
        let arr3 = this.state.contact_phone;
        if (arr2.indexOf(input2.value) !== -1 || input1.value === "" || input2.value === "" || input3.value === "") {
            return;
        }
        arr1.push(input1.value);
        arr2.push(input2.value);
        arr3.push(input3.value);
        this.setState({contact_name: arr1});
        this.setState({contact_phone: arr3});
        this.setState({contact_email: arr2});
        db.collection('users').doc(this.props.uid).set({
            contact_names: arr1,
            contact_email: arr2,
            contact_phone: arr3
        }, {merge: true});
    }

    removeContact(e) {
        e.preventDefault();
        let input1 = document.getElementById('contact1');
        let input2 = document.getElementById('contact2');
        let input3 = document.getElementById('contact3');
        let arr1 = this.state.contact_name;
        let arr2 = this.state.contact_email;
        let arr3 = this.state.contact_phone;
        if (arr1.indexOf(input1.value) !== -1 && arr2.indexOf(input2.value) !== -1 && arr3.indexOf(input3.value) !== -1) {
            let index = arr2.indexOf(input2.value)
            arr1.splice(index, 1);
            arr2.splice(index, 1);
            arr3.splice(index, 1);
        }
        this.setState({contact_name: arr1});
        this.setState({contact_phone: arr3});
        this.setState({contact_email: arr2});
        db.collection('users').doc(this.props.uid).set({
            contact_names: arr1,
            contact_email: arr2,
            contact_phone: arr3
        }, {merge: true});
    }

    addSymptom(e) {
        e.preventDefault();
        let input = document.getElementById('symptom');
        let arr = this.state.symptoms;
        if (arr.indexOf(input.value) !== -1 || input.value === "") {
            return;
        }
        arr.push(input.value);
        this.setState({symptoms: arr})
        db.collection('users').doc(this.props.uid).set({
            symptoms: arr
        }, {merge: true});
    }

    removeSymptom(e) {
        e.preventDefault();
        let input = document.getElementById('symptom');
        let arr = this.state.symptoms;
        if (arr.indexOf(input.value) !== -1) {
            arr.splice(input.value, 1);
        }
        this.setState({symptoms: arr})
        db.collection('users').doc(this.props.uid).set({
            symptoms: arr
        }, {merge: true});
    }

    addLocation(e) {
        e.preventDefault();
        let input = document.getElementById('location');
        let arr = this.state.locations;
        if (arr.indexOf(input.value) !== -1 || input.value === "") {
            return;
        }
        arr.push(input.value);
        this.setState({home: arr})
        db.collection('users').doc(this.props.uid).set({
            locations: arr
        }, {merge: true});
    }

    removeLocation(e) {
        e.preventDefault();
        let input = document.getElementById('location');
        let arr = this.state.locations;
        if (arr.indexOf(input.value) !== -1) {
            arr.splice(input.value, 1);
        }
        this.setState({home: arr})
        db.collection('users').doc(this.props.uid).set({
            locations: arr
        }, {merge: true});
    }

    componentDidMount() {
        db.collection('users').doc(this.props.uid).get()
        .then(doc => {
            if (!doc.exists) {
            } else {
                if (doc.data().symptoms !== undefined) {
                    this.setState({symptoms: doc.data().symptoms});
                }
                if (doc.data().locations !== undefined) {
                    this.setState({locations: doc.data().locations});
                }
                if (doc.data().contact_names !== undefined) {
                    this.setState({contact_name: doc.data().contact_names});
                }
                if (doc.data().contact_phone !== undefined) {
                    this.setState({contact_phone: doc.data().contact_phone});
                }
                if (doc.data().contact_email !== undefined) {
                    this.setState({contact_email: doc.data().contact_email});
                }
            }
        })
        .catch(err => {
        });
    }

    render() {
        return (
            <div className="mt-8 text-black">
              <h1 style={{margin: 20}} className="text-3xl mb-2 text-center font-bold">People I Have Come Into Contact With</h1>
              <div style={{borderWidth: "3px", borderColor: "grey"}} className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <form className="text-black">
                  <label htmlFor="userEmail" className="block">
                    Full Name:
                  </label>
                  <div>
                  <input
                    className="my-1 p-1 w-full"
                    placeholder="E.g: John Smith"
                    id="contact1"
                    required
                  />
                  </div>
                  <label htmlFor="userPassword" className="block" style={{marginTop: "25px"}}>
                    Email Address:
                  </label>
                  <input
                    type="email"
                    className="mt-1 mb-3 p-1 w-full"
                    name="userPassword"
                    placeholder="E.g: faruq123@gmail.com"
                    id="contact2"
                    required
                  />
                  <label htmlFor="userPassword" className="block" style={{marginTop: "25px"}}>
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    className="mt-1 mb-3 p-1 w-full"
                    placeholder="E.g: 0412 345 678'"
                    id="contact3"
                    required
                  />
                  <ul style={{marginTop: "25px"}}>
                  {this.state.contact_email.map((contact, i) => {
                          return (<option key={contact} style={{marginTop: "10px"}}>
                          {this.state.contact_name[i]} | {contact} | {this.state.contact_phone[i]}
                          </option>)})}
                  </ul>
                  <table style={{marginTop: "20px"}}>
                  <button style={{width: "25%", marginLeft: "20%"}} className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={(e) => this.addContact(e)}>
                    Add Contact
                  </button>
                  <button style={{width: "25%", marginLeft: "10%"}} className="bg-red-400 hover:bg-red-500 w-full py-2 text-white" onClick={(e) => this.removeContact(e)}>
                    Remove Contact
                  </button>
                  </table>
                </form>
              </div>

              <h1 style={{margin: 20, marginTop: 100}} className="text-3xl mb-2 text-center font-bold">New Symptoms</h1>
              <div style={{borderWidth: "3px", borderColor: "grey"}} className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <form className="text-black">
                  <label htmlFor="userEmail" className="block">
                    Symptom:
                  </label>
                  <div>
                  <input
                    className="my-1 p-1 w-full"
                    placeholder="E.g: fever"
                    id="symptom"
                    required
                  />
                  </div>
                  <ul>
                  {this.state.symptoms.map(symptom =>{
                          return (<option key={symptom} style={{marginTop: "10px"}}>
                          {symptom}
                          </option>)})}
                  </ul>
                  <table style={{marginTop: "20px"}}>
                  <button style={{width: "25%", marginLeft: "20%"}} className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={(e) => this.addSymptom(e)}>
                    Add Symptom
                  </button>
                  <button style={{width: "25%", marginLeft: "10%"}} className="bg-red-400 hover:bg-red-500 w-full py-2 text-white" onClick={(e) => this.removeSymptom(e)}>
                    Remove Symptom
                  </button>
                  </table>
                </form>
              </div>

              <h1 style={{margin: 20, marginTop: 100}} className="text-3xl mb-2 text-center font-bold">Recently Visited Locations</h1>
              <div style={{borderWidth: "3px", borderColor: "grey", marginBottom: 100}} className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <form className="text-black">
                  <label htmlFor="userEmail" className="block">
                    Location:
                  </label>
                  <div>
                  <input
                    className="my-1 p-1 w-full"
                    placeholder="E.g: Randwick"
                    id="location"
                  />
                  </div>
                  <ul>
                  {this.state.locations.map(location => {
                          return (<option key={location} style={{marginTop: "10px"}}>
                          {location}
                          </option>)})}
                  </ul>
                  <table style={{marginTop: "20px"}}>
                  <button style={{width: "25%", marginLeft: "20%"}} className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={(e) => this.addLocation(e)}>
                    Add Location
                  </button>
                  <button style={{width: "25%", marginLeft: "10%"}} className="bg-red-400 hover:bg-red-500 w-full py-2 text-white" onClick={(e) => this.removeLocation(e)}>
                    Remove Location
                  </button>
                  </table>
                </form>
              </div>

            </div>
        )
    }
}
