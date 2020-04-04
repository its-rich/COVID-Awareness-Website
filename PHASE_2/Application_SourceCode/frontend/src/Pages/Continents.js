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
            console.log('sending to new');
            console.log(this.state.country);
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
        //console.log(listCountries);
        //console.log(this.props)
        //var listObj = JSON.parse(liststr);
        //console.log(listObj);
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
        console.log(e.target.innerText);
        console.log(this.state.country);
    }


}
//function Country(props) {
//    var listCountries = require("../data/countries");
//    //console.log(listCountries);
//    //console.log("stop");
//    //console.log(props)
//    //var listObj = JSON.parse(liststr);
//    //console.log(listObj);
//    const continent = props.continent;
//    const countryList = listCountries.map((country) =>
//        <ListItem value={country} cont={continent} /> 
        
//    );
//    return (
//            <div class="divButtons">{countryList}</div>
//    );
//}

//function ListItem(props) {


//    if (props.cont == props.value.continent) {
//        return (<button onClick={e => Countries.SendToCountry(e.target.innerText)}>{props.value.country}</button>);
//    }
//    return (null);

//}

////function SendToCountry(props) {
////    //console.log(props)
////    var country = props
////    return(<CountryPage country={country} />);
////}

export default (Continents);
