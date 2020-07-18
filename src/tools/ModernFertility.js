import React, { Component } from "react";
import { Input, Row, Col, FormGroup, Form, Container } from "reactstrap";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "../css/horizonTimeline.css";
import Timeline from "../components/Timeline";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
import Share from "../components/Share";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BotPro from "./BotPro";
import CTA from "../components/CTA";
import FooterMain from "../components/FooterMain";
import Modal from "../components/Modal";
class ModernFertility extends Component {
  state = {
    index: 0,
    kidsGap: 2,
    age: 25,
    ageChild: 28,
    kids: null,
    sheetLoaded: false,
    openChat: false,
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: Number(event.target.value),
    });
  };
  handleChat = () => {
    this.setState({
      openChat: !this.state.openChat,
    });
  };
  render() {
    var ageChildProp = [];
    for (let i = 0; i < this.state.kids; i++) {
      ageChildProp.push(this.state.ageChild + i * this.state.kidsGap);
    }

    return (
      <>
        <Modal />
        <div>
          <Header />
          <div>
            <Container fluid className="pt-5 mt-5">
              <div className="bc-tiles-wrapper ">
                <div className="bc-tiles-intro-text mx-auto">
                  <h1
                    className="header-all"
                    style={{ fontFamily: "montserrat" }}
                  >
                    Fertility Timeline
                  </h1>
                  <div className="d-block">
                    <p>
                      Not ready for kids? Visualize your future and plan your
                      fertility.<br></br>
                      Leave the research to us and learn about how fertility
                      changes with age.
                    </p>
                    <p>
                      <strong>Build your timeline:</strong>
                    </p>
                  </div>
                </div>
              </div>
              <Row
                className="mt-5 float-center mx-auto"
                style={{ justifyContent: "center" }}
              >
                <Col md="6" lg="2" className="my-2">
                  <Row>
                    <Col>
                      <label>Your age</label>
                    </Col>
                    <Col>
                      <Input
                        min={20}
                        type="number"
                        name="age"
                        value={this.state.age}
                        onChange={this.handleInput}
                      ></Input>
                    </Col>
                  </Row>
                </Col>
                <Col md="6" lg="3" className="my-2">
                  <FormGroup>
                    <Row>
                      <Col>
                        <label>
                          Age you’d like to have your first (or next) kid
                        </label>
                      </Col>
                      <Col>
                        <Input
                          type="number"
                          name="ageChild"
                          value={this.state.ageChild}
                          onChange={this.handleInput}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col md="6" lg="3" className="my-2">
                  <FormGroup>
                    <Row>
                      <Col>
                        <label>Number of kids you'd like</label>
                      </Col>
                      <Col>
                        <Input
                          min={0}
                          max={5}
                          type="number"
                          name="kids"
                          value={this.state.kids}
                          onChange={this.handleInput}
                        ></Input>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col md="6" lg="4" className="my-2">
                  <Row>
                    <Col>
                      <label>Time between kids</label>
                    </Col>
                    <Col>
                      <InputRange
                        maxValue={7}
                        minValue={1}
                        value={this.state.kidsGap}
                        onChange={(kidsGap) => this.setState({ kidsGap })}
                        // formatLabel={}
                      />
                    </Col>
                    <Col>
                      <h4 color="#163948" style={{ fontWeight: "bold" }}>
                        {this.state.kidsGap + " years"}
                      </h4>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col className="order-2 px-0">
                  <Timeline
                    age={this.state.age}
                    ageChild={ageChildProp}
                    kids={this.state.kids}
                    kidsGap={this.state.kidsGap}
                  />
                </Col>
              </Row>
              <CTA />
              <Share
                fbH={
                  "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.proactiveforher.com%2Ftools%2Ffertility-timeline%2F"
                }
                twH={
                  "https://twitter.com/share/?text=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive&url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
                }
                emH={
                  "mailto:?subject=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive&body=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
                }
                liH={
                  "https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F&amp;title=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive&amp;source=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
                }
                whH={
                  "https://api.whatsapp.com/send?text=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive%20http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
                }
              />
              {this.state.openChat && <BotPro />}
              <Footer openChat={this.handleChat} />
            </Container>
            <FooterMain />
          </div>
        </div>
      </>
    );
  }
}
export default ModernFertility;
