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
class ModernFertility extends Component {
  state = {
    index: 0,
    kidsGap: 2,
    age: 25,
    ageChild: 28,
    kids: null,
    sheetLoaded: false,
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: Number(event.target.value),
    });
  };

  render() {
    var ageChildProp = [];
    for (let i = 0; i < this.state.kids; i++) {
      ageChildProp.push(this.state.ageChild + i * this.state.kidsGap);
    }

    return (
      <div>
        <Container fluid className="pt-5">
          <div className="bc-tiles-wrapper ">
            <div className="bc-tiles-intro-text w-75 mx-auto">
              <h1 style={{ fontFamily: "montserrat" }}>Fertility Timeline</h1>
              <div className="d-block">
                <p>
                  Not ready for kids? Visualize your timeline and put structure
                  to fertility.<br></br> Outsource your research and learn about
                  how fertility changes with age.
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
            <Col md="2">
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
            <Col>
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
            <Col>
              <FormGroup>
                <Row>
                  <Col>
                    <label>Number of kids you'd like</label>
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      name="kids"
                      value={this.state.kids}
                      onChange={this.handleInput}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col>
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
            {/* <Col
              md="4"
              className="order-1 filters"
              style={{ borderRight: "2px solid #65808c" }}
            >
              <Row>
                <Col>
                  <label className="">Your age</label>
                </Col>
                <Col md="auto">
                  <Input
                    min={20}
                    type="number"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleInput}
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Age you’d like to have your first (or next) kid</label>
                </Col>
                <Col md="auto">
                  <Input
                    min={20}
                    type="number"
                    name="ageChild"
                    value={this.state.ageChild}
                    onChange={this.handleInput}
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>Number of kids you'd like</label>
                </Col>
                <Col md="auto">
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
              <Row style={{ borderBottom: "2px solid #65808c" }}>
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
                <Col md="auto">
                  <h4 color="#163948" style={{ fontWeight: "bold" }}>
                    {this.state.kidsGap + " years"}
                  </h4>
                </Col>
              </Row>
            </Col>
           */}
          </Row>
          <Share />
        </Container>
      </div>
    );
  }
}
export default ModernFertility;
