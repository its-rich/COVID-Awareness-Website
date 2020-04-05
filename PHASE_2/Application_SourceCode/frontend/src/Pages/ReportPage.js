import React, {Component} from 'react';
import '../App.css';
import parseISO from 'date-fns/parseISO';

class ReportPage extends Component {

    state = {
        url: ''
    }

    changeUrl = (e) => {
        this.props.changeUrl('');
    }

    render () {
        let v = this.props.url;
        return (
            <div>
            <button type="button" onClick={this.changeUrl.bind(this)}>Back</button>
                {this.props.data.map((doc) => {
                    return (
                        this.props.data.map(function(info, index) {
                            if (info.url === v) {
                                return (
                                    <div key={info.url} className='reportDoc'>
                                        <h2>{info.headline}</h2>
                                        <h3>{"Published on " + String(parseISO(info.event_date+"T00:00:00Z")).slice(0,15)}</h3>
                                        <p>{info.main_text}</p>
                                    </div>
                                )
                            }
                        })
                    )
                })}
            </div>
        )
    }
}

export default ReportPage;
