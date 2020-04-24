import React from 'react';
import DatePicker from './DatePicker.js';

class SimController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateOffsetCallback: this.props.dateOffsetCallback,
            currentDateOffset: 0,
        }
    }

    updateSlider(e) {
        console.log(e.target.value)
    }

    incrementDate() {
        this.setState({currentDateOffset: this.state.currentDateOffset + 1 });
        this.state.dateOffsetCallback(this.state.currentDateOffset  + 1);
    }

    decrementDate() {
        if (this.state.currentDateOffset > 0) {
            this.setState({currentDateOffset: this.state.currentDateOffset - 1 });
            this.state.dateOffsetCallback(this.state.currentDateOffset  - 1);
        }
    }

    render() {
        return (
            <div className="FlexRow" style={{width: "100%", paddingLeft: "20px", paddingRight: "20px", backgroundColor: "#FFFFFF", }}>
                <input type="date" />
                <input id="backwards" type="button" value="Back" onClick={this.decrementDate.bind(this)} />
                <input id="forwards" type="button" value="Forward" onClick={this.incrementDate.bind(this)} />
                <input key='slider' type="range" min="202000" max="202100" defaultValue="202000" className="yearslider" id="DateRange" onChange={this.updateSlider.bind(this)}/>
            </div>
        )
    };
}

export default SimController;
