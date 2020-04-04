import React, {Component} from 'react';
import '../App.css';
import CountryPage from './CountryPage'

class Continents extends Component {
    constructor(props) {

        super(props);
        this.state = {
            continent: "Asia",
            showDropdown: false,
            country: null,
        };

        this.showDropdown = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    showDropdown(event) {
        event.preventDefault();
        this.setState({ showDropdown: true }, () => {
            document.addEventListener('click', this.closeDropdown);
        });
    }
    closeDropdown() {
        this.setState({ showDropdown: false }, () => {
            document.removeEventListener('click', this.closeDropdown);
        });
    }

    changeState = (e) => {
        this.setState({ continent: e.target.innerText });
        console.log(e.target.innerText);
    }

    render() {
        if (this.state.country != null) {
            return (<CountryPage country={this.state.country} />);
        }
        
        return (
            
            <div className="Continentwrapper">
                <center className="Title"> Country Page </center>
                <button align="centre" onClick={this.showDropdown}> {this.state.continent} </button>
                {
                    this.state.showDropdown
                        ? (
                            <div className="dropdown">
                                <button onClick={this.changeState}> Europe </button>
                                <button onClick={this.changeState}> Asia </button>
                                <button onClick={this.changeState}> South America </button>
                                <button onClick={this.changeState}> North America </button>
                                <button onClick={this.changeState}> Oceania </button>
                                <button onClick={this.changeState}> Africa </button>
                            </div>
                        )
                        : (
                            null
                        )
                }
                <div className="body">
                    <br />
                    {this.countries()}
                </div>

            </div>
        );
    }
    countries() {
        var listCountries = require("../Data/countries");

        const countryList = listCountries.map((country) => {
            if (country.continent == this.state.continent) {
                return (<button onClick={this.SendToCountry}>{country.country}</button>);
            }}
            

        );
        return (
            <div className="divButtons">{countryList}</div>
        );
    }
    SendToCountry = (e) => {
        this.setState({country: e.target.innerText})

    }


}


export default (Continents);
