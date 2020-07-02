import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faBoxTissue,
  faAngleRight,
  faAngleLeft,
  faEnvelope,
  faUserMd,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  fab,
  faFacebook,
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Select from "react-select";
import { causes } from "../Methods";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
import Header from "../components/Header";
import Share from "../components/Share";
import { fa } from "stopword";
// import { CSSTransition, CSSTransitionGroup } from "react-transition-group";
export default class IrregularPeriods extends Component {
  state = {
    q1: null,
    q1_1: null,
    q2: null,
    q3: null,
    icon: false,
    button: null,
    activeCauses: [],
    selectedOption: null,
    selectedOption2: null,
    selectedOption3: null,
    activeFilters: [],
    symptoms: 1,
    aBooked: false,
    selectedOption1: null,
    dataArray: null,
    toolTip: null,
  };
  componentDidMount() {
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
      .ref("1C4i191arLEtBQ5hByU8mufO3rDXgM3Fw5pdDZ9NRE58/Sheet1")
      .on("value", (snapshot) => {
        var dataArray = snapshot.val();
        console.log(dataArray);
        this.setState({ dataArray });
      });
  }

  handleQ1 = (q) => {
    this.setState({
      q1: this.state.q1 === q ? null : q,
      icon: this.state.q1 === q ? false : true,
    });
  };
  handleQ1_1 = (q) => {
    this.setState({
      q1_1: this.state.q1_1 === q ? null : q,
      icon: this.state.q1_1 === q ? false : true,
    });
  };
  handleQ2 = (q) => {
    this.setState({
      q2: this.state.q2 === q ? null : q,
      icon: this.state.q2 === q ? false : true,
    });
  };
  handleQ3 = (q) => {
    this.setState({
      q3: q,
      icon: true,
    });
  };
  handleSelect = (selectedOption) => {
    this.setState({});
    const activeFilters = this.state.activeFilters;
    if (activeFilters.includes("b1")) {
      var index = activeFilters.indexOf("b1");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("b2")) {
      var index = activeFilters.indexOf("b2");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("b3")) {
      var index = activeFilters.indexOf("b3");
      activeFilters.splice(index, 1);
    }

    if (selectedOption) activeFilters.push(selectedOption.value);

    this.setState({
      activeFilters,
      selectedOption,
      activeCauses: [],
    });
  };
  handleSelect2 = (selectedOption2) => {
    this.setState({
      selectedOption2,
    });
    const activeFilters = this.state.activeFilters;
    if (activeFilters.includes("h1")) {
      var index = activeFilters.indexOf("h1");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("h2")) {
      var index = activeFilters.indexOf("h2");
      activeFilters.splice(index, 1);
    }

    if (selectedOption2) activeFilters.push(selectedOption2.value);

    this.setState({
      activeFilters,
      activeCauses: [],
    });
  };
  handleSelect3 = (selectedOption3) => {
    this.setState({
      selectedOption3,
    });
    const activeFilters = this.state.activeFilters;
    if (activeFilters.includes("n1")) {
      var index = activeFilters.indexOf("n1");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("n2")) {
      var index = activeFilters.indexOf("n2");
      activeFilters.splice(index, 1);
    }
    if (selectedOption3) activeFilters.push(selectedOption3.value);

    this.setState({
      activeFilters,
      activeCauses: [],
    });
  };
  handleFilter = (f) => {
    const activeFilters = this.state.activeFilters;
    if (activeFilters.includes(f)) {
      var index = activeFilters.indexOf(f);
      activeFilters.splice(index, 1);
    } else {
      activeFilters.push(f);
    }
    this.setState({
      activeFilters,
      activeCauses: [],
    });
  };
  handleCauses = (array, cause) => {
    if (this.state.activeFilters.length !== 0) {
      var activeCauses = this.state.activeCauses;
      if (JSON.stringify(array) === JSON.stringify(["p"])) {
        if (this.state.activeFilters.includes("p")) {
          if (cause !== undefined && !activeCauses.includes(cause)) {
            activeCauses.push(cause);
            this.setState({
              activeCauses,
            });
          }
          return true;
        } else {
          return false;
        }
      } else {
        for (let i = 0; i < this.state.activeFilters.length; i++) {
          const element = this.state.activeFilters[i];
          if (array.includes(element)) {
            if (!activeCauses.includes(cause)) {
              activeCauses.push(cause);
              this.setState({
                activeCauses,
              });
            }
            return true;
          }
        }

        if (this.state.activeFilters.every((val) => array.includes(val))) {
          if (!activeCauses.includes(cause)) {
            activeCauses.push(cause);
            this.setState({
              activeCauses,
            });
          }
          return true;
        } else {
          return false;
        }
      }
    } else return false;
  };
  handleMultiSelect = async (selectedOption1) => {
    // var totalOptions = selectedOption1.concat(this.state.selectedOption1);
    await this.setState({
      selectedOption1,
    });
    var activeFilters = [];
    if (this.state.selectedOption1 !== null) {
      this.state.selectedOption1.forEach((element) => {
        activeFilters.push(element.value);
      });
    }
    await this.setState({
      activeFilters,
      activeCauses: [],
    });
  };
  handleImageSelect = async (option) => {
    var selectedOption1 = [];
    if (this.state.selectedOption1 !== null) {
      var selectedOption1 = this.state.selectedOption1;
      if (
        selectedOption1.every((element) => {
          if (element.value !== option[0].value) {
            return true;
          } else return false;
        })
      ) {
        selectedOption1.push(option[0]);
      }
    } else selectedOption1.push(option[0]);
    await this.setState({
      selectedOption1,
    });
    var activeFilters = [];
    if (this.state.selectedOption1 !== null) {
      this.state.selectedOption1.forEach((element) => {
        activeFilters.push(element.value);
      });
    }
    this.setState({
      activeFilters,
      activeCauses: [],
    });
  };
  render() {
    const options = [
      { value: "b1", label: "No Bleeding" },
      { value: "b2", label: "Heavy Bleeding" },
      {
        value: "b3",

        label: "Bleeding Between Periods",
      },
    ];
    const options2 = [
      { value: "h1", label: "Weight gain" },
      { value: "h2", label: "Weight loss" },
    ];
    const options3 = [
      { value: "n1", label: "Constipation" },
      { value: "n2", label: "Diarrhoea" },
    ];
    const symptomsOptions = [
      { value: "a", label: "Painful periods" },
      { value: "b1", label: "No Bleeding" },
      { value: "b2", label: "Heavy Bleeding" },
      {
        value: "b3",
        label: "Bleeding Between Periods",
      },
      { value: "c", label: "Abnormal vaginal discharge" },
      { value: "d", label: "Vaginal dryness" },
      { value: "e", label: "Painful sexual intercourse" },
      { value: "f", label: "Bleeding after sex" },
      { value: "g", label: "Acne" },
      { value: "h1", label: "Weight gain" },
      { value: "h2", label: "Weight loss" },
      { value: "i", label: "Hirsutism" },
      { value: "j", label: "Painful urination" },
      { value: "k", label: "Fever/chills" },
      { value: "l", label: "Hair loss" },
      { value: "m", label: "Dry skin" },
      { value: "n1", label: "Constipation" },
      { value: "n2", label: "Diarrhoea" },
      { value: "o", label: "Nipple discharge" },
      { value: "p", label: "Changes in mood" },
    ];

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
      <div>
        <Header />
        <Container fluid className="p-3 mt-5">
          <div className="bc-tiles-wrapper mb-4">
            <div className="bc-tiles-intro-text w-75 mx-auto">
              <h1
                className="header-all"
                style={{ fontFamily: "montserrat, sans-serif" }}
              >
                Irregular Periods
              </h1>
              <div className="d-block para-all">
                <p>
                  Studies show that at least 14% of all women struggle with some
                  degree of irregularity in their periods. Irregular periods may
                  be indicative of underlying conditions such as PCOS, thyroid,
                  excess prolactin, inflamed pelvic region, or ovary
                  dysfunction.
                </p>
                <p>
                  <strong>
                    We’re here to help you better understand your period.
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <Row className="">
            <Col>
              <Card className="text-center justify-content-center border-0 px-5 py-5">
                {/* <h2
                  style={{
                    fontFamily: "montserrat, sans-serif",
                    color: "#163948",
                    fontWeight: "bold",
                  }}
                >
                  Do you struggle with irregular periods?
                </h2> */}
                {/* <h5
                  className="mx-auto mt-3 para-all"
                  style={{ fontFamily: "lora", maxWidth: "800px" }}
                >
                  Studies show that at least 14% of all women struggle with some
                  degree of irregularity in their periods. While lifestyle
                  changes play a key role, there could be any number of
                  underlying causes. We’re here to help you better understand
                  your period.
                </h5> */}
                <Row>
                  <Col>
                    <Button
                      className="mt-3 py-3 question-button"
                      style={{
                        backgroundColor:
                          this.state.button === 1 ? "#163948" : "white",
                        color: this.state.button === 1 ? "white" : "#163948",
                        borderRadius: "35px",
                      }}
                      onClick={() => {
                        this.setState({
                          button: 1,
                        });
                      }}
                    >
                      Are my periods irregular?
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="mt-3 py-3 question-button"
                      style={{
                        backgroundColor:
                          this.state.button === 2 ? "#163948" : "white",
                        color: this.state.button === 2 ? "white" : "#163948",
                        borderRadius: "35px",
                      }}
                      onClick={() => {
                        this.setState({
                          button: 2,
                        });
                      }}
                    >
                      Why are my periods irregular?
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {this.state.button === 1 && (
            <div>
              <Card className="text-center mt-3 p-4 shadow border-0">
                <div className="px-5" style={{}}>
                  <h5 style={{ color: "#163948", fontWeight: "bold" }}>
                    The number of days between your period, duration of
                    bleeding, and persistence of irregularity, are key factors
                    that help a physician get to the root of your concerns.
                    <br></br>
                    <br></br>
                    Highlight the concerns you have about your period.
                  </h5>
                </div>
              </Card>
              <Row className="p-3 questions">
                <Col className="">
                  <Card
                    className="shadow p-3"
                    style={{ backgroundColor: "#BCD8DF" }}
                  >
                    <h6 className="sub-header-all">
                      How would you categorize the nature of your irregularity?
                      (Select all that apply)
                    </h6>
                    <Card
                      id={"1"}
                      className="mt-4 my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q1 === "1" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ1("1");
                      }}
                    >
                      <p>My periods are absent</p>
                    </Card>
                    <Card
                      id="2"
                      className="my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q1 === "2" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ1("2");
                      }}
                    >
                      <p>My periods are too far apart (cycle > 35 days)</p>
                    </Card>
                    <Card
                      id="3"
                      className="my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q1 === "3" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ1("3");
                      }}
                    >
                      <p>My periods are too close (cycle {"<"} 21 days)</p>
                    </Card>
                  </Card>
                  <Card
                    className="shadow p-3 mt-2"
                    style={{ backgroundColor: "#BCD8DF" }}
                  >
                    <h6 className="sub-header-all">Nature of flow?</h6>
                    <Card
                      id="4"
                      className="mt-4 my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q1_1 === "4" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ1_1("4");
                      }}
                    >
                      <p>Heavy flow (lasting > 7 days)</p>
                    </Card>
                    <Card
                      id="5"
                      className="my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q1_1 === "5" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ1_1("5");
                      }}
                    >
                      <p>Extremely light flow/ irregular spotting</p>
                    </Card>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="shadow p-3"
                    style={{ backgroundColor: "#BCD8DF", height: "100%" }}
                  >
                    <h6 className="sub-header-all">
                      How long have you observed irregularity in your periods?
                    </h6>
                    <Card
                      id={"a"}
                      className="mt-4 my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q2 === "a" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ2("a");
                      }}
                    >
                      <p>{"<"} 3 months</p>
                    </Card>
                    <Card
                      id="b"
                      className="my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q2 === "b" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ2("b");
                      }}
                    >
                      <p>3-6 months</p>
                    </Card>
                    <Card
                      id="c"
                      className="my-2 shadow question-sub"
                      style={{
                        backgroundColor:
                          this.state.q2 === "c" ? "#0d8dad" : "white",
                        color: "#163948",
                      }}
                      onClick={() => {
                        this.handleQ2("c");
                      }}
                    >
                      <p>> 6 months</p>
                    </Card>
                  </Card>
                  {/* <Card
                className="shadow p-3 mt-2"
                style={{ backgroundColor: "#BCD8DF" }}
              >
                <h6>This irregularity has been :</h6>
                <Card
                  id="x"
                  className="mt-4 my-2 shadow question-sub"
                  style={{
                    backgroundColor:
                      this.state.q3 === "x" ? "#0d8dad" : "white",
                    color: "#163948",
                  }}
                  onClick={() => {
                    this.handleQ3("x");
                  }}
                >
                  <p>Persistent</p>
                </Card>
                <Card
                  id="y"
                  className="my-2 shadow question-sub"
                  style={{
                    backgroundColor:
                      this.state.q3 === "y" ? "#0d8dad" : "white",
                    color: "#163948",
                  }}
                  onClick={() => {
                    this.handleQ3("y");
                  }}
                >
                  <p>On and off</p>
                </Card>
              </Card>
            */}
                </Col>
                <Col>
                  <Card
                    className="shadow p-3"
                    style={{ height: "100%", backgroundColor: "#DDADA6" }}
                  >
                    <h6 className="text-center mx-4 sub-header-all">
                      Irregularity in periods may manifest in many different
                      types and be caused by any number of factors.
                    </h6>
                    <div className="m-5">
                      <div className="d-flex">
                        <FontAwesomeIcon
                          className="mt-1"
                          style={{ display: this.state.q1 ? "block" : "none" }}
                          icon={faAngleDoubleRight}
                        />
                        <h5 className="my-auto pl-2">
                          {this.state.q1 === "1"
                            ? "Amenorrhea"
                            : this.state.q1 === "2"
                            ? "Oligomenorrhoea"
                            : this.state.q1 === "3"
                            ? "Polymenorrhoea"
                            : null}
                        </h5>
                      </div>
                      <div className="d-flex">
                        <FontAwesomeIcon
                          className="mt-1"
                          style={{
                            display: this.state.q1_1 ? "block" : "none",
                          }}
                          icon={faAngleDoubleRight}
                        />
                        <h5 className="my-auto pl-2">
                          {this.state.q1_1 === "4"
                            ? "Menorrhagia"
                            : this.state.q1_1 === "5"
                            ? "Hypomenorrhoea"
                            : null}
                        </h5>
                      </div>
                      <div className="d-flex">
                        <FontAwesomeIcon
                          className="mt-1"
                          style={{ display: this.state.q2 ? "block" : "none" }}
                          icon={faAngleDoubleRight}
                        />
                        <h5 className="my-auto pl-2">
                          {this.state.q2 === "a"
                            ? "If you experience irregularity in periods for fewer than 3 cycles, and are otherwise regular, lifestyle changes, increased stress, or an infection could all be potential causes for concern."
                            : this.state.q2 === "b"
                            ? " Irregularity in periods lasting greater than 3 months could have multiple underlying causes."
                            : this.state.q2 === "c"
                            ? " Irregularity in periods lasting greater than 3 months could have multiple underlying causes."
                            : null}
                        </h5>
                      </div>
                    </div>
                    <Button
                      style={{
                        color: "#163948",
                        borderColor: "#163948",
                        background: "bottom",
                        fontWeight: "bold",
                        position: "absolute",
                        bottom: "30px",
                        width: "90%",
                      }}
                      className="mx-auto"
                      onClick={() => {
                        this.setState({
                          button: 2,
                        });
                      }}
                    >
                      Explore More
                    </Button>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          {this.state.button === 2 && (
            <div>
              <Card className="text-center mt-3 p-4 shadow border-0">
                <div className="px-5" style={{}}>
                  <h5 style={{ color: "#163948", fontWeight: "bold" }}>
                    Irregular periods could be due to any number of underlying
                    causes. Often, the symptoms you experience can go a long way
                    in identifying the underlying cause of your irregular
                    periods.
                    <br></br>
                    <br></br>
                    Highlight the symptoms you might be experiencing.
                  </h5>
                </div>
              </Card>
              <Row>
                <Col className="text-center">
                  {/* <div>
                    <div style={{ lineHeight: 0, display: "flex" }}>
                      <UncontrolledTooltip
                        placement="right"
                        target="B1"
                        autohide={false}
                      >
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "k", label: "Fever/Chills" },
                            ])
                          }
                        >
                          Fever/Chills
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "p", label: "Changes in mood" },
                            ])
                          }
                        >
                          Changes in mood
                        </Card>
                      </UncontrolledTooltip>
                      <img src={require("../download/bodyModel/B1a.png")}></img>
                      <div style={{ display: "grid" }}>
                        <img
                          id="B1"
                          src={require("../download/bodyModel/B1b1.png")}
                        ></img>
                        <img
                          src={require("../download/bodyModel/B1b2.png")}
                        ></img>
                      </div>
                      <img src={require("../download/bodyModel/B1c.png")}></img>
                    </div>
                    <div style={{ lineHeight: 0, display: "flex" }}>
                      <UncontrolledTooltip
                        placement="right"
                        target="B2"
                        autohide={false}
                      >
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "g", label: "Acne" },
                            ])
                          }
                        >
                          Acne
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "i", label: "Hirsutism" },
                            ])
                          }
                        >
                          Hirsutism
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "m", label: "Dry skin" },
                            ])
                          }
                        >
                          Dry skin
                        </Card>
                      </UncontrolledTooltip>
                      <img src={require("../download/bodyModel/B2a.png")}></img>
                      <img
                        id="B2"
                        src={require("../download/bodyModel/B2b.png")}
                      ></img>
                      <img src={require("../download/bodyModel/B2c.png")}></img>
                    </div>
                    <div style={{ lineHeight: 0, display: "flex" }}>
                      <UncontrolledTooltip
                        placement="right"
                        target="B3"
                        autohide={false}
                      >
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "l", label: "Hair loss" },
                            ])
                          }
                        >
                          Hair loss/ thinning
                        </Card>
                      </UncontrolledTooltip>
                      <img src={require("../download/bodyModel/B3a.png")}></img>
                      <img
                        id="B3"
                        src={require("../download/bodyModel/B3b.png")}
                      ></img>
                      <img src={require("../download/bodyModel/B3c.png")}></img>
                    </div>
                    <div style={{ lineHeight: 0, display: "flex" }}>
                      <UncontrolledTooltip
                        placement="right"
                        target="B4"
                        autohide={false}
                      >
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "o", label: "Nipple discharge" },
                            ])
                          }
                        >
                          Nipple discharge
                        </Card>
                      </UncontrolledTooltip>
                      <img src={require("../download/bodyModel/B4a.png")}></img>
                      <div style={{ display: "grid" }}>
                        <img
                          src={require("../download/bodyModel/B4b1.png")}
                        ></img>
                        <img
                          id="B4"
                          src={require("../download/bodyModel/B4b2.png")}
                        ></img>
                      </div>
                      <img src={require("../download/bodyModel/B4c.png")}></img>
                    </div>
                    <div style={{ lineHeight: 0, display: "flex" }}>
                      <UncontrolledTooltip
                        placement="right"
                        target="B5"
                        autohide={false}
                      >
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "n1", label: "Constipation" },
                            ])
                          }
                        >
                          Constipation
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "n2", label: "Diarrhoea" },
                            ])
                          }
                        >
                          Diarrhoea
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "h2", label: "Weight gain" },
                            ])
                          }
                        >
                          Weight gain
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "h2", label: "Weight loss" },
                            ])
                          }
                        >
                          Weight loss
                        </Card>
                      </UncontrolledTooltip>
                      <img src={require("../download/bodyModel/B5a.png")}></img>
                      <div style={{ display: "grid" }}>
                        <img
                          src={require("../download/bodyModel/B5b1.png")}
                        ></img>
                        <img
                          id="B5"
                          src={require("../download/bodyModel/B5b2.png")}
                        ></img>
                        <img
                          src={require("../download/bodyModel/B5b3.png")}
                        ></img>
                      </div>
                      <img src={require("../download/bodyModel/B5c.png")}></img>
                    </div>
                    <div style={{ lineHeight: 0, display: "flex" }}>
                      <UncontrolledTooltip
                        placement="right"
                        target="B6"
                        autohide={false}
                      >
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "1", label: "Painful periods" },
                            ])
                          }
                        >
                          Painful periods
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "d", label: "Vaginal dryness" },
                            ])
                          }
                        >
                          Vaginal dryness
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              {
                                value: "e",
                                label: "Painful sexual intercourse",
                              },
                            ])
                          }
                        >
                          Painful sexual intercourse
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "f", label: "Bleeding after sex" },
                            ])
                          }
                        >
                          Bleeding after sex
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              {
                                value: "c",
                                label: "Abnormal vaginal discharge",
                              },
                            ])
                          }
                        >
                          Abnormal vaginal discharge
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "j", label: "Painful urination" },
                            ])
                          }
                        >
                          Painful urination
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "b2", label: "Heavy Bleeding" },
                            ])
                          }
                        >
                          Heavy Bleeding
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              { value: "b1", label: "No Bleeding" },
                            ])
                          }
                        >
                          No Bleeding
                        </Card>
                        <Card
                          style={{ color: "black" }}
                          onClick={() =>
                            this.handleImageSelect([
                              {
                                value: "b3",
                                label: "Bleeding Between Periods",
                              },
                            ])
                          }
                        >
                          Bleeding Between Periods
                        </Card>
                      </UncontrolledTooltip>
                      <img src={require("../download/bodyModel/B6a.png")}></img>
                      <img
                        id="B6"
                        src={require("../download/bodyModel/B6b.png")}
                      ></img>
                      <img src={require("../download/bodyModel/B6c.png")}></img>
                    </div>
                    <div style={{ lineHeight: 0 }}>
                      <img src={require("../download/bodyModel/B7.png")}></img>
                    </div>
                  </div>
                 */}
                  <div className="mt-3">
                    <Tooltip
                      isOpen={this.state.toolTip === 1 ? true : false}
                      placement="right"
                      target="B1"
                      onClick={() => {
                        this.setState({ toolTip: null });
                      }}
                      autohide={false}
                    >
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "k", label: "Fever/Chills" },
                          ])
                        }
                      >
                        Fever/Chills
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "p", label: "Changes in mood" },
                          ])
                        }
                      >
                        Changes in mood
                      </Card>
                    </Tooltip>
                    <Tooltip
                      isOpen={this.state.toolTip === 2 ? true : false}
                      placement="right"
                      target="B2"
                      onClick={() => {
                        this.setState({ toolTip: null });
                      }}
                      autohide={false}
                    >
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "g", label: "Acne" },
                          ])
                        }
                      >
                        Acne
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "i", label: "Hirsutism" },
                          ])
                        }
                      >
                        Hirsutism
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "m", label: "Dry skin" },
                          ])
                        }
                      >
                        Dry skin
                      </Card>
                    </Tooltip>
                    <Tooltip
                      isOpen={this.state.toolTip === 3 ? true : false}
                      placement="right"
                      target="B3"
                      onClick={() => {
                        this.setState({ toolTip: null });
                      }}
                      autohide={false}
                    >
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "l", label: "Hair loss" },
                          ])
                        }
                      >
                        Hair loss/ thinning
                      </Card>
                    </Tooltip>
                    <Tooltip
                      isOpen={this.state.toolTip === 4 ? true : false}
                      placement="right"
                      target="B4"
                      onClick={() => {
                        this.setState({ toolTip: null });
                      }}
                      autohide={false}
                    >
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "o", label: "Nipple discharge" },
                          ])
                        }
                      >
                        Nipple discharge
                      </Card>
                    </Tooltip>
                    <Tooltip
                      isOpen={this.state.toolTip === 5 ? true : false}
                      placement="right"
                      target="B5"
                      onClick={() => {
                        this.setState({ toolTip: null });
                      }}
                      autohide={false}
                    >
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "n1", label: "Constipation" },
                          ])
                        }
                      >
                        Constipation
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "n2", label: "Diarrhoea" },
                          ])
                        }
                      >
                        Diarrhoea
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "h1", label: "Weight gain" },
                          ])
                        }
                      >
                        Weight gain
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "h2", label: "Weight loss" },
                          ])
                        }
                      >
                        Weight loss
                      </Card>
                    </Tooltip>
                    <Tooltip
                      isOpen={this.state.toolTip === 6 ? true : false}
                      placement="right"
                      target="B6"
                      onClick={() => {
                        this.setState({ toolTip: null });
                      }}
                      autohide={false}
                    >
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "a", label: "Painful periods" },
                          ])
                        }
                      >
                        Painful periods
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "d", label: "Vaginal dryness" },
                          ])
                        }
                      >
                        Vaginal dryness
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            {
                              value: "e",
                              label: "Painful sexual intercourse",
                            },
                          ])
                        }
                      >
                        Painful sexual intercourse
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "f", label: "Bleeding after sex" },
                          ])
                        }
                      >
                        Bleeding after sex
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            {
                              value: "c",
                              label: "Abnormal vaginal discharge",
                            },
                          ])
                        }
                      >
                        Abnormal vaginal discharge
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "j", label: "Painful urination" },
                          ])
                        }
                      >
                        Painful urination
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "b2", label: "Heavy Bleeding" },
                          ])
                        }
                      >
                        Heavy Bleeding
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            { value: "b1", label: "No Bleeding" },
                          ])
                        }
                      >
                        No Bleeding
                      </Card>
                      <Card
                        style={{ color: "black" }}
                        onClick={() =>
                          this.handleImageSelect([
                            {
                              value: "b3",
                              label: "Bleeding Between Periods",
                            },
                          ])
                        }
                      >
                        Bleeding Between Periods
                      </Card>
                    </Tooltip>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 126.25 250.46"
                      style={{ height: "500px" }}
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 2 ? 2 : null,
                              });
                            }}
                            id="B2"
                            class="cls-1 cls-imp"
                            d="M58.46,6.22a18.47,18.47,0,0,0-6,9.78,15.68,15.68,0,0,0,.66,9.45,10.92,10.92,0,0,0,2.45,3.86,10.27,10.27,0,0,0,6.31,3.16c3.57.21,7.2-2.2,9.06-6a25.82,25.82,0,0,0,1.5-5.94c.33-2.59.62-4.84-.36-7.47A10.83,10.83,0,0,0,68.3,7.91C64.23,5,59.26,6,58.46,6.22Z"
                          />
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 1 ? 1 : null,
                              });
                            }}
                            id="B1"
                            class="cls-2 cls-imp"
                            d="M72.68,14.86A10.76,10.76,0,0,0,66.43,3.65a11.62,11.62,0,0,0-7.29-.16,11.71,11.71,0,0,0-1.74.65c-1.44,1-6.07,4.59-6.66,10.25a11.62,11.62,0,0,0,.12,3.27l20.91,0A9.12,9.12,0,0,0,72.68,14.86Z"
                          />
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 3 ? 3 : null,
                              });
                            }}
                            id="B3"
                            class="cls-1 cls-imp"
                            d="M75.79,35.08a9,9,0,0,1-.07,5.7.8.8,0,0,1-.39.46c-1,.43-3.21-2-4.36-3.68a15.19,15.19,0,0,1-2.58-7.39.22.22,0,0,0,0-.08V30a13.52,13.52,0,0,0,2.1-2.8,13,13,0,0,0,1.45-4.15c1.12-5.84,1.68-8.77,1-11.25-.15-.58-1.64-5.9-5.79-7.88a6.42,6.42,0,0,0-3.37-1c-1.37.1-2.54.85-3.73.28a2.38,2.38,0,0,1-.62-.43,1.53,1.53,0,0,1,.11-1.28C60.17.28,63.9,0,66.43.48c6.24,1.24,9.51,8.16,9.72,8.62C80.65,19,73.73,29.15,75.79,35.08Z"
                          />
                          <path
                            class="cls-3"
                            d="M41.39,56.2c.33,1.3.61,2.61.87,3.87v0"
                          />
                          <path
                            class="cls-3"
                            d="M46.05,200.52s2.46,2.22-1,8.44"
                          />
                          <path
                            class="cls-3"
                            d="M80.88,200.52s-2.18,4.89,3.56,7.55"
                          />
                          <path
                            class="cls-2"
                            d="M44.37,235.15a7.57,7.57,0,0,0,.41-3,16.31,16.31,0,0,0-.29-1.7,9.86,9.86,0,0,1-.16-1.64H36.38l0,.49a4.59,4.59,0,0,1-.11,1,10.24,10.24,0,0,1-.58,1.47,4.94,4.94,0,0,0-.1,2.38,3.54,3.54,0,0,1,.1,1.52,2.39,2.39,0,0,1-.3.76,26.81,26.81,0,0,0-1.38,4.2,27.68,27.68,0,0,1-1.26,3.25c-.56,1.21-1.37,2.69-1,3.75.06.2.18.63.55.75a.83.83,0,0,0,.66-.06.59.59,0,0,0,.23-.2,1.15,1.15,0,0,0,0,.24.61.61,0,0,1,.05.12,1.05,1.05,0,0,0,.42.52.83.83,0,0,0,1.11-.09,1.13,1.13,0,0,0,.16-.21,1.07,1.07,0,0,0,0,.41c.07.27.29.56.9.56s.76-.3.78-.58h0l0-.23,0,.19a1.68,1.68,0,0,0,.28.63,1.15,1.15,0,0,0,1.31.3c.67-.19.82-1.07.85-1.61,0,0,0-.11,0-.11a9,9,0,0,0,.28.94,3.61,3.61,0,0,0,.19.39,1.6,1.6,0,0,0,.54.41,2.39,2.39,0,0,0,2.13-.3s1-.6,1.47-2.83a6.36,6.36,0,0,0,.09-.73c0-.11,0-.22,0-.31,0-.35,0-.83-.06-1.4a33,33,0,0,1,0-4.13A50.34,50.34,0,0,1,44.37,235.15Z"
                          />
                          <path
                            class="cls-2"
                            d="M34.77,249a1.29,1.29,0,0,1-1.29-.06,1.08,1.08,0,0,1-.32-.38l.05-.13a1.05,1.05,0,0,0,.42.52.83.83,0,0,0,1.11-.09Z"
                          />
                          <path
                            class="cls-2"
                            d="M36.54,248.67a.25.25,0,0,0,0-.08h0Z"
                          />
                          <path
                            class="cls-2"
                            d="M99.56,242.83a27.35,27.35,0,0,1-1.47-3.17,27.65,27.65,0,0,0-1.65-4.11,2.57,2.57,0,0,1-.35-.73,1.69,1.69,0,0,1-.09-.46v0a6.79,6.79,0,0,1,.09-1.06c0-.12,0-.28,0-.47v-.13a4.23,4.23,0,0,0-.3-1.76,11.68,11.68,0,0,1-.67-1.44,4.24,4.24,0,0,1-.14-.67H87v.24a10.34,10.34,0,0,1-.06,1.08,16.24,16.24,0,0,0-.18,1.71V232a7.48,7.48,0,0,0,.6,2.84c.5,2,.8,3.75,1,5.07a35.42,35.42,0,0,1,.29,4.12c0,.46,0,.86,0,1.18,0,.08,0,.16,0,.23s0,.19,0,.3a6.72,6.72,0,0,0,.15.73,6.27,6.27,0,0,0,.84,1.92.61.61,0,0,0,0,.06,2.48,2.48,0,0,0,.76.76,2.22,2.22,0,0,0,2.15.18,1.41,1.41,0,0,0,.48-.36l0,0,0-.06.09-.1h0a3.27,3.27,0,0,0,.14-.34,1.29,1.29,0,0,0,0-.19,1.63,1.63,0,0,0,.06-.45,1.18,1.18,0,0,0,0-.26,1.6,1.6,0,0,1,.09.41,1.34,1.34,0,0,0,0-.2,2.47,2.47,0,0,0,.49,1.32,1.38,1.38,0,0,0,.24.14,1.27,1.27,0,0,0,1,.07,1,1,0,0,0,.37-.23.23.23,0,0,0,.07-.07.27.27,0,0,0,.07-.08h0s0,0,0,0a1.09,1.09,0,0,0,0-.14s0,0,0,0l.06-.17a3.51,3.51,0,0,0,.08-.42s0-.11,0-.17a1.69,1.69,0,0,0,0-.23c0-.08,0-.17,0-.27s0,0,0,0a2.48,2.48,0,0,1,.11.57.66.66,0,0,1,0-.09c0,.09,0,.17,0,.25a.91.91,0,0,1,0,.17s0,0,0,0,0,0,0,0v.11a.53.53,0,0,0,.38.39h0a1.27,1.27,0,0,0,.58,0,1,1,0,0,0,.5-.36l0-.06a.35.35,0,0,1,.06-.09l0-.11h0a1.05,1.05,0,0,0,0-.35l.08.1s0,0,0,0a2.8,2.8,0,0,0,0-.7,1.13,1.13,0,0,0,0-.32h0a.28.28,0,0,0,0-.09.3.3,0,0,1,0,.1,2.89,2.89,0,0,1,.12.92v.05s0,0,0,0a0,0,0,0,1,0,0s0,0,0,0a.75.75,0,0,1,0,.15.73.73,0,0,0,.23.13,1.19,1.19,0,0,0,.89-.23.79.79,0,0,0,.2-.21.56.56,0,0,0,0-.08l.05-.1a.42.42,0,0,0,0-.1v0s0,0,0,0h0v-.18a4,4,0,0,0,0-.49c0-.12,0-.24,0-.35h0a1.5,1.5,0,0,0-.07-.32h0l0-.08a4.3,4.3,0,0,1,.12.66s0,.05,0,.08a2.82,2.82,0,0,1,0,.59c.15.11.37.12.72,0l.14-.08a1.21,1.21,0,0,0,.37-.69,1.09,1.09,0,0,0,0-.26.06.06,0,0,0,0,0h0C100.92,245.19,100.13,243.9,99.56,242.83Zm-6,4.59c0,.12,0,.23,0,.33C93.59,247.56,93.59,247.42,93.59,247.42Z"
                          />
                          <path
                            class="cls-4"
                            d="M69.74,42.44c-2.89-.31-3.09.29-7.76.26a97.74,97.74,0,0,1-13.25-1l-.08-.13c1-.53,5.09-3,6.29-7.67a10.65,10.65,0,0,0,0-5.23l.36.41h0a9.1,9.1,0,0,0,2.79,2.33,9.41,9.41,0,0,0,2.48.92l.29.07.15,0c.22,0,.45.08.68.11a2.34,2.34,0,0,0,.38,0h.25a7,7,0,0,0,1.76-.14h.1l.1,0,.21,0,.12,0,.31-.09a1.17,1.17,0,0,0,.2-.06,10.38,10.38,0,0,0,1.53-.57,9.36,9.36,0,0,0,1.79-1.14,14.12,14.12,0,0,0,1.43,4.81,18.71,18.71,0,0,0,1,1.64c1.68,2.72,2.61,3.51,3.26,3.91a3.64,3.64,0,0,0,1.53.62,7.83,7.83,0,0,1,1,.08c.56.11,1.18.36,1.16.51s-.37.14-.58.15C75.75,42.32,71,42.41,69.74,42.44Z"
                          />
                          <path
                            class="cls-4"
                            d="M54.91,28.6h0a.7.7,0,0,1,.06.09l0,0,.3.41-.36-.41a.84.84,0,0,1,0-.1Z"
                          />
                          <path
                            class="cls-4"
                            d="M61.69,32.56c-.23,0-.46-.06-.68-.11Z"
                          />
                          <path
                            class="cls-4"
                            d="M62.32,32.6h.59a11.39,11.39,0,0,0,1.52-.2l.13,0,.36-.08-.31.09-.12,0-.21,0-.1,0h-.1A7,7,0,0,1,62.32,32.6Z"
                          />
                          <polyline
                            class="cls-3"
                            points="91.58 63.06 33.88 63.06 33.78 63.06 33.77 63.06"
                          />
                          <path
                            class="cls-2"
                            d="M88.14,114.49c-.09.19-.62.15-.66.15-.21,0-1.23,0-5.23,2.37-2.62,1.57-4.29,2.8-4.29,2.8a112.48,112.48,0,0,0-9.75,8.24,6.35,6.35,0,0,0-1.92-5.81,6.51,6.51,0,0,0-3.93-1.46,6.78,6.78,0,0,0-4.71,1.76A6.16,6.16,0,0,0,56,128.05,49.39,49.39,0,0,0,45.85,119a50.9,50.9,0,0,0-8.14-4.5l1.41-8.35,0-.1H86.91c.38,2.26.66,4.08.83,5.2l0,.21h0c0,.17,0,.32.06.44a1.28,1.28,0,0,1,0,.17c0,.16,0,.3.05.43,0,.29,0,.35,0,.59s0,.29,0,.37a.89.89,0,0,0,0,.18c0,.12,0,.15,0,.23s0,.13,0,.29C88.14,114.45,88.15,114.45,88.14,114.49Z"
                          />
                          <polyline
                            class="cls-3"
                            points="33.81 63.24 33.88 63.06 34.14 62.47"
                          />
                          <path
                            class="cls-2"
                            d="M39.23,172.94c0,.16,0,.32,0,.48.89-.46,10.82-5.33,17.05,1.63v0h0c0-.17.05-.34.07-.51a116.58,116.58,0,0,0,.81-11.9c.07-4.14.11-6.81.48-10.58.49-4.9,1.35-9.91,1.35-9.91l.09-.49q.59-3.49,1.08-6.95a6.41,6.41,0,0,1-1.34-.87,7.09,7.09,0,0,1-2-2.92,10.67,10.67,0,0,1-.86-3.68c-1.1-1.29-2.29-2.56-3.59-3.82l-.3-.29-.07-.06-.24-.23-.64-.58c-.93-.83-1.94-1.67-3-2.49-.45-.35-.91-.68-1.39-1l-.86-.6c-.54-.37-1.08-.71-1.62-1l-1.05-.64h0l-1-.59c-.92-.51-1.81-1-2.66-1.39l-.81-.38s0,0,0,0l-.89-.4a1.55,1.55,0,0,0,0,.21c-.27,1.82-.55,3.85-.86,6.11a98.59,98.59,0,0,0,1.36,32.9S39.31,163.69,39.23,172.94Z"
                          />
                          <path
                            class="cls-2 "
                            d="M67.5,147.88c.2.75.42,1.64.68,2.79.15.67.3,1.4.47,2.3.5,2.63.81,5,1,6.9s.3,3.27.34,3.91c0,0,.44,7.65,1.31,12.4l.09.44,0,0q0-.19-.09-.42l.47-.61a12.12,12.12,0,0,1,1.82-1.83l.45-.34.41-.28a11.52,11.52,0,0,1,1.24-.67l.41-.18h0l.42-.15A3,3,0,0,1,77,172l.43-.13a2,2,0,0,1,.26-.06h0l.24-.06q.58-.13,1.17-.21l.43,0,.22,0,.26,0a19.44,19.44,0,0,1,8.41,1.67V173c0-2.27,0-4.86.15-8.29.14-4.59.51-7.3.6-14.5,0-1.67,0-1.25,0-4,.07-8.65.29-11,.25-15,0-3.39-.28-6.08-.75-11.46-.23-2.55-.44-4.66-.6-6.1a5.84,5.84,0,0,0-1.11.12,5.7,5.7,0,0,0-1.54.57c-2.81,1.47-3.66,2-3.66,2-1.27.81-2.56,1.68-3.87,2.63a84.68,84.68,0,0,0-9.75,8.23,11.23,11.23,0,0,1-3.42,7.47,64.68,64.68,0,0,0,1.38,8.13c.25.93.5,1.86.74,2.79C67.12,146.41,67.29,147,67.5,147.88Z"
                          />
                          <path
                            class="cls-2"
                            d="M52.5,192.86a1.21,1.21,0,0,0,0,.19A16.78,16.78,0,0,1,40.05,191l-.22-.14-.2-.13-.14-.09-.61-.43c-.4-.29-.8-.61-1.19-1s-.52-.46-.77-.7l-.35-.34c-1.59,7.53-1,19.21-1,19.21a193.38,193.38,0,0,1,.62,21.37v.14h8a17.68,17.68,0,0,1,.1-1.82s.31-3.79,3.18-12.17A62.24,62.24,0,0,0,51,203.14a61.35,61.35,0,0,0,1.52-10.28Z"
                          />
                          <path
                            class="cls-2"
                            d="M94.75,228.83c0-.42-.07-.81-.08-.84-.12-1.52-.25-21.61-.25-21.61,0-7.39-.07-11.09-1.2-15.44-.31-1.19-.61-2.14-.91-3a.14.14,0,0,0,0-.06A16.87,16.87,0,0,1,76.05,193c0-.07,0-.15,0-.22h0l0,.33a62,62,0,0,0,2.18,10.12,62.56,62.56,0,0,0,4.36,11.55c3.39,8.19,4,12,4,12a19.7,19.7,0,0,1,.24,2.14v0h8S94.75,228.85,94.75,228.83Z"
                          />
                          <line
                            class="cls-5"
                            x1="41.09"
                            y1="33.14"
                            x2="41.08"
                            y2="33.14"
                          />
                          <line
                            class="cls-3"
                            x1="80.56"
                            y1="34.54"
                            x2="80.55"
                            y2="34.54"
                          />
                          <path
                            class="cls-2"
                            d="M56.26,175a19.54,19.54,0,0,1-.71,3.12l-.38,1.09a10.91,10.91,0,0,1-1,2,9.59,9.59,0,0,1-.65.91c-1.51,1.93-1.11,7-1,9.2,0,.67,0,1.31,0,1.95a16.87,16.87,0,0,1-16-4.9,18.28,18.28,0,0,1,1.24-4c1-2.1,1.4-6.3,1.48-11C40.07,172.91,50,168,56.26,175Z"
                          />
                          <path
                            class="cls-2"
                            d="M92.31,188A16.9,16.9,0,0,1,76,193.21c0-.57-.08-1.13-.1-1.72-.07-2.19,0-7.27-1.63-9.12a11.69,11.69,0,0,1-1.87-2.77,10.63,10.63,0,0,1-.44-1.06,17.57,17.57,0,0,1-.61-2.42l.47-.61c5.37-6.69,13.89-3.75,16.65-2.54a34.13,34.13,0,0,0,.74,6.42C90.15,183.75,91.19,184.9,92.31,188Z"
                          />
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 6 ? 6 : null,
                              });
                            }}
                            id="B6"
                            class="cls-2 cls-imp"
                            d="M55.87,127A6.12,6.12,0,0,1,58,122.15a6.56,6.56,0,0,1,3.69-1.37,7,7,0,0,1,4.82,1.66,5.84,5.84,0,0,1,1.82,4.17,9.55,9.55,0,0,1-.16,1.59,14.11,14.11,0,0,1-.9,3.68c-.11.24-.21.46-.32.66a9.8,9.8,0,0,1-.81,1.33,5.16,5.16,0,0,1-1.69,1.83,4,4,0,0,1-2,.45,4.9,4.9,0,0,1-1.86-.37,5.81,5.81,0,0,1-1.78-1.13,8.2,8.2,0,0,1-1.1-1.21h0a10,10,0,0,1-1.41-3.18c0-.24-.11-.5-.11-.5-.05-.24-.1-.5-.14-.76A14.77,14.77,0,0,1,55.87,127Z"
                          />
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 5 ? 5 : null,
                              });
                            }}
                            id="B5"
                            class="cls-2 cls-imp"
                            d="M86.91,106H39.14a26.65,26.65,0,0,1,1.79-6.33l1.76-3.25.75-1.67c.15-.33.22-.49.29-.67a12.69,12.69,0,0,0,.92-5v-.38c0-1.3-.14-2.61-.28-3.94-.06-.66-.12-1.12-.2-1.6,0,0,0-.08,0-.12H81.43c0,.45,0,1,0,1.55,0,.22,0,.45,0,.69s0,.36,0,.56v.39c0,.79,0,1.7,0,2.72,0,.49,0,.92,0,1.32a9.1,9.1,0,0,0,.45,2.93,19,19,0,0,0,1.54,3,48.22,48.22,0,0,1,2.14,4.71A26.24,26.24,0,0,1,86.91,106Z"
                          />
                          <path
                            class="cls-4"
                            d="M37.12,45l-.12.08-.11.07.1-.07A.57.57,0,0,1,37.12,45Z"
                          />
                          <path
                            class="cls-4"
                            d="M42.67,64.73c0,.25,0,.49,0,.74h0a0,0,0,0,1,0,0,8.61,8.61,0,0,0-.21,1.08h0s0,0,0,0,0,.1,0,.1a59.83,59.83,0,0,0-1.08-7.85v0c0-.07,0-.14,0-.21-.21-1-.4-1.62-.61-2.38a35.45,35.45,0,0,0-2.19-6.34,22.14,22.14,0,0,0-2.51-4h0l0,0h0s0,0,0,0l0,0a7.36,7.36,0,0,1,.79-.69A63.47,63.47,0,0,1,42,58.36c0,.11.06.27.11.46a13.46,13.46,0,0,1,.27,1.87C42.59,63,42.68,64.19,42.67,64.73Z"
                          />
                          <path
                            class="cls-4"
                            d="M49.05,42.83s0,0,0,0l-.15,0Z"
                          />
                          <path
                            class="cls-4"
                            d="M66.24,69.18H58.53c0-.13.06-.3.09-.48l7.43,0h.07C66.16,68.85,66.2,69,66.24,69.18Z"
                          />
                          <path
                            class="cls-4"
                            d="M75.85,42.92l-.34-.11-.06,0h.06Z"
                          />
                          <path
                            class="cls-4"
                            d="M88,45.26c-.78,1.72-1.55,3.58-2.28,5.57-.14.39-.28.77-.41,1.15-.24.7-.47,1.38-.68,2.05-.56,1.77-1,3.46-1.43,5.06A21.19,21.19,0,0,0,82.54,62c-.05.27-.07.5-.1.81s0,.45-.07.77c0,.15,0,.32-.06.51,0,.4-.08.76-.12,1.07,0,.15,0,.28-.06.4l0,.26a1.38,1.38,0,0,0-.06-.26c0-.16,0-.3,0-.45h0a2.09,2.09,0,0,1,0-.25c0-.07,0-.14,0-.21,0-.53.09-1.7.27-4a11.82,11.82,0,0,1,.27-1.86c0-.2.09-.36.11-.47a63.36,63.36,0,0,1,5.18-13.09A.78.78,0,0,1,88,45.26Z"
                          />
                          <path
                            class="cls-4"
                            d="M83.27,58.37c0,.19-.1.4-.15.61,0-.17.07-.33.12-.49a.43.43,0,0,1,0-.12Z"
                          />
                          <path
                            class="cls-4"
                            d="M84,55.82l-.48,1.64v0l-.27.89c.11-.41.22-.8.32-1.15v0C83.75,56.66,83.9,56.19,84,55.82Z"
                          />
                          <path
                            class="cls-2"
                            d="M44.31,83.43l0,.12a.5.5,0,0,1,0-.12Z"
                          />
                          <path
                            class="cls-2"
                            d="M83.14,68.31C83.05,69.75,83,71,82.87,72c-.05.68-.1,1.28-.16,1.84a1.64,1.64,0,0,1,0,.23l0,.26c0,.24,0,.46-.07.67l-.12.85c-.35,2.29-.48,2.12-.76,4.39a.28.28,0,0,0,0,.09s0,.07,0,.1,0,.22,0,.35,0,.1,0,.15a.53.53,0,0,1,0,.12,1.34,1.34,0,0,0,0,.21c0,.06,0,.12,0,.18v0c0,.07,0,.14,0,.22a2.35,2.35,0,0,1,0,.26V82a2.91,2.91,0,0,0,0,.3v0a1.15,1.15,0,0,0,0,.19.38.38,0,0,1,0,.1c0,.23,0,.48,0,.76v.16a.85.85,0,0,1,0-.16H44.25a.51.51,0,0,0,0,.13,1.36,1.36,0,0,1,0,.2h0l-.06-.37-.06-.4-.06-.33c0-.11,0-.21,0-.32l0-.15c0-.21-.06-.43-.1-.68-.1-.68-.21-1.54-.35-2.69h0v0c0-.15-.07-.63-.14-1.21,0-.21-.05-.44-.08-.67s-.05-.46-.08-.68c-.06-.6-.2-2.15-.45-6.57v0c0-.08,0-.15,0-.23s0,0,0,0a1.48,1.48,0,0,0,0,.21v.07c.82,1.61,2.48,3.12,5.73,3.76,8.4.23,10.16-6.63,10.21-6.82h.13l7.64,0h.07c0,.21.08.38.12.53h-.09c.45,1.77,2.17,5.12,8.71,6.1,5.77.07,7.36-3.22,7.75-5.62,0-.06,0-.11,0-.16v-.17h0l0-.69v-.09c0,.25,0,.49,0,.74,0,.1,0,.21,0,.31l0,.52s0,.07,0,.11A1.27,1.27,0,0,0,83.14,68.31Z"
                          />
                          <path
                            class="cls-2"
                            d="M18,120.14a21.47,21.47,0,0,1-1.4,6.28,3.65,3.65,0,0,0-.37.94,4.38,4.38,0,0,0-.1.68,34.26,34.26,0,0,0,.07,4.42,2.39,2.39,0,0,1-.23,1.67,1.14,1.14,0,0,1-.79.54,1,1,0,0,1-.7-.34c-.59-.6-.45-1.53-.39-2.83a24.75,24.75,0,0,0,0-2.86c-.52-1.74-1.3-.06-1.3-.06-.81,4-1.47,6.83-1.6,7.36a2.33,2.33,0,0,1-.66,1.12l0,0a1.09,1.09,0,0,1-1,0,1.15,1.15,0,0,1-.48-1,7.15,7.15,0,0,1,.39-3,33.6,33.6,0,0,0,1-4.51c0-.12.19-1.32-.17-1.45a.47.47,0,0,0-.33,0,.57.57,0,0,0-.29.25c-.69,1.78-1.15,3.19-1.44,4.19L7,134.47a2.29,2.29,0,0,1-1,1.43,1.38,1.38,0,0,1-1.39,0,1.36,1.36,0,0,1-.36-1.17A8.07,8.07,0,0,1,5,132c.22-.61.17-.51.29-.84.56-1.48,1.69-3.69,1.68-4.56,0-.08,0-.28-.12-.33s-.41.18-.41.18l-2.76,4.26c-.52,1.09-1.28,1.79-1.94,1.72a.83.83,0,0,1-.42-.17c-.4-.34-.36-1.15.12-2a18.42,18.42,0,0,0,1.14-1.64,22.84,22.84,0,0,0,2.23-4.84,32.54,32.54,0,0,0,1.07-3.59,16.51,16.51,0,0,1-1.25,1.43c-1.1,1.12-1.83,1.84-2.88,2-.57,0-1.51,0-1.68-.54s.42-1,.49-1.06c.69-.69,1.71-1.73,2.88-3.07.95-1.09,1.21-1.47,1.56-1.84.89-.93,2.47-1.91,5.56-2.22a1.92,1.92,0,0,1-.09-.32l.28.19.2.14a14.12,14.12,0,0,0,3,1.55q.69.25,1.32.42h0a13.35,13.35,0,0,0,2.6.32,7.34,7.34,0,0,1,.18,1.29A9.41,9.41,0,0,1,18,120.14Z"
                          />
                          <path
                            class="cls-2"
                            d="M15.24,116.8q-.63-.17-1.32-.42a14.12,14.12,0,0,1-3-1.55A15.84,15.84,0,0,0,15.24,116.8Z"
                          />
                          <path
                            class="cls-2"
                            d="M125.54,123c-.21.49-1.19.59-1.68.54-1-.11-1.78-.83-2.88-2a14.59,14.59,0,0,1-1.24-1.43,21.36,21.36,0,0,0,1.06,3.59,37.87,37.87,0,0,0,2.33,4.65c.42.77.78,1.4,1,1.83.48.89.52,1.7.12,2a.8.8,0,0,1-.42.17c-.66.07-1.41-.63-1.94-1.72l-2.66-4.2s-.24-.23-.42-.17-.18.19-.2.26c-.18.6.45,1.88.45,1.88.5,1.26.94,2.24,1.25,2.91.07.16.27.63.66,1.58a3.72,3.72,0,0,1,.48,1.76,1.38,1.38,0,0,1-.44,1.11,1.45,1.45,0,0,1-1.4,0c-.55-.26-.76-.77-1-1.43l-1.13-2.79c-.29-1-.74-2.41-1.44-4.19a.46.46,0,0,0-.28-.3.43.43,0,0,0-.34,0c-.37.19-.22,1.12-.17,1.45.28,1.74.68,3.27.95,4.51.1.47,0,0,.24,1.28a4.54,4.54,0,0,1,.16,1.68,1.22,1.22,0,0,1-.48,1,1.11,1.11,0,0,1-1,0l0,0a2.33,2.33,0,0,1-.66-1.12c-.19-.79-.37-1.59-.55-2.39q-.51-2.37-.93-4.65a2.41,2.41,0,0,0-.24-.77.52.52,0,0,0-.24-.28.58.58,0,0,0-.39,0,.85.85,0,0,0-.37.67,18,18,0,0,0-.2,3c0,1.46.05,2.09-.38,2.49a1,1,0,0,1-.64.31,1.1,1.1,0,0,1-.78-.42c-.38-.44-.18-1-.18-2a34.14,34.14,0,0,0-.05-3.86,4.49,4.49,0,0,0-.09-.68,4.65,4.65,0,0,0-.37-.94,21.14,21.14,0,0,1-1.4-6.28,34.48,34.48,0,0,1-.07-3.76,16.74,16.74,0,0,0,7.14-2.25l.39.69c3.08.31,4.67,1.29,5.55,2.22.48.51.37.48,1.56,1.84C124.54,121.56,125.83,122.35,125.54,123Z"
                          />
                          <path
                            class="cls-6"
                            d="M41.61,55.7c.33,1.3.61,2.61.86,3.88v0Z"
                          />
                          <path
                            class="cls-2"
                            d="M42.24,58.79A10.66,10.66,0,0,0,42,57c0-.19-.08-.35-.11-.45A60.46,60.46,0,0,0,36.5,43.7a7.69,7.69,0,0,0-.83.68,21.07,21.07,0,0,1,2.56,3.86,31.46,31.46,0,0,1,2.25,6.16c.14.48.28.93.41,1.45a0,0,0,0,0,0,0,1.94,1.94,0,0,0,.05.2h0c0,.2.11.41.16.63a50.08,50.08,0,0,1,1.15,7.79h0v.07s0,.11,0,.17a8.41,8.41,0,0,0,.13,2.43c0-.19,0-.38,0-.56h0c0-1.5.06-2.34.09-3.11h0v0h0c0-.24,0-.47,0-.72C42.52,62.2,42.43,61.06,42.24,58.79ZM25.35,92.14a16.25,16.25,0,0,1-4.67-3.27l-.05.07s0,0,0,0,0,0,0,0h0s0,0,0,0h0l0,0,0,0,.19.18c.08.09.15.15.19.19a.7.7,0,0,1,.09.09l.14.12a.11.11,0,0,0,0,0c.27.25.55.48.55.48l.35.28.61.45a15.64,15.64,0,0,0,1.35.84l.41.23a17,17,0,0,0,2.11.92,16.65,16.65,0,0,0,3.06.79,14.06,14.06,0,0,0,1.56.17l.17-.25A16.93,16.93,0,0,1,25.35,92.14Z"
                          />
                          <path
                            class="cls-2"
                            d="M42.37,67.19h0a2.83,2.83,0,0,0,0,.29c0,.25,0,.49-.05.74v.08l-1,1.62c-.1.23-.19.45-.29.67v0c-.3.67-.58,1.32-.85,1.93l-.46,1.06a1.17,1.17,0,0,1,0,.11c-.17.38-.33.74-.47,1.09s-.3.7-.44,1c-.84,2-1.45,3.47-1.9,4.62,0,0,0,.06,0,.08s0,.14-.07.21-.1.26-.15.38c-.12.31-.22.58-.3.83l-.19.55a1,1,0,0,1,0,.16,1.54,1.54,0,0,0-.05.17,2.43,2.43,0,0,0-.09.3c-.11.4-.66,2.51-1.68,5.28h0l-.4,1c0,.1-.08.21-.15.36s0,.1-.08.16-.08.19-.13.29-.23.46-.38.76l-.39.74-.16.28c-.05.1-.1.2-.16.3-.15.27-.3.55-.48.86l-.27.49a2,2,0,0,0-.14.25h-.14l.17-.25a16.93,16.93,0,0,1-6.15-1.55,16.25,16.25,0,0,1-4.67-3.27h0l.08-.1,0,0a2.56,2.56,0,0,1,.24-.29l0,0h0a7.88,7.88,0,0,0,.7-1l.33-.51.36-.53.21-.34a25.15,25.15,0,0,0,1.85-3.66c1-2.15,1.51-3,2.12-4.21a48.92,48.92,0,0,0,4-12.93,55.27,55.27,0,0,0,.69-6.66,30.34,30.34,0,0,1,.46-5.79l.15-.78.08-.34c.07-.35.16-.7.25-1l.21-.7c0-.11.07-.23.11-.35l.12-.34.12-.35c.07-.18.14-.36.22-.53s.13-.32.2-.48l.24-.49c.08-.16.16-.32.25-.48s.26-.46.41-.68.19-.29.29-.44l0,0c.15-.2.29-.39.45-.58s.12-.13.17-.2l.18-.19a4.17,4.17,0,0,1,.36-.37h0l0,0a21.07,21.07,0,0,1,2.56,3.86,31.46,31.46,0,0,1,2.25,6.16c.14.48.28.93.41,1.45a0,0,0,0,0,0,0,1.94,1.94,0,0,0,.05.2h0c0,.2.11.41.16.63a50.08,50.08,0,0,1,1.15,7.79h0v.07s0,.11,0,.17A8.41,8.41,0,0,0,42.37,67.19Z"
                          />
                          <path
                            class="cls-2"
                            d="M104.85,88.92a.05.05,0,0,1,0,0l0,0a0,0,0,0,0,0,0l0,0,.08.17h0Zm-11,4.78h0l.08.15h0c.44,0,1-.08,1.69-.18a18,18,0,0,0,3.07-.79,18.62,18.62,0,0,0,2.1-.92l.41-.23a13.25,13.25,0,0,0,1.25-.78A19.51,19.51,0,0,1,93.89,93.7Zm-4.81-50-.06,0h0l0,0h0l0,0a.17.17,0,0,1,0,.05,59.89,59.89,0,0,0-5.32,12.75c0,.1-.07.26-.12.45a11.24,11.24,0,0,0-.27,1.81c-.19,2.28-.28,3.42-.27,3.94v.2c.06.1.12.2.19.3l.1.16c0-.42,0-.84.05-1.26l0-.44c0-.24,0-.49.08-.75s.07-.56.12-.85c.07-.47.17-.92.27-1.34-.06.31-.11.62-.16.94a1.13,1.13,0,0,0,0,.18c0,.32-.1.64-.14,1,0-.13.06-.27.08-.4l.39-1.93c.08-.4.17-.81.25-1.21h0c.4-1.54.88-3.17,1.44-4.86.22-.66.46-1.32.7-2l.42-1.12q1.14-2.91,2.35-5.42l0-.06ZM83.2,64.31a1.13,1.13,0,0,0,0-.18s0,0,0,0a.08.08,0,0,0,0,0c0-.12,0-.25-.07-.39a1.16,1.16,0,0,0,0-.18l0-.13-.09-.31c0,.14,0,.29,0,.44,0,.72.09,1.53.09,2.92v.09l0,.69s0,0,0,0c0-.18.07-.36.1-.54h0v-.11a8.55,8.55,0,0,0,.07-1.42Q83.25,64.68,83.2,64.31Z"
                          />
                          <path
                            class="cls-2"
                            d="M104.85,89s0,0,0,0,0,0,0,0l0,0-.18.19c-.09.09-.16.15-.19.19l-.1.08c-.07.07-.13.11-.14.13l0,0c-.28.25-.56.47-.56.47l-.35.29-.62.45-.09.06a19.51,19.51,0,0,1-8.6,2.75h0a41,41,0,0,1-2.26-4.35s-.4-1-.4-1h0c-1-2.78-1.57-4.88-1.68-5.28,0-.09-.05-.19-.08-.3s0-.11,0-.17l-.06-.17a3.79,3.79,0,0,0-.12-.36,4.14,4.14,0,0,0-.15-.41L89,81.44c0-.1-.07-.21-.11-.31l-.09-.24c-.23-.61-.51-1.33-.86-2.19-.09-.24-.2-.49-.31-.76,0-.06-.05-.13-.08-.19l-.34-.83-.31-.72a1.11,1.11,0,0,0-.07-.16c-.11-.27-.23-.54-.35-.82l-.06-.15c-.12-.29-.26-.59-.39-.91s-.16-.37-.25-.56l-1.08-2.48c-.19-.41-.38-.85-.58-1.3l-1-1.63a.22.22,0,0,1,0-.08s0-.07,0-.11l0-.46c0-.06,0-.11,0-.16v-.17h0s0,0,0,0c0-.18.07-.36.1-.54h0v-.11a8.55,8.55,0,0,0,.07-1.42q0-.41-.06-.78a1.13,1.13,0,0,0,0-.18s0,0,0,0a.08.08,0,0,0,0,0c0-.12,0-.25-.07-.39a1.16,1.16,0,0,0,0-.18l0-.13-.09-.31h0a1.93,1.93,0,0,1,0-.24c.06.1.12.2.19.3l.1.16c0-.42,0-.84.05-1.26l0-.44c0-.24,0-.49.08-.75s.07-.56.12-.85c.07-.47.17-.92.27-1.34-.06.31-.11.62-.16.94a1.13,1.13,0,0,0,0,.18c0,.32-.1.64-.14,1,0-.13.06-.27.08-.4l.39-1.93c.08-.4.17-.81.25-1.21h0c.4-1.54.88-3.17,1.44-4.86.22-.66.46-1.32.7-2l.42-1.12q1.14-2.91,2.35-5.42l0-.06h0a6.31,6.31,0,0,1,.63.53l.2.18a7.15,7.15,0,0,1,.53.57l.32.4c.11.14.21.28.31.43l.15.21a1.64,1.64,0,0,0,.14.22l.13.23a4.17,4.17,0,0,1,.26.46c.09.15.17.31.25.47l.11.24c.08.16.14.32.21.48a1.89,1.89,0,0,1,.11.25c0,.08.07.16.1.25l.09.24.09.25h0c.06.16.12.33.17.49h0a4.74,4.74,0,0,1,.15.5l.08.26c0,.16.09.33.13.5s.13.5.18.76.08.33.11.49.09.5.14.74h0c0,.16,0,.32.07.48a2.23,2.23,0,0,1,0,.23l0,.24c0,.19.05.38.07.56s0,.23,0,.34,0,.28,0,.42a1.94,1.94,0,0,1,0,.24c0,.15,0,.3,0,.44s0,.21,0,.31,0,.24,0,.36,0,.22,0,.33,0,.47,0,.66c0,.63,0,1,0,1a53.65,53.65,0,0,0,.68,6.66c.14.85.43,2.41.92,4.33,0,.12.07.26.1.39.08.29.16.6.25.92l.12.42c.06.21.13.43.2.64s.13.44.2.66l.3.9c.16.46.32.91.5,1.38l.27.69.29.7c.13.31.27.62.41.93s.3.65.46,1c.6,1.23,1.11,2.06,2.12,4.21A26.1,26.1,0,0,0,102.76,86l.23.35.35.53c.2.3.29.46.33.5a8.17,8.17,0,0,0,.7,1h0l0,0,.14.15h0a.21.21,0,0,0,0,.06l0,.06,0,.05.07.08a0,0,0,0,1,0,0h0Z"
                          />
                          <path
                            class="cls-2"
                            d="M31.33,93.94,22.1,108.43c-2.29,3.1-3.88,5.06-4.14,8.11a10.54,10.54,0,0,0,0,1.37,14,14,0,0,1-2.61-.43h-.05a15.27,15.27,0,0,1-4.33-2l-.2-.14a2.2,2.2,0,0,1-.25-.17c.55-1,2.72-4.81,4.39-8.46a27,27,0,0,0,1.68-4.53c.2-.75.34-1.38.42-1.81a35.66,35.66,0,0,1,3.6-11.6l.08.08-.05.07,0,0,0,0h0s0,0,0,0h0l0,0,0,0,.19.18c.08.09.15.15.19.19a.7.7,0,0,1,.09.09l.14.12a.11.11,0,0,0,0,0c.27.25.55.48.55.48l.35.28.61.45a15.64,15.64,0,0,0,1.35.84l.41.23a15.48,15.48,0,0,0,2.11.92,16.86,16.86,0,0,0,3.06.79A14.06,14.06,0,0,0,31.33,93.94Z"
                          />
                          <path
                            class="cls-2"
                            d="M15.29,117.47a14.27,14.27,0,0,1-4.33-2A15.27,15.27,0,0,0,15.29,117.47Z"
                          />
                          <path
                            class="cls-2"
                            d="M31.5,93.69l-.17.25a14.06,14.06,0,0,1-1.56-.17A16.86,16.86,0,0,1,26.71,93a15.48,15.48,0,0,1-2.11-.92l-.41-.23A15.64,15.64,0,0,1,22.84,91l-.61-.45-.35-.28s-.28-.23-.55-.48a.11.11,0,0,1,0,0l-.14-.12a.7.7,0,0,0-.09-.09s-.11-.1-.19-.19l-.19-.18,0,0,0,0h0s0,0,0,0h0l0,0,0,0,.05-.07a16.44,16.44,0,0,0,4.67,3.28A17.25,17.25,0,0,0,31.5,93.69Z"
                          />
                          <path
                            class="cls-2"
                            d="M93.88,93.7l.08.15c.44,0,1-.08,1.7-.18a17.51,17.51,0,0,0,3.06-.79,17,17,0,0,0,2.11-.92l.41-.23c.58-.33,1-.62,1.25-.78A19.51,19.51,0,0,1,93.88,93.7Zm10.89-4.91.08.17h0A1.3,1.3,0,0,0,104.77,88.79Z"
                          />
                          <path
                            class="cls-2"
                            d="M114.65,114.8a15.55,15.55,0,0,1-3.26,1.47,16.69,16.69,0,0,1-3.82.77c-.07-.34-.14-.68-.22-1a18.3,18.3,0,0,0-4.08-7.58A140.06,140.06,0,0,1,94,93.85c.44,0,1-.08,1.7-.18a17.51,17.51,0,0,0,3.06-.79,17,17,0,0,0,2.11-.92l.41-.23c.58-.33,1-.62,1.25-.78l.09-.06a12.71,12.71,0,0,0,2.14-1.75l.14-.14s0,0,0,0h0l0,0h0s0,0,0,0a35.75,35.75,0,0,1,3.49,11.37c.08.43.21,1.06.42,1.81.12.44.24.86.37,1.25a29,29,0,0,0,1.31,3.28C111.18,108.26,112.63,111.14,114.65,114.8Z"
                          />
                          <line
                            class="cls-7"
                            x1="34"
                            y1="62.56"
                            x2="33.99"
                            y2="62.56"
                          />
                          <polyline
                            class="cls-7"
                            points="34.03 62.74 34.1 62.56 34.35 61.97"
                          />
                          <path
                            class="cls-2"
                            d="M76.9,200c.11-.13.22-.26.34-.38l-.34.38c-.25.3-.49.61-.72.91,0,.21.08.41.13.61h0l-.12-.62C76.4,200.63,76.64,200.32,76.9,200Z"
                          />
                          <path
                            class="cls-2"
                            d="M83.42,226.11s0,0,0,0l0-.28s0,0,0,0Z"
                          />
                          <line
                            class="cls-7"
                            x1="41.31"
                            y1="32.64"
                            x2="41.3"
                            y2="32.64"
                          />
                          <line
                            class="cls-7"
                            x1="80.78"
                            y1="34.04"
                            x2="80.77"
                            y2="34.04"
                          />
                          <path
                            class="cls-2"
                            d="M76.9,200c.11-.13.22-.26.34-.38l-.34.38c-.25.3-.49.61-.72.91,0,.21.08.41.13.61h0l-.12-.62C76.4,200.63,76.64,200.32,76.9,200Z"
                          />
                          <path
                            class="cls-2"
                            d="M83.39,225.83l0,.28s0,0,0,0l0-.28S83.39,225.83,83.39,225.83Z"
                          />
                          <path
                            class="cls-8"
                            d="M57.64,83.05s1.76-3.93,2.72-4.23"
                          />
                          <path
                            class="cls-8"
                            d="M66.12,79.27s2.88,2.66,3.12,3.78"
                          />
                          <path
                            class="cls-1"
                            d="M62.92,95.87s-2.08,4.38.32,4.15c1.74-.72.14-2.19.14-2.19"
                          />
                          <path
                            class="cls-1"
                            d="M50.36,118.35s8.48,4.53,10.52,9.93"
                          />
                          <path
                            class="cls-1"
                            d="M65.56,128.28s5.92-8.34,10.24-9.62"
                          />
                          <path
                            class="cls-1"
                            d="M43.08,181.88s1.2,1.81,4.4,1.81"
                          />
                          <path
                            class="cls-1"
                            d="M82.2,183.69c1.12-.22,2.6.42,5-1.81"
                          />
                          <path
                            class="cls-8"
                            d="M42.65,58.67a10.44,10.44,0,0,0-.28-1.81c0-.19-.08-.35-.11-.46a60.46,60.46,0,0,0-5.35-12.82,7.6,7.6,0,0,0-.83.67.08.08,0,0,1,0,0h0l-.36.36-.18.19a1.63,1.63,0,0,1-.17.2c-.16.19-.3.38-.45.58l0,0-.29.43c-.15.23-.28.45-.41.69s-.17.32-.25.48l-.24.49c-.07.16-.14.31-.2.47s-.15.36-.22.54l-.12.35-.12.34c0,.12-.08.24-.11.35l-.21.7c-.09.35-.18.7-.25,1l-.08.35-.15.77a30.82,30.82,0,0,0-.45,5.79,55.33,55.33,0,0,1-.69,6.67A49,49,0,0,1,27,78.1c-.61,1.24-1.11,2.06-2.11,4.22A27.15,27.15,0,0,1,23.08,86s-.09.16-.22.35l-.35.53c-.2.31-.31.46-.33.51a9.13,9.13,0,0,1-.7,1h0l0,0-.24.29,0,0a1,1,0,0,0-.07.1h0L21,88.71a36,36,0,0,0-3.61,11.62c-.08.42-.21,1-.41,1.81a28.27,28.27,0,0,1-1.68,4.53c-1.48,3.23-3.34,6.59-4.14,8l-.06,0-.27-.19a1.87,1.87,0,0,0,.08.32c-3.08.31-4.67,1.29-5.55,2.22-.35.36-.61.75-1.57,1.84-1.17,1.34-2.19,2.39-2.88,3.07-.06.06-.65.6-.49,1.06s1.12.6,1.69.55c1.05-.11,1.78-.84,2.88-2a17.52,17.52,0,0,0,1.24-1.44,30.8,30.8,0,0,1-1.06,3.6A23.35,23.35,0,0,1,3,128.56c-.44.71-.86,1.27-1.14,1.65-.49.88-.52,1.69-.12,2a.74.74,0,0,0,.42.16c.65.08,1.41-.63,1.94-1.71l2.76-4.27s.25-.25.4-.18.11.25.12.33c0,.87-1.12,3.08-1.67,4.56-.13.34-.07.24-.29.85-.56,1.56-.81,1.94-.8,2.67a1.36,1.36,0,0,0,.36,1.17,1.4,1.4,0,0,0,1.4,0c.55-.26.76-.77,1-1.44l1.13-2.79c.29-1,.74-2.41,1.44-4.19a.54.54,0,0,1,.28-.25.5.5,0,0,1,.34,0c.36.13.18,1.33.16,1.45a34.29,34.29,0,0,1-.94,4.51,7.15,7.15,0,0,0-.4,3,1.2,1.2,0,0,0,.48,1,1.09,1.09,0,0,0,1,0l0,0a2.33,2.33,0,0,0,.66-1.12c.13-.53.78-3.4,1.6-7.37,0,0,.78-1.68,1.3.06a27.25,27.25,0,0,1,0,2.86c-.06,1.3-.21,2.24.38,2.84a1.14,1.14,0,0,0,.71.34,1.12,1.12,0,0,0,.78-.55,2.39,2.39,0,0,0,.23-1.67,33.31,33.31,0,0,1-.06-4.42,2.79,2.79,0,0,1,.1-.68,3.79,3.79,0,0,1,.36-.94,21.37,21.37,0,0,0,1.41-6.29,10.36,10.36,0,0,0,.09-1.72,8.05,8.05,0,0,0-.15-1.12,7.18,7.18,0,0,1,0-.76c.25-3.06,1.85-5,4.14-8.12,0,0,6-9.51,9.23-14.5h.13c.05-.09.1-.17.14-.26l.27-.48c.18-.31.33-.6.48-.87.06-.1.11-.2.16-.3l.16-.28.39-.74c.15-.29.28-.55.38-.76S34,90,34,89.9s.06-.11.08-.16a3.6,3.6,0,0,0,.15-.36s.41-1,.41-1h0c1-2.78,1.56-4.88,1.67-5.29l.09-.29a1.67,1.67,0,0,1,0-.18.75.75,0,0,0,.05-.16c.06-.16.12-.35.19-.55L37,81l.15-.38c0-.07,0-.14.07-.21s0-.05,0-.08c.45-1.15,1.07-2.66,1.9-4.62.14-.33.28-.67.44-1s.3-.72.47-1.1c0,0,0-.07.05-.1.15-.35.3-.71.46-1.07l.85-1.93v0l.3-.67c.33-.54.67-1.08,1-1.63v-.08c0-.24,0-.48,0-.73a2.83,2.83,0,0,1,0-.29h0c0-.19,0-.37,0-.55v0c0-1.5.06-2.34.09-3.1h0v-.06h0c0-.24,0-.47,0-.72C42.93,62.09,42.84,61,42.65,58.67Zm33.2-17.55a5.08,5.08,0,0,1-1.43-.43,4.53,4.53,0,0,1-2-1.87h0c-.4-.47-.77-1-1.07-1.39A15.36,15.36,0,0,1,68.8,30h0V30a12.49,12.49,0,0,0,2.77-3.64,14.09,14.09,0,0,0,.61-1.75c.08-.31.24-1,.32-1.39,0-.14.07-.28.09-.43s0-.38.1-.44.11,0,.34,0a2.39,2.39,0,0,0,.35,0,2,2,0,0,0,.31-.11,3.73,3.73,0,0,0,1.19-1.16,5.75,5.75,0,0,0,1-2.21,3.14,3.14,0,0,0-.4-2.27,2.1,2.1,0,0,0-.21-.2,1.7,1.7,0,0,0-.49-.24,1.82,1.82,0,0,0-.91.08,1.49,1.49,0,0,0-.48.26c0-.4-.13-1-.28-1.65A11.31,11.31,0,0,0,70.1,9a10.37,10.37,0,0,0-4.38-2.6A16.61,16.61,0,0,0,63.15,6a15,15,0,0,0-2.7,0l-.61.1a5,5,0,0,0-.84.19c-.21.1-.31.2-.72.63s-.61.64-.82.86a16,16,0,0,0-4,6.65A13.73,13.73,0,0,0,53,16.29a2.45,2.45,0,0,0-1.37-.19l-.15,0a1.67,1.67,0,0,0-.24.1,1.78,1.78,0,0,0-.46.34,3.11,3.11,0,0,0-.54,2.3,5,5,0,0,0,1.54,3.21,5.06,5.06,0,0,0,1.17.81,13.7,13.7,0,0,0,.76,2.42,11.45,11.45,0,0,0,1.86,3.21l0,0a.13.13,0,0,1,0-.12l.07.07.14.15a4.27,4.27,0,0,1,.33.37l.18.2h0s0,0,.05,0a11.87,11.87,0,0,0,3.28,2.34h0a8.84,8.84,0,0,0,1.62.57l.25,0a6.26,6.26,0,0,0,.66.1l.37,0h0a8.47,8.47,0,0,1-3.78-1.19h0l-.09-.05A8.29,8.29,0,0,1,57,29.86l-.05,0c-.33-.29-.57-.52-.7-.65s-.41-.43-.59-.65a10.88,10.88,0,0,1,0,5.07,12.79,12.79,0,0,1-6.1,7.68l.13-.05a109.47,109.47,0,0,0,13.07.84,108.61,108.61,0,0,0,13.91-.83,1.17,1.17,0,0,0-.32-.11A1.16,1.16,0,0,0,75.85,41.12Zm11.68,1.53-.16-.06.15.06.25.08Zm35.06,76.18c-1.2-1.36-1.08-1.33-1.57-1.84-.88-.93-2.46-1.91-5.54-2.22l-.4-.69-.29.17c-1.88-3.43-3.23-6.12-3.91-7.58a32,32,0,0,1-1.31-3.28c-.13-.4-.25-.81-.36-1.25-.21-.76-.34-1.39-.43-1.81a35.29,35.29,0,0,0-3.49-11.39v0s0,0,0,0,0,0,0,0h0s0,0,0,0,0,0,0,0,0,0,0,0h0v0h0a0,0,0,0,0,0,0s0,0-.07-.09l0,0,0-.05a.21.21,0,0,1,0-.06h0c-.06-.06-.1-.12-.14-.15a.11.11,0,0,0,0,0h0a10.87,10.87,0,0,1-.7-1l-.33-.51-.35-.53-.22-.34a27.35,27.35,0,0,1-1.85-3.66c-1-2.15-1.51-3-2.11-4.21-.17-.33-.32-.66-.47-1s-.28-.61-.41-.93l-.29-.69-.27-.7c-.17-.46-.34-.92-.5-1.37s-.2-.61-.3-.9-.13-.45-.2-.67-.14-.43-.2-.64-.08-.28-.12-.42c-.09-.32-.17-.63-.25-.92,0-.13-.07-.27-.1-.39-.49-1.93-.77-3.49-.91-4.33a53.89,53.89,0,0,1-.68-6.67s0-.37,0-1c0-.2,0-.42,0-.66s0-.22,0-.34,0-.24,0-.36,0-.2,0-.3,0-.3,0-.45a1.64,1.64,0,0,0,0-.23c0-.14,0-.28,0-.43s0-.22,0-.33,0-.38-.07-.57l0-.23a2,2,0,0,0,0-.24c0-.16,0-.32-.07-.48h0c0-.24-.09-.49-.14-.73s-.07-.34-.11-.5-.11-.51-.18-.76-.08-.34-.13-.5,0-.18-.08-.26a4.13,4.13,0,0,0-.15-.5h0c0-.16-.11-.33-.17-.5h0L93,48.75,93,48.5l-.1-.24a1.89,1.89,0,0,0-.11-.25,4.25,4.25,0,0,0-.21-.49l-.11-.24-.25-.47c-.08-.15-.16-.3-.26-.46l-.13-.22-.14-.22-.15-.22c-.1-.14-.2-.29-.31-.42s-.21-.27-.32-.4a7.15,7.15,0,0,0-.53-.57l-.2-.19a6.31,6.31,0,0,0-.63-.53h0l-.16-.07-.14-.08-.3-.16-.14-.07.24.14a.76.76,0,0,1,.19.12.38.38,0,0,1,.13.09A60.23,60.23,0,0,0,84,56.3c0,.1-.07.26-.12.46a11.24,11.24,0,0,0-.27,1.81c-.19,2.28-.28,3.42-.27,3.94v.2a2.09,2.09,0,0,1,0,.25h0c0,.15,0,.29,0,.44,0,.73.09,1.54.09,2.92v.1l0,.69h0v.17s0,.1,0,.15c-.39,2.41-2,5.7-7.75,5.64-6.54-1-8.26-4.34-8.71-6.12h.09c0-.15-.08-.32-.12-.52h-.07l-7.64,0h-.13c-.05.19-1.81,7.06-10.21,6.83-3.24-.64-4.91-2.15-5.73-3.76.24,4.41.39,6,.45,6.55,0,.23,0,.46.07.69s0,.45.08.67c.07.58.12,1.06.14,1.21v0h0c.13,1.15.25,2,.34,2.69,0,.25.07.47.1.68l0,.15c0,.11,0,.22,0,.32s0,.22.06.33,0,.28.06.4l.06.37c0,.3.08.62.12,1,.13,1.34.26,2.65.27,4,0,.13,0,.26,0,.38a13,13,0,0,1-.92,5c-.08.18-.15.33-.29.67s-.38.82-.75,1.67l-1.76,3.25A25.8,25.8,0,0,0,39.56,106l0,.1-1.29,7.64-.08,0,0,.2c-.28,1.83-.56,3.86-.86,6.12a98.77,98.77,0,0,0,1.36,32.93s1.08,10.78,1,20c0,.14,0,.27,0,.41h0c-.07,4.67-.46,8.88-1.47,11a17.25,17.25,0,0,0-1.24,4l.05,0c-1.56,7.54-1,19.06-1,19.06a196.49,196.49,0,0,1,.62,21.4.57.57,0,0,1,0,.13h.23c0,.13,0,.26,0,.39a4.81,4.81,0,0,1-.12,1,9.24,9.24,0,0,1-.57,1.47A5,5,0,0,0,36,234.2a3.59,3.59,0,0,1,.11,1.53,2.35,2.35,0,0,1-.31.75,27.39,27.39,0,0,0-1.38,4.21,26,26,0,0,1-1.26,3.25c-.56,1.21-1.36,2.7-1,3.76a1.06,1.06,0,0,0,.55.75.86.86,0,0,0,.67-.07.77.77,0,0,0,.23-.19.53.53,0,0,0,0,.24.37.37,0,0,0,.05.11,1,1,0,0,0,.42.53.81.81,0,0,0,1.1-.1,1.48,1.48,0,0,0,.17-.2,1,1,0,0,0,0,.41c.07.27.3.56.9.56s.76-.3.78-.59c0,0,0,0,0,0a1,1,0,0,1,0-.16.79.79,0,0,0,0,.13,1.34,1.34,0,0,0,.28.62,1.14,1.14,0,0,0,1.31.31c.67-.19.82-1.07.84-1.61a.49.49,0,0,1,0-.12,6.31,6.31,0,0,0,.28.95,3.93,3.93,0,0,0,.18.39,1.72,1.72,0,0,0,.55.41,2.44,2.44,0,0,0,2.13-.3s1-.61,1.46-2.83a5.32,5.32,0,0,0,.1-.73v-.31c0-.35,0-.83-.06-1.41a31.53,31.53,0,0,1,0-4.13,50.48,50.48,0,0,1,.66-5.13,7.75,7.75,0,0,0,.4-3,14.54,14.54,0,0,0-.29-1.71,9.78,9.78,0,0,1-.15-1.63h-.24c0-.6.05-1.16.1-1.73,0,0,.32-3.79,3.18-12.18a61.77,61.77,0,0,0,3.6-11.79,61.8,61.8,0,0,0,1.53-10.29h0v.19h0c0-.59,0-1.18,0-1.79-.08-2.2-.47-7.28,1-9.21.08-.11.33-.42.65-.91a11.73,11.73,0,0,0,1-2l.37-1.09a18,18,0,0,0,.7-3.08l0,0v0h0c0-.17,0-.34.08-.51.7-5.06.81-11.92.81-11.92.06-4.13.1-6.81.48-10.59.48-4.9,1.35-9.92,1.35-9.92,0-.16,0-.32.08-.48.36-2.07.68-4.14,1-6.18a4.56,4.56,0,0,0,.54.25,5,5,0,0,0,1.86.37,4.09,4.09,0,0,0,2-.45,2.21,2.21,0,0,0,.39-.26,61,61,0,0,0,1.29,7.44l.75,2.8c.2.75.36,1.36.58,2.21s.41,1.64.67,2.8c.15.67.31,1.4.48,2.3.49,2.63.81,5,1,6.9s.3,3.28.35,3.91c0,0,.44,7.67,1.31,12.43,0,.15.05.28.08.43l0,0a15.58,15.58,0,0,0,.51,1.94c.2.55.45,1.07.45,1.07a11.4,11.4,0,0,0,1.86,2.76c1.63,1.86,1.57,6.94,1.63,9.14,0,.59.06,1.15.11,1.72h0a61.36,61.36,0,0,0,2.18,10.06A62.14,62.14,0,0,0,83,214.86c3.39,8.2,4,12,4,12a19.7,19.7,0,0,1,.24,2.14c0,.08,0,.16,0,.25V229h.23v.15c0,.34,0,.69-.06,1.07a12.54,12.54,0,0,0-.18,1.72V232a7.48,7.48,0,0,0,.6,2.84c.5,2,.8,3.76,1,5.08a37.26,37.26,0,0,1,.28,4.12c0,.46,0,.86,0,1.19v.22c0,.09,0,.19,0,.31a5.21,5.21,0,0,0,.14.72,6.16,6.16,0,0,0,.84,1.92.16.16,0,0,1,0,.07,2.55,2.55,0,0,0,.77.76,2.18,2.18,0,0,0,2.15.17,1.49,1.49,0,0,0,.48-.35l0,0,.06-.06.08-.1h0a2.1,2.1,0,0,0,.14-.35c0-.06,0-.12.05-.19a2.06,2.06,0,0,0,0-.45,1,1,0,0,0,0-.25,3.7,3.7,0,0,1,.09.4v-.2a2.62,2.62,0,0,0,.49,1.32,1,1,0,0,0,.24.15,1.31,1.31,0,0,0,1,.06.89.89,0,0,0,.37-.22l.07-.07.07-.08v0l0,0a.79.79,0,0,1,0-.13,0,0,0,0,1,0,0c0-.05,0-.11.05-.17a1.65,1.65,0,0,0,.08-.42c0-.06,0-.11,0-.17v-.23c0-.09,0-.18,0-.28a1.82,1.82,0,0,1,.1.53l0-.08a1.93,1.93,0,0,1,0,.24v.2h0v.11a.56.56,0,0,0,.39.4h0a1.18,1.18,0,0,0,.59-.05,1,1,0,0,0,.49-.35l0-.07a.24.24,0,0,0,.06-.09.6.6,0,0,0,.06-.11h0a2.18,2.18,0,0,0,0-.35.34.34,0,0,0,.08.1v0a2.85,2.85,0,0,0,0-.7,1.16,1.16,0,0,0,0-.33h0v-.09s0,.07,0,.1a2.68,2.68,0,0,1,.13.93v0h0v0h0v.16a.8.8,0,0,0,.22.13,1.21,1.21,0,0,0,.9-.23,1.94,1.94,0,0,0,.2-.21l0-.08.06-.11,0-.09s0,0,0,0a0,0,0,0,0,0,0h0v0l0-.11v0a3.84,3.84,0,0,0,0-.48,3.6,3.6,0,0,0,0-.36h0a3,3,0,0,0-.07-.32h0a.62.62,0,0,0,0-.09,3.4,3.4,0,0,1,.12.66.28.28,0,0,1,0,.09,3.46,3.46,0,0,1,.06.59c.14.1.37.11.71,0l.15-.08a1.27,1.27,0,0,0,.37-.69,2.51,2.51,0,0,0,0-.27v0h0c.06-1-.73-2.32-1.31-3.39a27.35,27.35,0,0,1-1.47-3.17,26.79,26.79,0,0,0-1.65-4.12,2.43,2.43,0,0,1-.35-.73,2.12,2.12,0,0,1-.08-.46s0,0,0,0a5.76,5.76,0,0,1,.09-1.06c0-.12,0-.28,0-.47v-.13a4.21,4.21,0,0,0-.3-1.76,11,11,0,0,1-.66-1.44,4.38,4.38,0,0,1-.15-.67h-.26c0-.41-.08-.79-.08-.83-.13-1.52-.26-21.63-.26-21.63,0-7.4-.07-11.1-1.2-15.46-.3-1.18-.61-2.14-.9-3l0-.06h0c-1.11-3-2.13-4.22-3.06-8.55a33.79,33.79,0,0,1-.74-6.31h0V173c0-2.27,0-4.87.15-8.3.15-4.59.52-7.31.61-14.52,0-1.67,0-1.25,0-3.95.06-8.66.29-11,.25-15,0-3.4-.29-6.09-.76-11.48-.23-2.55-.44-4.66-.59-6.1h-.11a.65.65,0,0,0,0-.11,1.23,1.23,0,0,0,0-.18c0-.08,0-.21,0-.37s0-.31-.05-.6a4.05,4.05,0,0,1,0-.42l0-.18c0-.12,0-.27,0-.43h0c0-.07,0-.14,0-.21-.16-1.12-.44-2.94-.82-5.2a26.75,26.75,0,0,0-1.42-5.13,50.94,50.94,0,0,0-2.14-4.73,16.74,16.74,0,0,1-1.54-3,8.83,8.83,0,0,1-.46-2.94c0-.39,0-.82,0-1.31q0-1.53,0-2.73c0-.13,0-.26,0-.39v-.55c0-.25,0-.48,0-.7,0-.42,0-.8,0-1.15h.1v.22c0-.38,0-.71,0-1a.34.34,0,0,0,0-.1c0-.07,0-.13,0-.19v0A2.71,2.71,0,0,1,82,82v-.14a2.18,2.18,0,0,0,0-.25c0-.08,0-.16,0-.23h0c0-.07,0-.13,0-.19a1.41,1.41,0,0,1,0-.21.49.49,0,0,0,0-.12s0-.1,0-.14,0-.26,0-.36,0-.07,0-.1v-.09c.29-2.27.42-2.1.76-4.39l.12-.85c0-.22,0-.44.07-.67l0-.26a1.94,1.94,0,0,0,0-.24c.06-.55.11-1.16.17-1.84.08-1,.17-2.21.26-3.65,0-.07,0-.13,0-.2s0-.08,0-.11a1.11,1.11,0,0,1,0,.19c.33.54.67,1.08,1,1.63L85.13,71c.39.88.75,1.71,1.08,2.48l.25.55c.13.32.27.62.39.92l.06.15.35.81a1.22,1.22,0,0,1,.07.17l.31.72.34.83c0,.06,0,.13.08.19.11.26.22.52.31.76.35.86.63,1.58.86,2.19l.09.24c0,.1.08.21.11.31l.06.17a4.14,4.14,0,0,1,.15.41,3.16,3.16,0,0,1,.12.37l.06.16c0,.06,0,.12.05.17s.06.21.09.3c.11.4.65,2.51,1.68,5.29h0s.38,1,.4,1a39.54,39.54,0,0,0,2.26,4.36l.08.14a139.15,139.15,0,0,0,9.3,14.6,18.23,18.23,0,0,1,4.08,7.59c.08.3.14.6.19.89h0a21.87,21.87,0,0,0,.06,3.24,21.48,21.48,0,0,0,1.4,6.29,3.65,3.65,0,0,1,.37.94,5,5,0,0,1,.1.68,32.13,32.13,0,0,1,0,3.87c0,1-.2,1.58.18,2a1.12,1.12,0,0,0,.78.41,1,1,0,0,0,.64-.3c.43-.41.38-1,.38-2.49a17.55,17.55,0,0,1,.21-3c0-.16.09-.54.36-.66a.53.53,0,0,1,.4,0,.53.53,0,0,1,.24.28,2.72,2.72,0,0,1,.23.78c.29,1.51.59,3.07.94,4.64.18.81.36,1.61.55,2.4a2.24,2.24,0,0,0,.66,1.12.07.07,0,0,1,0,0,1.09,1.09,0,0,0,1,0c.36-.19.42-.6.49-1a4.66,4.66,0,0,0-.17-1.69c-.23-1.24-.13-.8-.23-1.28-.28-1.24-.67-2.77-.95-4.51-.06-.33-.2-1.26.17-1.45a.41.41,0,0,1,.33,0,.47.47,0,0,1,.29.3c.69,1.78,1.15,3.2,1.43,4.19l1.13,2.79c.27.67.49,1.18,1,1.44a1.43,1.43,0,0,0,1.39,0,1.33,1.33,0,0,0,.44-1.11,3.74,3.74,0,0,0-.47-1.77c-.4-.94-.59-1.42-.66-1.57-.32-.68-.75-1.65-1.25-2.92a3.77,3.77,0,0,1-.45-1.88.32.32,0,0,1,.19-.26c.18-.07.4.15.43.17q1.32,2.12,2.66,4.21c.52,1.08,1.28,1.79,1.93,1.71a.78.78,0,0,0,.43-.16c.4-.35.36-1.16-.12-2-.26-.44-.62-1.07-1-1.84a37.61,37.61,0,0,1-2.32-4.65,20.49,20.49,0,0,1-1.07-3.6,16.14,16.14,0,0,0,1.25,1.44c1.1,1.11,1.83,1.84,2.87,2,.49,0,1.47-.05,1.69-.55C126.25,122.3,125,121.51,122.59,118.83ZM37,248.68h0s0,.05,0,.07A.25.25,0,0,1,37,248.68ZM44.59,83.06a.5.5,0,0,1,0-.12h.07ZM72.38,176l-.47.61q0,.23.09.42h0c0-.13,0-.27-.08-.42l.47-.61a2.75,2.75,0,0,1,.22-.26Zm4.18,17.72a1.15,1.15,0,0,0,0-.19h0v.19ZM44.68,83.46h0s0-.07,0-.11h.07Z"
                          />
                          <path
                            class="cls-1"
                            d="M89.31,43.54A60.23,60.23,0,0,0,84,56.3c0,.1-.07.26-.12.46a11.24,11.24,0,0,0-.27,1.81c-.19,2.28-.28,3.42-.27,3.94v.2a2.09,2.09,0,0,1,0,.25h0c0,.15,0,.29,0,.44,0,.73.09,1.54.09,2.92,0,.15,0,.29,0,.44s0,.23,0,.35h0v.17l0,.15c-.39,2.41-2,5.7-7.75,5.64-6.54-1-8.26-4.34-8.71-6.12a.78.78,0,0,0,0-.24.65.65,0,0,0-.06-.28h-.07l-7.64,0h-.13c-.05.19-1.81,7.06-10.21,6.83-3.25-.64-4.91-2.15-5.73-3.76v-.07a1.48,1.48,0,0,1,0-.21s0,0,0,0a1.22,1.22,0,0,1-.07-.17,6.6,6.6,0,0,1-.4-1.21l0,.26v0c0-.24,0-.48,0-.73a2.83,2.83,0,0,1,0-.29h0c0-.19,0-.37,0-.55v0c0-1.5.06-2.34.09-3.1h0v-.06h0c0-.17,0-.41,0-.72a23.17,23.17,0,0,0-1.8-8.71c-1.31-3.58-2.73-7-4.21-10.32a6.41,6.41,0,0,0-.83.67.08.08,0,0,1,0,0l0,0a2.75,2.75,0,0,1,.26-.22,3.36,3.36,0,0,1,.29-.24l.1-.08.21-.15.1-.07.11-.06.13-.09.17-.1a6.68,6.68,0,0,1,1-.47l.35-.13.18-.06.17-.05a1.89,1.89,0,0,1,.34-.09l.08,0,.72-.13A9.23,9.23,0,0,1,42,42.24a25.75,25.75,0,0,0,2.78,0l.43,0,.43,0,.32,0c.39-.05.77-.11,1.13-.18l.27-.05.22,0h0l.36-.09.35-.1c.24-.07.48-.14.7-.22l.28-.1.15-.05,0,0,.13-.05a13,13,0,0,0,3.64-3.09,12.06,12.06,0,0,0,2.42-4.92,15,15,0,0,0,.23-3,4.23,4.23,0,0,0-.07-1c-.06-.35-.15-.54-.1-.57s.34.32.85.81c0,0,.21.2.69.61A9.58,9.58,0,0,0,64,32.29a8.69,8.69,0,0,0,2.83-.86,5.22,5.22,0,0,0,1.55-.95c.32-.31.63-.71.73-.65s0,.14,0,.32c0,0,0,.08,0,.93a5.56,5.56,0,0,0,.26,1.5,19,19,0,0,0,.94,2.67,18.79,18.79,0,0,0,2.06,3.4,6.18,6.18,0,0,0,2.19,2.07,3.51,3.51,0,0,0,1.27.39,4.34,4.34,0,0,1,.73.08,3.58,3.58,0,0,1,.6.19h0l.2.07.32.1c.22.08.45.14.68.2l.36.09h0a2.3,2.3,0,0,1,.28.06l.47.09.39.06.49.07.32,0,.42,0,.44,0a25.74,25.74,0,0,0,2.78,0,5.62,5.62,0,0,1,.58,0h.42c.12,0,.25,0,.37,0a4.87,4.87,0,0,1,.55.06,5.12,5.12,0,0,1,.54.1l.09,0,.17,0,.25.07.16,0,.15.06.25.08a5.83,5.83,0,0,1,.72.32l.25.13h0Z"
                          />
                          <path
                            class="cls-9"
                            d="M59.07,26.8l.82-.32.81-.3a1.92,1.92,0,0,1,.89,0,2.85,2.85,0,0,1,.85.29h-.12A3.1,3.1,0,0,1,63.71,26a1.75,1.75,0,0,1,.73.1c.22.06.45.1.68.14s.45.07.7.13a.61.61,0,0,1,.15.07.28.28,0,0,1,.09.27.51.51,0,0,1-.15.25,2.82,2.82,0,0,1-.29.24,7.29,7.29,0,0,1-1.23.77,5.19,5.19,0,0,1-1.39.42,3.35,3.35,0,0,1-1.48-.11,4.64,4.64,0,0,1-1.31-.62A10.13,10.13,0,0,1,59.07,26.8Zm0,0c.47.25.79.4,1.23.61a5.71,5.71,0,0,0,1.27.46,4.54,4.54,0,0,0,2.58-.34,7.23,7.23,0,0,0,1.18-.66l.25-.19s.06-.07.05,0a.11.11,0,0,0,0,.11s0,0,0,0c-.19-.06-.44-.1-.66-.15s-.47-.11-.69-.18a1.49,1.49,0,0,0-.64-.11,3,3,0,0,0-1.28.33l-.07,0,0,0a2.51,2.51,0,0,0-.76-.3,1.72,1.72,0,0,0-.81,0l-.82.25Z"
                          />
                          <path
                            class="cls-9"
                            d="M64.58,26.9a8.07,8.07,0,0,1-2,.41,5.8,5.8,0,0,1-2-.28c.68,0,1.35.06,2,0a6.63,6.63,0,0,0,1-.08C63.89,26.94,64.23,26.91,64.58,26.9Z"
                          />
                          <path
                            class="cls-10"
                            d="M62.45,17.66a13.19,13.19,0,0,0,.26,2.83,13.25,13.25,0,0,0,.46,1.62"
                          />
                          <path
                            class="cls-10"
                            d="M60.2,23.35a1.26,1.26,0,0,0,1-.39"
                          />
                          <path class="cls-10" d="M63.73,22.85s.46.63,1,.31" />
                          <path
                            class="cls-9"
                            d="M60.08,14.89a9.92,9.92,0,0,0-6-.43,11,11,0,0,1,6.44-1.53Z"
                          />
                          <path
                            class="cls-9"
                            d="M64.81,12.93a11,11,0,0,1,6.44,1.53,9.89,9.89,0,0,0-6,.43Z"
                          />
                          <path
                            class="cls-9"
                            d="M59.91,16.61a3.11,3.11,0,0,0-1.23-.53,4.57,4.57,0,0,0-1.32-.18,5.33,5.33,0,0,0-1.32.19,6.19,6.19,0,0,0-.62.25l-.33.12-.15.06s-.09.11,0,0,.13,0,.23.05l.32.17A5.82,5.82,0,0,0,56,17a3.07,3.07,0,0,0,1.28.23,5.42,5.42,0,0,0,1.32-.21A4.63,4.63,0,0,0,59.91,16.61Zm0,0a5,5,0,0,1-1.21.68,5.45,5.45,0,0,1-1.39.22,3.18,3.18,0,0,1-1.39-.26,3.47,3.47,0,0,1-.6-.34,1.28,1.28,0,0,0-.29-.14l-.15-.06c-.06,0-.13,0-.23-.17a.18.18,0,0,1,.1-.2l.09-.05.17-.06.32-.12a4.74,4.74,0,0,1,.64-.25,5.51,5.51,0,0,1,1.39-.21,4.67,4.67,0,0,1,1.39.19A3,3,0,0,1,59.91,16.61Z"
                          />
                          <path
                            class="cls-11"
                            d="M56.35,17.23a1.14,1.14,0,0,1,2-.58,1,1,0,0,1,.17.49"
                          />
                          <ellipse
                            class="cls-12"
                            cx="57.44"
                            cy="16.75"
                            rx="0.33"
                            ry="0.31"
                          />
                          <path
                            class="cls-9"
                            d="M65.38,16.64c.16-.12.34-.29.55-.43a3.29,3.29,0,0,1,.61-.34,3.87,3.87,0,0,1,1.39-.23,5.92,5.92,0,0,1,1.39.21,4.9,4.9,0,0,1,.65.25l.32.12.16.07c.06.05.13,0,.21.21-.08.24-.17.17-.22.21l-.16.05a1.51,1.51,0,0,0-.28.15,5.07,5.07,0,0,1-.61.34,3.23,3.23,0,0,1-1.4.26,6.39,6.39,0,0,1-1.38-.21A5.38,5.38,0,0,1,65.38,16.64Zm0,0a4.72,4.72,0,0,0,1.29.41,5.5,5.5,0,0,0,1.33.21A3,3,0,0,0,69.28,17a5.07,5.07,0,0,0,.59-.33,1.91,1.91,0,0,1,.32-.16l.18-.06s.1-.08,0,0,0,0,0,0l-.16-.06-.32-.12a5.14,5.14,0,0,0-.63-.25,5.85,5.85,0,0,0-1.32-.2,3.64,3.64,0,0,0-1.31.21,4,4,0,0,0-.63.23C65.8,16.42,65.6,16.51,65.38,16.64Z"
                          />
                          <path
                            class="cls-11"
                            d="M69,17.23a1.18,1.18,0,0,0-1-1,1.15,1.15,0,0,0-1.07.44.84.84,0,0,0-.17.49"
                          />
                          <ellipse
                            class="cls-12"
                            cx="67.87"
                            cy="16.75"
                            rx="0.33"
                            ry="0.31"
                          />
                          <path
                            class="cls-13"
                            d="M42.82,69.88a12,12,0,0,1-.09-5.09c.1-.49.19-.77.19-.77"
                          />
                          <path
                            class="cls-8"
                            d="M68.39,37.85a4.32,4.32,0,0,0,.08.91c0,.22.09.48.16.77"
                          />
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 4 ? 4 : null,
                              });
                            }}
                            id="B4"
                            class="cls-14 cls-imp"
                            d="M58,66.25a6.86,6.86,0,0,1-.54,1.67,7.66,7.66,0,0,1-1.92,2.48,10.59,10.59,0,0,1-4.23,2.24,6.55,6.55,0,0,1-2.28.52c-2.41-.1-4.32-2.35-5.08-4.16a6.17,6.17,0,0,1-.37-1.17h0a8,8,0,0,1-.16-2.64s0-.07,0-.1a6.35,6.35,0,0,1,.3-1.3A7.89,7.89,0,0,1,45.23,61l.14-.15h0l0,0h0l.85-.71,1.46-.89a8,8,0,0,1,4.1-.48,7.88,7.88,0,0,1,4.26,2.08,6.87,6.87,0,0,1,1.73,3.08A6.34,6.34,0,0,1,58,66.25Z"
                          />
                          <path
                            onClick={() => {
                              this.setState({
                                toolTip: this.state.toolTip !== 4 ? 4 : null,
                              });
                            }}
                            id="B4"
                            class="cls-14 cls-imp"
                            d="M67.65,66.28A6.58,6.58,0,0,0,68.22,68a7.87,7.87,0,0,0,2,2.49,9.11,9.11,0,0,0,4.47,2.26,7.75,7.75,0,0,0,5.09-.62,6.13,6.13,0,0,0,2.69-3,7,7,0,0,0,.38-1.17v0h0a7.61,7.61,0,0,0,.24-1.14,6.22,6.22,0,0,0,.08-1.56,5.44,5.44,0,0,0-.32-1.35A7.43,7.43,0,0,0,81,61,9.61,9.61,0,0,0,80,60l-1.48-.8a8.84,8.84,0,0,0-4.33-.48,8.49,8.49,0,0,0-4.5,2.09,6.74,6.74,0,0,0-1.83,3.09A6.21,6.21,0,0,0,67.65,66.28Z"
                          />
                          <path
                            class="cls-2"
                            d="M58.88,41.63A11.83,11.83,0,0,1,61,41.15l-.66.09a20.59,20.59,0,0,1,2.72-.17,21,21,0,0,1,2.63.08L65,41.06a1.8,1.8,0,0,1,.33.1l-.59-.26A.76.76,0,0,1,65,41a2.52,2.52,0,0,0,1.92.25,2.58,2.58,0,0,0,1.5-1.15,2.53,2.53,0,0,0,.25-1.92,2.81,2.81,0,0,0-1.15-1.5,5,5,0,0,0-2.85-.6c-.74,0-1.48,0-2.22,0a16.91,16.91,0,0,0-4.85.73,2.5,2.5,0,1,0,1.33,4.82Z"
                          />
                          <path
                            class="cls-1"
                            d="M52.5,16.58a1.73,1.73,0,0,0-.41-.21A2.12,2.12,0,0,0,51,16.29a1.67,1.67,0,0,0-.24.1,1.89,1.89,0,0,0-.46.33A3.13,3.13,0,0,0,49.8,19a5.36,5.36,0,0,0,1.54,3.2c.39.39,1.06.93,1.24.8s0-.32-.14-.78a9.36,9.36,0,0,1-.25-2.37,13.46,13.46,0,0,1,.05-1.37A18.26,18.26,0,0,1,52.5,16.58Z"
                          />
                          <path
                            class="cls-1"
                            d="M73,16.45a1.62,1.62,0,0,1,.43-.16,2,2,0,0,1,1,0,.91.91,0,0,1,.23.12,1.85,1.85,0,0,1,.42.38,3.1,3.1,0,0,1,.28,2.34,5.37,5.37,0,0,1-1.89,3c-.58.49-1.21.83-1.32.72s.1-.27.22-.82a2.94,2.94,0,0,0,.08-.49c.1-.78.2-1.05.28-1.66,0-.35,0-.45.1-1.52C72.88,18,72.92,17.28,73,16.45Z"
                          />
                          <path
                            class="cls-2"
                            d="M34.44,45.16a50.48,50.48,0,0,1,3.07,5.58c.21.45.41.9.61,1.35.12.26.11.26,0,0l.16.39c.11.26.21.52.31.78q.57,1.47,1,3a2.5,2.5,0,1,0,4.82-1.33,53.34,53.34,0,0,0-5.7-12.25,2.5,2.5,0,0,0-4.32,2.53Z"
                          />
                          <path
                            class="cls-2"
                            d="M60.72,61.56c0-.18,0-.36,0-.53s.06-.6,0-.2,0-.15,0-.19.07-.34.11-.51L56,59.46a4.17,4.17,0,0,1,0,.5c0,.09-.07.57,0,.16s0,.11,0,.16a4.21,4.21,0,0,1-.12.48l4.82,1.33a21.79,21.79,0,0,0,.5-5.46c-.14-1.77-.83-3.4-1.14-5.14l-4.57,1.93L56,54.64a2.51,2.51,0,0,0,3.42.9,2.57,2.57,0,0,0,.9-3.42l-.57-1.22a2.46,2.46,0,0,0-1.49-1.15,2.6,2.6,0,0,0-1.63.12,2.54,2.54,0,0,0-1.45,3,16.79,16.79,0,0,0,.52,2.23c.1.31.22.62.31.94,0,.17.07.34.12.51.12.5,0-.53,0,.13a15.09,15.09,0,0,1,0,2.23l-.06.55c-.06.58.08-.46,0,.07s-.14.85-.22,1.28a2.75,2.75,0,0,0,.25,1.93,2.58,2.58,0,0,0,1.5,1.15,2.54,2.54,0,0,0,3.07-1.75A9,9,0,0,0,61,59.46a2.5,2.5,0,0,0-4.91-.66,15,15,0,0,0-.37,2.76,2.53,2.53,0,0,0,2.5,2.5,2.56,2.56,0,0,0,2.5-2.5Z"
                          />
                          <path
                            class="cls-2"
                            d="M44.88,58.89a5.3,5.3,0,0,0,0-.69,11.67,11.67,0,0,0-.2-1.32,1.89,1.89,0,0,0-.45-.85,1.83,1.83,0,0,0-.7-.65,2,2,0,0,0-.93-.3,2,2,0,0,0-1,.05l-.59.25a2.43,2.43,0,0,0-.9.9l-.25.6a2.47,2.47,0,0,0,0,1.32l.09.5L39.84,58a6.19,6.19,0,0,1,0,.86,2.83,2.83,0,0,0,.73,1.77,2,2,0,0,0,.81.52,1.88,1.88,0,0,0,1,.21l.67-.09a2.5,2.5,0,0,0,1.1-.64l.39-.51a2.43,2.43,0,0,0,.34-1.26Z"
                          />
                          <path
                            class="cls-2"
                            d="M80.86,57.14c.21,1.92.18,4,1.16,5.76,1.22,2.11,4.74,1.24,4.66-1.26,0-1.46-.11-2.92-.13-4.37a6.32,6.32,0,0,1,.6-3.17,36.33,36.33,0,0,0,3-8.15,2.5,2.5,0,0,0-4.82-1.33A30.59,30.59,0,0,1,84,48.91c-.43,1.14-1,2.23-1.56,3.44-1.29,2.94-.88,6.17-.79,9.29l4.66-1.26-.08-.14a4.37,4.37,0,0,1-.12-.52c.08.42,0-.44,0-.44-.07-.71-.15-1.43-.23-2.14a2.55,2.55,0,0,0-2.5-2.5,2.52,2.52,0,0,0-2.5,2.5Z"
                          />
                          <path
                            class="cls-2"
                            d="M66.27,64.38c-3.14.07-6.28.15-9.42.26a2.5,2.5,0,0,0,0,5c3.14-.11,6.28-.19,9.42-.26a2.5,2.5,0,0,0,0-5Z"
                          />
                          <path
                            class="cls-8"
                            d="M46.05,43.08s6,0,9.82-1.22a3.93,3.93,0,0,1,1.81-.18c1.2.19,2.32,1.57,3.83,2a4.13,4.13,0,0,0,2.1,0c1.69-.47,1.89-1.45,3.15-2,2-.86,3.53.84,7.61,1.37a17.71,17.71,0,0,0,4,.06"
                          />
                          <path
                            class="cls-1"
                            d="M51.14,16.46a11.48,11.48,0,0,1,2.38-8.74A12.76,12.76,0,0,1,60,3.55"
                          />
                          <path
                            class="cls-8"
                            d="M34.47,45.78s0,0,.06-.06a33.5,33.5,0,0,1,4.57-3.83"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </Col>
                <Col className="pt-3 symptoms">
                  <h6>Tell us your symptoms</h6>
                  <small style={{ color: "#163948" }}>
                    Select your symptoms from the body model or use the search
                    feature below.
                  </small>
                  <Select
                    options={symptomsOptions}
                    isMulti
                    value={this.state.selectedOption1}
                    onChange={this.handleMultiSelect}
                    placeholder="Searh e.g, Acne"
                  ></Select>
                </Col>
              </Row>
              <Row className="p-3">
                {/* <Col>
                {this.state.symptoms === 1 && (
                  <Card
                    className="pt-3 pl-3 shadow symptoms"
                    style={{ backgroundColor: "#BCD8DF", height: "100%" }}
                  >
                    <h6>Symptoms associated with menstrual health:</h6>
                    <Row>
                      <Col md="auto" className="d-flex">
                        <Card
                          className="symptoms-1 shadow"
                          onClick={() => {
                            this.handleFilter("1");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "1"
                            )
                              ? "#0d8dad"
                              : "white",
                          }}
                        >
                          painful periods
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-1 shadow"
                          style={{
                            width: "200px",
                            backgroundColor:
                              this.state.activeFilters.includes("b1") ||
                              this.state.activeFilters.includes("b2") ||
                              this.state.activeFilters.includes("b3")
                                ? "#0d8dad"
                                : "white",
                          }}
                        >
                          <Select
                            isClearable
                            placeholder="Abnormal bleeding"
                            value={this.state.selectedOption}
                            onChange={this.handleSelect}
                            options={options}
                          />
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-1 shadow"
                          onClick={() => {
                            this.handleFilter("c");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "c"
                            )
                              ? "#0d8dad"
                              : "white",
                          }}
                        >
                          Abnormal vaginal discharge
                        </Card>
                      </Col>

                      <Col md="auto" className="d-flex">
                        <Card
                          className="symptoms-1 shadow"
                          onClick={() => {
                            this.handleFilter("d");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "d"
                            )
                              ? "#0d8dad"
                              : "white",
                          }}
                        >
                          Vaginal dryness
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-1 shadow"
                          onClick={() => {
                            this.handleFilter("e");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "e"
                            )
                              ? "#0d8dad"
                              : "white",
                          }}
                        >
                          painful sexual intercourse
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-1 shadow"
                          onClick={() => {
                            this.handleFilter("f");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "f"
                            )
                              ? "#0d8dad"
                              : "white",
                          }}
                        >
                          Bleeding after sex
                        </Card>
                      </Col>
                    </Row>
                    <a
                      className="text-right pr-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({
                          symptoms: 2,
                        });
                      }}
                    >
                      More associated symptoms{" "}
                      <FontAwesomeIcon icon={faAngleRight} />
                    </a>
                  </Card>
                )}

                {this.state.symptoms === 2 && (
                  <Card
                    className="pt-3 pl-3 shadow symptoms"
                    style={{ backgroundColor: "#f3bd1a8f", height: "100%" }}
                  >
                    <h6>Symptoms associated with menstrual health:</h6>
                    <Row>
                      <Col md="auto" className="d-flex">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("g");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "g"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Acne
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          style={{
                            width: "200px",
                            backgroundColor:
                              this.state.activeFilters.includes("h1") ||
                              this.state.activeFilters.includes("h2")
                                ? "#F3BD1A"
                                : "white",
                          }}
                        >
                          <Select
                            isClearable
                            className="h-100"
                            placeholder="Changes in weight"
                            value={this.state.selectedOption2}
                            onChange={this.handleSelect2}
                            options={options2}
                          />
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("i");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "i"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Hirsutism
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("j");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "j"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          painful urination
                        </Card>
                      </Col>
                      <Col md="auto" className="d-flex">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("k");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "k"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Fever/chills
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("l");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "l"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Hair loss
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("m");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "m"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Dry skin
                        </Card>
                      </Col>

                      <Col md="auto" className="d-flex">
                        <Card
                          className="symptoms-2 shadow"
                          style={{
                            width: "200px",
                            backgroundColor:
                              this.state.activeFilters.includes("n1") ||
                              this.state.activeFilters.includes("n2")
                                ? "#F3BD1A"
                                : "white",
                          }}
                        >
                          <Select
                            isClearable
                            className="h-100"
                            placeholder="Irregular bowel movement"
                            value={this.state.selectedOption3}
                            onChange={this.handleSelect3}
                            options={options3}
                          />
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("o");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "o"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Nipple discharge
                        </Card>
                      </Col>
                      <Col md="auto">
                        <Card
                          className="symptoms-2 shadow"
                          onClick={() => {
                            this.handleFilter("p");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "p"
                            )
                              ? "#F3BD1A"
                              : "white",
                          }}
                        >
                          Changes in mood
                        </Card>
                      </Col>
                    </Row>
                    <a
                      className="text-right pr-3"
                      onClick={() => {
                        this.setState({
                          symptoms: 1,
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} /> Back
                    </a>
                  </Card>
                )}
              </Col>
              */}
                <Col>
                  {/* <Row>
                    <Col className="py-3 text-center">
                      <h6 style={{ fontWeight: "bold" }}>
                        {this.state.activeCauses.length === 0
                          ? " Select a symptom for more information"
                          : "You could be suffering from" +
                            this.state.activeCauses.map((val, i) => {
                              if (i === this.state.activeCauses.length - 1) {
                                return " " + causes[val] + ".";
                              } else return " " + causes[val];
                            })}
                      </h6>
                    </Col>
                  </Row> */}

                  <Card className="pt-3 pl-3 shadow" style={{ height: "100%" }}>
                    {/* <h6 style={{ fontWeight: "bold" }}>Underlying Causes:</h6> */}
                    <Row>
                      <Col className="py-3 text-center">
                        <h6 style={{ fontWeight: "bold" }}>
                          {this.state.activeCauses.length === 0
                            ? " Select a symptom for more information"
                            : "You could be suffering from" +
                              this.state.activeCauses.map((val, i) => {
                                if (i === this.state.activeCauses.length - 1) {
                                  return " " + causes[val] + ".";
                                } else return " " + causes[val];
                              })}
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["b1", "b2", "g", "h1", "i", "l", "p"],
                              1
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">PCOS</div>
                          {!this.handleCauses(
                            ["b1", "b2", "g", "h1", "i", "l", "p"],
                            1
                          ) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.PCOS.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.a}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.b1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.b2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.b3}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.c}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.d}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.e}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.f}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.g}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.h1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.h2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.i}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.j}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.n1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.n2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.PCOS.p}</small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["a", "b1", "b2", "e"],
                              2
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Endometriosis
                          </div>
                          {!this.handleCauses(["a", "b1", "b2", "e"], 2) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.Endometriosis.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.a}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.b1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.b2}
                              </small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.b3}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.c}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.d}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.e}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.f}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.g}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.h1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.h2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.i}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.j}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.k}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.l}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.m}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.n1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.n2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.o}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>
                                {this.state.dataArray.Endometriosis.p}
                              </small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["b1", "b2", "h1", "k", "l", "m", "n1", "p"],
                              3
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Hypothyroidism
                          </div>
                          {!this.handleCauses(
                            ["b1", "b2", "h1", "k", "l", "m", "n1", "p"],
                            3
                          ) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.a}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.b1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.b2}
                              </small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.b3}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.c}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.d}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.e}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.f}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.g}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.h1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.h2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.i}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.j}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.k}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.l}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.m}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.n1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.n2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.o}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>
                                {this.state.dataArray.Thyroidism_hypo.p}
                              </small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["b1", "h2", "k", "l", "n2"],
                              4
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Hyperthyroidism
                          </div>
                          {!this.handleCauses(
                            ["b1", "h2", "k", "l", "n2"],
                            4
                          ) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.Thy_hyper.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.a}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.b1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.b2}</small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.b3}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.c}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.d}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.e}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.f}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.g}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.h1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.h2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.i}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.j}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.n1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.n2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.Thy_hyper.p}</small>
                            </div>
                          )}
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["b1", "b2", "o"],
                              5
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Hyperprolactinemia
                          </div>
                          {!this.handleCauses(["b1", "b2", "o"], 5) && (
                            <div className="">
                              <small>
                                {
                                  this.state.dataArray.Hyper_prolactinemia
                                    .Main_Text
                                }
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.a}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.b1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.b2}
                              </small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.b3}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.c}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.d}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.e}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.f}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.g}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.h1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.h2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.i}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.j}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.k}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.l}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.m}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.n1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.n2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.o}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>
                                {this.state.dataArray.Hyper_prolactinemia.p}
                              </small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["a", "b3", "c", "e", "j", "k"],
                              6
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">PID/ STI's</div>
                          {!this.handleCauses(
                            ["a", "b3", "c", "e", "j", "k"],
                            6
                          ) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.PID.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>{this.state.dataArray.PID.a}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>{this.state.dataArray.PID.b1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>{this.state.dataArray.PID.b2}</small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>{this.state.dataArray.PID.b3}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>{this.state.dataArray.PID.c}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>{this.state.dataArray.PID.d}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>{this.state.dataArray.PID.e}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>{this.state.dataArray.PID.f}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>{this.state.dataArray.PID.g}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>{this.state.dataArray.PID.h1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>{this.state.dataArray.PID.h2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>{this.state.dataArray.PID.i}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>{this.state.dataArray.PID.j}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.PID.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.PID.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.PID.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>{this.state.dataArray.PID.n1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>{this.state.dataArray.PID.n2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.PID.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.PID.p}</small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["b1", "d", "p"],
                              7
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">POF</div>
                          {!this.handleCauses(["b1", "d", "p"], 7) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.POF.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>{this.state.dataArray.POF.a}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>{this.state.dataArray.POF.b1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>{this.state.dataArray.POF.b2}</small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>{this.state.dataArray.POF.b3}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>{this.state.dataArray.POF.c}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>{this.state.dataArray.POF.d}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>{this.state.dataArray.POF.e}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>{this.state.dataArray.POF.f}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>{this.state.dataArray.POF.g}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>{this.state.dataArray.POF.h1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>{this.state.dataArray.POF.h2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>{this.state.dataArray.POF.i}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>{this.state.dataArray.POF.j}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.POF.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.POF.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.POF.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>{this.state.dataArray.POF.n1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>{this.state.dataArray.POF.n2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.POF.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.POF.p}</small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["a", "b1", "b2", "b3", "f", "j"],
                              8
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Uterine fibroids
                          </div>
                          {!this.handleCauses(
                            ["a", "b1", "b2", "b3", "f", "j"],
                            8
                          ) && (
                            <div className="">
                              <small>
                                {
                                  this.state.dataArray.Uterine_Fibroids
                                    .Main_Text
                                }
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.a}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.b1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.b2}
                              </small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.b3}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.c}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.d}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.e}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.f}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.g}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.h1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.h2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.i}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.j}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.k}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.l}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.m}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.n1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.n2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.o}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>
                                {this.state.dataArray.Uterine_Fibroids.p}
                              </small>
                            </div>
                          )}
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(
                              ["b1", "h2", "k", "l", "p"],
                              9
                            )
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Eating disorders
                          </div>
                          {!this.handleCauses(
                            ["b1", "h2", "k", "l", "p"],
                            9
                          ) && (
                            <div className="">
                              <small>
                                {
                                  this.state.dataArray.Eating_Disorders
                                    .Main_Text
                                }
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.a}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.b1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.b2}
                              </small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.b3}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.c}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.d}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.e}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.f}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.g}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.h1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.h2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.i}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.j}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.k}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.l}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.m}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.n1}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.n2}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.o}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>
                                {this.state.dataArray.Eating_Disorders.p}
                              </small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(["p"], 10)
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">Stress</div>
                          {!this.handleCauses(["p"], 10) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.Stress.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>{this.state.dataArray.Stress.a}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>{this.state.dataArray.Stress.b1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>{this.state.dataArray.Stress.b2}</small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>{this.state.dataArray.Stress.b3}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>{this.state.dataArray.Stress.c}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>{this.state.dataArray.Stress.d}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>{this.state.dataArray.Stress.e}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>{this.state.dataArray.Stress.f}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>{this.state.dataArray.Stress.g}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>{this.state.dataArray.Stress.h1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>{this.state.dataArray.Stress.h2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>{this.state.dataArray.Stress.i}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>{this.state.dataArray.Stress.j}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.Stress.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.Stress.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.Stress.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>{this.state.dataArray.Stress.n1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>{this.state.dataArray.Stress.n2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.Stress.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.Stress.p}</small>
                            </div>
                          )}
                        </Card>
                      </Col>
                      <Col className="text-center my-3">
                        <Card
                          className="py-auto causes shadow"
                          style={{
                            height: "100%",
                            backgroundColor: this.handleCauses(["p"], 11)
                              ? "#bd8f88"
                              : "white",
                          }}
                        >
                          <div className="sub-header-all mb-3">
                            Drugs/contraceptives
                          </div>
                          {!this.handleCauses(["p"], 11) && (
                            <div className="">
                              <small>
                                {this.state.dataArray.D_C.Main_Text}
                              </small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("a") && (
                            <div>
                              <small>{this.state.dataArray.D_C.a}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b1") && (
                            <div>
                              <small>{this.state.dataArray.D_C.b1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("b2") && (
                            <div>
                              <small>{this.state.dataArray.D_C.b2}</small>
                            </div>
                          )}{" "}
                          {this.state.activeFilters.includes("b3") && (
                            <div>
                              <small>{this.state.dataArray.D_C.b3}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("c") && (
                            <div>
                              <small>{this.state.dataArray.D_C.c}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("d") && (
                            <div>
                              <small>{this.state.dataArray.D_C.d}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("e") && (
                            <div>
                              <small>{this.state.dataArray.D_C.e}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("f") && (
                            <div>
                              <small>{this.state.dataArray.D_C.f}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("g") && (
                            <div>
                              <small>{this.state.dataArray.D_C.g}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h1") && (
                            <div>
                              <small>{this.state.dataArray.D_C.h1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("h2") && (
                            <div>
                              <small>{this.state.dataArray.D_C.h2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("i") && (
                            <div>
                              <small>{this.state.dataArray.D_C.i}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("j") && (
                            <div>
                              <small>{this.state.dataArray.D_C.j}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("k") && (
                            <div>
                              <small>{this.state.dataArray.D_C.k}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("l") && (
                            <div>
                              <small>{this.state.dataArray.D_C.l}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("m") && (
                            <div>
                              <small>{this.state.dataArray.D_C.m}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n1") && (
                            <div>
                              <small>{this.state.dataArray.D_C.n1}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("n2") && (
                            <div>
                              <small>{this.state.dataArray.D_C.n2}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("o") && (
                            <div>
                              <small>{this.state.dataArray.D_C.o}</small>
                            </div>
                          )}
                          {this.state.activeFilters.includes("p") && (
                            <div>
                              <small>{this.state.dataArray.D_C.p}</small>
                            </div>
                          )}
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              {/* <Row>
                  <Col className="py-3 text-center">
                    <h6 style={{ fontWeight: "bold" }}>
                      {this.state.activeCauses.length === 0
                        ? " Select a symptom for more information"
                        : "You could be suffering from" +
                          this.state.activeCauses.map((val, i) => {
                            if (i === this.state.activeCauses.length - 1) {
                              return " " + causes[val] + ".";
                            } else return " " + causes[val];
                          })}
                    </h6>
                  </Col>
                </Row> */}

              <Row className="mt-5">
                <Col
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                  }}
                >
                  <h1
                    className="header-all text-center mt-5"
                    style={{
                      fontFamily: "montserrat, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Talk to a specialist
                  </h1>
                  <div className="detail-all">
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
          )}

          <Share />
        </Container>
      </div>
    );
  }
}
