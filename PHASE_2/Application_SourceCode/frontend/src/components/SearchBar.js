import React from 'react';
import data from '../Data/disease_data.json';
import Draggable from 'react-draggable';

class SearchBar extends React.Component {

    state = {
        iso: ''
    }

    updateDisease(e) {
        this.props.updateDisease(e.target.value);
        if (e.target.value === "COVID-19") {
            let input = document.getElementById('DateRange');
            input.setAttribute('min', '202000');
            input.setAttribute('max', '202365');
            let dates = document.getElementById('dates');
            this.props.updateSlider(202000);
            let date = String(new Date("2020-01-01")).slice(4,15);
            dates.textContent = date;
            date = new Date("2020-01-01").toISOString().slice(0,10)
            this.props.updateISO(date);
            this.setState({iso: date})

        } else {
            if (this.props.dateRange > 202100) {
                this.props.updateSlider(202100);
            }
            let input = document.getElementById('DateRange');
            this.props.updateISO("");
            input.setAttribute('min', '199600');
            input.setAttribute('max', '202100');
            let dates = document.getElementById('dates');
            dates.textContent = Math.floor(this.props.dateRange / 100);
            this.setState({iso: ""})
        }
    }

    updateSlider(e) {
        this.props.updateSlider(e.target.value);
        if (this.props.disease === "COVID-19") {
            let dates = document.getElementById('dates');
            let strDate = '2020-01-01';
            let movingDate = new Date(strDate);
            let endDate = new Date('2021-01-01');
            let day = String(e.target.value).slice(3,6)
            day = parseInt(day);
            let i = 0;
            while (strDate < endDate.toISOString().slice(0,10)) {
                strDate = movingDate.toISOString().slice(0,10);
                if (i == day) {
                    break;
                }
                movingDate.setDate(movingDate.getDate() + 1);
                i++;
            }
            let date = String(movingDate).slice(4,15);
            dates.textContent = date;
            this.props.updateISO(strDate);
            this.setState({iso: date})
        }
    }

    updateSwitch(e) {
        this.props.updateSwitch(e.target.checked);
        if (e.target.checked === true) {
            let header = document.getElementById('switchmap');
            header.textContent = "Fatalities / Year";
        } else {
            let header = document.getElementById('switchmap');
            header.textContent = "Infected / Year";
        }
    }
    
    render() {
        let item = data.map(disease =>
                <option key={disease.disease}>
                {disease.disease}
                </option>
            );
        return (
            <Draggable
                axis="both"
                handle="#keyTerm"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[1, 1]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
            <div className="SearchBar">
                <div id="keyTerm" className="Box">
                    <div className="FlexRow">
                        <h5 id='switchmap'>Infected/Year</h5>
                        <label className="switch">
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
                        <h5>In:</h5>
                        <h5 id="dates">{Math.floor(this.props.dateRange / 100)}</h5>
                    </div>
                    <input key='slider' type="range" min="199600" max="202100" defaultValue="202000" className="yearslider" id="DateRange" onChange={this.updateSlider.bind(this)}/>
                </div>
                {this.state.iso === '' && <div id="mapstats" className="Box">
                    <h5>{String(this.props.dateRange).slice(0,4)} Stats</h5>
                    <h5>Total Infected: {this.props.infected}</h5>
                    <h5>Total Fatalities: {this.props.deaths}</h5>
                </div>}
                {this.state.iso !== '' && <div id="mapstats" className="Box">
                    <h5>{this.state.iso} Stats</h5>
                    <h5>Total Infected: {this.props.infected}</h5>
                    <h5>Total Fatalities: {this.props.deaths}</h5>
                </div>}
            </div>
            </Draggable>
        )
    };
}

export default SearchBar;
