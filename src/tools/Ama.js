import React, { Component } from "react";
import { Row, Col, Button, Card, Container, Spinner } from "reactstrap";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import cogoToast from "cogo-toast";
import ReactPaginate from "react-paginate";
export default class Ama extends Component {
  state = {
    amaData: null,
    amaDataSorted: null,
    expand: false,
    uid: null,
    activeRelate: [],
    pageCount: 0,
    selectedPage: 0,
    category: "all",
  };
  componentDidMount = () => {
    document.title = "AMA Platform";
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
      .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
      .on("value", (snapshot) => {
        var dataArray = snapshot.val();
        var amaData = Object.values(dataArray);
        var pageCount =
          amaData.length % 8 === 0
            ? Math.floor(amaData.length / 8)
            : Math.floor(amaData.length / 8) + 1;
        var amaDataSorted = [];
        for (let i = 0; i < pageCount; i++) {
          if (i === pageCount - 1) {
            amaDataSorted[i] = amaData.slice(i * 8);
          } else {
            amaDataSorted[i] = amaData.slice(i * 8, i * 8 + 8);
          }
        }
        this.setState({
          pageCount,
          amaDataSorted,
        });
      });
  };
  handleRelate = async (act, count, i) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    var database = firebase.database();
    var uid = firebase.auth().currentUser.uid;
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.setState({ uid: user.uid }, () => {
          console.log(uid);
          database
            .ref()
            .once("value")
            .then((snap) => {
              var related = snap.child(act + "/" + uid + "/" + i).exists();
              console.log(related);
              if (related) {
                cogoToast.error("Already liked");
              } else {
                database
                  .ref(
                    "1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1/" + i
                  )
                  .child(act)
                  .set(count + 1);
                database
                  .ref(act)
                  .child(uid + "/" + i)
                  .set("responded");
                this.setState({
                  activeRelate: [...this.state.activeRelate, i],
                });
              }
            });
        });
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error);
      });
  };
  handlePagination = (event) => {
    this.setState({
      selectedPage: event.selected,
    });
  };
  handleCategory = async (category) => {
    var amaData;
    var database = firebase.database();
    if (category !== "all") {
      await database
        .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
        .orderByChild("category")
        .equalTo(category)
        .on("value", (snapshot) => {
          var dataArray = snapshot.val();
          amaData = Object.values(dataArray);
          this.setState({ amaData });
        });
    } else {
      await database
        .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
        .on("value", (snapshot) => {
          var dataArray = snapshot.val();
          amaData = Object.values(dataArray);
          this.setState({ amaData });
        });
    }

    var pageCount =
      amaData.length % 8 === 0
        ? Math.floor(amaData.length / 8)
        : Math.floor(amaData.length / 8) + 1;
    var amaDataSorted = [];
    for (let i = 0; i < pageCount; i++) {
      if (i === pageCount - 1) {
        amaDataSorted[i] = amaData.slice(i * 8);
      } else {
        amaDataSorted[i] = amaData.slice(i * 8, i * 8 + 8);
      }

      this.setState({
        pageCount,
        amaDataSorted,
        category,
      });
    }
  };
  render() {
    return this.state.amaDataSorted === null ? (
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
        <Container fluid className="mt-5 p-5">
          <div className="bc-tiles-wrapper mb-4">
            <div className="bc-tiles-intro-text w-75 mx-auto">
              <h1
                className="header-all"
                style={{ fontFamily: "montserrat, sans-serif" }}
              >
                Welcome to Proactive for her AMA Platform.
              </h1>
              <div className="d-block para-all">
                <p>
                  <strong>
                    You can use this platform to find common questions around
                    women healthcare and their answers provided by top experts
                    in that field.
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <Row className="mx-5 my-5">
            <Col md="auto">
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "all" ? "#DDADA6" : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("all");
                  }}
                >
                  All Categories
                </Button>
              </div>
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "Hair and skin"
                        ? "#DDADA6"
                        : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("Hair and skin");
                  }}
                >
                  Hair & Skin
                </Button>
              </div>
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "Irregular periods"
                        ? "#DDADA6"
                        : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("Irregular periods");
                  }}
                >
                  Irregular periods
                </Button>
              </div>
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "Weight gain"
                        ? "#DDADA6"
                        : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("Weight gain");
                  }}
                >
                  Weight gain
                </Button>
              </div>
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "Mental health"
                        ? "#DDADA6"
                        : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("Mental health");
                  }}
                >
                  Mental health
                </Button>
              </div>
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "PCOS" ? "#DDADA6" : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("PCOS");
                  }}
                >
                  PCOS
                </Button>
              </div>
              <div className="my-3">
                <Button
                  style={{
                    backgroundColor:
                      this.state.category === "STI" ? "#DDADA6" : "#163948",
                  }}
                  className="w-100 ama-categories"
                  onClick={() => {
                    this.handleCategory("STI");
                  }}
                >
                  STI
                </Button>
              </div>
            </Col>
            <Col>
              {this.state.amaDataSorted[this.state.selectedPage].map((item) => (
                <Card
                  onClick={() => this.setState({ expand: !this.state.expand })}
                  //   style={{
                  //     maxHeight: this.state.expand ? null : "150px",
                  //     transition: "max-height 0.2s ease-out",
                  //   }}
                >
                  <div className="sub-header-all" style={{ color: "black" }}>
                    {item.category}
                  </div>
                  <Row>
                    <Col className="sub-header-all">{item.ques}</Col>
                    <Col md="auto">
                      {"Relate (" + item.relate + ")"}
                      <FontAwesomeIcon
                        className="ml-2"
                        icon={faThumbsUp}
                        onClick={() =>
                          this.handleRelate("relate", item.relate, item.Sr)
                        }
                      />
                    </Col>
                  </Row>
                  <div>Answered By:</div>
                  <Row>
                    <Col md="auto">
                      <div>
                        <img src={item.docprofile} />
                      </div>
                      <div>{item.doc_name}</div>
                    </Col>
                    <Col>{item.ans}</Col>
                  </Row>
                  <div className="text-right">
                    {"Appreciate (" + item.appreciate + ")"}
                    <img
                      className="ml-2"
                      src={require("../download/images/clap.png")}
                      onClick={() =>
                        this.handleRelate(
                          "appreciate",
                          item.appreciate,
                          item.Sr
                        )
                      }
                    />
                  </div>
                </Card>
              ))}
              <Row className="">
                <Col>
                  <ReactPaginate
                    pageCount={this.state.pageCount}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    initialPage={0}
                    forcePage={this.state.selectedPage}
                    breakLabel="..."
                    nextLabel={<FontAwesomeIcon icon={faChevronCircleRight} />}
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
            </Col>
            <Col md="auto my-3">
              <Button>Ask Question</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
