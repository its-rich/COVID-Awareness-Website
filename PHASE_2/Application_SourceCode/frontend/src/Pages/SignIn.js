import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "../components/Firebase/config.js";

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);
let auth = firebase.auth();

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler =
            (event,email, password) => {
                event.preventDefault();
                // console.log("submit");
                // console.log(email, password);

                auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // console.log(errorCode, "+", errorMessage);
                    alert(errorMessage);
                    return false;
                });
                return true;
    };


      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

    const normalSignIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            props.updateUID(auth.currentUser.uid)
            firebase.firestore().collection('users').doc(auth.currentUser.uid).set({
                uid: auth.currentUser.uid,
                email_address: auth.currentUser.email
            }, {merge: true});
        })
        .catch((error) => {
            alert(error.message);
        });
        // props.updateEmail(auth.currentUser.email)
    }

    const googleSignIn = () => {
        signInWithGoogle()
        .then(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    props.updateUID(user.uid)
                    firebase.firestore().collection('users').doc(auth.currentUser.uid).set({
                        uid: user.uid,
                        email_address: auth.currentUser.email
                    }, {merge: true});
                }
            });
        });
    }

  return (
    <div className="mt-8 text-black">
      <h1 style={{margin: 20}} className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-black text-center mb-3">{error}</div>}
        <form className="text-black">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <div>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value = {email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          </div>
          <label htmlFor="userPassword" className="block" style={{marginTop: "25px"}}>
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button style={{width: "15%", marginLeft: "42.5%", marginTop: "30px"}} className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick = {(event) => {normalSignIn(event)}}>
            Sign in
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button style={{width: "30%", marginLeft: "35%"}}
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white" onClick={googleSignIn}>
          Sign in with Google
        </button>
        <p className="text-center my-3">
          <Link to="/phone" className="text-blue-500 hover:text-blue-600">Sign in with Mobile</Link>
          <br />Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
