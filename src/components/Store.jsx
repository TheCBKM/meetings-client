import { Store } from "pullstate";
import { auth } from "../firebase";

export const userStore = new Store({
  user: false,
});

auth.onAuthStateChanged((user) => {
  userStore.update((s) => {
    if (user) {
      let { uid, displayName, email, phoneNumber, photoURL } = user;
      console.log("auth", user);
      s.user = {
        uid,
        displayName: displayName ? displayName : "",
        email: email ? email : "",
        phoneNumber: phoneNumber ? phoneNumber : "",
        photoURL: photoURL ? photoURL : "",
      };
    }else
    s.user=user;
  });
});
