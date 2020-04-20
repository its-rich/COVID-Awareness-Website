import React, {Component} from 'react';
import '../App.css';
import CalendarHeatmap from 'react-calendar-heatmap'

class VirusAvoider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: ''
        }
    }

    changeDisease = (disease) => {
        this.setState({disease: disease})
    }

    render() {
        return (
            <div>
                <CalendarHeatmap
                startDate={new Date('2019-12-31')}
                endDate={new Date('2021-01-01')}
                values={[
                   { date: '2020-01-01', infected: 10 },
                   { date: '2020-01-02', infected: 20 },
                   { date: '2020-01-30' },
               ]}
               onClick={(value) => console.log(value)}
                >
                </CalendarHeatmap>
            </div>
        )
    }
}

export default VirusAvoider;
