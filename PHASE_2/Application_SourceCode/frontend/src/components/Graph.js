import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';
import month0 from '../Data/2019-12-01_2020-01-01.json';
import month1 from '../Data/2020-01-01_2020-02-01.json';
import month2 from '../Data/2020-02-01_2020-03-01.json';
import month3 from '../Data/2020-03-01_2020-04-01.json';
import month4 from '../Data/2020-04-01_2020-05-01.json';

class Graph extends React.Component {

    state = {
        data: [['Year', 'Fatalities', 'Infected'], ["", 0, 0]]
    }

    componentDidMount() {
        if (this.props.disease === 'COVID-19') {
            let totald = 0;
            let totali = 0;
            let totalr = 0;
            let confirm = 0;
            let dead = 0;
            let recover = 0;
            let newdata = [['Year', 'Total Fatalities', 'Total Infected', 'Total Recovered']];
            Object.keys(month0.result).map((item, i) => {
                confirm = 0;
                dead = 0;
                recover = 0;
                month0.result[item].forEach((c, i) => {
                    confirm = c.confirmed;
                    dead = c.deaths;
                    recover = c.recovered;
                });
                totald += dead;
                totali += confirm;
                totalr += recover;
            });
            newdata.push(['Dec 2019', totald, totali, totalr]);
            totald = 0;
            totali = 0;
            totalr = 0;
            Object.keys(month1.result).map((item, i) => {
                confirm = 0;
                dead = 0;
                recover = 0;
                month1.result[item].forEach((c, i) => {
                    confirm = c.confirmed;
                    dead = c.deaths;
                    recover = c.recovered;
                });
                totald += dead;
                totali += confirm;
                totalr += recover;
            });
            newdata.push(['Jan 2020', totald, totali, totalr]);
            totald = 0;
            totali = 0;
            totalr = 0;
            Object.keys(month2.result).map((item, i) => {
                confirm = 0;
                dead = 0;
                recover = 0;
                month2.result[item].forEach((c, i) => {
                    confirm = c.confirmed;
                    dead = c.deaths;
                    recover = c.recovered;
                });
                totald += dead;
                totali += confirm;
                totalr += recover;
            });
            newdata.push(['Feb 2020', totald, totali, totalr]);
            totald = 0;
            totali = 0;
            totalr = 0;
            Object.keys(month3.result).map((item, i) => {
                confirm = 0;
                dead = 0;
                recover = 0;
                month3.result[item].forEach((c, i) => {
                    confirm = c.confirmed;
                    dead = c.deaths;
                    recover = c.recovered;
                });
                totald += dead;
                totali += confirm;
                totalr += recover;
            });
            newdata.push(['Mar 2020', totald, totali, totalr]);
            totald = 0;
            totali = 0;
            totalr = 0;
            Object.keys(month4.result).map((item, i) => {
                confirm = 0;
                dead = 0;
                recover = 0;
                month4.result[item].forEach((c, i) => {
                    confirm = c.confirmed;
                    dead = c.deaths;
                    recover = c.recovered;
                });
                totald += dead;
                totali += confirm;
                totalr += recover;
            });
            newdata.push(['Apr 2020', totald, totali, totalr]);
            this.setState({data: newdata});
        } else {
            numbers.forEach((disease) => {
                if (disease.disease === this.props.disease) {
                    let newdata = [['Year', 'Fatalities', 'Infected']]
                    disease.records.forEach((year, i) => {
                        let temp = [];
                        let totali = 0;
                        let totald = 0;
                        temp.push(Object.keys(year)[0]);
                        year[Object.keys(year)[0]].forEach((item, i) => {
                            totali += item.infected;
                            totald += item.dead;
                        });
                        temp.push(totald);
                        temp.push(totali);
                        newdata.push(temp);
                    });
                    this.setState({data: newdata});
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.disease !== this.props.disease) {
            if (this.props.disease === 'COVID-19') {
                let totald = 0;
                let totali = 0;
                let totalr = 0;
                let confirm = 0;
                let dead = 0;
                let recover = 0;
                let newdata = [['Year', 'Cumulative Fatalities', 'Cumulative Infected', 'Cumulative Recovered']];
                Object.keys(month0.result).map((item, i) => {
                    confirm = 0;
                    dead = 0;
                    recover = 0;
                    month0.result[item].forEach((c, i) => {
                        confirm = c.confirmed;
                        dead = c.deaths;
                        recover = c.recovered;
                    });
                    totald += dead;
                    totali += confirm;
                    totalr += recover;
                });
                newdata.push(['Dec 2019', totald, totali, totalr]);
                totald = 0;
                totali = 0;
                totalr = 0;
                Object.keys(month1.result).map((item, i) => {
                    confirm = 0;
                    dead = 0;
                    recover = 0;
                    month1.result[item].forEach((c, i) => {
                        confirm = c.confirmed;
                        dead = c.deaths;
                        recover = c.recovered;
                    });
                    totald += dead;
                    totali += confirm;
                    totalr += recover;
                });
                newdata.push(['Jan 2020', totald, totali, totalr]);
                totald = 0;
                totali = 0;
                totalr = 0;
                Object.keys(month2.result).map((item, i) => {
                    confirm = 0;
                    dead = 0;
                    recover = 0;
                    month2.result[item].forEach((c, i) => {
                        confirm = c.confirmed;
                        dead = c.deaths;
                        recover = c.recovered;
                    });
                    totald += dead;
                    totali += confirm;
                    totalr += recover;
                });
                newdata.push(['Feb 2020', totald, totali, totalr]);
                totald = 0;
                totali = 0;
                totalr = 0;
                Object.keys(month3.result).map((item, i) => {
                    confirm = 0;
                    dead = 0;
                    recover = 0;
                    month3.result[item].forEach((c, i) => {
                        confirm = c.confirmed;
                        dead = c.deaths;
                        recover = c.recovered;
                    });
                    totald += dead;
                    totali += confirm;
                    totalr += recover;
                });
                newdata.push(['Mar 2020', totald, totali, totalr]);
                totald = 0;
                totali = 0;
                totalr = 0;
                Object.keys(month4.result).map((item, i) => {
                    confirm = 0;
                    dead = 0;
                    recover = 0;
                    month4.result[item].forEach((c, i) => {
                        confirm = c.confirmed;
                        dead = c.deaths;
                        recover = c.recovered;
                    });
                    totald += dead;
                    totali += confirm;
                    totalr += recover;
                });
                newdata.push(['Apr 2020', totald, totali, totalr]);
                this.setState({data: newdata});
            } else {
                numbers.forEach((disease) => {
                    if (disease.disease === this.props.disease) {
                        let newdata = [['Year', 'Fatalities', 'Infected']]
                        disease.records.forEach((year, i) => {
                            let temp = [];
                            let totali = 0;
                            let totald = 0;
                            temp.push(Object.keys(year)[0]);
                            year[Object.keys(year)[0]].forEach((item, i) => {
                                totali += item.infected;
                                totald += item.dead;
                            });
                            temp.push(totald);
                            temp.push(totali);
                            newdata.push(temp);
                        });
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
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={this.state.data}
                  options={{
                    title: this.props.disease + "'s Global Impact Over Time",
                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    vAxis: { title: 'Number of Cases', minValue: 0 },
                    // For the legend to fit, we make the chart area smaller
                    chartArea: { width: '50%', height: '70%' },
                    // lineWidth: 25
                  }}
                  // For tests
                  rootProps={{ 'data-testid': '1' }}
                />
            </div>
            </div>
            </div>
        )
    }
}


export default Graph;
