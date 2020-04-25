import React from 'react';
import DatePicker from './DatePicker.js';
import Draggable from 'react-draggable';

class SimController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateOffsetCallback: this.props.dateOffsetCallback,
            currentDateOffset: 0
        }
    }

    updateSlider(e) {
        console.log(e.target.value)
    }

    incrementDate() {
        if (this.props.numberInfected <= 0) {
            return;
        }
        this.setState({currentDateOffset: this.state.currentDateOffset + 1 });
        this.state.dateOffsetCallback(this.state.currentDateOffset  + 1);
    }

    decrementDate() {
        if (this.state.currentDateOffset > 0) {
            this.setState({currentDateOffset: this.state.currentDateOffset - 1 });
            this.state.dateOffsetCallback(this.state.currentDateOffset  - 1);
        }
    }

    setLockdown() {
        this.props.setLockdown();
    }

    setReset() {
        this.state.currentDateOffset = 0;
        this.props.setReset();
    }

    statisticStyle = {
        overflow: "hidden", whiteSpace: "nowrap", color: "white", width: "100%"
    }

    render() {
        return (
            <Draggable
            axis="both"
            handle="#move"
            defaultPosition={{x: 0, y: -100}}
            position={null}
            grid={[1, 1]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
        <div className="SearchBar" id="move">
        <h6 style={this.statisticStyle}> Day: {this.state.currentDateOffset} </h6>
        <h6 style={this.statisticStyle}> Number Infected: {this.props.numberInfected} </h6>
        <h6 style={this.statisticStyle}> Active Locations: {this.props.locations} </h6>
        <input type="button" className="" id="backwards" onClick={this.decrementDate.bind(this)} value="Previous Day"/>
        <input type="button" className="" id="forwards" onClick={this.incrementDate.bind(this)} value="Next Day"/>
        <input type="button" className="button-orange" value="Initiate Lockdown" onClick={this.setLockdown.bind(this)}/>
        <input type="button" value="Reset Simulation" onClick={this.setReset.bind(this)}/>
        </div>
        </Draggable>
        )
    };
}

// <div className="FlexRow" style={{width: "100%", lineHeight: "40px", height: "40px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#3A3A3A", }}>
//     <div className="FlexRow" style={{width: "500px", lineHeight: "40px", height: "40px", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#3A3A3A", }}>
//     <h6 style={this.statisticStyle}> Day: {this.state.currentDateOffset} </h6>
//     <h6 style={this.statisticStyle}> Number Infected: {this.props.numberInfected} </h6>
//     </div>
//     <nav className="FlewRow" style={{height: "40px", width: "100%", justifyContent: "center", backgroundColor: "transparent", boxShadow: "none", WebkitBoxShadow: "none"}}>
//         <ul className="right FlexRow noselect" style={{verticalAlign: "center", lineHeight: "40px", height: "40px"}}>
//             <li><a id="backwards" onClick={this.decrementDate.bind(this)}> Previous Day </a> </li>
//             <li><a id="forwards" onClick={this.incrementDate.bind(this)}> Next Day </a> </li>
//         </ul>
//     </nav>
// </div>

export default SimController;
