import React from 'react';

class SearchBar extends React.Component {
    
    state = {
        disease: "",
        dateRange: 201900
    }

    updateSlider = (e) => {
        this.setState({dateRange: e.target.value});
    }

    updateDisease = (e) => {
        this.setState({disease: e.target.value});
    }

    // 0 <= NUM <= 1   !!!!
    decimalToMonth(num) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[Math.floor(num * 12)];
    }

    render() {
        return (
            <div className="SearchBar">
                <div id="keyTerm" className="Box">
                    <h3>Disease:</h3>
                    <input id="keyTermInput" type="search" onChange={this.updateDisease} />
                </div>
                <div id="startDate" className="Box">
                    <h3>Since:</h3>
                    <input type="range" min="201600" max="202100" defaultValue={this.state.dateRange} onChange={this.updateSlider} className="slider" id="DateRange" />
                    <h3>{Math.floor(this.state.dateRange / 100) + " - " + this.decimalToMonth((this.state.dateRange % 100) / 100)}</h3>
                </div>
            </div>
        );
    }
}

export default SearchBar;