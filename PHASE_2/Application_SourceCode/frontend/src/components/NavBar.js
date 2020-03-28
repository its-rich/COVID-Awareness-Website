import React from 'react';

function NavBar() {
  return (
    <div className="NavBar">
        <div id="keyTerm" className="Box">
            <h3>Key Word(s):</h3>
            <input id="keyTermInput" type="search"/>
        </div>
        <div id="location" className="Box">
            <h3>Location:</h3>
            <input id="locationInput" type="search"/>
        </div>
        <div id="startDate" className="Box">
            <h3>Start Date:</h3>
            <input id="startDateInput" type="date"/>
        </div>
        <div id="endDate" className="Box">
            <h3>End Date:</h3>
            <input id="endDateInput" type="date"/>
        </div>
        <div id="submit" className="Box">
            <button id="submitButton" onClick={QueryApi} type="button">Go!</button>
        </div>
    </div>
  );
}

function QueryApi() {
    let key = document.getElementById("keyTermInput").value;
    let sd = document.getElementById("startDateInput").value + "T00:00:00";
    let ed = document.getElementById("endDateInput").value + "T00:00:00";
    let loc = document.getElementById("locationInput").value;
    console.log(key,sd,ed,loc);
    fetch(`https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=${sd}&end_date=${ed}&key=${key}&location=${loc}`, {
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
        data.forEach((item, i) => {
            item.reports.forEach((rep, j) => {
                rep.locations.forEach((loc, k) => {
                    console.log(loc);
                });
            });
        });
    });
}

export default NavBar;
