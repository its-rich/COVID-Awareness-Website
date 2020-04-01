import React, {Component} from 'react';
import '../App.css';
import data from '../Data/disease_list';

class Diseases extends Component {
	render(){
	    return (
	        <div>
	            <center className="Title"> All Diseases </center>
	            {data.map((item, index) => {
	            return <div>
	            	<h1>(item.name)</h1>
	            </div>
	            })}

	        </div>
	    );
	}
}

export default Diseases;