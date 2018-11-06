import React from "react";

import { List, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Spinner } from "@blueprintjs/core";
import "@blueprintjs/icons";

import axios from "axios";

import "./messages.css";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  render() {
    const { messagesList } = this.props;
    const messageArray = messagesList.messages;
    var element = document.getElementById("messagesList");

    return (
      <div id="messagesList" style={{ padding: 10 }}>
        <List divided selection animated verticalAlign="top" size={"massive"}>
          {messagesList.map((m, i) => (
            <List.Item key={i} floated="left">
              <Image avatar src={m.avatar} />
              <List.Content>
                <List.Header as="a">
                  {m.name} -{" "}
                  <span style={{ textSize: 10 }}> {m.createdAtTime} </span>
                </List.Header>
                <List.Description>
                  {" "}
                  <span style={{ textSize: 10 }}> {m.entry} </span>{" "}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default Message;
