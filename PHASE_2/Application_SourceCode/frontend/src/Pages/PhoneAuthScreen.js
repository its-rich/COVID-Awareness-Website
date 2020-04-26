import React from "react";
import firebase from "../components/Firebase/config.js";


class PhoneAuthScreen extends React.Component {
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: ''
  }

  // appVerifier = new auth.RecaptchaVerifier('recaptcha-container');




  onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;
    // console.log(name, value)

    if(name === 'phone') {
      this.setState({phone: value});
    }
    else if(name === 'verificationCode'){
      this.setState({verificationCode: value});
    }
  }

  validatePhoneNumber() {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(this.state.phone)
  }

  handleSendCode = () => {
    // Request to send OTP
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // console.log("sendcode " + this.state.phone, recaptcha)
    if (this.validatePhoneNumber()) {
      firebase.auth()
        .signInWithPhoneNumber(this.state.phone, recaptcha)
        .then(confirmResult => {
          this.setState({ confirmResult })
          // console.log(confirmResult)
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
  }

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: '' })
  }

  confirmedNumber = () => {
    this.setState({ confirmResult: true })
    // console.log("confirmed")
  }

  handleVerifyCode = (e) => {
    // e.preventDefault()
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          console.log(user)
          this.setState({ userId: user.uid })
          alert(`Verified! ${user.uid}`)
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  renderConfirmationCodeView = () => {
    return (
      <div className="mt-8 text-black">
        <input
          type="text"
          className="my-1 p-1 w-full"
          name="verificationCode"
          value = {this.state.verificationCode}
          placeholder="Verification code"
          id="verificationCode"
          onChange = {(event) => this.onChangeHandler(event)}
        />
        <button type="button" style={{width: "20%", marginLeft: "40%"}} className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {this.handleVerifyCode}>
          Verify Code
        </button>
        <div id="phone-sign-in-recaptcha"></div>
      </div>
    )
  }



  render() {


    return (
      <div className="mt-8 text-black">
        <h1 style={{margin: 20}} className="text-3xl mb-2 text-center font-bold">Sign In With Mobile</h1>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          {/* {error !== null && <div className = "py-4 bg-red-600 w-full text-black text-center mb-3">{error}</div>} */}
          <div id="recaptcha-container"></div>
          <form className="text-black">
            <label htmlFor="phone" className="block">
              Phone Number:
            </label>

            <input
              type="text"
              className="my-1 p-1 w-full"
              name="phone"
              value = {this.state.phone}
              placeholder="E.g: +61401234567"
              id="phone"
              onChange = {(event) => this.onChangeHandler(event)}
            />
            <button style={{width: "20%", marginLeft: "40%", marginTop: "20px"}} type="button" className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
              onClick={e =>
                this.state.confirmResult
                  ? this.changePhoneNumber()
                  : this.handleSendCode()
            }>
            {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
            </button>
            {this.state.confirmResult
              ? this.renderConfirmationCodeView()
              : null
            }

          </form>
          <a class="my-2 text-blue-700 hover:text-blue-800 text-center block" href="infected">← back to sign in page</a>
        </div>
      </div>
    );


  }

};
export default PhoneAuthScreen;
