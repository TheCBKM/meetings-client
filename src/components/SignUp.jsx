import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../firebase";
import firebase from "firebase";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl:  window.location.pathname=='/signup'?"/allmeetings":window.location.pathname,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: "IN",
    },
  ],
};
export default function () {

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}
