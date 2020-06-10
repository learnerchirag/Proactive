import React, { Component } from "react";
import { Input, Row, Col, FormGroup, Form, Container } from "reactstrap";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "../css/timeline.scss";
import Timeline from "../components/Timeline";
export default class ModernFertility extends Component {
  state = {
    index: 0,
    kidsGap: 2,
  };
  render() {
    const age = ["1999-05-05", "1999-06-05"];
    return (
      <div>
        <Container fluid>
          <div className="bc-tiles-wrapper ">
            <div className="bc-tiles-intro-text w-75 mx-auto">
              <h1>Birth Control</h1>
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
                  <Input type="number"></Input>
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
                    <Input type="number"></Input>
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
                    <Input type="number"></Input>
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
            <Timeline />
            {/* <HorizontalTimeline
              minEventPadding={20}
              maxEventPadding={120}
              linePadding={100}
              labelWidth={85}
              fillingMotion={{ stiffness: 150, damping: 25 }}
              slidingMotion={{ stiffness: 150, damping: 25 }}
              styles={{
                background: "#f8f8f8",
                foreground: "#7b9d6f",
                outline: "red",
              }}
              isTouchEnabled={true}
              isKeyboardEnabled={true}
              isOpenBeginning={true}
              isOpenEnding={true}
              lineWidth={85}
              index={this.state.index}
              indexClick={(index) => {
                this.setState({ index });
              }}
              values={age}
            /> */}
          </Row>
        </Container>
      </div>
    );
  }
}
