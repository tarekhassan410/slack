import * as firebase from "firebase";
import Base from "./base";

!firebase.apps.length ? firebase.initializeApp(Base) : firebase.app();
const auth = firebase.auth();

export default auth;
