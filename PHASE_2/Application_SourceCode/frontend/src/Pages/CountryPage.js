import React from 'react';
import '../App.css';
import Graph from '../components/CountryGraph.js';
import PieChart from '../components/PieChart';
import AUSgraph from '../components/AUSgraph.js';
import { db } from '../components/Firebase/config.js'



class CountryPage extends React.Component {
    constructor(props) {
        super(props);
        this.reportList = '';
        this.state = {
            disease: "COVID-19",
            loading: true
        };


    }
    changeState = (e) => {
        this.setState({ disease: "ebola haemorrhagic fever"});
        this.setState({loading : true});
        this.reportList = '';
        //console.log(e.target.innerText);
    }

    finish() {
        if (this.reportList == '') {
            this.reportList = ["No reports found for " + this.state.disease]
        }
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


    diseases() {
        var listOfDiseases = require("../Data/disease_list.json");
        const diseases = listOfDiseases.map((disease) => {
            return (<option className="newdiseases" key={disease.name}>
                    {disease.name}
                    </option>
                    );
        });
        //console.log(diseases);
        return diseases;
        }
    setData = (e) => {
        this.setState({disease: e.target.value})
        console.log("setting state to " + e.target.value);
    }
    aust() {
        if (this.props.country == "Australia") {
            return (<AUSgraph/>)
        }
    }
    render() {
        if (this.state.loading == true) {


            //Reading Reports
            let reportRef = db.collection('reports')
            //console.log(reportRef);
            //console.log(this.props.country);
            let query = reportRef.where("countries", "array-contains", this.props.country).limit(1).get()
                .then(snapshot => {

                    if (snapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    snapshot.forEach(doc => {

                        //if (doc.data().diseases.includes(this.state.disease)){
                            this.reportList = (doc.data().main_text);
                            //console.log(this.reportList)
                        //}
                    });
                    this.finish();
                })

                .catch(err => {
                    console.log('Error getting documents', err);

            });
        }

        return (
            <div >
                <p className="countryTitle"> {this.props.country} </p>
            </div>
        );
    }

}

// <Graph disease={this.state.disease} country= {this.props.country}/>
// <PieChart disease={this.state.disease} switch="dead" country={this.props.country}/>
// <PieChart disease={this.state.disease} switch="infected" country={ this.props.country}/>

export default (CountryPage);
