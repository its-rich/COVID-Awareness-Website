import React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class Search extends React.Component {
  handleSelect(ranges){
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render(){
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    return (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    )
  }
}

export default Search;
