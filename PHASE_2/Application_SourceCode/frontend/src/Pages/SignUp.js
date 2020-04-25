import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../components/Firebase/config.js";

const SignUp = () => {
  let auth = firebase.auth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
    setEmail("");
    setPassword("");
    //updateuser(email);
    var user = auth.currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        // console.log("Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        // console.log("  Email: " + profile.email);
        // sendSignInLinkToEmail(profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
      });
    }
    //sendSignInLinkToEmail(email);

    //sendSignInLinkToEmail(email);
  };
  const sendSignInLinkToEmail = (email) => {
   var emailAddress = "sengtest22@gmail.com";
   // console.log(email);
   // console.log(emailAddress);

auth.sendPasswordResetEmail(email).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});


  };
  const updateuser = (email) => {

    var user = auth.currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});



  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="mt-8 text-black">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button style={{width: "50%", marginLeft: "25%"}}
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);

              // sendSignInLinkToEmail(email);
            }}
          >
            Sign up
          </button>

        </form>
        <p className="text-center my-3">or</p>
        <button style={{width: "50%", marginLeft: "25%"}}
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
          onClick={event => {

              // sendSignInLinkToEmail(email);
            }}
        >
          Sign In with Google
        </button>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/infected" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
