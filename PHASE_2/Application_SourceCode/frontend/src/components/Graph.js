import React from 'react';
import { Chart } from 'react-google-charts';
import numbers from '../Data/disease_data.json';

class Graph extends React.Component {

    state = {
        data: [['Year', 'Fatalities', 'Infected'], ["", 0, 0]]
    }

    componentDidMount() {
        numbers.forEach((disease) => {
            if (disease.disease.toLowerCase() === this.props.disease) {
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

    render() {
        return (
            <Chart
              width={'500px'}
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
        )
    }
}


export default Graph;
