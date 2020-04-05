import React from 'react';
import data from '../Data/disease_data.json';
import Draggable from 'react-draggable';

class FilterBar extends React.Component {

    updateDisease(e) {
        this.props.updateDisease(e.target.value);
        let sinput = document.getElementById('startDate');
        sinput.setAttribute('min', '199601');
        sinput.setAttribute('max', '202012');
        let einput = document.getElementById('endDate');
        einput.setAttribute('min', '199602');
        einput.setAttribute('max', '202100');
        let sdates = document.getElementById('sdates');
        this.props.updateStartSlider(199600)
        let edates = document.getElementById('edates');
        this.props.updateEndSlider(202004)
        sdates.textContent = Math.floor(this.props.startDate / 100) + " - " + this.decimalToMonth((this.props.startDate % 100) / 100);
        edates.textContent = Math.floor(this.props.endDate / 100) + " - " + this.decimalToMonth((this.props.endDate % 100) / 100);
        
    }

    updateStartSlider(e) {
        this.props.updateStartSlider(e.target.value);
        // if (this.props.disease === "COVID-19") {
            let sdates = document.getElementById('sdates');
            sdates.textContent = Math.floor(this.props.startDate / 100) + " - " + this.decimalToMonth((this.props.startDate % 100) / 100);
        // }
    }

    updateEndSlider(e) {
        this.props.updateEndSlider(e.target.value);
        // if (this.props.disease === "COVID-19") {
            let edates = document.getElementById('edates');
            edates.textContent = Math.floor(this.props.endDate / 100) + " - " + this.decimalToMonth((this.props.endDate % 100) / 100);
        // }
    }

    // updateSwitch(e) {
    //     this.props.updateSwitch(e.target.checked);
    //     if (e.target.checked === true) {
    //         let header = document.getElementById('switchmap');
    //         header.textContent = "Fatalities / Year";
    //     } else {
    //         let header = document.getElementById('switchmap');
    //         header.textContent = "Infected / Year";
    //     }
    // }

    submitHandler(e){
        let sdates = document.getElementById('sdates');
        console.log(sdates)
        console.log(this.props.startDate)
        console.log("----")
        alert("test1")
        
        alert("You are submitting" + this.state.startDate)
        alert("test2")
    }

    // 0 <= NUM <= 1   !!!!
    decimalToMonth(num) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[Math.floor(num * 12)];
    }

    eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    render() {
        let diseasesList = data.map(disease =>
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
                    {/* <div className="FlexRow">
                        <h5 id='switchmap'>Infected/Year</h5>
                        <label className="switch">
                        <input className="inputSlider checkbox" type="checkbox" onChange={this.updateSwitch.bind(this)} />
                        <span className="slider round"></span>
                        </label>
                    </div> */}
                    <h5>Filter</h5>
                    <h5>Disease:</h5>
                    <select className="browser-default" id="diseaseSelect" defaultValue={'DEFAULT'} onChange={this.updateDisease.bind(this)}>
                        <option value="DEFAULT" disabled>Select A Disease</option>
                        <option key="COVID-19">COVID-19</option>
                        {diseasesList}
                    </select>
                </div>
                <div id="startDate" className="Box">
                    <div className="FlexRow">
                        <h5>From:</h5>
                        <h5 id="sdates">{Math.floor(this.props.startDate / 100)}</h5>
                    </div>
                    <input key='slider' type="range" min="199601" max="202012" defaultValue="199601" className="yearslider" id="startDate" onChange={this.updateStartSlider.bind(this)}/>
                </div>
                <div id="endDate" className="Box">
                    <div className="FlexRow">
                        <h5>To:</h5>
                        <h5 id="edates">{Math.floor(this.props.endDate / 100)}</h5>
                    </div>
                    <input key='slider' type="range" min="199602" max="202100" defaultValue="202004" className="yearslider" id="endDate" onChange={this.updateEndSlider.bind(this)}/>
                </div>
                <form ref="form" onSubmit={this.submitHandler}>
                    <button type="submit">Submit</button>
                </form>
                
            </div>
            </Draggable>
        )
    };
}

export default FilterBar;
