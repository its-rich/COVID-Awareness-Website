import React from 'react';
import MapContainer from './MapContainer';
import SearchBar from './SearchBar';
import DatePicker from './DatePicker';

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
                    <DatePicker />
                    <center className="Title"> Disease Page </center>
                </div>
            );
        }
    }
}

export default Pages;