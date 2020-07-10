import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faChevronCircleRight,
  faChevronCircleLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import React, { Component } from "react";

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
  Button,
  CardFooter,
} from "reactstrap";

import ReactPaginate from "react-paginate";

import methods from "./Methods.js";

import Header from "./components/Header.js";
export default class SkinHair extends Component {
  state = {
    activeFilters: [],
    valDataArray: null,
    finalValDataArray: null,
    hairArray: null,
    finalHirsArray: null,
    finalHairArray: null,
    hirsArray: null,
    category: null,
    subCategory: null,
    activeCard: null,
    pageCount1: null,
    pageCount2: null,
    pageCount3: null,
    selectedPage: 0,
  };
  componentDidMount = () => {
    document.title = "Skin/Hair Treatment";
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
    database
      .ref("19zz3FRFWWFg9QqE_q1S-mQmq0nU_flxLu5be9XxDqu8/HairLoss")
      .on("value", (snapshot) => {
        var dataArray = snapshot.val();
        console.log(dataArray);
        var hairArray = Object.values(dataArray);
        console.log(hairArray);
        this.setState({ hairArray });
      });
    database
      .ref("19zz3FRFWWFg9QqE_q1S-mQmq0nU_flxLu5be9XxDqu8/Hirsutism")
      .on("value", (snapshot) => {
        var dataArray = snapshot.val();
        console.log(dataArray);
        var hirsArray = Object.values(dataArray);
        console.log(hirsArray);
        this.setState({ hirsArray });
      });
  };
  handleCategory = (category) => {
    this.setState({
      category,
    });

    {
      var valDataArray = this.state.valDataArray;
      var pageCount1 =
        valDataArray.length % 8 === 0
          ? Math.floor(valDataArray.length / 8)
          : Math.floor(valDataArray.length / 8) + 1;
      var finalValDataArray = [];
      for (let i = 0; i < pageCount1; i++) {
        if (i === pageCount1 - 1) {
          finalValDataArray[i] = valDataArray.slice(i * 8);
        } else {
          finalValDataArray[i] = valDataArray.slice(i * 8, i * 8 + 8);
        }
      }
      console.log();
      this.setState({
        pageCount1,
        finalValDataArray,
      });
    }
    {
      var hirsArray = this.state.hirsArray;
      var pageCount2 =
        hirsArray.length % 8 === 0
          ? Math.floor(hirsArray.length / 8)
          : Math.floor(hirsArray.length / 8) + 1;
      var finalHirsArray = [];
      for (let i = 0; i < pageCount2; i++) {
        if (i === pageCount2 - 1) {
          finalHirsArray[i] = hirsArray.slice(i * 8);
        } else {
          finalHirsArray[i] = hirsArray.slice(i * 8, i * 8 + 8);
        }
      }
      this.setState({
        pageCount2,
        finalHirsArray,
      });
    }
    {
      var hairArray = this.state.hairArray;
      var pageCount3 =
        hairArray.length % 8 === 0
          ? Math.floor(hairArray.length / 8)
          : Math.floor(hairArray.length / 8) + 1;
      var finalHairArray = [];
      for (let i = 0; i < pageCount3; i++) {
        if (i === pageCount3 - 1) {
          finalHairArray[i] = hairArray.slice(i * 8);
        } else {
          finalHairArray[i] = hairArray.slice(i * 8, i * 8 + 8);
        }
      }
      this.setState({
        pageCount3,
        finalHairArray,
      });
    }
  };
  handlePagination = (event) => {
    console.log(event.selected);
    this.setState({
      selectedPage: event.selected,
    });
  };
  selectSubCategory = (subCategory) => {
    this.setState({
      subCategory: this.state.subCategory === subCategory ? null : subCategory,
    });
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
    return (
      <>
        {this.state.valDataArray === null ||
        this.state.hairArray === null ||
        this.state.hirsArray === null ? (
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
              <Row className="justify-content-center text-center mt-3">
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  md="2"
                >
                  <Card
                    onClick={() => {
                      this.handleCategory("Acne");
                    }}
                    style={{
                      backgroundColor:
                        this.state.category === "Acne" ? "#163948" : "white",
                      color:
                        this.state.category === "Acne" ? "white" : "#163948",
                    }}
                    className="skin-category"
                  >
                    Acne
                  </Card>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  md="2"
                >
                  <Card
                    onClick={() => {
                      this.handleCategory("Hirsutism");
                    }}
                    style={{
                      backgroundColor:
                        this.state.category === "Hirsutism"
                          ? "#163948"
                          : "white",
                      color:
                        this.state.category === "Hirsutism"
                          ? "white"
                          : "#163948",
                    }}
                    className="skin-category"
                  >
                    Hirsutism
                  </Card>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  md="2"
                >
                  <Card
                    onClick={() => {
                      this.handleCategory("Hair Loss");
                    }}
                    style={{
                      backgroundColor:
                        this.state.category === "Hair Loss"
                          ? "#163948"
                          : "white",
                      color:
                        this.state.category === "Hair Loss"
                          ? "white"
                          : "#163948",
                    }}
                    className="skin-category"
                  >
                    Hair Loss
                  </Card>
                </Col>
              </Row>
              <Row className="mt-5" style={{ padding: "0px 200px" }}>
                <Col className="skin-sub-category">
                  <Card
                    style={{
                      backgroundColor:
                        this.state.subCategory === "Topical"
                          ? "#163948"
                          : "white",
                      color:
                        this.state.subCategory === "Topical"
                          ? "white"
                          : "#163948",
                    }}
                    onClick={() => {
                      this.selectSubCategory("Topical");
                    }}
                  >
                    Topical
                  </Card>
                </Col>
                <Col className="skin-sub-category">
                  <Card
                    style={{
                      backgroundColor:
                        this.state.subCategory === "Oral" ? "#163948" : "white",
                      color:
                        this.state.subCategory === "Oral" ? "white" : "#163948",
                    }}
                    onClick={() => {
                      this.selectSubCategory("Oral");
                    }}
                  >
                    Oral
                  </Card>
                </Col>
                <Col className="skin-sub-category">
                  <Card
                    style={{
                      backgroundColor:
                        this.state.subCategory === "Cosmetic"
                          ? "#163948"
                          : "white",
                      color:
                        this.state.subCategory === "Cosmetic"
                          ? "white"
                          : "#163948",
                    }}
                    onClick={() => {
                      this.selectSubCategory("Cosmetic");
                    }}
                  >
                    Cosmetic
                  </Card>
                </Col>
                <Col className="skin-sub-category">
                  <Card
                    style={{
                      backgroundColor:
                        this.state.subCategory === "Diet" ? "#163948" : "white",
                      color:
                        this.state.subCategory === "Diet" ? "white" : "#163948",
                    }}
                    onClick={() => {
                      this.selectSubCategory("Diet");
                    }}
                  >
                    Diet
                  </Card>
                </Col>
                <Col className="skin-sub-category">
                  <Card
                    style={{
                      backgroundColor:
                        this.state.subCategory === "Therapy"
                          ? "#163948"
                          : "white",
                      color:
                        this.state.subCategory === "Therapy"
                          ? "white"
                          : "#163948",
                    }}
                    onClick={() => {
                      this.selectSubCategory("Therapy");
                    }}
                  >
                    Therapy
                  </Card>
                </Col>
                <Col className="skin-sub-category">
                  <Card
                    style={{
                      backgroundColor:
                        this.state.subCategory === "Home Remedies"
                          ? "#163948"
                          : "white",
                      color:
                        this.state.subCategory === "Home Remedies"
                          ? "white"
                          : "#163948",
                    }}
                    onClick={() => {
                      this.selectSubCategory("Home Remedies");
                    }}
                  >
                    Home Remedies
                  </Card>
                </Col>
              </Row>
              {this.state.category === "Acne" && (
                <div>
                  <Row className="mx-5">
                    {this.state.subCategory === null &&
                      this.state.finalValDataArray[this.state.selectedPage].map(
                        (card) => (
                          <Col
                            md={this.state.activeCard === card.Name ? "8" : "4"}
                            xl={this.state.activeCard === card.Name ? "6" : "3"}
                            className="my-3 text-center"
                            style={{
                              display: this.state.subCategory
                                ? card.Category === this.state.subCategory
                                  ? "block"
                                  : "none"
                                : "block",
                            }}
                          >
                            <Card
                              className="treat-card shadow h-100"
                              style={{
                                border: "3px solid #163948",
                                display: "flex",
                              }}
                            >
                              <Row className="h-100">
                                <Col
                                  onClick={() => {
                                    this.setState({
                                      activeCard:
                                        this.state.activeCard === card.Name
                                          ? null
                                          : card.Name,
                                    });
                                  }}
                                  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                  }}
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
                                      <h5
                                        className="sub-header-all"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {card.Name}
                                      </h5>
                                    </div>
                                    <div>{card.Text_Small_Tile}</div>
                                  </CardBody>
                                  <Row className="sh-tags">
                                    {card.OTC && (
                                      <Col
                                        className="mx-2"
                                        style={{
                                          borderRadius: "14px",
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
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
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
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
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
                                        }}
                                      >
                                        Side Effects
                                      </Col>
                                    )}
                                    {card.Doctor_Advice && (
                                      <Col
                                        className="mx-2"
                                        style={{
                                          borderRadius: "14px",
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
                                        }}
                                      >
                                        Doctor advice
                                      </Col>
                                    )}
                                  </Row>
                                </Col>
                                {this.state.activeCard === card.Name && (
                                  <React.Fragment>
                                    <Col
                                      md="auto"
                                      className="p-2"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "2px",
                                          height: "80%",
                                          backgroundColor: "#54595F",
                                        }}
                                      />
                                    </Col>
                                    <Col
                                      className="benefits"
                                      style={{
                                        display: "flex",
                                        flexFlow: "column",
                                      }}
                                    >
                                      <CardBody>
                                        <div className="sub-header-all">
                                          Benefits
                                        </div>
                                        <div className="text-left">
                                          {card.Text_Tile_Benefits.split(
                                            "|"
                                          ).map((str) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                style={{
                                                  fontSize: "0.4rem",
                                                  margin: "10px 3px 0px 0px",
                                                  color: "gray",
                                                }}
                                                icon={faCircle}
                                              />
                                              {str}
                                            </div>
                                          ))}
                                        </div>
                                      </CardBody>
                                      <div>
                                        <Button>Add to Cart</Button>
                                      </div>
                                    </Col>
                                  </React.Fragment>
                                )}
                              </Row>
                            </Card>
                          </Col>
                        )
                      )}
                    {this.state.subCategory &&
                      this.state.valDataArray.map((card) => (
                        <Col
                          md={this.state.activeCard === card.Name ? "8" : "4"}
                          xl={this.state.activeCard === card.Name ? "6" : "3"}
                          className="my-3 text-center"
                          style={{
                            display: this.state.subCategory
                              ? card.Category === this.state.subCategory
                                ? "block"
                                : "none"
                              : "block",
                          }}
                        >
                          <Card
                            className="treat-card shadow h-100"
                            style={{
                              border: "3px solid #163948",
                              display: "flex",
                            }}
                          >
                            <Row className="h-100">
                              <Col
                                onClick={() => {
                                  this.setState({
                                    activeCard:
                                      this.state.activeCard === card.Name
                                        ? null
                                        : card.Name,
                                  });
                                }}
                                style={{ display: "flex", flexFlow: "column" }}
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
                                    <h5
                                      className="sub-header-all"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {card.Name}
                                    </h5>
                                  </div>
                                  <div>{card.Text_Small_Tile}</div>
                                </CardBody>
                                <Row className="sh-tags">
                                  {card.OTC && (
                                    <Col
                                      className="mx-2"
                                      style={{
                                        borderRadius: "14px",
                                        backgroundColor: "#DDADA6",
                                        fontSize: ".7rem",
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
                                        backgroundColor: "#DDADA6",
                                        fontSize: ".7rem",
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
                                        backgroundColor: "#DDADA6",
                                        fontSize: ".7rem",
                                      }}
                                    >
                                      Side Effects
                                    </Col>
                                  )}
                                  {card.Doctor_Advice && (
                                    <Col
                                      className="mx-2"
                                      style={{
                                        borderRadius: "14px",
                                        backgroundColor: "#DDADA6",
                                        fontSize: ".7rem",
                                      }}
                                    >
                                      Doctor advice
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                              {this.state.activeCard === card.Name && (
                                <React.Fragment>
                                  <Col
                                    md="auto"
                                    className="p-2"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "2px",
                                        height: "80%",
                                        backgroundColor: "#54595F",
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    className="benefits"
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                    }}
                                  >
                                    <CardBody>
                                      <div className="sub-header-all">
                                        Benefits
                                      </div>
                                      <div className="text-left">
                                        {card.Text_Tile_Benefits.split("|").map(
                                          (str) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                style={{
                                                  fontSize: "0.4rem",
                                                  margin: "10px 3px 0px 0px",
                                                  color: "gray",
                                                }}
                                                icon={faCircle}
                                              />
                                              {str}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </CardBody>
                                    <div>
                                      <Button>Add to Cart</Button>
                                    </div>
                                  </Col>
                                </React.Fragment>
                              )}
                            </Row>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                  {this.state.subCategory === null && (
                    <Row className="mx-5">
                      <Col>
                        <ReactPaginate
                          pageCount={this.state.pageCount1}
                          pageRangeDisplayed={2}
                          marginPagesDisplayed={2}
                          initialPage={0}
                          forcePage={this.state.selectedPage}
                          breakLabel="..."
                          nextLabel={
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                          }
                          previousLabel={
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                          }
                          onPageChange={this.handlePagination}
                          containerClassName="pagination justify-content-end "
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          activeClassName="active"
                        ></ReactPaginate>
                      </Col>
                    </Row>
                  )}
                </div>
              )}
              {this.state.category === "Hair Loss" && (
                <div>
                  <Row className="mx-5">
                    {this.state.subCategory === null &&
                      this.state.finalHairArray[this.state.selectedPage].map(
                        (card) => (
                          <Col
                            md={this.state.activeCard === card.Name ? "8" : "4"}
                            xl={this.state.activeCard === card.Name ? "6" : "3"}
                            className="my-3 text-center"
                            style={{
                              display: this.state.subCategory
                                ? card.Category === this.state.subCategory
                                  ? "block"
                                  : "none"
                                : "block",
                            }}
                          >
                            <Card
                              className="treat-card shadow h-100"
                              style={{
                                border: "3px solid #163948",
                                display: "flex",
                              }}
                              onClick={() => {
                                this.setState({
                                  activeCard:
                                    this.state.activeCard === card.Name
                                      ? null
                                      : card.Name,
                                });
                              }}
                            >
                              <Row className="h-100">
                                <Col
                                  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                  }}
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
                                      <h5
                                        className="sub-header-all"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {card.Name}
                                      </h5>
                                    </div>
                                    <div>{card.Text_Small_Tile}</div>
                                  </CardBody>
                                  <Row className="sh-tags">
                                    {card.OTC && (
                                      <Col
                                        className="mx-2"
                                        style={{
                                          borderRadius: "14px",
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
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
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
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
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
                                        }}
                                      >
                                        Side Effects
                                      </Col>
                                    )}
                                    {card.Doctor_Advice && (
                                      <Col
                                        className="mx-2"
                                        style={{
                                          borderRadius: "14px",
                                          backgroundColor: "#DDADA6",
                                          fontSize: ".7rem",
                                        }}
                                      >
                                        Doctor advice
                                      </Col>
                                    )}
                                  </Row>
                                </Col>
                                {this.state.activeCard === card.Name && (
                                  <React.Fragment>
                                    <Col
                                      md="auto"
                                      className="p-2"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "2px",
                                          height: "80%",
                                          backgroundColor: "#54595F",
                                        }}
                                      />
                                    </Col>
                                    <Col
                                      className="benefits"
                                      style={{
                                        display: "flex",
                                        flexFlow: "column",
                                      }}
                                    >
                                      <CardBody>
                                        <div className="sub-header-all">
                                          Benefits
                                        </div>
                                        <div className="text-left">
                                          {card.Text_Tile_Benefits.split(
                                            "|"
                                          ).map((str) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                style={{
                                                  fontSize: "0.4rem",
                                                  margin: "10px 3px 0px 0px",
                                                  color: "gray",
                                                }}
                                                icon={faCircle}
                                              />
                                              {str}
                                            </div>
                                          ))}
                                        </div>
                                      </CardBody>
                                      <div>
                                        <Button>Add to Cart</Button>
                                      </div>
                                    </Col>
                                  </React.Fragment>
                                )}
                              </Row>
                            </Card>
                          </Col>
                        )
                      )}
                    {this.state.subCategory &&
                      this.state.hairArray.map((card) => (
                        <Col
                          md={this.state.activeCard === card.Name ? "8" : "4"}
                          xl={this.state.activeCard === card.Name ? "6" : "3"}
                          className="my-3 text-center"
                          style={{
                            display: this.state.subCategory
                              ? card.Category === this.state.subCategory
                                ? "block"
                                : "none"
                              : "block",
                          }}
                        >
                          <Card
                            className="treat-card shadow h-100"
                            style={{
                              border: "3px solid #163948",
                              display: "flex",
                            }}
                            onClick={() => {
                              this.setState({
                                activeCard:
                                  this.state.activeCard === card.Name
                                    ? null
                                    : card.Name,
                              });
                            }}
                          >
                            <Row className="h-100">
                              <Col
                                style={{ display: "flex", flexFlow: "column" }}
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
                                    <h5
                                      className="sub-header-all"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {card.Name}
                                    </h5>
                                  </div>
                                  <div>{card.Text_Small_Tile}</div>
                                </CardBody>
                                <Row className="sh-tags">
                                  {card.OTC && (
                                    <Col
                                      className="mx-2"
                                      style={{
                                        borderRadius: "14px",
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
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
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
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
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Side Effects
                                    </Col>
                                  )}
                                  {card.Doctor_Advice && (
                                    <Col
                                      className="mx-2"
                                      style={{
                                        borderRadius: "14px",
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Doctor advice
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                              {this.state.activeCard === card.Name && (
                                <React.Fragment>
                                  <Col
                                    md="auto"
                                    className="p-2"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "2px",
                                        height: "80%",
                                        backgroundColor: "#54595F",
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    className="benefits"
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                    }}
                                  >
                                    <CardBody>
                                      <div className="sub-header-all">
                                        Benefits
                                      </div>
                                      <div className="text-left">
                                        {card.Text_Tile_Benefits.split("|").map(
                                          (str) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                style={{
                                                  fontSize: "0.4rem",
                                                  margin: "10px 3px 0px 0px",
                                                  color: "gray",
                                                }}
                                                icon={faCircle}
                                              />
                                              {str}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </CardBody>
                                    <div>
                                      <Button>Add to Cart</Button>
                                    </div>
                                  </Col>
                                </React.Fragment>
                              )}
                            </Row>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                  {this.state.subCategory === null && (
                    <Row className="mx-5">
                      <Col>
                        <ReactPaginate
                          pageCount={this.state.pageCount3}
                          pageRangeDisplayed={2}
                          marginPagesDisplayed={2}
                          initialPage={0}
                          forcePage={this.state.selectedPage}
                          breakLabel="..."
                          nextLabel={
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                          }
                          previousLabel={
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                          }
                          onPageChange={this.handlePagination}
                          containerClassName="pagination justify-content-end "
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          activeClassName="active"
                        ></ReactPaginate>
                      </Col>
                    </Row>
                  )}
                </div>
              )}
              {this.state.category === "Hirsutism" && (
                <div>
                  <Row className="mx-5">
                    {this.state.subCategory === null &&
                      this.state.finalHirsArray[this.state.selectedPage].map(
                        (card) => (
                          <Col
                            md={this.state.activeCard === card.Name ? "8" : "4"}
                            xl={this.state.activeCard === card.Name ? "6" : "3"}
                            className="my-3 text-center"
                            style={{
                              display: this.state.subCategory
                                ? card.Category === this.state.subCategory
                                  ? "block"
                                  : "none"
                                : "block",
                            }}
                          >
                            <Card
                              className="treat-card shadow h-100"
                              style={{
                                border: "3px solid #163948",
                                display: "flex",
                              }}
                              onClick={() => {
                                this.setState({
                                  activeCard:
                                    this.state.activeCard === card.Name
                                      ? null
                                      : card.Name,
                                });
                              }}
                            >
                              <Row className="h-100">
                                <Col
                                  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                  }}
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
                                      <h5
                                        className="sub-header-all"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {card.Name}
                                      </h5>
                                    </div>
                                    <div>{card.Text_Small_Tile}</div>
                                  </CardBody>
                                  <Row className="sh-tags">
                                    {card.OTC && (
                                      <Col
                                        className="mx-2"
                                        style={{
                                          borderRadius: "14px",
                                          backgroundColor: "#DDADA6",
                                          fontSize: "0.7rem",
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
                                          backgroundColor: "#DDADA6",
                                          fontSize: "0.7rem",
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
                                          backgroundColor: "#DDADA6",
                                          fontSize: "0.7rem",
                                        }}
                                      >
                                        Side Effects
                                      </Col>
                                    )}
                                    {card.Doctor_Advice && (
                                      <Col
                                        className="mx-2"
                                        style={{
                                          borderRadius: "14px",
                                          backgroundColor: "#DDADA6",
                                          fontSize: "0.7rem",
                                        }}
                                      >
                                        Doctor advice
                                      </Col>
                                    )}
                                  </Row>
                                </Col>
                                {this.state.activeCard === card.Name && (
                                  <React.Fragment>
                                    <Col
                                      md="auto"
                                      className="p-2"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "2px",
                                          height: "80%",
                                          backgroundColor: "#54595F",
                                        }}
                                      />
                                    </Col>
                                    <Col
                                      className="benefits"
                                      style={{
                                        display: "flex",
                                        flexFlow: "column",
                                      }}
                                    >
                                      <CardBody>
                                        <div className="sub-header-all">
                                          Benefits
                                        </div>
                                        <div className="text-left">
                                          {card.Text_Tile_Benefits.split(
                                            "|"
                                          ).map((str) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                style={{
                                                  fontSize: "0.4rem",
                                                  margin: "10px 3px 0px 0px",
                                                  color: "gray",
                                                }}
                                                icon={faCircle}
                                              />
                                              {str}
                                            </div>
                                          ))}
                                        </div>
                                      </CardBody>
                                      <div>
                                        <Button>Add to Cart</Button>
                                      </div>
                                    </Col>
                                  </React.Fragment>
                                )}
                              </Row>
                            </Card>
                          </Col>
                        )
                      )}
                    {this.state.subCategory &&
                      this.state.hirsArray.map((card) => (
                        <Col
                          md={this.state.activeCard === card.Name ? "8" : "4"}
                          xl={this.state.activeCard === card.Name ? "6" : "3"}
                          className="my-3 text-center"
                          style={{
                            display: this.state.subCategory
                              ? card.Category === this.state.subCategory
                                ? "block"
                                : "none"
                              : "block",
                          }}
                        >
                          <Card
                            className="treat-card shadow h-100"
                            style={{
                              border: "3px solid #163948",
                              display: "flex",
                            }}
                            onClick={() => {
                              this.setState({
                                activeCard:
                                  this.state.activeCard === card.Name
                                    ? null
                                    : card.Name,
                              });
                            }}
                          >
                            <Row className="h-100">
                              <Col
                                style={{ display: "flex", flexFlow: "column" }}
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
                                    <h5
                                      className="sub-header-all"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {card.Name}
                                    </h5>
                                  </div>
                                  <div>{card.Text_Small_Tile}</div>
                                </CardBody>
                                <Row className="sh-tags">
                                  {card.OTC && (
                                    <Col
                                      className="mx-2"
                                      style={{
                                        borderRadius: "14px",
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
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
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
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
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Side Effects
                                    </Col>
                                  )}
                                  {card.Doctor_Advice && (
                                    <Col
                                      className="mx-2"
                                      style={{
                                        borderRadius: "14px",
                                        backgroundColor: "#DDADA6",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Doctor advice
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                              {this.state.activeCard === card.Name && (
                                <React.Fragment>
                                  <Col
                                    md="auto"
                                    className="p-2"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "2px",
                                        height: "80%",
                                        backgroundColor: "#54595F",
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    className="benefits"
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                    }}
                                  >
                                    <CardBody>
                                      <div className="sub-header-all">
                                        Benefits
                                      </div>
                                      <div className="text-left">
                                        {card.Text_Tile_Benefits.split("|").map(
                                          (str) => (
                                            <div
                                              style={{
                                                display: "flex",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                style={{
                                                  fontSize: "0.4rem",
                                                  margin: "10px 3px 0px 0px",
                                                  color: "gray",
                                                }}
                                                icon={faCircle}
                                              />
                                              {str}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </CardBody>
                                    <div>
                                      <Button>Add to Cart</Button>
                                    </div>
                                  </Col>
                                </React.Fragment>
                              )}
                            </Row>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                  {this.state.subCategory === null && (
                    <Row className="mx-5">
                      <Col>
                        <ReactPaginate
                          pageCount={this.state.pageCount2}
                          pageRangeDisplayed={2}
                          marginPagesDisplayed={2}
                          initialPage={0}
                          forcePage={this.state.selectedPage}
                          breakLabel="..."
                          nextLabel={
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                          }
                          previousLabel={
                            <FontAwesomeIcon icon={faChevronCircleLeft} />
                          }
                          onPageChange={this.handlePagination}
                          containerClassName="pagination justify-content-end "
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          activeClassName="active"
                        ></ReactPaginate>
                      </Col>
                    </Row>
                  )}
                </div>
              )}
            </Container>
            <div style={{ position: "fixed", bottom: 0 }}>
              <FontAwesomeIcon
                style={{ color: "#163948" }}
                icon={faShoppingCart}
                size="3x"
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
