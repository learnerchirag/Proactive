import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default class FooterMain extends Component {
  state = {
    value: "",
  };
  render() {
    return (
      <Container fluid style={{ background: "#163948", padding: "30px" }}>
        <Row className="mx-md-5">
          <Col className="p-4 text-white order-2 order-md-1" md="6">
            <div className="mb-3 ">
              <a
                href="http://www.proactiveforher.com/"
                style={{ color: "white" }}
              >
                Home
              </a>
            </div>
            <div className="mb-3 " style={{ display: "flex" }}>
              <a
                href="https://www.facebook.com/proactiveforher/?__tn__=%2Cd%2CP-R&eid=ARBOEZQG5jk8MqVy1_dkE5SWe1aZh6iVRJ4CNfc2AlW_d4oKslHdFP1TOpa1LqHGK7eKHdarQEhFmfjz"
                target="_blank"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon
                  cursor="pointer"
                  icon={faFacebook}
                  className="mr-3"
                />
              </a>
              <a
                href="https://www.instagram.com/proactiveforher/?hl=en"
                target="_blank"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon
                  cursor="pointer"
                  icon={faInstagram}
                  className="mr-3"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/43208504/admin/"
                target="_blank"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon
                  cursor="pointer"
                  icon={faLinkedin}
                  className="mr-3 "
                />
              </a>
            </div>
            <div className="mb-3 ">© Proactive For Her 2020</div>
          </Col>
          <Col className="p-4 order-md-2">
            <div id="mc_embed_signup">
              <Form
                action="https://proactiveforher.us18.list-manage.com/subscribe/post?u=14fbc27b9ee1cfe7f204242de&amp;id=792a773110"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank"
                novalidate
              >
                <div id="mc_embed_signup_scroll">
                  <Input
                    type="email"
                    style={{ width: "100%", fontSize: "0.8rem" }}
                    value={this.state.value}
                    onChange={(e) => {
                      this.setState({ value: e.target.value });
                    }}
                    name="EMAIL"
                    className="email mb-2"
                    id="mce-EMAIL"
                    placeholder="Your Email Address"
                    required
                  />

                  <div class="clear">
                    <Button
                      style={{ width: "100%", fontSize: "0.8rem" }}
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button"
                    >
                      Signup for Newsletter
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
