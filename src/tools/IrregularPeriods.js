import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "reactstrap";
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
  };
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
    if (activeFilters.includes("2a")) {
      var index = activeFilters.indexOf("2a");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("2b")) {
      var index = activeFilters.indexOf("2b");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("2c")) {
      var index = activeFilters.indexOf("2c");
      activeFilters.splice(index, 1);
    }

    if (selectedOption) activeFilters.push(selectedOption.value);

    this.setState(
      {
        activeFilters,
        selectedOption,
        activeCauses: [],
      },
      () => {
        console.log(selectedOption, this.state.selectedOption);
      }
    );
  };
  handleSelect2 = (selectedOption2) => {
    this.setState({
      selectedOption2,
    });
    const activeFilters = this.state.activeFilters;
    if (activeFilters.includes("8a")) {
      var index = activeFilters.indexOf("8a");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("8b")) {
      var index = activeFilters.indexOf("8b");
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
    if (activeFilters.includes("14a")) {
      var index = activeFilters.indexOf("14a");
      activeFilters.splice(index, 1);
    } else if (activeFilters.includes("14b")) {
      var index = activeFilters.indexOf("14b");
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
      if (JSON.stringify(array) === JSON.stringify(["16"])) {
        if (this.state.activeFilters.includes("16")) {
          activeCauses.push(cause);

          return true;
        } else {
          return false;
        }
      } else {
        if (this.state.activeFilters.every((val) => array.includes(val))) {
          // var activeCauses = this.state.activeCauses;
          activeCauses.push(cause);
          // this.setState({
          //   activeCauses,
          // });
          return true;
        } else {
          return false;
        }
      }
      this.setState({
        activeCauses,
      });
    } else return false;
  };
  render() {
    const options = [
      { value: "2a", label: "No Bleeding" },
      { value: "2b", label: "Heavy Bleeding" },
      {
        value: "2c",

        label: "Inter-menstrual Spotting",
      },
    ];
    const options2 = [
      { value: "8a", label: "Weight gain" },
      { value: "8b", label: "Weight loss" },
    ];
    const options3 = [
      { value: "14a", label: "Constipation" },
      { value: "14b", label: "Diarrhoea" },
    ];
    console.log(this.state.activeFilters);
    return (
      <Container fluid className="p-3">
        {/* <div className="bc-tiles-wrapper mb-4">
          <div className="bc-tiles-intro-text w-75 mx-auto">
            <h1 style={{ fontFamily: "montserrat" }}>Irregular Periods</h1>
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
        </div> */}

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
                degree of irregularity in their periods. While lifestyle changes
                play a key role, there could be any number of underlying causes.
                We’re here to help you better understand your period.
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
                  in identifying the underlying cause of your irregular periods.
                  <br></br>
                  <br></br>
                  Highlight the symptoms you might be experiencing.
                </h5>
              </div>
            </Card>
            <Row className="p-3">
              <Col>
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
                              this.state.activeFilters.includes("2a") ||
                              this.state.activeFilters.includes("2b") ||
                              this.state.activeFilters.includes("2c")
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
                            this.handleFilter("3");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "3"
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
                            this.handleFilter("4");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "4"
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
                            this.handleFilter("5");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "5"
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
                            this.handleFilter("6");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "6"
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
                            this.handleFilter("7");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "7"
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
                              this.state.activeFilters.includes("8a") ||
                              this.state.activeFilters.includes("8b")
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
                            this.handleFilter("9");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "9"
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
                            this.handleFilter("10");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "10"
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
                            this.handleFilter("11");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "11"
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
                            this.handleFilter("12");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "12"
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
                            this.handleFilter("13");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "13"
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
                              this.state.activeFilters.includes("14a") ||
                              this.state.activeFilters.includes("14b")
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
                            this.handleFilter("15");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "15"
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
                            this.handleFilter("16");
                          }}
                          style={{
                            backgroundColor: this.state.activeFilters.includes(
                              "16"
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
              <Col>
                <Card
                  className="pt-3 pl-3 shadow"
                  style={{ backgroundColor: "#e2bab4", height: "100%" }}
                >
                  <h6 style={{ fontWeight: "bold" }}>Underlying Causes:</h6>
                  <Row>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["2a", "2b", "7", "8a", "9", "12", "16"],
                            1
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        PCOS
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["1", "2a", "2b", "5"],
                            2
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Endometriosis
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["2a", "2b", "8a", "11", "12", "13", "14a", "16"],
                            3
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Thyroidism (hypo)
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["2a", "8b", "11", "12", "14b"],
                            4
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Thyroidism (hyper)
                      </Card>
                    </Col>

                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["2a", "2b", "15"],
                            5
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Hyperprolactinemia
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["1", "2c", "3", "5", "10", "11"],
                            6
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        PID/ STI's
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["2a", "4", "16"],
                            7
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        POF
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["1", "2a", "2b", "2c", "6", "10"],
                            8
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Uterine fibroids
                      </Card>
                    </Col>

                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(
                            ["2a", "8b", "11", "12", "16"],
                            9
                          )
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Eating disorders
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(["16"], 10)
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Stress (TBU)
                      </Card>
                    </Col>
                    <Col md="auto">
                      <Card
                        className="py-auto causes shadow"
                        style={{
                          backgroundColor: this.handleCauses(["16"], 11)
                            ? "#bd8f88"
                            : "white",
                        }}
                      >
                        Drugs/contraceptives
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Card className="shadow">
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
                <Col
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
                Share the timeline. Spread the word. Help your friends put some
                structure to the fertility mystery
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
    );
  }
}
