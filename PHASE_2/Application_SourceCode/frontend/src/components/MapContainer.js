import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
    render() {
        return (
            <h1>LOL</h1>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik'
})(MapContainer);