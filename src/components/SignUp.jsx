import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { navigate } from "@reach/router";
import { auth } from "../firebase";
import firebase from "firebase";
import { Paper } from "@material-ui/core";

const uiConfig = {
  // Popup is required for reliable Google sign-in on localhost SPAs.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  callbacks: {
    signInSuccessWithAuthResult: () => {
      navigate("/");
      return false;
    },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: "IN",
      recaptchaParameters: {
        size: "normal",
      },
    },
  ],
};

export default function SignUp() {
  return (
    <div className="signup-page">
      <Paper className="signup-card" elevation={3}>
        <div className="signup-card-band" aria-hidden="true" />
        <h1>Meetings App</h1>
        <p className="signup-subtitle">Sign in to view meetings and recordings</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Paper>
    </div>
  );
}
