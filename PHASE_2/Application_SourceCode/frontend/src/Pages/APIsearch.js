import React, {Component} from 'react';
import '../App.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class APIsearch extends Component {
    state = {
        isOpen: false,
        startDate: new Date("1996-01-01T00:00:00.000Z"),
        endDate: new Date("2020-04-05T00:00:00.000Z"),
        country: "",
        key: "",
        url: "",
        results:[]
    };

    setStartDate = (date) => {
        this.setState({
        startDate: date
        });
    };

    setEndDate = (date) => {
        this.setState({
            endDate: date
        });
    };

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    renderSelectionValue = () => {
        return (
            <div>
                <div>Selection</div>
                {this.state.startDate.toDateString()}
                {/* {this.state.startDate.toISOString()} */}
                {" - "}
                {this.state.endDate.toDateString()}
            </div>
        );
    };

    setCountry = (event) => {
        this.setState({country: event.target.value});
    }
    setKey = (event) => {
        this.setState({key: event.target.value});
    }

    submitHandler = (event) => {

        const sYear = this.state.startDate.getUTCFullYear()
        const sMonth = this.state.startDate.getMonth()
        const sDate = this.state.startDate.getDate()
        const startD = new Date()
        startD.setUTCFullYear(sYear, sMonth, sDate)
        const eYear = this.state.endDate.getUTCFullYear()
        const eMonth = this.state.endDate.getMonth()
        const eDate = this.state.endDate.getDate()
        const endD = new Date()
        endD.setUTCFullYear(eYear, eMonth, eDate)
        const dateOffset = "start_date=" + startD.toISOString().split('T')[0] + "T00%3A00%3A00&end_date=" + endD.toISOString().split('T')[0] + "T00%3A00%3A00"
        // alert("date offset" + dateOffset)
        const url = "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?" + dateOffset + "&key=" + this.state.key + "&location=" + this.state.country
        // alert("searching " + url)
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.props.changeData(data)
                // console.log(this.state.results);
            });
    }

    render() {
        // console.log(this.state.startDate);
        // console.log(this.state.endDate);
        // console.log(this.state.country);
        // console.log(this.state.key);
        // console.log("----------");
        return (
            <>
                <div>{this.renderSelectionValue()}</div>

                <div>
                <input
                    type="button"
                    value="Settings"
                    onClick={this.onToggle}
                />
                </div>
                <div>
                    {this.state.isOpen && (
                        <>
                        <form onSubmit={this.submitHandler}>
                            <DatePicker
                            selected={this.state.startDate}
                            onChange={this.setStartDate.bind(this)}
                            />
                            <DatePicker
                            selected={this.state.endDate}
                            onChange={this.setEndDate.bind(this)}
                            />
                            <p>name of country:</p>
                            <input type='text' onChange={this.setCountry}/>
                            <p>key Search:</p>
                            <input type='text' onChange={this.setKey}/>
                            <input
                            type='button'
                            value="Search"
                            onClick={this.submitHandler}
                            />
                        </form>
                        <ul>
                            {this.state.results.map(result => (
                                <li key={result.url}>
                                    {result.headline}
                                </li>
                            ))}
                        </ul>
                        </>
                    )}
                </div>
                </>
        )
    }
}

export default APIsearch;
