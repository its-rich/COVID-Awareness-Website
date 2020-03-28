import React from 'react';
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Pages from './components/Pages';

import './App.css';

class App extends React.Component {
    state = {
        page: "Map"
    }

    changePage = (page) => {
        this.setState({page})
        console.log(this.state)
    }

    render() {
        return (
            <div className="App">
                <NavBar changePage={this.changePage}/>
                <SearchBar />
                <Pages page={this.state.page}/>
            </div>
        );
    }
}

export default App