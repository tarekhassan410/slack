import React from "react";
import {Icon, Input, Button, Header, Image, Modal} from "semantic-ui-react";

import Auth from ".././firebase/auth";

export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        centered={false}
        open={this.props.showDialog}
        dimmer={"inverted"}
        onClose={this.props.onClose}
        size={"tiny"}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div style={{textAlign: "center"}}>
              <Header>Sign in to access </Header>
              <p>
                <Button onClick={this.props.handleUserLogin} primary>
                  <Icon name="google" /> Sign in
                </Button>
                <br />
                <a href="#" onClick={this.props.onClose}>
                  {" "}
                  Later{" "}
                </a>
              </p>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
