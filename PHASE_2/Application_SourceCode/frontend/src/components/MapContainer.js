import React from 'react';
import { Chart } from 'react-google-charts';

class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ausInf: 0,
            ausDead: 0
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
                        colors: ['orange', 'purple']
                    }
                }}
                data={[
                    ['Country', '% Infected', '% Fatality'],
                    ['Germany', 200, 100],
                    ['United States', 300, 100],
                    ['Brazil', 400, 100],
                    ['Canada', 500, 100],
                    ['France', 600, 100],
                    ['RU', 700, 100],
                    ['Australia', this.state.ausInf, this.state.ausDead],
                ]}
                mapsApiKey="AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik"
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}

export default MapContainer;