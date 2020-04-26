import React, {Component, setState} from 'react';
import Draggable from 'react-draggable';
import { relativeTimeThreshold } from 'moment';


export default class AlertModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: props.message,
            color: props.color,
            on: "true",
            visibility: "visible",
            reset: props.reset,
            timer: false,
        }
    }

    timeout() {
        if (this.state.timer === false) {
            this.state.timer = true;
            window.setTimeout(this.off.bind(this), this.props.timer);
        }
    }

    off() {
        this.setState({visibility: "hidden"});
        this.state.on = "false";
        this.state.reset();
    }

    render() {
        this.timeout.bind(this)();
        if (this.state.on==="true") {
            return (
                <div className="Alert">
                    <Draggable
                        axis="both"
                        defaultPosition={{x: 20, y: 50}}
                        position={null}
                        style={{zIndex: "10", height: "0", padding: "0", margin: "0"}}
                        grid={[1, 1]}
                        scale={1}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleStop}>

                        <div className={this.state.visibility} style={{textAlign: "center", backgroundColor: this.state.color, color: "white", padding: "10px", borderRadius: "3px", width: "300px",}}>
                        <p>
                            {this.props.message1}
                            <br/>
                            {this.props.message2}
                        </p>
                        </div>
                    </Draggable>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }
}
