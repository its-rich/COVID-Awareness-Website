import React from 'react';
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
        if (this.props.cure || this.props.lcure) {
            return;
        }
        if (this.state.currentDateOffset > 0) {
            this.setState({currentDateOffset: this.state.currentDateOffset - 1 });
            this.state.dateOffsetCallback(this.state.currentDateOffset  - 1);
        }
    }

    setLockdown() {
        this.props.setLockdown();
    }

    setCure() {
        this.props.setCure();
    }

    setReset() {
        this.state.currentDateOffset = 0;
        this.props.setReset();
    }

    statisticStyle = {
        overflow: "hidden", whiteSpace: "nowrap", color: "white", width: "100%", margin: "5px"
    }//, fontSize: "large"

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
        <h6 style={this.statisticStyle}>Day: {this.state.currentDateOffset}</h6>
        <h6 style={this.statisticStyle}>Total Infected: {this.props.numberInfected}</h6>
        <h6 style={this.statisticStyle}>New Cases: {this.props.newCases}</h6>
        <table>
        <input type="button" style={{width: "50%", margin: "10px"}} className="btn waves-effect waves-light black" id="backwards" onClick={this.decrementDate.bind(this)} value="Previous Day"/>
        <input type="button" style={{width: "40%"}} className="btn waves-effect waves-light black" id="forwards" onClick={this.incrementDate.bind(this)} value="Next Day"/>
        </table>
        { this.props.lockdown === false && this.props.cure === false && <input type="button" style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light red" value="Initiate Lockdown" onClick={this.setLockdown.bind(this)}/> }
        { this.props.lockdown === true && this.props.cure === false && <input type="button" style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light red" value="End Lockdown" onClick={this.setLockdown.bind(this)}/> }
        { this.props.cure === true && <input type="button" style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light red" value="Initiate Lockdown" onClick={this.setLockdown.bind(this)} disabled/> }
        { this.props.cure === false && this.props.lockdown === false && <input type="button" style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light green" value="Introduce Cure" onClick={this.setCure.bind(this)}/> }
        { this.props.cure === true && this.props.lockdown === false && <input type="button" style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light green" value="Destroy Cure" onClick={this.setCure.bind(this)}/> }
        { this.props.lockdown === true && <input type="button" style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light green" value="Introduce Cure" onClick={this.setCure.bind(this)} disabled/> }
        <input type="button"  style={{width: "75%", margin: "10px"}} className="btn waves-effect waves-light blue" value="Reset Simulation" onClick={this.setReset.bind(this)}/>
        </div>
        </Draggable>
        )
    };
}

export default SimController;
