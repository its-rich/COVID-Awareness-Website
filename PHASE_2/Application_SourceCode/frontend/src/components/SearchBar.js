import React from 'react';
import data from '../Data/disease_data.json';

class SearchBar extends React.Component {

    updateDisease(e) {
        this.props.updateDisease(e.target.value);
        if (e.target.value === "COVID-19") {
            let input = document.getElementById('DateRange');
            input.setAttribute('min', '201912');
            input.setAttribute('max', '202100');
            let dates = document.getElementById('dates');
            this.props.updateSlider(201900)
            dates.textContent = Math.floor(this.props.dateRange / 100) + " - " + this.decimalToMonth((this.props.dateRange % 100) / 100);
        } else {
            let input = document.getElementById('DateRange');
            input.setAttribute('min', '199600');
            input.setAttribute('max', '202100');
            let dates = document.getElementById('dates');
            dates.textContent = Math.floor(this.props.dateRange / 100);
        }
    }

    updateSlider(e) {
        this.props.updateSlider(e.target.value);
        if (this.props.disease === "COVID-19") {
            let dates = document.getElementById('dates');
            dates.textContent = Math.floor(this.props.dateRange / 100) + " - " + this.decimalToMonth((this.props.dateRange % 100) / 100);
        }
    }

    updateSwitch(e) {
        this.props.updateSwitch(e.target.checked);
        if (e.target.checked === true) {
            let header = document.getElementById('switchmap');
            header.textContent = "Fatalities/Year";
        } else {
            let header = document.getElementById('switchmap');
            header.textContent = "Infected/Year";
        }
    }

    // 0 <= NUM <= 1   !!!!
    decimalToMonth(num) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[Math.floor(num * 12)];
    }

    render() {
        let item = data.map(disease =>
                <option key={disease.disease}>
                {disease.disease}
                </option>
            );
        return (
            <div className="SearchBar">
                <div id="keyTerm" className="Box">
                    <div className="FlexRow">
                        <h5 id='switchmap'>Infected/Year</h5>
                        <label class="switch">
                        <input className="inputSlider checkbox" type="checkbox" onChange={this.updateSwitch.bind(this)} />
                        <span className="slider round"></span>
                        </label>
                    </div>

                    <h5>Disease:</h5>
                    <select className="browser-default" id="diseaseSelect" defaultValue={'DEFAULT'} onChange={this.updateDisease.bind(this)}>
                        <option value="DEFAULT" disabled>Select A Disease</option>
                        <option key="COVID-19">COVID-19</option>
                        {item}
                    </select>
                </div>
                <div id="startDate" className="Box">
                    <div className="FlexRow">
                        <h5>Since:</h5>
                        <h5 id="dates">{Math.floor(this.props.dateRange / 100)}</h5>
                    </div>
                    <input key='slider' type="range" min="199600" max="202100" defaultValue="202000" className="yearslider" id="DateRange" onChange={this.updateSlider.bind(this)}/>
                </div>
                <div id="mapstats" className="Box">
                    <h5>Total Infected: {this.props.infected}</h5>
                    <h5>Total Fatalities: {this.props.deaths}</h5>
                </div>
            </div>
        )
    };
}

export default SearchBar;
