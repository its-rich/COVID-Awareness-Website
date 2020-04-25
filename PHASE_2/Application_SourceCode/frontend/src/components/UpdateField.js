import React from 'react';

export default class UpdateFeild extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            label: props.label,
            placeHolder: props.placeHolder,
            text: props.text,
            buttonText: props.buttonText,
            buttonClickMethod: props.click,
            noButton: props.noButton,
            disabled: props.disabled,
        }
    }

    render() {
        let button;
        if (!this.state.noButton) {
            button = <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" style={{width: "270px"}} onClick={this.state.buttonClickMethod}>
                        {this.state.buttonText}
                    </button>;
        }

        let input = <input
                        type="email"
                        className="my-1 p-1 w-full"
                        name={this.state.name}
                        value = {this.state.text}
                        placeholder={this.state.placeHolder}
                        id={this.state.name}
                    />;
        if (this.state.disabled) {
            input = <input
                        type="email"
                        className="my-1 p-1 w-full"
                        name={this.state.name}
                        value = {this.state.text}
                        placeholder={this.state.placeHolder}
                        id={this.state.name}
                        disabled
                    />
        }

        return (
            <div>
                <label className="block">
                    {this.state.label}:
                </label>
                <div className="FlexRow">
                    {input}
                    {button}
                    
                </div>
            </div>
        )
    }

}