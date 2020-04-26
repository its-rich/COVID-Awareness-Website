import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';
import {getCountry, getISO2} from '../Data/CountryConverter';
import month0 from '../Data/2019-12-01_2020-01-01.json';
import month1 from '../Data/2020-01-01_2020-02-01.json';
import month2 from '../Data/2020-02-01_2020-03-01.json';
import month3 from '../Data/2020-03-01_2020-04-01.json';
import month4 from '../Data/2020-04-01_2020-05-01.json';

function getCode(continent) {
    if (continent === 'Africa') {
        return '002';
    } else if (continent === 'Europe') {
        return '150';
    } else if (continent === 'North & South America') {
        return '019';
    } else if (continent === 'Asia') {
        return '142';
    } else if (continent === 'Oceania') {
        return '009';
    }
}

let options = {
    colorAxis : {
        colors: ['#ffcccb', 'red']
    },
    backgroundColor: '#a4cbeb',
    resolution: 'continents'
}

class MapContainer extends React.Component {

    state = {
        data: [
            ['Continent Code', 'Continent', 'Total Infected', 'Total Fatalities'],
            ['', '', 0, 0]
        ]
    }

    updateStats(deaths, infected) {
        this.props.updateStats(deaths, infected);
    }

    updateLocation(location) {
        this.props.updateLocation(location);
    }

    componentDidUpdate(prevProps) {
        let world = [['Continent Code', 'Continent', 'Total Infected', 'Total Fatalities']];
        if (this.props.switch !== 'infected') {
            world = [['Continent Code', 'Continent', 'Total Fatalities', 'Total Infected']];
            options.colorAxis = {colors: ['#808080', 'black']};
        } else {
            options.colorAxis = {colors: ['#ffcccb', 'red']};
        }
        if (prevProps.disease !== this.props.disease || prevProps.dateRange !== this.props.dateRange || prevProps.switch !== this.props.switch || this.props.flag) {
            if (this.props.flag) {
                this.props.updateFlag();
            }
            let totald = 0;
            let totali = 0;
            if (this.props.disease === 'COVID-19') {
                world = [['Country', 'Total Infected', 'Total Fatalities']];
                options.resolution = 'countries';

                if (this.props.dateRange >= 202021) {
                    if (this.props.dateRange < 202031) {
                        Object.keys(month1.result).map((item, i) => {
                            let confirm = 0;
                            let dead = 0;
                            for (var data of month1.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    break;
                                }
                            }
                            let temp = [];
                            if (getCountry(item) !== undefined ) {
                                if (confirm !== 0 || dead !== 0) {
                                    temp.push(getCountry(item));
                                    if (this.props.switch === 'infected') {
                                        temp.push(confirm);
                                        temp.push(dead);
                                    } else {
                                        temp.push(dead);
                                        temp.push(confirm);
                                    }
                                    totali += confirm;
                                    totald += dead;
                                    world.push(temp);
                                }
                            }
                        });
                    } else if (this.props.dateRange < 202060) {
                        Object.keys(month2.result).map((item, i) => {
                            let confirm = 0;
                            let dead = 0;
                            for (var data of month2.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    break;
                                }
                            }
                            let temp = [];
                            if (getCountry(item) !== undefined ) {
                                if (confirm !== 0 || dead !== 0) {
                                    temp.push(getCountry(item));
                                    if (this.props.switch === 'infected') {
                                        temp.push(confirm);
                                        temp.push(dead);
                                    } else {
                                        temp.push(dead);
                                        temp.push(confirm);
                                    }
                                    totali += confirm;
                                    totald += dead;
                                    world.push(temp);
                                }
                            }
                        });
                    } else if (this.props.dateRange < 202091) {
                        Object.keys(month3.result).map((item, i) => {
                            let confirm = 0;
                            let dead = 0;
                            for (var data of month3.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    break;
                                }
                            }
                            let temp = [];
                            if (getCountry(item) !== undefined ) {
                                if (confirm !== 0 || dead !== 0) {
                                    temp.push(getCountry(item));
                                    if (this.props.switch === 'infected') {
                                        temp.push(confirm);
                                        temp.push(dead);
                                    } else {
                                        temp.push(dead);
                                        temp.push(confirm);
                                    }
                                    totali += confirm;
                                    totald += dead;
                                    world.push(temp);
                                }
                            }
                        });
                    } else if (this.props.dateRange < 202121) {
                        Object.keys(month4.result).map((item, i) => {
                            let confirm = 0;
                            let dead = 0;
                            for (var data of month4.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    break;
                                }
                            }
                            let temp = [];
                            if (getCountry(item) !== undefined ) {
                                if (confirm !== 0 || dead !== 0) {
                                    temp.push(getCountry(item));
                                    if (this.props.switch === 'infected') {
                                        temp.push(confirm);
                                        temp.push(dead);
                                    } else {
                                        temp.push(dead);
                                        temp.push(confirm);
                                    }
                                    totali += confirm;
                                    totald += dead;
                                    world.push(temp);
                                }
                            }
                        });
                    }
                }
                if (world.length <= 2) {
                    world.push(["", 0, 0]);
                }
            } else {
                options.resolution = 'continents';
                numbers.forEach((disease) => {
                    if (disease.disease === this.props.disease) {
                        disease.records.forEach((year, i) => {
                            if (String(this.props.dateRange).slice(0,4) === Object.keys(year)[0]) {;
                                year[String(this.props.dateRange).slice(0,4)].forEach((item, i) => {
                                    let temp = [];
                                    if (item.continent !== undefined) {
                                        temp.push(getCode(item.continent));
                                        temp.push(item.continent);
                                        if (this.props.switch === 'infected') {
                                            temp.push(item.infected);
                                            temp.push(item.dead);
                                        } else {
                                            temp.push(item.dead);
                                            temp.push(item.infected);
                                        }
                                        totali += item.infected;
                                        totald += item.dead;
                                        world.push(temp);
                                    }
                                });
                            }
                        });
                    }
                });
                if (world.length <= 2) {
                    world.push(["", "", 0, 0]);
                }
            }
            this.setState({data: world});
            this.updateStats(totald.toLocaleString(), totali.toLocaleString());
        }
    }

    render() {
        return (
            <Chart
                key='worldmap'
                width={window.size}
                height={window.innerHeight - 70}
                chartType="GeoChart"
                options={options}
                data={this.state.data}
                mapsApiKey="AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik"
                rootProps={{ 'data-testid': '1'}}

                chartEvents={[
                    {
                      eventName: 'select',
                      callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length !== 0) {

                            if (this.props.disease === "COVID-19") {
                                this.updateLocation(this.state.data[selection[0].row + 1][0]);
                            } else {
                                this.updateLocation(this.state.data[selection[0].row + 1][1]);
                            }
                        }
                      },
                    },
                  ]}
            />
        )
    }
}


export default MapContainer;
