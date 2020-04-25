import InfectedArea from "./InfectedArea.js";
import { Component } from "react";

export default class InfectedSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            severity: 2,
            currentFrame: 0,
            map: null,
            Frames: [],
        }
    }

    init(map) {
        this.state.map = map;
        // Add the initial data (atm one circle in the center of Australia)
        this.state.Frames.push( [new InfectedArea(-25.2744, 133.7751, 0.5, 100, this.state.map)] );
    }

    newmarker(lat, long, chance, map) {
        this.state.map = map;
        this.state.Frames.push([new InfectedArea(lat, long, chance, 100, map)]);
    }

    loadNextFrame(type) {
        console.log("Loading frame " + this.state.Frames.length);
        if (this.state.Frames.length === 0) return;
        let lastFrame = this.state.Frames[this.state.Frames.length - 1];
        let nextFrame = [];

        if (type === 'LOCK') {
            lastFrame.forEach((item) => {
                // Put the original circle back in
                let x = Math.random() * item.chance;
                while (x > item.chance) {
                    x = Math.random() * item.chance;
                }
                if (x < 0.00009) {
                    item.chance = 0;
                } else {
                    item.chance = x;
                }
            });
        }

        lastFrame.forEach((item) => {
            // Put the original circle back in
            nextFrame.push(item);
        });

        // For each circle in the last frame... add more circles
        lastFrame.forEach((item) => {
            for (let i = 0; i < this.state.severity; i++) {
                if (item.update()) {
                    let latlng = item.getSpread(0.1);
                    nextFrame.push(new InfectedArea(latlng.lat, latlng.long, item.chance, 100, this.state.map));
                }
            }
        });

        // Add the new frame
        this.state.Frames.push(nextFrame);

        // if (type === 'CURE') {
        // console.log(this.state.Frames);
        //     lastFrame = this.state.Frames[this.state.Frames.length - 1];
        //     lastFrame.forEach((item) => {
        //         if (Math.random() > 0.5) {
        //             item.circle.setMap(null)
        //             this.state.Frames[this.state.Frames.length - 1].splice(item, 1);
        //         }
        //     });
        //     console.log(this.state.Frames);
            // for (let i = 0; i < this.state.Frames.length; i++) {
            //     this.state.Frames[i].forEach((item) => {
            //         array.forEach((item1) => {
            //             if (item1 == item) {
            //                 // item1.circle.setMap(null);
            //                 this.state.Frames[i].splice(item1, 1);
            //             }
            //         });
            //     });
            // }
            // let found = false;
            // console.log(this.state.Frames);
            // for (let i = 0; i < this.state.Frames.length; i++) {
            //     if (this.state.Frames[i].length == 0) {
            //         found = true;
            //         this.state.currentFrame -= 1;
            //     }
            // }
            //
            // while (found) {
            //     for (let i = 0; i < this.state.Frames.length; i++) {
            //         if (this.state.Frames[i].length == 0) {
            //             this.state.Frames.splice(this.state.Frames[i], 1);
            //         }
            //     }
            //     for (let i = 0; i < this.state.Frames.length; i++) {
            //         if (this.state.Frames[i].length == 0) {
            //             found = true;
            //             break;
            //         } else {
            //             found = false;
            //         }
            //     }
            // }
            // console.log(this.state.Frames);
        // }
    }

    previousFrame() {
        if (this.state.currentFrame >= 1) {
            let lastFrame = this.state.Frames[this.state.Frames.length - 1];
            let start = this.state.Frames[this.state.Frames.length - 2].length
            lastFrame.forEach((item, i) => {
                if (i >= start) {
                    item.circle.setMap(null);
                }
            });
            this.state.Frames.pop()
            this.state.currentFrame -= 1;
            // this.setState({currentFrame: this.state.currentFrame - 1})
        } else {
            this.state.Frames[0].forEach((item) => {
                item.circle.setMap(null);
            });
            this.state.Frames.pop()
        }

        if (this.state.currentFrame >= this.state.Frames.length) {
            this.state.currentFrame = this.state.Frames.length - 1;
        }
    }

    nextFrame(type) {
        if (this.state.currentFrame + 1 == this.state.Frames.length) {
            if (type === 'LOCK') {
                this.loadNextFrame('LOCK');
            } else if (type == 'CURE') {
                this.loadNextFrame('CURE');
            } else {
                this.loadNextFrame();
            }
            // this.setState({currentFrame: this.state.currentFrame + 1});
            this.state.currentFrame = this.state.currentFrame + 1;
        }
    }

    safetyDelete() {
        if (this.state.currentFrame == 0) {
            this.state.Frames.forEach((item, i) => {
                item[i].circle.setMap(null);
            });
            this.state.Frames.pop()
            this.state.currentFrame -= 1;
        }
    }

    getInfectionCount() {
        if (this.state.Frames.length > 0) {
            return this.state.Frames[this.state.currentFrame].length;
        }
        return -1;
    }

    getCurrentFrame() {
        return this.state.currentFrame;
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
