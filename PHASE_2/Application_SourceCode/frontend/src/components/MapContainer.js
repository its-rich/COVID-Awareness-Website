import React from 'react';
import { Chart } from 'react-google-charts';
import { db } from './Firebase/config.js'



class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                ['Continent Code', 'Continent', '% Infected', '% Dead'],
                ['002', 'Africa', 200, 100],
                ['150', 'Europe', 300, 100],
                ['019', 'America', 400, 100],
                ['142', 'Asia', 500, 100],
                ['009', 'Oceania', 100, 100],
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
                    },
                    resolution: 'continents'
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
                            //window.location.href='/diseases' -> when click a continent redirect to the continent page

                            console.log(this.state.data[selection[0].row + 1][1]);
                      },
                    },
                  ]}


            />
        )
    }
}


export default MapContainer;
