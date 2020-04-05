import React, {Component} from 'react';
import '../App.css';
import parseISO from 'date-fns/parseISO';

class ReportPage extends Component {

    state = {
        url: ''
    }


    changeUrl = (e) => {
        // console.log(e.target.getAttribute("value"));
        this.props.changeUrl(e.target.getAttribute("value"));
    }

    // componentDidMount() {
    //     this.setState({url: this.props.url})
    // }

    render () {
        // console.log(this.props.u);
        return (
            <div>
                {this.props.data.map((doc) => {
                    return (
                        this.props.data.map(function(info, index) {
                            // console.log(this.state.url);
                            // if (info.url === this.state.url) {
                                return (
                                    <div key={info.url} className='reportDoc'>
                                        <h2>{info.headline}</h2>
                                        <h3>{"Published on " + String(parseISO(info.event_date+"T00:00:00Z")).slice(0,15)}</h3>
                                        <p>{info.main_text}</p>
                                    </div>
                                )
                            // }
                        })
                    )
                })}
            </div>
        )
    }
}

export default ReportPage;
