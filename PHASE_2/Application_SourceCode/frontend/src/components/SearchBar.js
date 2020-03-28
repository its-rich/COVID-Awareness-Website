import React from 'react';

function SearchBar() {
  return (
    <div className="SearchBar">
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
            <button id="submitButton" type="button">Go!</button>
        </div>
    </div>
  );
}

export default SearchBar;