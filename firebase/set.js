import * as firebase from "firebase";
import Base from "./base";

const ini_config = !firebase.apps.length
  ? firebase.initializeApp(Base)
  : firebase.app();

const ref = ini_config.database().ref();
const snap = ref.set({
  Welcome: {
    channelDescription: "Welcome ",
    messages: {
      0: {
        entry:
          "Welcome to our books society, We created this society for books discussions and reviews. ",
        createdAtDate: "26 Oct",
        createdAtTime: "9:00:34 PM",
        avatar: "https://randomuser.me/api/portraits/men/47.jpg",
        name: "Mark"
      }
    }
  },
  Reviews: {
    channelDescription:
      "This channel for book reviews. Share books you currently reading, your thoughts about it",
    messages: {
      0: {
        entry: "I am currently reading a new book 'zero to one'",
        createdAtDate: "25 Oct",
        createdAtTime: "3:05:01 PM",
        avatar: "https://randomuser.me/api/portraits/men/47.jpg",
        name: "Mark"
      }
    }
  }
});

export default snap;
