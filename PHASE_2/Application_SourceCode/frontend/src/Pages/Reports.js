import React from 'react';
import '../App.css';
import { db } from '../components/Firebase/config.js'
import parseISO from 'date-fns/parseISO';
import AllReports from './AllReports.js';
import ReportPage from './ReportPage.js';

class Reports extends React.Component {

    constructor(props) {
        super(props);
        const u = props.u;
        this.state = {
            data: [],
            report: [],
            url: ''
        }
        // this.setDoc = this.setDoc.bind(this);
    }

    componentDidMount() {
        db.collection('reports').orderBy('event_date', 'desc').limit(1).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                let newdata = [];
                snapshot.forEach(doc => {
                    newdata.push(doc.data());
                });
                this.setState({data: newdata});
            });
    }

    changeUrl = (url) => {
        this.setState({url: url});
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            this.state.data.map((doc) => {
                    this.state.data.map(function(info, index) {
                        // console.log(this.state.url);
                        // if (info.url === this.state.url) {
                        //     this.setState({report: info})
                        // }
                    })
            })
        }
    }

    //
    // setDoc = (e) => {
    //     this.setState({url: 1})
    // }
    //
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.url != this.state.url)
    //     url = 1
    // }

    render () {
        return (
            <div>
            {this.state.url === '' && <AllReports data={this.state.data} changeUrl={this.changeUrl.bind(this)}/>}
            {this.state.url !== '' && <ReportPage data={this.state.data} u={this.u}report={this.state.report} url={this.state.url} changeUrl={this.changeUrl.bind(this)}/>}
            </div>
        )
    }

}

export default Reports;
