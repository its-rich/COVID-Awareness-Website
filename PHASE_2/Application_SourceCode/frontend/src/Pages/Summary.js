import React, { Component } from "react";
import firebase from '../components/Firebase/config.js'

const db = firebase.firestore();

export default class Summary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arr: []
        }
    }

    componentDidMount() {
        let arr = []
        db.collection('users').get()
        .then(snapshot => {
            for (var doc of snapshot.docs) {
                if (doc.data().email_address === 'coronavirus.aus.tracker@gmail.com') {
                    continue;
                }
                let temp = []
                if (doc.data().first_name !== undefined) {
                    temp.push(doc.data().first_name);
                } else {
                    temp.push("");
                }
                    if (doc.data().last_name !== undefined) {
                    temp.push(doc.data().last_name);
                } else {
                    temp.push("");
                }
                if (doc.data().email_address !== undefined) {
                    temp.push(doc.data().email_address);
                } else {
                    temp.push("");
                }
                if (doc.data().phone_number !== undefined) {
                    temp.push(doc.data().phone_number);
                } else {
                    temp.push("");
                }
                if (doc.data().home_address !== undefined) {
                    temp.push(doc.data().home_address);
                } else {
                    temp.push("");
                }
                if (doc.data().age !== undefined) {
                    temp.push(doc.data().age);
                } else {
                    temp.push("");
                }
                if (doc.data().gender !== undefined) {
                    temp.push(doc.data().gender);
                } else {
                    temp.push("");
                }
                arr.push(temp);
            }
            this.setState({arr: arr});
        });
    }

    getData() {
        return this.state.arr.map(item => {
            return (
            <tr key={item[2]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{item[6]}</td>
            </tr>
            )
        })
    }

    render() {
        return (
            <div>
            <table className="centered" style={{color: "black", width: "95%", marginTop: "25px", marginLeft: "2.5%", border: "1px solid #e2e8f0"}}>
        <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Home Address</th>
              <th>Age</th>
              <th>Gender</th>
          </tr>
        </thead>
        <tbody>
        {this.getData()}
        </tbody>
      </table>
      </div>
        )
    }
}
