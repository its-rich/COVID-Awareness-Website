import React, {Component} from 'react';
import '../App.css';
import { db } from '../components/Firebase/config.js'
import parseISO from 'date-fns/parseISO';

class AllReports extends Component {

    changeUrl = (e) => {
        // console.log(e.target.getAttribute("value"));
        this.props.changeUrl(e.target.getAttribute("value"));
    }

    render () {
        return (
            <div>
                <center className="Title"> <h3>WHO Outbreak Reports</h3> </center>
                {this.props.data.map((doc) => {
                    return (
                    <ul className="reportDocs" key={doc.url} onClick={this.changeUrl.bind(this)}>
                        <h2 value={doc.url}>{doc.headline}</h2>
                        <h3>{"Published on " + String(parseISO(doc.event_date+"T00:00:00Z")).slice(0,15)}</h3>
                    </ul>
                    )
                })}
            </div>
        )
    }
}

export default AllReports;
