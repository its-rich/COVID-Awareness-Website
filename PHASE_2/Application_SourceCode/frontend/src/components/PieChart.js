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
            let newdata = [['Situation', 'Count']]
            this.setState({option: "'s Overall Statistics Worldwide"});
            Object.keys(month4.result).map((item, i) => {
                let confirm = 0;
                let dead = 0;
                let recover = 0;
                month4.result[item].forEach((c, i) => {
                    confirm = c.confirmed;
                    dead = c.deaths;
                    recover = c.recovered;
                });
                totald += dead;
                totali += confirm;
                totalr += recover;
            });
            newdata.push(['Total Infected', totali]);
            newdata.push(['Total Fatalities', totald]);
            newdata.push(['Total Recovered', totalr])
            this.setState({data: newdata});

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
                if (disease.disease === this.props.disease) {
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
                        let count = 0;
                        let found = false;
                        for (var index of newdata) {
                            if (index[0] == continents[a]) {
                                count ++;
                                found = true;
                                break
                            }
                        }
                        if (found) {
                            newdata.splice(count, 1);
                        }
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

    componentDidUpdate(prevProps) {
        if (prevProps.disease !== this.props.disease || prevProps.switch !== this.props.switch) {
            if (this.props.disease == 'COVID-19') {
                let totald = 0;
                let totali = 0;
                let totalr = 0;
                let newdata = [['Situation', 'Count']]
                this.setState({option: "'s Overall Statistics Worldwide"});
                Object.keys(month4.result).map((item, i) => {
                    let confirm = 0;
                    let dead = 0;
                    let recover = 0;
                    month4.result[item].forEach((c, i) => {
                        confirm = c.confirmed;
                        dead = c.deaths;
                        recover = c.recovered;
                    });
                    totald += dead;
                    totali += confirm;
                    totalr += recover;
                });
                newdata.push(['Total Infected', totali]);
                newdata.push(['Total Fatalities', totald]);
                newdata.push(['Total Recovered', totalr])
                this.setState({data: newdata});

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
                    if (disease.disease === this.props.disease) {
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
                            let count = 0;
                            let found = false;
                            for (var index of newdata) {
                                if (index[0] == continents[a]) {
                                    count ++;
                                    found = true;
                                    break
                                }
                            }
                            if (found) {
                                newdata.splice(count, 1);
                            }
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
    }

    render() {
        return (
            <div className="row">
            <div className="col s12 m4" style={{width: "100%"}}>
            <div className="card">
                <Chart
                    width={'460px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: this.props.disease + this.state.option,
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
            </div>
            </div>
        )
    }
}


export default PieChart;
