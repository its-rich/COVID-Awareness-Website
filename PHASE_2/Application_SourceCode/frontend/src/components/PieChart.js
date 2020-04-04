import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';

const continents = ['Asia', 'Africa', 'North & South America', 'Oceania', 'Asia', 'Europe'];

class PieChart extends React.Component {
    state = {
        data: [['Continent', 'Degrees']],
        option: ''
    }

    componentDidUpdate(prevProps) {
        if (prevProps.disease != this.props.disease || prevProps.switch != this.props.switch) {
            numbers.forEach((disease) => {
                let newdata;
                if (this.props.switch == 'infected') {
                    this.setState({option: 'Total Infected/Continent'});
                    newdata = [['Continent', 'Dead']];
                } else {
                    this.setState({option: 'Total Dead/Continent'});
                    newdata = [['Continent', 'Infected']];
                }
                if (disease.disease === this.props.disease) {
                    let a;
                    let continent;
                    for (a = 0; a<5; a++) {
                        let totali = 0;
                        let totald = 0;
                        disease.records.forEach((year, i) => {
                            year[Object.keys(year)[0]].forEach((item, i) => {
                                if (item.continent == continents[a]) {
                                    totali += item.infected;
                                    totald += item.dead;
                                }
                            });
                        });
                        let temp;
                        if (this.props.switch == 'infected') {
                            temp = [continents[a], totali];
                        } else {
                            temp = [continents[a], totald];
                        }
                        newdata.push(temp);
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
                title: this.state.option,
              }}
              rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}


export default PieChart;
