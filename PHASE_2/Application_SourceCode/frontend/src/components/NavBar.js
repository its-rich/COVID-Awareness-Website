import React from 'react';

class NavBar extends React.Component {
    ChangePage = (e) => {
        this.props.changePage(e.target.innerText);
    }

    render() {
        return (
            <div className="NavBar">
                <div className="Title">
                    <img src="https://img.icons8.com/metro/52/000000/document.png" alt="" />
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
                    <div className="PageLink" onClick={this.ChangePage}>
                        <h3>Latest Global News</h3>
                    </div>
                    <div className="PageLink" onClick={this.ChangePage}>
                        <h3>Check Yourself</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;
