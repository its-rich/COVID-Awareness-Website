import React, { Component } from "react";
import UpdateField from "../components/UpdateField.js";
import firebase from '../components/Firebase/config.js'

const db = firebase.firestore();

export default class Profile extends Component {

    render() {
        // db.collection('diseases').where('diseases', 'array-contains', 'coronavirus').get()
        //     .then(snapshot => {
        //         if (snapshot.empty) {
        //             console.log('No matching documents.');
        //             return
        //         }
        //         console.log(snapshot.size); // count total amount -> don't use this
        //         // snapshot.forEach(doc => {
        //         //     console.log(doc.data().diseases.length);
        //         // });
        //     })
        return (
            <div className="mt-8 text-black">
                <h1 className="text-3xl mb-2 text-center font-bold">My Profile</h1>
                <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8" style={{marginBottom: "50px"}}>
                    <form className="text-black">
                        <UpdateField name="userFirstName" label="First Name" text="John" noButton disabled />
                        <UpdateField name="userLastName" label="Last Name" text="Smith" noButton disabled />
                        <UpdateField name="userEmail" label="Change Email" placeHolder="E.g: faruq123@gmail.com" text="me@gmail.com" buttonText="Update Email" buttonClickMethod="" />
                        <UpdateField name="userPhone" label="Change Phone Number" placeHolder="E.g: 0456 789 012" text="04** *** *23" buttonText="Update Phone Number" buttonClickMethod="" />
                        <UpdateField name="userPassword" label="Change Password" placeHolder="New Password" buttonText="Change Password" buttonClickMethod="" />
                        <UpdateField name="userAddress" label="Update Address" placeHolder="E.g: 123 Smith Street, Suburb" text="currentAddress" buttonText="Update Home Address" buttonClickMethod="" />
                        <UpdateField name="userDOB" label="Date of Birth" text="01/01/2000" noButton disabled />
                        <UpdateField name="userSex" label="Sex" text="Male" noButton disabled />
                    </form>
                </div>
            </div>
        )
    }
}
