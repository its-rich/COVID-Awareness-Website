import React from 'react';
import MapContainer from './MapContainer';

class NavBar extends React.Component {
    ChangePage = (e) => {
        this.props.changePage(e.target.innerText);
    }

    render() {
        return (
            <div className="NavBar">
                <div className="Title">
                    <img src="https://img.icons8.com/metro/52/000000/document.png" />
                    <h1>Title of our App</h1>
                </div>
                <div className="Links">
                    <div className="PageLink" onClick={this.ChangePage}>
                        <h3>Map</h3>
                    </div>
                    <div className="PageLink" onClick={this.ChangePage}>
                        <h3>Country</h3>
                    </div>
                    <div className="PageLink" onClick={this.ChangePage}>
                        <h3>Disease</h3>
                    </div>
                </div>
            </div>
        );
    }
}


function QueryApi() {

    //MapContainer.setMarkers([{lat: 30.5928, lng: 114.3055}]);

    let key = document.getElementById("keyTermInput").value;
    let sd = document.getElementById("startDateInput").value + "T00:00:00";
    let ed = document.getElementById("endDateInput").value + "T00:00:00";
    let loc = document.getElementById("locationInput").value;
    let MAX = 10; // 10 reports
    console.log(key,sd,ed,loc);
    fetch(`http://sengine.online/article?start=${sd}&end=${ed}&n=${MAX}&terms=${key}&loc=${loc}`, {
        Accept: "application/json"
    })
    .then((response) => {
        console.log(`STATUS: ${response.status}`);
        if (response.status == 200) {
            return response.json();
        } else {
            return null;
        }
    })
    .then((data) => {
        if (data==null) {
            return;
        }
        console.log(data);
        // Add the markers
    });
}

export default NavBar;
