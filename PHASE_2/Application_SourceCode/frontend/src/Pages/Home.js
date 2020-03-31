import React from 'react';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';

function Home() {
    return (
        <div>
            <SearchBar />
            <MapContainer />
        </div>
    );
}

export default Home;
