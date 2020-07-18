import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";

export default class CTA extends Component {
  state = {
    aBooked: false,
  };
  render() {
    return (
      <div>
        <Row className="mt-5">
          <Col
            md="6"
            className="my-3"
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              className="header-all text-center"
              style={{
                fontFamily: "montserrat, sans-serif",
                fontWeight: "bold",
              }}
            >
              Talk to a specialist
            </h1>
            <div className="text-center">
              Schedule a 1:1 consultation with a helpful and open-minded
              physician, hand-picked by Proactive.<br></br>
              Click on the icon to book an appointment
            </div>
          </Col>
          <Col
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {!this.state.aBooked && (
              <div>
                <a
                  target="_blank"
                  href="http://www.proactiveforher.com/doctors/"
                >
                  <FontAwesomeIcon
                    icon={faUserMd}
                    style={{
                      color: "#bcd8df",
                      fontSize: "200px",
                      cursor: "pointer",
                    }}
                    className="my-auto"
                  />
                </a>
              </div>
            )}
            {this.state.aBooked && (
              <div className="">
                <div>
                  <Button>Track your periods</Button>
                </div>
                <div className="mt-3">
                  <Button>Book a follow up appointment</Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
