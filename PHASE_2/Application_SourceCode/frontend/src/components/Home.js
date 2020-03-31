import React from 'react';
import '../App.css';
import MapContainer from './MapContainer';
import SearchBar from './SearchBar';

function Home() {
    return (
        <div>
            <SearchBar />
            <MapContainer />
        </div>
    );
}

export default Home;
