import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

class DatePicker extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();
    const firstDate = moment("1996-01-01", "YYYY-MM-DD");

    this.state = {
      isOpen: false,
      value: moment.range(firstDate, today.clone())
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
    console.log(this.state.value)
  };

  submitHandler(e){
    e.preventDefault();
    let sdates = document.getElementById('sdates');
    // console.log(sdates)
    console.log("----")
    alert("test1")
    
    // alert("You are submitting" + this.state.startDate)
    alert("test2")
  }

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderSelectionValue = () => {
    return (
      <div>
        <div>Selection</div>
        {this.state.value.start.format("YYYY-MM-DD")}
        {" - "}
        {this.state.value.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  render() {
    return (
      <div>
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
            <DateRangePicker
              value={this.state.value}
              onSelect={this.onSelect}
              singleDateRange={false}
              numberOfCalendars={2}
              minimumDate={moment("1996-01-01", "YYYY-MM-DD")}
              maximumDate={moment("2020-04-10", "YYYY-MM-DD")}
            />
            <input
              type="button"
              value="Search"
              onSubmit
            />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default DatePicker;
