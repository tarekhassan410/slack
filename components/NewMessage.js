import React from "react";

import {TextField} from "@material-ui/core";
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {messagesList} = this.props;
    const messageArray = messagesList.messages;
    return (
      <div>
        <TextField
          id="outlined-full-width"
          label={this.state.currentChannel}
          style={{margin: 4}}
          placeholder="Message"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
            focused: true
          }}
        />
      </div>
    );
  }
}

export default Message;
