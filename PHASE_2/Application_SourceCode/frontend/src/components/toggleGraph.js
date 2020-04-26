import React from 'react';

class toggleGraph extends React.Component {

    constructor () {
        super()
        this.state = {
            showMe: true
        }
    }


    render() {
        return (
            <div class="form-popup" id="myForm">
                <form action="/action_page.php" class="form-container">
                </form>
            </div>
        )
    }
}