import React from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class PickDate extends React.Component {
    state = {
        isOpen: false,
        startDate: new Date("1996-01-01T00:00:00.000Z"),
        endDate: new Date("2020-04-05T00:00:00.000Z"),
        country: "",
        key: "",
        url: ""
    };

  setStartDate = (date) => {
      this.setState({
      startDate: date
    }, console.log(this.state.startDate));
    // console.log(this.state.startDate)
    // console.log(this.state.endDate)
  };

  setEndDate = (date) => {
    this.setState({
      endDate: date
    }, console.log(this.state.endDate));
    // console.log(this.state.startDate)
    // console.log(this.state.endDate)
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
    // alert("Searching " + this.state.country + " | " + this.state.key + " | " + startD.toISOString().split('T')[0] + " - " + endD.toISOString().split('T')[0])
    const dateOffset = "start_date=" + startD.toISOString().split('T')[0] + "T00%3A00%3A00&end_date=" + endD.toISOString().split('T')[0] + "T00%3A00%3A00"
    // alert("date offset" + dateOffset)
    // const url = "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?" + dateOffset + "&key=" + this.state.key + "&country=" + this.state.country
    const url = "https://asia-northeast1-seng3011-api.cloudfunctions.net/report?" + dateOffset
    alert("searching " + url)
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            alert("asdsadsa")
        });

}

  render() {
    // console.log(1);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.country);
    console.log(this.state.key);
    console.log("----------");
    return (
        <>
        <div>{this.renderSelectionValue()}</div>
        
        <div>
          <input
            type="button"
            value="Search"
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
                </>
            )}
        </div>
        </>
    );
  }
}

export default PickDate;
