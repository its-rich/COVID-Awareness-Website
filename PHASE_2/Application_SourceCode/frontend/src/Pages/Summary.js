import React, { Component } from "react";
import firebase from '../components/Firebase/config.js'

const db = firebase.firestore();

export default class Summary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arr: [],
            cases: 0,
            new: 0,
            loc: [],
            locNum: [],
            sym: [],
            symNum: [],
            name: [],
            phone: [],
            email: []
        }
    }

    componentDidMount() {
        let arr = []
        db.collection('users').get()
        .then(snapshot => {
            let loc = []
            let locNum = []
            let sym = []
            let symNum = []
            let name = []
            let phone = []
            let email = []
            this.setState({cases: snapshot.size - 1});
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
                if (doc.data().locations !== undefined) {
                    doc.data().locations.forEach((item, i) => {
                        if (loc.indexOf(item) === -1) {
                            loc.push(item);
                            locNum.push(1);
                        } else {
                            locNum[loc.indexOf(item)] += 1
                        }
                    });
                }
                if (doc.data().symptoms !== undefined) {
                    doc.data().symptoms.forEach((item, i) => {
                        if (sym.indexOf(item) === -1) {
                            sym.push(item);
                            symNum.push(1);
                        } else {
                            symNum[loc.indexOf(item)] += 1
                        }
                    });
                }
                if (doc.data().contact_names !== undefined) {
                    doc.data().contact_names.forEach((item, i) => {
                        name.push(doc.data().contact_names[i]);
                        phone.push(doc.data().contact_phone[i]);
                        email.push(doc.data().contact_email[i]);
                    });
                }
                arr.push(temp);
            }
            this.setState({loc: loc});
            this.setState({locNum: locNum});
            this.setState({sym: sym});
            this.setState({symNum: symNum});
            this.setState({arr: arr});
            this.setState({name: name});
            this.setState({phone: phone});
            this.setState({email: email});
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cases !== this.state.cases) {
            db.collection('users').doc(this.props.uid).get()
            .then(doc => {
                if (this.state.cases > doc.data().cases) {
                    this.setState({new: this.state.cases - doc.data().cases});
                }
            })
            db.collection('users').doc(this.props.uid).get()
            .then(doc => {
                if (this.state.cases > doc.data().cases) {
                    db.collection('users').doc(this.props.uid).set({
                        cases: this.state.cases
                    }, {merge: true});
                    this.setState({new: this.state.cases - doc.data().cases});
                }
            })
        }
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

    getLoc() {
        return this.state.loc.map((item, i) => {
            return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{this.state.locNum[i]}</td>
                </tr>
            )
        })
    }

    getContact() {
        return this.state.email.map((item, i) => {
            return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{this.state.name[i]}</td>
                  <td>{this.state.email[i]}</td>
                  <td>{this.state.phone[i]}</td>
                </tr>
            )
        })
    }

    getSymp() {
        return this.state.sym.map((item, i) => {
            return (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{this.state.symNum[i]}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
            <h1 style={{margin: 30, color: "black"}} className="text-3xl mb-2 text-center font-bold">{this.state.new} New Cases Since Last Login</h1>
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

      <h1 style={{margin: 30, color: "black", marginTop: "60px"}} className="text-3xl mb-2 text-center font-bold">Cases By Location</h1>
      <table className="centered" style={{color: "black", width: "95%", marginTop: "25px", marginLeft: "2.5%", marginBottom: "70px", border: "1px solid #e2e8f0"}}>
      <thead>
        <tr>
            <th>Location</th>
            <th>Total Cases</th>
        </tr>
        </thead>
        <tbody>
        {this.getLoc()}
        </tbody>
      </table>

      <h1 style={{margin: 30, color: "black", marginTop: "60px"}} className="text-3xl mb-2 text-center font-bold">Reported Symptoms</h1>
      <table className="centered" style={{color: "black", width: "95%", marginTop: "25px", marginLeft: "2.5%", marginBottom: "70px", border: "1px solid #e2e8f0"}}>
      <thead>
        <tr>
            <th>Symptom</th>
            <th>Total Reports</th>
        </tr>
        </thead>
        <tbody>
        {this.getSymp()}
        </tbody>
      </table>

      <h1 style={{margin: 30, color: "black", marginTop: "60px"}} className="text-3xl mb-2 text-center font-bold">People Who Have Been In Contact With A User</h1>
      <table className="centered" style={{color: "black", width: "95%", marginTop: "25px", marginLeft: "2.5%", marginBottom: "70px", border: "1px solid #e2e8f0"}}>
      <thead>
        <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Contact Number</th>
        </tr>
        </thead>
        <tbody>
        {this.getContact()}
        </tbody>
      </table>

      </div>
        )
    }
}
