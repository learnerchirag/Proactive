import React, { Component } from "react";
import { Input, Row, Col, FormGroup, Form, Container } from "reactstrap";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "../css/horizonTimeline.css";
import Timeline from "../components/Timeline";

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
              <h1 style={{ fontFamily: "montserrat" }}>Modern Fertility</h1>
              <div className="d-block">
                <p>
                  Birth control is how you prevent pregnancy. There are lots of
                  different birth control options out there. We’re here to help
                  you figure it all out.
                </p>
                <p>
                  <strong>
                    Pick what’s important to you to find your best birth control
                    method:
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <Row
            className=" float-center mx-auto"
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
            <Timeline
              age={this.state.age}
              ageChild={ageChildProp}
              kids={this.state.kids}
              kidsGap={this.state.kidsGap}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
export default ModernFertility;
