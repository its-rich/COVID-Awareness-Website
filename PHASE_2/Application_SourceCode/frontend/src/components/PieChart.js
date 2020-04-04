import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';

const continents = ['Asia', 'Africa', 'North & South America', 'Oceania', 'Asia', 'Europe'];

class PieChart extends React.Component {
    state = {
        data: [['Continent', 'Degrees']],
        option: ''
    }

    componentDidMount(prevProps) {
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
