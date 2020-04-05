import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';
import {getCountry, getISO2} from '../Data/CountryConverter';
import month0 from '../Data/2019-12-01_2020-01-01.json';
import month1 from '../Data/2020-01-01_2020-02-01.json';
import month2 from '../Data/2020-02-01_2020-03-01.json';
import month3 from '../Data/2020-03-01_2020-04-01.json';
import month4 from '../Data/2020-04-01_2020-05-01.json';

const continents = ['Asia', 'Africa', 'North & South America', 'Oceania', 'Asia', 'Europe'];

class PieChart extends React.Component {
    state = {
        data: [['Continent', 'Degrees']],
        option: ''
    }

    componentDidMount() {
        if (this.props.disease == 'COVID-19') {
            let totald = 0;
            let totali = 0;
            let totalr = 0;
            // let newdata = [['Year', 'Fatalities', 'Infected', 'Recovered']];
            // tempd = 0;
            // tempi = 0;
            // tempr = 0;
            // Object.keys(month2.result).map((item, i) => {
            //     let confirm = 0;
            //     let dead = 0;
            //     let recover = 0;
            //     month2.result[item].forEach((c, i) => {
            //         confirm += c.confirmed;
            //         dead += c.deaths;
            //         recover += c.recovered;
            //     });
            //     if (confirm > tempi) {
            //         totali += confirm;
            //     }
            //     if (dead > tempd) {
            //         totald += dead;
            //     }
            //     if (recover > tempr) {
            //         totalr += recover;
            //     }
            // });
            // Object.keys(month1.result).map((item, i) => {
            //     month1.result[item].forEach((c, i) => {
            //         totali += c.confirmed;
            //         totald += c.deaths;
            //         totalr += c.recovered;
            //     });
            // });
            // Object.keys(month2.result).map((item, i) => {
            //     month2.result[item].forEach((c, i) => {
            //         totali += c.confirmed;
            //         totald += c.deaths;
            //         totalr += c.recovered;
            //     });
            // });
            // Object.keys(month3.result).map((item, i) => {
            //     month3.result[item].forEach((c, i) => {
            //         totali += c.confirmed;
            //         totald += c.deaths;
            //         totalr += c.recovered;
            //     });
            // });
            // Object.keys(month4.result).map((item, i) => {
            //     month4.result[item].forEach((c, i) => {
            //         totali += c.confirmed;
            //         totald += c.deaths;
            //         totalr += c.recovered;
            //     });
            // });
            // this.setState({data: newdata});

        } else {
            numbers.forEach((disease) => {
                let newdata;
                if (this.props.switch === 'infected') {
                    this.setState({option: "'s Total Infected Cases Distributed by Continent"});
                    newdata = [['Continent', 'Dead']];
                } else {
                    this.setState({option: "'s Total Dead Cases Distributed by Continent"});
                    newdata = [['Continent', 'Infected']];
                }
                if (disease.disease.toLowerCase() === this.props.disease) {
                    for (let a = 0; a<5; a++) {
                        let totali = 0;
                        let totald = 0;
                        disease.records.forEach((year, i) => {
                            year[Object.keys(year)[0]].forEach((item, i) => {
                                if (item.continent === continents[a]) {
                                    totali += item.infected;
                                    totald += item.dead;
                                }
                            });
                        });

                        if (totali !== 0 && this.props.switch === 'infected') {
                            let temp;
                            temp = [continents[a], totali];
                            newdata.push(temp);
                        } else if (totald !== 0 && this.props.switch === 'dead') {
                            let temp;
                            temp = [continents[a], totald];
                            newdata.push(temp);
                        }
                    }
                    this.setState({data: newdata});
                }
            });
        }
    }

    render() {
        return (
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.state.data}
              options={{
                title: this.props.disease + this.state.option,
              }}
              rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}


export default PieChart;
