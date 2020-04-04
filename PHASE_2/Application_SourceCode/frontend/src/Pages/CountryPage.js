import React from 'react';
import '../App.css';
//import * as firebase from 'firebase'

//const admin = require('firebase-admin');
//let serviceAccount = require('../data/seng3011-api-fb42b6444366')
//admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
//let db = admin.firestore
//let reportRef = db.collection('reports')
//let query = reportRef.where('countries', '==', true).limit(2).get()
//    .then(snapshot => {
//        if (snapshot.empty) {
//            console.log('No matching documents.');
//            return;
//        }

//        snapshot.forEach(doc => {
//            console.log(doc.id, '=>', doc.data());
//        });
//    })
//    .catch(err => {
//        console.log('Error getting documents', err);
//    });

class CountryPage extends React.Component {
    render() {
        return (
            <div className="Title">
                <p> {this.props.country} </p>
            </div>
        );
    }
}

export default (CountryPage);
