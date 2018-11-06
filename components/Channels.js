import React from "react";
import Base from ".././firebase/base";

import { List } from "semantic-ui-react";

class Channels extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentChannel, onChannelCLick, channelsList } = this.props;
    return (
      <div style={{ paddingTop: 10 }}>
        <List selection animated verticalAlign="middle">
          {channelsList.map((channel, i) => (
            <List.Item
              active={currentChannel == channel}
              value={channel}
              style={styles.channelText}
              key={i}
              onClick={() => onChannelCLick(channel)}
              as="a"
            >
              #{channel}{" "}
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}
const styles = {
  channelsList: {
    paddingTop: 5
  },
  channelText: {
    color: "white",
    fontSize: 16
  }
};

export default Channels;
