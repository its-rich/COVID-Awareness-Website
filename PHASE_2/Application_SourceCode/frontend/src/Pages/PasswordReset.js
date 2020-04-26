import React, {useState} from "react";
import firebase from "../components/Firebase/config.js";

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const sendResetEmail = event => {
        event.preventDefault();
        firebase.auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            setEmailHasBeenSent(true);
            setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
            alert("Email sent!");
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.log(errorCode, "+", errorMessage);
            alert(errorMessage);
        });
      };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
          if(name === 'userEmail') {
              setEmail(value);
          }
      };

  return (
    <div className="mt-8 text-black">
        <div class="mt-8">
            <h1 style={{margin: 20}} class="text-xl text-center font-bold mb-2">Reset your Password</h1>
            <div class="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <form action="">
                <label htmlFor="userEmail" className="block">
                    Email:
                </label>
                <input
                    type="email"
                    className="my-1 p-1 w-full"
                    name="userEmail"
                    value = {email}
                    placeholder="E.g: faruq123@gmail.com"
                    id="userEmail"
                    onChange = {(event) => onChangeHandler(event)}
                />
                    <button style={{width: "50%", marginLeft: "25%", marginTop: "20px"}} class="w-full bg-blue-400 text-white py-3" onClick = {(event) => {sendResetEmail(event, email)}}>Send me a reset link</button>
                </form>
                    <a class="my-2 text-blue-700 hover:text-blue-800 text-center block" href="/infected">← back to sign in page</a>
            </div>
        </div>
    </div>
  );
};
export default PasswordReset;
