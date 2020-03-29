import React from 'react';
import { Chart } from 'react-google-charts';

class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                ['Country', '% Infected', '% Dead'],
                ['Germany', 200, 100],
                ['United States', 300, 100],
                ['Brazil', 400, 100],
                ['Canada', 500, 100],
                ['France', 600, 100],
                ['RU', 700, 100],
            ],
        }
    }

    render() {
        return (
            <Chart
                width={'100%'}
                height={window.innerHeight - 70}
                chartType="GeoChart"
                options={{
                    colorAxis : {
                        colors: ['red']
                    }
                }}
                data={this.state.data}
                mapsApiKey="AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik"
                rootProps={{ 'data-testid': '1' }}
                
                chartEvents={[
                    {
                      eventName: 'select',
                      callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length !== 0)
                            console.log(this.state.data[selection[0].row + 1][0]);
                      },
                    },
                  ]}


            />
        )
    }
}

export default MapContainer;