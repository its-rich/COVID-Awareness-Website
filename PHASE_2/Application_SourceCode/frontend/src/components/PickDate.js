import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class PickDate extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
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

  render() {
    console.log(1);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    return (
    <>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.setStartDate.bind(this)}
      />
      <DatePicker
        selected={this.state.endDate}
        onChange={this.setEndDate.bind(this)}
      />
    </>
    );
  }
}

export default PickDate;
