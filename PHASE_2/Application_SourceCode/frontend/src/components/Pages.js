import React from 'react';
import MapContainer from './MapContainer';
import SearchBar from './SearchBar';

class Pages extends React.Component {
    render() {
        if (this.props.page === "Map") {
            return (
                <div>
                    <SearchBar />
                    <MapContainer />
                </div>
            );
        } else if (this.props.page === "Country") {
            return (
                <div>
                    <center className="Title"> Country Page </center>
                </div>
            );
        } else if (this.props.page === "Disease") {
            return (
                <div>
                    <center className="Title"> Disease Page </center>
                </div>
            );
        }
    }
}

export default Pages;