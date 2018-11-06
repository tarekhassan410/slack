import * as firebase from "firebase";
import Base from "./base";

!firebase.apps.length ? firebase.initializeApp(Base) : firebase.app();
const db = firebase.database();

export default db;
