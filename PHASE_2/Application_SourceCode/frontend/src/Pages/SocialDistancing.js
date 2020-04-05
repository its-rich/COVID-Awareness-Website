import React, {Component} from 'react';
import '../App.css';
import nolimit from '../Data/images/NoLimit.gif'
import limit from '../Data/images/quarantine.gif'
import social4 from '../Data/images/socialDistancing4.gif'
import social8 from '../Data/images/socialDistancing8.gif'

class SocialDistancing extends Component {
    constructor(props) {

        super(props);
       
    }

    render(){
        return (
            <div className='socialDistance'>
                <img src={nolimit} height='400px' width='550px' />
                <li>This is the simulation with no limitation on people's travel</li>
                <img src={limit} height='400px' width='550px' />
                <li>This is the simulation of limited quarantine</li>
                <li>Initially it will prevent disease spreading, but just like in reality noone can stop every individual</li>
                <img src={social4} height='400px' width='550px' />
                <li>This simulate only 25% of the population is travelling</li>
                <li>While 1 in 4 people are travelling, other 3 are keeping their distance</li>
                <img src={social8} height='400px' width='550px' />
                <li>This is when 1 in 8 people are travelling</li>
                <li>compare to 1/4 simulation above, this clearly shows effectiveness of social distancing</li>
            </div>
        )
    }
}

export default SocialDistancing;
