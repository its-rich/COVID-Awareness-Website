import React, {Component} from 'react';
import '../App.css';
import { db } from '../components/Firebase/config.js'
import parseISO from 'date-fns/parseISO';

class AllReports extends Component {

    changeUrl = (e) => {
        if (e.target.getAttribute("value") == null) {
            return;
        }
        this.props.changeUrl(e.target.getAttribute("value"));
    }

    render () {
        return (
            <div>
                <center className="reportTitle"> <h3>WHO Outbreak Reports</h3> </center>
                {this.props.data.map((doc) => {
                    return (
                    <ul className="reportDocs" key={doc.url} onClick={this.changeUrl.bind(this)}>
                        <h4 className="doctitle" value={doc.url}>{doc.headline}</h4>
                        <h5>{"Published on " + String(parseISO(String(doc.date_of_publication).slice(0,10)+"T00:00:00Z")).slice(0,15)}</h5>
                    </ul>
                    )
                })}
            </div>
        )
    }
}

export default AllReports;
