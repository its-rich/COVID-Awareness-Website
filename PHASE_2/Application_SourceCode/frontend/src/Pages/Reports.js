import React from 'react';
import '../App.css';
import { db } from '../components/Firebase/config.js'
import parseISO from 'date-fns/parseISO';

class Reports extends React.Component {

    // constructor(props) {
    //     super(props);
        state = {
            data: [],
            showDoc: '',
            url: ''
        }
    //     this.setDoc = this.setDoc.bind(this);
    // }

    componentDidMount() {
        // db.collection('reports').orderBy('event_date', 'desc').limit(1).get()
        //     .then(snapshot => {
        //         if (snapshot.empty) {
        //             console.log('No matching documents.');
        //             return;
        //         }
        //         let newdata = [];
        //         snapshot.forEach(doc => {
        //             newdata.push(doc.data());
        //         });
        //         this.setState({data: newdata});
        //     });
    }

    setDoc = (e) => {
        console.log(e);
        this.setState({showDoc: 1}, console.log(this.state.showDoc));
    }

    componentDidUpdate() {
        console.log(this.state.showDoc);
    }

    render () {
        return (
            <div>
                <center className="Title"> WHO Outbreak Reports </center>
                {/* <div class="iframe-container"> */}
                    <iframe src="https://www.who.int/csr/don/archive/year/en/" frameborder='0' width="100%" height="900"></iframe>
                {/* </div> */}
                {this.state.showDoc === '' && this.state.data.map((doc) => {
                    return (
                    <ul className="reportDocs" key={doc.url} onClick={this.setDoc.bind(this)}>
                        <h2>{doc.headline}</h2>
                        <h3>{"Published on " + String(parseISO(doc.event_date+"T00:00:00Z")).slice(0,15)}</h3>
                    </ul>
                    )
                })}
                {this.state.showDoc !==  '' && this.state.data.map(function(info, index) {
                    // console.log(info);
                    // console.log(this.state.showDoc);
                    // if (info.url === this.state.showDoc) {
                    //     return (
                    //         <div className='reportDoc'>
                    //             <h2>{info.headline}</h2>
                    //             <h3>{"Published on " + String(parseISO(info.event_date+"T00:00:00Z")).slice(0,15)}</h3>
                    //             <p>{info.main_text}</p>
                    //         </div>
                    //     )
                    // }
                    })
                })}
            </div>
        )
    }
}

export default Reports;
