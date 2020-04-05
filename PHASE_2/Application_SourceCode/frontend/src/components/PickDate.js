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
    endDate: new Date("2020-04-10T00:00:00.000Z"),
    country: ""
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

submitHandler = (event) => {
    
    alert("Searching " + this.state.country + ", " + this.state.startDate.toDateString() + " - " + this.state.endDate.toDateString())
    const resp = axios.get('https://jsonplaceholder.typicode.com/users');
    alert(resp.data)

}

  render() {
    // console.log(1);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.country);
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
                    <input type='text' onChange={this.setCountry}/>
                    <input type='submit' />
                </form>
                </>
            )}
        </div>
        </>
    );
  }
}

export default PickDate;
