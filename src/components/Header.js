import React, { Component } from "react";
import { Nav, Collapse, Navbar, NavbarToggler } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default class Header extends Component {
  state = {
    open: false,
  };
  render() {
    return (
      <div style={{ position: "fixed", width: "100%", top: 0, zIndex: 1 }}>
        <Navbar expand="lg" className="header">
          <h2>
            <a
              href="http://www.proactiveforher.com/"
              className="logo"
              style={{
                fontFamily: "Abril Fatface, Sans-serif",
                letterSpacing: "5px",
              }}
            >
              Proactive
            </a>
          </h2>
          <NavbarToggler
            className="navbar-dark"
            style={{ borderColor: "white" }}
            onClick={() => {
              this.setState({ open: !this.state.open });
            }}
          >
            <FontAwesomeIcon icon={faBars} color="white" />
          </NavbarToggler>
          <Collapse className="header-right" isOpen={this.state.open} navbar>
            <Nav navbar>
              <a href="http://www.proactiveforher.com/">Home</a>
              <a href="http://www.proactiveforher.com/webinar/">Webinars</a>
              <a href="http://www.proactiveforher.com/videos/">Videos</a>
              <a href="http://www.proactiveforher.com/blog/">Blog</a>
              <a href="http://www.proactiveforher.com/sti-2/patient-education-tools/">
                Tools
              </a>
              <a href="http://www.proactiveforher.com/forum/">Forum</a>
              <a href="http://www.proactiveforher.com/doctors/">Physicians</a>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
