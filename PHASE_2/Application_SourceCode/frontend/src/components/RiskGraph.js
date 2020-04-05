import React from 'react';
import { Chart } from 'react-google-charts';

import cases from '../Data/NSWcovid19.json';


class RiskGraph extends React.Component {
    state = {
        data: [['Cases','Date']],
    }

    componentDidMount() {
//        let response = await fetch("https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29");
//        if (response.ok){
//            let jsonCases = await response.json();
//            var totalCase = {};
//            jsonCases.forEach((newCase) => {
//
//                if (totalCase[newCase.postcode] >= 0) {
//                    totalCase[newCase.postcode] = totalCase[newCase.postcode] + 1;
//                }else{
 //                   totalCase[newCase.postcode] = 1;
 //               }
//
//            });
//            let newData = [['Suburb', 'Cases']];
//            for (var postcode in totalCase) {
//                let temp;
//                temp = [postcode,totalCase[postcode]]
//
//                newData.push(temp);
//
//            }
//            this.setState({data: newData});
//            console.log("api success");
//        }else{
            let newData = [['Date','Cases']];
            var date = new Date(1577836800000);

            let i = 0;

            cases.forEach((newCase) => {
                if (newCase.postcode == this.props.postcode){
                    let newDate = new Date(newCase.notification_date);
                    //console.log(date);
                    //console.log(newDate);
                    //console.log(date > newDate);
                    while (date < newDate){
                        let dateString = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
                        let temp = [dateString,i];
                        newData.push(temp);
                        date = new Date( date.getTime() + 86400000);
                        //console.log(temp);
                    }
                    i = i + 1;

                    let temp;
                    temp = [newCase.notification_date,i];
                    newData.push(temp);
                }

            });
            var today = new Date();
            while (date < today){
                let dateString = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
                let temp = [dateString,i];
                date = new Date( date.getTime() + 86400000);
            }
            //console.log(newData);
            this.setState({data: newData});
//            console.log("Unable to connect to NSW gov, using stored statistics");
//        }

    }

    render() {
        return (
            <Chart
              width={'1000px'}
              height={'600px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.data}
              options={{
                title: "Postcodes with most infections of COVID-19 in NSW"
              }}
              rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}


export default RiskGraph;
