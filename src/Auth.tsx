import React, { useState, useEffect } from "react";

// Firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase/app";
import "firebase/auth";

import AppRouter from "./AppRouter";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_SECRET,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

firebase.initializeApp(config);

// let unregisterAuthObserver: firebase.Observer<any, Error> | ((a: firebase.User | null) => any);
let unregisterAuthObserver: any;

const Auth = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user));

        return () => {
            unregisterAuthObserver();
        };
    }, [isSignedIn]);

    if (!isSignedIn) {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }

    return <AppRouter />;
};

export default Auth;
