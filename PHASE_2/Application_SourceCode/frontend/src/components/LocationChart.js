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
                Object.keys(month4.result).map((item, i) => {
                    let confirm = 0;
                    let dead = 0;
                    let recover = 0;
                    if (getCountry(item) !== undefined && getCountry(item) === this.props.loc) {
                        month4.result[item].forEach((c, i) => {
                            // c.date ===
                            confirm = c.confirmed;
                            dead = c.deaths;
                            recover = c.recovered;
                        });
                        totald += dead;
                        totali += confirm;
                        totalr += recover;
                    }
                });
                newdata.push(['Total Infected', totali]);
                newdata.push(['Total Fatalities', totald]);
                newdata.push(['Total Recovered', totalr])
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
        // console.log(this.state.data);
        return (
            <div className="row">
            <div className="col s12 m4">
            <div className="card">
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
            </div>
            </div>
            </div>
        )
    }
}


export default LocationChart;