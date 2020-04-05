import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { db } from './components/Firebase/config.js'


// fetch('https://data.nsw.gov.au/data/api/3/action/datastore_search?q=jones&resource_id=21304414-1ff1-4243-a5d2-f52778048b29')
// .then((resp) => resp.json())
// .then((r) => console.log(r))
// db.collection('diseases').where('diseases', 'array-contains', 'coronavirus').get()
//     .then(snapshot => {
//         if (snapshot.empty) {
//             console.log('No matching documents.');
//             return
//         }
//         //console.log(snapshot.size); // count total amount -> don't use this
//         // snapshot.forEach(doc => {
//         //     console.log(doc.data().diseases.length);
//         // });
//     })
//     .catch((err) => {
//     console.log('Error getting documents', err);
//     });


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
