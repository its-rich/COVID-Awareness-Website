import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';

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
    backgroundColor: '#abd7eb',
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

    componentDidUpdate(prevState) {
        let world = [['Continent Code', 'Continent', 'Total Infected', 'Total Fatalities']];
        if (this.props.switch !== 'infected') {
            let world = [['Continent Code', 'Continent', 'Total Fatalities', 'Total Infected']];
            options.colorAxis = {colors: ['#grey', 'black']};
        } else {
            options.colorAxis = {colors: ['#ffcccb', 'red']};
        }
        if (prevState.disease !== this.props.disease || prevState.dateRange !== this.props.dateRange || prevState.switch !== this.props.switch) {
            let totald = 0;
            let totali = 0;
            if (this.props.disease === 'COVID-19') {
                if (this.props.dateRange > 201911) {

                    // let url = "";
                    // if (this.props.dateRange === 201912) {
                    //     url = 'https://covidapi.info/api/v1/global/timeseries/2019-12-01/2020-01-01';
                    // } else if (this.props.dateRange === 202001) {
                    //     url = 'https://covidapi.info/api/v1/global/timeseries/2020-01-01/2020-02-01';
                    // } else if (this.props.dateRange === 202002) {
                    //     url = 'https://covidapi.info/api/v1/global/timeseries/2020-02-01/2020-03-01';
                    // } else if (this.props.dateRange === 202003) {
                    //     url = 'https://covidapi.info/api/v1/global/timeseries/2020-03-01/2020-04-01';
                    // } else if (this.props.dateRange === 202004) {
                    //     url = 'https://covidapi.info/api/v1/global/timeseries/2020-04-01/2020-05-01';
                    // }
                    //
                    // fetch('https://covidapi.info/api/v1/global/timeseries/2019-12-01/2020-01-01')
                    // .then(resp => resp.json())
                    // .then(json => {
                    //     Object.keys(json.result).forEach(c => {
                    //         if (json.result[c].length != 0) {
                    //             let temp = [];
                    //             // temp.push()
                    //             temp.push(json.result[c].confirmed)
                    //             temp.push(json.result[c].deaths)
                    //             world.push(temp);
                    //         }
                    //     })
                    //
                    // });
                }
            } else {
                numbers.forEach((disease) => {
                    if (disease.disease === this.props.disease) {
                        disease.records.forEach((year, i) => {
                            if (String(this.props.dateRange).slice(0,4) === Object.keys(year)[0]) {
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
            }
            if (world.length <= 2) {
                world.push(["", "", 0, 0]);
            }
            this.setState({data: world});
            this.updateStats(totald, totali);
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
                            //window.location.href='/diseases' -> when click a continent redirect to the continent page

                            // console.log(this.state.data[selection[0].row + 1][1]);
                        }
                      },
                    },
                  ]}
            />
        )
    }
}


export default MapContainer;
