import React, { Component } from "react";
import { Row, Col, Tooltip, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
// import "font-awesome/css/font-awesome.css";

export default class Timeline extends Component {
  state = {
    age: this.props.age,
    ageChild: this.props.ageChild,
    kids: this.props.kids,
    kidsGap: this.props.kidsGap,
    childTooltip: false,
  };
  componentDidMount = () => {
    this.setState({
      age: this.props.age,
      ageChild: this.props.ageChild,
    });
  };
  toggleChildTooltip = () => {
    this.setState({
      childTooltip: !this.state.childTooltip,
    });
  };

  render() {
    var age = [];
    for (let i = this.props.age; i < 52; i++) {
      age.push(i);
    }
    // var ageChild = this.props.ageChild;
    return (
      <React.Fragment>
        <div
          className="p-5 "
          style={{ backgroundColor: "#163948", width: "100%" }}
        >
          <Row>
            <div
              className="w-100"
              style={{ height: "2px", backgroundColor: "white " }}
            ></div>
            {age.map((value, i) => (
              <Col
                md="auto"
                style={{
                  textAlign: "center",
                }}
              >
                {this.props.ageChild.includes(value) && (
                  <React.Fragment>
                    <UncontrolledTooltip
                      placement="bottom"
                      target={"child" + i}
                    >
                      description of child
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="top" target="percentage">
                      percentage
                    </UncontrolledTooltip>
                    <div
                      className=""
                      style={{
                        marginTop: "2.6rem",
                        position: "absolute",
                        marginLeft: "-14px ",
                      }}
                    >
                      <div id="percentage">
                        <label style={{ color: "white" }}>%%%</label>
                      </div>
                      <div
                        id={"child" + i}
                        style={{
                          backgroundColor: "white",
                          borderRadius: "100%",
                          width: "50px",
                          height: "50px",
                          verticalAlign: "middle",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBaby}
                          size="lg"
                          style={{
                            verticalAlign: "middle",
                            transform: "translateY(30%)",
                          }}
                        ></FontAwesomeIcon>
                      </div>
                      <div
                        className="mx-auto"
                        style={{
                          width: "2px",
                          height: "10px",
                          backgroundColor: "white",
                        }}
                      ></div>
                      <label
                        style={{
                          color: "white",
                          display:
                            (value === this.props.age ||
                              value === 41 ||
                              value === 51) &&
                            "none",
                        }}
                      >
                        {value}
                      </label>
                    </div>
                  </React.Fragment>
                )}
                {value === this.props.age && (
                  <React.Fragment>
                    <div style={{ marginTop: "-1.5rem" }}>
                      <small style={{ color: "white" }}>Today</small>
                    </div>
                    <div
                      className="mx-auto"
                      style={{
                        width: "2px",
                        height: "150px",
                        backgroundColor: "white",
                        // position: ""
                        justifyContent: "center",
                      }}
                    ></div>
                    <label style={{ color: "white" }}>{this.props.age}</label>
                  </React.Fragment>
                )}

                {value === 41 && (
                  <React.Fragment>
                    <div style={{ marginTop: "-1.5rem" }}>
                      <small style={{ color: "white" }}>
                        Menopause Transition
                      </small>
                    </div>
                    <div
                      className="mx-auto"
                      style={{
                        width: "2px",
                        height: "150px",
                        backgroundColor: "white",
                      }}
                    ></div>
                    <label style={{ color: "white" }}>41</label>
                  </React.Fragment>
                )}
                {value === 51 && (
                  <React.Fragment>
                    <div style={{ marginTop: "-1.5rem" }}>
                      <small style={{ color: "white" }}>Menopause</small>
                    </div>
                    <div
                      className="mx-auto"
                      style={{
                        width: "2px",
                        height: "150px",
                        backgroundColor: "white",
                      }}
                    ></div>
                    <label style={{ color: "white" }}>51</label>
                  </React.Fragment>
                )}
              </Col>
            ))}
            <div
              className="w-100"
              style={{
                height: "2px",
                backgroundColor: "white ",
                marginTop: "-2rem",
              }}
            ></div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
