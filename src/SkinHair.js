import React, { Component } from "react";
import methods from "./Methods.js";
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import Header from "./components/Header.js";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
export default class SkinHair extends Component {
  state = {
    activeFilters: [],
    valDataArray: null,
  };
  componentDidMount = () => {
    document.title = "Irregular Periods";
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
      .ref("19zz3FRFWWFg9QqE_q1S-mQmq0nU_flxLu5be9XxDqu8/Acne")
      .on("value", (snapshot) => {
        var dataArray = snapshot.val();
        console.log(dataArray);
        var valDataArray = Object.values(dataArray);
        console.log(valDataArray);
        this.setState({ valDataArray });
      });
  };
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };
  changeFilters = (filter) => {
    const changingFilters = this.state.activeFilters;
    if (changingFilters.includes(filter)) {
      var index = changingFilters.indexOf(filter);
      changingFilters.splice(index, 1);
    } else {
      changingFilters.push(filter);
    }
    this.setState({
      activeFilters: changingFilters,
    });
  };

  render() {
    var methodsArray = methods.methods;

    methodsArray.map((method) =>
      this.state.activeFilters.every((val) => method.filters.includes(val))
        ? (method.isShow = true)
        : (method.isShow = false)
    );
    console.log(methodsArray);
    const filterStatements = [
      "Best at preventing pregnancy",
      "Mistake proof",
      "Helps with periods",
      "Helps Prevent STIs",
      "No Doctor Required",
      "Less or No Hormones",
      "Doesn't reduce sexual pleasure",
      "Easy to keep private",
    ];
    return (
      <>
        {this.state.valDataArray === null ? (
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
          <div>
            <Header />
            <Container fluid>
              <div className="bc-tiles-wrapper mb-4">
                <div className="bc-tiles-intro-text w-75 mx-auto">
                  <h1 style={{ fontFamily: "montserrat" }}>
                    Hair & Skin Treatments
                  </h1>
                  <div className="d-block">
                    <p>
                      We know how stressful your life can become with acne,
                      unwanted hair-growth on your body, and hair loss. We want
                      to empower you with knowledge on how to manage these
                      issues. We want you to know your options, understand your
                      preferences, and help you customize treatments based on
                      your body type!
                    </p>
                    <p>
                      <strong>
                        Pick what concerns you the most and get to know the best
                        treatments for you!
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <Row className="justify-content-center text-center ">
                <Col md="2">
                  <Card className="skin-category">Acne</Card>
                </Col>
                <Col md="2">
                  <Card className="skin-category">Hirsutism</Card>
                </Col>
                <Col md="2">
                  <Card className="skin-category">Hair Loss</Card>
                </Col>
              </Row>

              <Row>
                {this.state.valDataArray.map((card) => (
                  <Col md="3" className="my-3 text-center">
                    <Card
                      className="shadow h-100"
                      style={{ border: "3px solid #163948" }}
                    >
                      <div
                        style={{
                          backgroundColor: "#bcd8df",
                          borderRadius: "14px",
                        }}
                      >
                        <small>{card.Top_Tag}</small>
                      </div>
                      <CardBody>
                        <div>
                          <h5>{card.Name}</h5>
                        </div>
                        <div>{card.Text_Small_Tile}</div>
                      </CardBody>
                      <Row>
                        {card.OTC && (
                          <Col
                            className="mx-2"
                            style={{
                              borderRadius: "14px",
                              backgroundColor: "#f3bd1a",
                            }}
                          >
                            OTC
                          </Col>
                        )}
                        {card.Prescription && (
                          <Col
                            className="mx-2"
                            style={{
                              borderRadius: "14px",
                              backgroundColor: "#e96266",
                            }}
                          >
                            Prescription
                          </Col>
                        )}
                        {card.Side_Effects && (
                          <Col
                            className="mx-2"
                            style={{
                              borderRadius: "14px",
                              backgroundColor: "#163948",
                            }}
                          >
                            Side Effects
                          </Col>
                        )}
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        )}
      </>
    );
  }
}
