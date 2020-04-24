import InfectedArea from "./InfectedArea.js";
import { Component } from "react";

export default class InfectedSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chance: 0.5,
            severity: 20,
            currentFrame: 0,
            map: null,

            Frames: [],
        }
    }

    init(map) {
        this.state.map = map;
        // Add the initial data (atm one circle in the center of Australia)
        this.state.Frames.push( [new InfectedArea(-25.2744, 133.7751, 100, this.map)] );
    }

    loadNextFrame() {
        let lastFrame = this.state.Frames[this.state.Frames.length - 1];
        let nextFrame = [];

        // For each circle in the last frame... add more circles
        lastFrame.forEach((item) => {
            for (let i = 0; i < this.state.severity; i++) {
                if (item.update(this.state.chance)) {
                    let latlng = item.getSpread(0.1);
                    nextFrame.push(new InfectedArea(latlng.lat, latlng.long, 100, this.state.map));
                }
            }
            // Put the original circle back in
            nextFrame.push(item);
        });
        // Add the new frame
        this.state.Frames.push(nextFrame);
    }

    previousFrame() {
        if (this.state.currentFrame > 0) { this.setState({currentFrame: this.state.currentFrame - 1}) }
    }

    nextFrame() {
        if (this.state.currentFrame + 1 == this.state.Frames.length) {
            this.loadNextFrame();
            this.setState({currentFrame: this.state.currentFrame + 1});
        }
    }

    setFrame(newFrame) {
        while (newFrame >= this.state.Frames.length) {
            this.loadNextFrame();
        }
        this.setState({currentFrame: newFrame});
    }

    getCurrentFrame() {
        return this.state.Frames[this.state.currentFrame];
    }

    // Haversine formula + https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
    // May come in handy when merging 2 small circlse into one big one...
    measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
        let R = 6378.137; // Radius of earth in KM
        let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return d * 1000; // meters
    }
}