import React from 'react';
import '../App.css';

import { db } from '../components/Firebase/config.js'



class CountryPage extends React.Component {
    constructor(props) {
        super(props);
        var reportList = []
        let reportRef = db.collection('reports')
        //console.log(reportRef);
        this.state = {
            disease: "COVID-19",
            loading: true
        };


    }
    changeState = (e) => {
        this.setState({ disease: "ebola haemorrhagic fever"});
        this.setState({loading : true});
        console.log(e.target.innerText);
    }

    finish() {
        this.setState({loading : false});
    }
//    reports() {
//
//        const countryList = listCountries.map((country) => {
//            if (country.continent == this.state.continent) {
//                return (<button onClick={this.SendToCountry}>{country.country}</button>);
//            }}
//
//
//       );
//        return (
//            <div className="divButtons">{countryList}</div>
//        );
//    }

    render() {
        if (this.state.loading == true) {
            let reportRef = db.collection('reports')
            //console.log(reportRef);
            let query = reportRef.where('diseases', 'array-contains',this.state.disease).limit(2).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    snapshot.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
                        this.reportList = doc.data().main_text;
                        console.log(this.reportList)

                    });
                    this.finish();
                })

                .catch(err => {
                    console.log('Error getting documents', err);

            });
        }

        return (
            <div className="Title">
                <p> {this.props.country} </p>

                <button onClick={this.changeState}> ebola </button>

                <p>{this.reportList}</p>

                <p> The end </p>
            </div>

        );
    }
}

export default (CountryPage);
