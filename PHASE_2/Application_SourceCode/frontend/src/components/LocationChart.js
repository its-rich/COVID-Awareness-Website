import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';
import {getCountry, getISO2} from '../Data/CountryConverter';
import month0 from '../Data/2019-12-01_2020-01-01.json';
import month1 from '../Data/2020-01-01_2020-02-01.json';
import month2 from '../Data/2020-02-01_2020-03-01.json';
import month3 from '../Data/2020-03-01_2020-04-01.json';
import month4 from '../Data/2020-04-01_2020-05-01.json';

class LocationChart extends React.Component {
    state = {
        data: [['Condition', 'Degrees']]
    }

    componentDidMount() {
        if (this.props.loc !== '') {
            let newdata = [['Condition', 'Degrees']];
            if (this.props.disease == 'COVID-19') {
                let confirm = 0;
                let dead = 0;
                let recovered = 0;
                if (this.props.dateRange < 202031) {
                    Object.keys(month1.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month1.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                } else if (this.props.dateRange < 202060) {
                    Object.keys(month2.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month2.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                } else if (this.props.dateRange < 202091) {
                    Object.keys(month3.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month3.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                } else if (this.props.dateRange < 202121) {
                    Object.keys(month4.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month4.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                }

                newdata.push(['Total Infected', confirm]);
                newdata.push(['Total Fatalities', dead]);
                newdata.push(['Total Recovered', recovered])
                this.setState({data: newdata});
            } else {
                numbers.forEach((disease) => {
                    if (disease.disease === this.props.disease) {
                        let totali = 0;
                        let totald = 0;
                        disease.records.forEach((year, i) => {
                            if (Object.keys(year)[0] === String(Math.floor(this.props.dateRange / 100))) {
                                year[Object.keys(year)[0]].forEach((item, i) => {
                                    if (item.continent === this.props.loc) {
                                        totali += item.infected;
                                        totald += item.dead;
                                    }
                                });
                            }
                        });

                        if (totali !== 0) {
                            let temp;
                            temp = ["Total Infected", totali];
                            newdata.push(temp);
                        }
                        if (totald !== 0) {
                            let temp;
                            temp = ["Total Fatalities", totald];
                            newdata.push(temp);
                        }
                        this.setState({data: newdata});
                    }
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loc !== this.props.loc) {
            let newdata = [['Condition', 'Degrees']];
            if (this.props.disease == 'COVID-19') {
                let confirm = 0;
                let dead = 0;
                let recovered = 0;
                if (this.props.dateRange < 202031) {
                    Object.keys(month1.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month1.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                } else if (this.props.dateRange < 202060) {
                    Object.keys(month2.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month2.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                } else if (this.props.dateRange < 202091) {
                    Object.keys(month3.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month3.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                } else if (this.props.dateRange < 202121) {
                    Object.keys(month4.result).map((item, i) => {
                        if (getCountry(item) !== undefined && getCountry(item) == this.props.loc) {
                            for (var data of month4.result[item]) {
                                if (data.date === this.props.iso) {
                                    confirm = data.confirmed;
                                    dead = data.deaths;
                                    recovered = data.recovered;
                                    break;
                                }
                            }
                        }
                    });
                }
                newdata.push(['Total Infected', confirm]);
                newdata.push(['Total Fatalities', dead]);
                newdata.push(['Total Recovered', recovered])
                this.setState({data: newdata});
            } else {
                numbers.forEach((disease) => {
                    if (disease.disease === this.props.disease) {
                        let totali = 0;
                        let totald = 0;
                        disease.records.forEach((year, i) => {
                            if (Object.keys(year)[0] === String(Math.floor(this.props.dateRange / 100))) {
                                year[Object.keys(year)[0]].forEach((item, i) => {
                                    if (item.continent === this.props.loc) {
                                        totali += item.infected;
                                        totald += item.dead;
                                    }
                                });
                            }
                        });

                        if (totali !== 0) {
                            let temp;
                            temp = ["Total Infected", totali];
                            newdata.push(temp);
                        }
                        if (totald !== 0) {
                            let temp;
                            temp = ["Total Fatalities", totald];
                            newdata.push(temp);
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
            {this.props.disease !== 'COVID-19' && <div className="card">
                <Chart
                    width={'400px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: this.props.disease + " in " + this.props.loc + " in " + Math.floor(this.props.dateRange / 100),
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>}
            {this.props.disease === 'COVID-19' && <div className="card">
                <Chart
                    width={'400px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: this.props.disease + "'s impact in " + this.props.loc + " as of " + this.props.iso,
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>}
            </div>
            </div>
        )
    }
}


export default LocationChart;
