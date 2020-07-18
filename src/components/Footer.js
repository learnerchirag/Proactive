import React, { Component } from "react";

export default class Footer extends Component {
  state = {
    openChat: false,
  };
  render() {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: "15px",
          backgroundColor: "#163948",
          zIndex: 1,
        }}
        className="icon-shape rounded-circle p-3"
      >
        <a onClick={this.props.openChat}>
          <img src={require("../download/images/chat.png")} />
        </a>
      </div>
    );
  }
}
