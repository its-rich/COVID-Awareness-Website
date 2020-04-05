import React from 'react';
import '../App.css';
import { db } from '../components/Firebase/config.js'
import parseISO from 'date-fns/parseISO';
import AllReports from './AllReports.js';
import ReportPage from './ReportPage.js';
import DatePicker from '../components/DatePicker';

class Reports extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            report: [],
            url: ''
        }
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
