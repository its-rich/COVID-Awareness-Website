import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class PickDate extends React.Component {
  state = {
    isOpen: false,
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

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    // console.log(1);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log("----------");
    return (
        <>
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
            <DatePicker
            selected={this.state.startDate}
            onChange={this.setStartDate.bind(this)}
            />
            <DatePicker
            selected={this.state.endDate}
            onChange={this.setEndDate.bind(this)}
            />
            </>
        )}
    </div>
    </>
    );
  }
}

export default PickDate;
