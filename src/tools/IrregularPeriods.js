import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
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
      q1: q,
      icon: true,
    });
  };
  handleQ1_1 = (q) => {
    this.setState({
      q1_1: q,
      icon: true,
    });
  };
  handleQ2 = (q) => {
    this.setState({
      q2: q,
      icon: true,
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

        label: "Inter-menstrual Spotting",
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
      { value: "a", label: "Painfull periods" },
      { value: "b1", label: "No Bleeding" },
      { value: "b2", label: "Heavy Bleeding" },
      {
        value: "b3",
        label: "Inter-menstrual Spotting",
      },
      { value: "c", label: "Abnormal vaginal discharge" },
      { value: "d", label: "Vaginal dryness" },
      { value: "e", label: "Painfull sexual intercourse" },
      { value: "f", label: "Bleeding after sex" },
      { value: "g", label: "Acne" },
      { value: "h1", label: "Weight gain" },
      { value: "h2", label: "Weight loss" },
      { value: "i", label: "Hirsutism" },
      { value: "j", label: "Painfull urination" },
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
        <Container fluid className="p-3">
          <div className="bc-tiles-wrapper mb-4">
            <div className="bc-tiles-intro-text w-75 mx-auto">
              <h1 style={{ fontFamily: "montserrat" }}>Irregular Periods</h1>
              <div className="d-block">
                <p>
                  Irregular menstrual cycles are not just inconvenient.
                  Irregular ovulation may be indicative of underlying conditions
                  such as PCOS, thyroid, excess prolactin, inflamed pelvic
                  region, or ovary dysfunction. Take a test to understand
                  potential root causes and have more informed discussion with
                  your doctor.
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

          <Row className="">
            <Col>
              <Card className="text-center justify-content-center shadow border-0 px-5 py-5">
                <h2
                  style={{
                    fontFamily: "montserrat",
                    color: "#163948",
                    fontWeight: "bold",
                  }}
                >
                  Do you struggle with irregular periods?
                </h2>
                <h5
                  className="mx-auto mt-3"
                  style={{ fontFamily: "lora", maxWidth: "800px" }}
                >
                  Studies show that at least 14% of all women struggle with some
                  degree of irregularity in their periods. While lifestyle
                  changes play a key role, there could be any number of
                  underlying causes. We’re here to help you better understand
                  your period.
                </h5>
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
            <Row className="p-3 questions">
              <Col className="">
                <Card
                  className="shadow p-3"
                  style={{ backgroundColor: "#BCD8DF" }}
                >
                  <h6>
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
                  <h6 className="">Nature of flow?</h6>
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
                  <h6>
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
                  <h6 className="text-center mx-4">
                    Irregularity in periods may manifest in many different types
                    and be caused by any number of factors.
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
                        style={{ display: this.state.q1_1 ? "block" : "none" }}
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
                      color: "white",
                      borderColor: "white",
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
                <Col>
                  <div>
                    <div style={{ lineHeight: 0 }}>
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
                      <img
                        id="B1"
                        src={require("../download/bodyModel/B1.png")}
                      ></img>
                    </div>
                    <div style={{ lineHeight: 0 }}>
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
                      <img
                        id="B2"
                        src={require("../download/bodyModel/B2.png")}
                      ></img>
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
                                label: "Inter-menstrual Spotting",
                              },
                            ])
                          }
                        >
                          Inter-menstrual Spotting
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
                          Painfull periods
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
                          Painfull sexual intercourse
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
                          Painfull urination
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
                    <h6 style={{ fontWeight: "bold" }}>Underlying Causes:</h6>
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
                          PCOS
                          {!this.handleCauses(
                            ["b1", "b2", "g", "h1", "i", "l", "p"],
                            1
                          ) && (
                            <div className="mt-3">
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
                          )}{" "}
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
                          Endometriosis
                          {!this.handleCauses(["a", "b1", "b2", "e"], 2) && (
                            <div className="mt-3">
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
                          Thyroidism (hypo)
                          {!this.handleCauses(
                            ["b1", "b2", "h1", "k", "l", "m", "n1", "p"],
                            3
                          ) && (
                            <div className="mt-3">
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
                          Thyroidism (hyper)
                          {!this.handleCauses(
                            ["b1", "h2", "k", "l", "n2"],
                            4
                          ) && (
                            <div className="mt-3">
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
                          Hyperprolactinemia
                          {!this.handleCauses(["b1", "b2", "o"], 5) && (
                            <div className="mt-3">
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
                          PID/ STI's
                          {!this.handleCauses(
                            ["a", "b3", "c", "e", "j", "k"],
                            6
                          ) && (
                            <div className="mt-3">
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
                          POF
                          {!this.handleCauses(["b1", "d", "p"], 7) && (
                            <div className="mt-3">
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
                          Uterine fibroids
                          {!this.handleCauses(
                            ["a", "b1", "b2", "b3", "f", "j"],
                            8
                          ) && (
                            <div className="mt-3">
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
                          Eating disorders
                          {!this.handleCauses(
                            ["b1", "h2", "k", "l", "p"],
                            9
                          ) && (
                            <div className="mt-3">
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
                          Stress (TBU)
                          {!this.handleCauses(["p"], 10) && (
                            <div className="mt-3">
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
                          Drugs/contraceptives
                          {!this.handleCauses(["p"], 11) && (
                            <div className="mt-3">
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
              <Card className="shadow">
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

                <Row>
                  {/* <Col
                    style={{
                      borderTop: "1px dashed black",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{
                        // position: "absolute",
                        // bottom: "0",
                        width: "90%",
                        background: "bottom",
                        color: "black",
                      }}
                    >
                      Explore all Causes
                    </Button>
                  </Col>
                  */}
                  <Col
                    className=""
                    style={{
                      backgroundColor: "#163948",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      minHeight: "500px",
                      maxHeight: "100%",
                    }}
                  >
                    {!this.state.aBooked && (
                      <div className="">
                        <div>
                          <FontAwesomeIcon
                            icon={faUserMd}
                            style={{
                              color: "white",
                              fontSize: "100px",
                            }}
                            className="my-auto"
                          />
                        </div>
                        <div className="mt-3">
                          <Button>Book an appointment</Button>
                        </div>
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
              </Card>
            </div>
          )}

          <div className="mt-5">
            <div className="bc-tiles-intro-text">
              <h2>Share now</h2>
              <div className="bc-tiles-intro-details">
                <p>
                  Share the timeline. Spread the word. Help your friends put
                  some structure to the fertility mystery
                </p>

                {/* <!-- <p><strong>Pick what’s important to you to find your best birth control method:</strong></p> -->  */}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <a
                className="pl-4"
                href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
                target="_blank"
                rel="noopener"
                aria-label=""
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{ fontSize: "50px", color: "#475993" }}
                />
              </a>

              <a
                className="pl-4"
                href="https://twitter.com/intent/tweet/?text=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
                target="_blank"
                rel="noopener"
                aria-label=""
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ fontSize: "50px", color: "#76a9ea" }}
                />
              </a>

              <a
                className="pl-4"
                href="mailto:?subject=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;body=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
                target="_self"
                rel="noopener"
                aria-label=""
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: "50px", color: "#fdbf04" }}
                />
              </a>

              <a
                className="pl-4"
                href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F&amp;title=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;summary=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;source=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
                target="_blank"
                rel="noopener"
                aria-label=""
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  style={{ fontSize: "50px", color: "#0077b7" }}
                />
              </a>

              <a
                className="pl-4"
                href="whatsapp://send?text=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!%20http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
                target="_blank"
                rel="noopener"
                aria-label=""
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  style={{ fontSize: "50px", color: "7ad06d" }}
                />
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
