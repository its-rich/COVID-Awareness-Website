import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { db } from './components/Firebase/config.js'

db.collection('diseases').where('diseases', 'array-contains', 'coronavirus').get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return
        }
        //console.log(snapshot.size); // count total amount -> don't use this
        // snapshot.forEach(doc => {
        //     console.log(doc.data().diseases.length);
        // });
    })
    .catch((err) => {
    console.log('Error getting documents', err);
    });


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
