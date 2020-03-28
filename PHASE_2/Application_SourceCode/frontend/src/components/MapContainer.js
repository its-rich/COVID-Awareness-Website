import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// Change the map
let windowHeight = window.innerHeight - 70 + 'px';
const mapStyles = {
    width: '100%',
    height: windowHeight,
    position: 'absolute',
};

class MapContainer extends React.Component {
    render() {
        return (
            <div className="MapContainer">
                <Map
                    google={this.props.google}
                    zoom={4}
                    style={mapStyles}
                    initialCenter={{ lat: 47.444, lng: -122.176}}
                />
            </div>
        );
    }
}
  
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik'
})(MapContainer);