import React, { Component } from "react";
import { Row, Col, Spinner, Tooltip, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
// import "font-awesome/css/font-awesome.css";

export default class Timeline extends Component {
  state = {
    age: this.props.age,
    ageChild: this.props.ageChild,
    kids: this.props.kids,
    kidsGap: this.props.kidsGap,
    childTooltip: false,
    dataArray: null,
  };
  componentDidMount = () => {
    var dataArray = [];
    var config = {
      apiKey: "AIzaSyA9GaHUYNs_pz0EfmrpQs1pEpQk5yoCHUQ",
      authDomain: "proactive-22741.firebaseapp.com",
      databaseURL: "https://proactive-22741.firebaseio.com",
      projectId: "proactive-22741",
      storageBucket: "proactive-22741.appspot.com",
      messagingSenderId: "711969593255",
      appId: "1:711969593255:web:3c97cc05a13f5fb1970882",
      measurementId: "G-ZZ0M8W4F87",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    var database = firebase.database();
    database
      .ref("120vpxQ7anrWokGOe6Pj56h9PqKqfnGRvU56UJgzD1-A/Sheet1")
      .on("value", (snapshot) => {
        var dataArray = snapshot.val();
        console.log(dataArray);
        this.setState({ dataArray });
      });

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

    return this.state.dataArray === null ? (
      <Spinner
        style={{
          width: "3rem",
          height: "3rem",
          position: "absolute",
          top: "50%",
          color: "black",
          display: "block",
          right: "50%",
        }}
      />
    ) : (
      <React.Fragment>
        <div
          className="py-5 pl-3 h-100"
          style={{
            backgroundColor: "#163948",
            width: "100%",
            overflow: "scroll",
          }}
        >
          <div className="text-center mb-5" style={{ color: "white" }}>
            <small>Hover on objects to learn more about the Timeline</small>
          </div>
          <Row style={{ minWidth: "max-content" }}>
            <div
              className="w-100"
              style={{ height: "2px", backgroundColor: "white " }}
            ></div>
            {age[0] > 19 ? (
              age.map((value, i) => (
                <Col
                  md="auto"
                  style={{
                    textAlign: "center",
                    paddingRight: "25px",
                    paddingLeftL: "25px",
                  }}
                >
                  {this.props.ageChild.includes(value) && (
                    <React.Fragment>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"child" + i}
                      >
                        Risk of miscarriage:{" "}
                        {this.state.dataArray[value].miscarriage * 100 + "%"}
                        <br></br>
                        Risk of Down Syndrome:{" "}
                        {this.state.dataArray[value].down_syndrome}
                      </UncontrolledTooltip>
                      <UncontrolledTooltip placement="top" target="percentage">
                        This number represents the % of women who are unable to
                        have a child at 28. You'll notice that this number
                        increases with age.
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
                          <label style={{ color: "white" }}>
                            {this.state.dataArray[value].p_women + "%"}
                          </label>
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
                                value === 47) &&
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
                      <div
                        style={{
                          marginTop: "-1.5rem",
                          marginRight: "-.5rem",
                          marginLeft: "-.5rem",
                        }}
                      >
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
                      <div
                        style={{
                          marginTop: "-1.5rem",
                          marginLeft: "-3.4rem",
                          marginRight: "-3.4rem",
                        }}
                      >
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
                  {value === 47 && (
                    <React.Fragment>
                      <div
                        style={{
                          marginTop: "-1.5rem",
                          marginLeft: "-2rem",
                          marginRight: "-2rem",
                        }}
                      >
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
                      <label style={{ color: "white" }}>47</label>
                    </React.Fragment>
                  )}
                </Col>
              ))
            ) : (
              <div className="mx-auto" style={{ color: "white" }}>
                <h6> Age should be greater than or equal to 20</h6>
              </div>
            )}
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
