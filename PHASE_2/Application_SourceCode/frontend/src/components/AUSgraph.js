import React from 'react';
import { Chart } from 'react-google-charts';

import cases from '../Data/NSWcovid19.json';

class AUSgraph extends React.Component {
    state = {
        data: [['Suburb', 'Cases']],
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
            var totalCase = {};
            cases.forEach((newCase) => {

                if (totalCase[newCase.postcode] >= 0) {
                    totalCase[newCase.postcode] = totalCase[newCase.postcode] + 1;
                }else{ 
                    totalCase[newCase.postcode] = 1;
                }
           
            });
            let newData = [['Suburb', 'Cases']];
            for (var postcode in totalCase) {
                if (totalCase[postcode] > 20){
                    let temp;
                    temp = [postcode,totalCase[postcode]]

                    newData.push(temp);
                }
                
            }
            this.setState({data: newData});
//            console.log("Unable to connect to NSW gov, using stored statistics");
//        }

    }

    render() {
        return (
            <Chart
              width={'100%'}
              height={'600px'}
              chartType="ColumnChart"
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


export default AUSgraph;
