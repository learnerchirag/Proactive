import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <div className="header">
          <a
            href="http://www.proactiveforher.com/"
            className="logo"
            style={{ fontFamily: "abril fatface" }}
          >
            Proactive
          </a>
          <div className="header-right">
            <a href="http://www.proactiveforher.com/">Home</a>
            <a href="http://www.proactiveforher.com/webinar/">Webinars</a>
            <a href="http://www.proactiveforher.com/blog/">Blog</a>
            <a href="http://www.proactiveforher.com/doctors/">Book</a>
          </div>
        </div>
      </div>
    );
  }
}
