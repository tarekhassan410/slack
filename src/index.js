import React from "react";
import ReactDOM from "react-dom";

import {
  Navbar,
  Alignment,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  InputGroup,
  Intent
} from "@blueprintjs/core";
import "@blueprintjs/icons";

import Message from ".././components/Message";
import Channels from ".././components/Channels";
import Login from ".././components/Login";
//import ".././firebase/set";
import * as firebase from "firebase";
import Get from ".././firebase/get";
import Auth from ".././firebase/auth";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      listOfChannels: [],
      messages: [],
      currentChannel: "Reviews",
      message: "",
      description: null,
      user: [],
      showLoginDialog: false,
      userLoggedIn: false
    };

    const channelsRef = Get.ref();
    const channelsSnap = channelsRef.once("value").then(snapshot => {
      console.log(Object.values(snapshot.exportVal()));
      this.setState({
        listOfChannels: Object.keys(snapshot.exportVal())
      });
    });

    const messagesRef = Get.ref(`${this.state.currentChannel}/messages`);
    const messagesSnap = messagesRef.once("value").then(snapshot => {
      this.setState({ messages: Object.values(snapshot.exportVal()) });
    });

    Auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user.providerData,
          showLoginDialog: false,
          userLoggedIn: true
        });
      } else {
        this.setState({
          user: [],
          userLoggedIn: false
        });
      }
    });
  }

  getMessages = () => {
    const messagesRef = Get.ref(`${this.state.currentChannel}/messages`);
    const messagesSnap = messagesRef.once("value").then(snapshot => {
      this.setState({ messages: Object.values(snapshot.exportVal()) });
    });
  };

  pushNewMessage = event => {
    event.preventDefault();
    var d = new Date();

    let messageListRef = Get.ref(`${this.state.currentChannel}/messages`);
    let newMessageRef = messageListRef.push();
    if (this.state.userLoggedIn == true) {
      var photoURL;
      var displayName;
      this.state.user.map(u => {
        photoURL = u.photoURL;
        displayName = u.displayName;
      });
      newMessageRef.set({
        entry: `${this.state.message}`,
        createdAtTime: d.toLocaleTimeString(),
        createdAtDate: d.toLocaleDateString(),
        avatar: photoURL,
        name: displayName
      });
    } else {
      newMessageRef.set({
        entry: `${this.state.message}`,
        createdAtTime: d.toLocaleTimeString(),
        createdAtDate: d.toLocaleDateString(),
        name: "Anonymous",
        avatar: "https://randomuser.me/api/portraits/lego/5.jpg"
      });
    }
    const messagesSnap = messageListRef.once("value").then(snapshot => {
      this.setState({
        messages: Object.values(snapshot.exportVal()),
        message: ""
      });
    });
  };

  onInputChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  channelSelected = channel => {
    this.setState(
      {
        currentChannel: channel
      },
      this.getMessages
    );
  };

  openLoginDialog = () => {
    this.setState({
      showLoginDialog: true
    });
  };

  hideLoginDialog = () => {
    this.setState({
      showLoginDialog: false
    });
  };

  handleUserLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    Auth.signInWithPopup(provider)
      .then(function(result) {
        var user = result.user;
        this.setState({
          user: user.providerData,
          showLoginDialog: false,
          userLoggedIn: true
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode);
      });
    console.log(this.state.userLoggedIn);
  };

  handleUserLogout = () => {
    Auth.signOut()
      .then(function() {
        this.setState({
          user: [],
          userLoggedIn: false
        });
        console.log("signed out");
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.state.userLoggedIn);
  };

  render() {
    return (
      <div className="app">
        <div className="leftNav">
          <div className="title"> Channels </div>
          <div>
            <Channels
              channelsList={this.state.listOfChannels}
              onChannelCLick={this.channelSelected}
              currentChannel={this.state.currentChannel}
            />
          </div>
        </div>
        <div className="main">
          <div className="bar">
            <Navbar>
              <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Books.discuss</Navbar.Heading>
                <Navbar.Divider />
                Built for readers
              </Navbar.Group>
              <NavbarGroup align={Alignment.RIGHT}>
                {console.log(this.state.user)}
                <Login
                  user={this.state.user}
                  userLoggedIn={this.state.userLoggedIn}
                  showLoginDialog={this.state.showLoginDialog}
                  onLoginClick={this.openLoginDialog}
                  onLoginClose={this.hideLoginDialog}
                  onLogoutClick={this.handleUserLogout}
                  handleUserLogin={this.handleUserLogin}
                />
              </NavbarGroup>
            </Navbar>
          </div>
          <div className="messagesListContainer">
            <div className="messagesList">
              <Message messagesList={this.state.messages} />
            </div>
            <form onSubmit={this.pushNewMessage}>
              <div
                style={{ margin: 8 }}
                className=" bp3-input-group modifier newMessage"
              >
                <input
                  className="bp3-input bp3-intent-primary modifier bp3-fill"
                  type="text"
                  placeholder="Send a new message"
                  value={this.state.message}
                  dir="auto"
                  onChange={this.onInputChange}
                />
                <Button
                  type="button"
                  className="bp3-button bp3-intent-primary bp3-round modifier"
                  onClick={this.pushNewMessage}
                >
                  Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
