import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import cogoToast from "cogo-toast";
import Popup from "reactjs-popup";
import ReactPaginate from "react-paginate";
import Select from "react-select";
export default class Ama extends Component {
  state = {
    amaData: null,
    amaDataSorted: null,
    expand: false,
    uid: null,
    relatedArray: [],
    appreciatedArray: [],
    activeRelate: [],
    pageCount: 0,
    selectedPage: 0,
    category: "all",
    open: false,
    email: "",
    userCategory: "",
    question: "",
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
      .on("value", async (snapshot) => {
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
        var relatedArray = [];
        var appreciatedArray = [];

        if (firebase.auth().currentUser) {
          await database
            .ref("relate/" + firebase.auth().currentUser.uid)
            .once("value", (snapshot) => {
              if (snapshot.val()) relatedArray = Object.keys(snapshot.val());
            });
          await database
            .ref("appreciate/" + firebase.auth().currentUser.uid)
            .once("value", (snapshot) => {
              if (snapshot.val())
                appreciatedArray = Object.keys(snapshot.val());
            });
        }
        this.setState({
          pageCount,
          amaDataSorted,
          category: "all",
          relatedArray,
          appreciatedArray,
        });
      });
  };
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  selectCategory = (selected) => {
    this.setState({
      userCategory: selected,
    });
  };
  handleModal = () => {
    this.setState({ open: true });
  };
  handleSubmit = async () => {
    var database = firebase.database();
    var provider = new firebase.auth.GoogleAuthProvider();
    var currentUser = firebase.auth().currentUser;
    var email;
    var userCategory = this.state.userCategory.value;
    var question = this.state.question;
    if (currentUser) {
      email = currentUser.email;
      console.log(email, userCategory);
      database
        .ref("newQueries/")
        .child(email.split("@")[0])
        .child(userCategory)
        .push({
          email: email,
          category: userCategory,
          ques: question,
        });
      cogoToast.success("Your response has been recorded");
    } else {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var token = result.credential.accessToken;
          var user = result.user;
          email = user.email;
          database
            .ref("newQueries/")
            .child(email.split("@")[0])
            .child(userCategory)
            .push({
              email: email,
              category: userCategory,
              ques: question,
            });
          cogoToast.success("Your response has been recorded");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(error);
        });
    }
    this.setState({ open: false });
  };

  handleRelate = async (act, count, i) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    var database = firebase.database();
    var uid;
    if (firebase.auth().currentUser) {
      uid = firebase.auth().currentUser.uid;
      console.log("have user", uid);
    } else {
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var token = result.credential.accessToken;
          var user = result.user;
          uid = user.uid;
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(error);
        });
    }
    if (firebase.auth().currentUser) {
      database
        .ref(act)
        .once("value")
        .then(async (snap) => {
          var related = snap.child("/" + uid + "/" + i).exists();
          console.log(related);
          if (related) {
            cogoToast.error("Already liked");
          } else {
            database
              .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1/")
              .update({ [i + "/" + act]: count + 1 });
            await database
              .ref(act)
              .child(uid + "/" + i)
              .set("responded");
            cogoToast.success(act + "d");
            firebase.functions().httpsCallable("copyPetrolToSheet");
            this.setState({
              activeRelate: [...this.state.activeRelate, i],
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  handlePagination = (event) => {
    this.setState({
      selectedPage: event.selected,
    });
  };
  handleCategory = (category) => {
    var amaData;
    var database = firebase.database();
    if (category !== "all") {
      database
        .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
        .orderByChild("category")
        .equalTo(category)
        .on("value", (snapshot) => {
          var dataArray = snapshot.val();
          amaData = Object.values(dataArray);
        });
    } else {
      database
        .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
        .on("value", (snapshot) => {
          var dataArray = snapshot.val();
          amaData = Object.values(dataArray);
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
        selectedPage: 0,
      });
    }
  };
  render() {
    var categoryOptions = [
      {
        value: "Hair & skin",
        label: "Hair & skin",
      },
      { value: "Irregular periods", label: "Irregular periods" },
      { value: "Weight gain", label: "Weight gain" },
      { value: "Mental health", label: "Mental health" },
      { value: "PCOS", label: "PCOS" },
      { value: "STI", label: "STI" },
      { value: "Fertility", label: "Fertility" },
      { value: "Birth control", label: "Birth control" },
      { value: "Sex education", label: "Sex education" },
    ];
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
          <Row>
            <Col md="auto my-3 mx-auto">
              <Button
                onClick={this.handleModal}
                style={{
                  paddingBottom: "7px",
                  borderColor: "#163948",
                  backgroundColor: "#F3BD1A",
                  color: "#163948",
                  fontSize: "1.2rem",
                }}
              >
                Ask Question
              </Button>
              <Popup
                open={this.state.open}
                modal
                closeOnDocumentClick
                onClose={() =>
                  this.setState({
                    open: false,
                  })
                }
              >
                <div className="py-2 px-5">
                  <div
                    className="sub-header-all text-center mb-3"
                    style={{
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      Join Proactive to get updates on latest content and tools
                      for women's healthcare approved by top physicians.
                    </div>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="ml-3"
                      onClick={() =>
                        this.setState({
                          open: false,
                        })
                      }
                      cursor="pointer"
                    />
                  </div>
                  <Form>
                    {/* <div className="p-lg-4">
                      <Row>
                        <Col>
                          <FormGroup>
                            <Row>
                              <Col>
                                <label className="form-control-label">
                                  Email
                                  <div>
                                    <small>
                                      * to be displayed as share title in every
                                      post
                                    </small>
                                  </div>
                                </label>
                              </Col>
                              <Col>
                                <Input
                                  className="form-control-alternative"
                                  value={this.state.email}
                                  name="email"
                                  onChange={this.handleInputChange}
                                  placeholder="xyz@gmail.com"
                                  type="text"
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div> */}
                    <div>
                      <Card>
                        <div>
                          <FormGroup className="text-left">
                            <Row>
                              <Col>
                                <label className="form-control-label">
                                  Category
                                  <div>
                                    <small>
                                      * please classify the question in a health
                                      category.
                                    </small>
                                  </div>
                                </label>
                              </Col>
                              <Col>
                                <Select
                                  className="form-control-alternative"
                                  options={categoryOptions}
                                  value={this.state.userCategory}
                                  name="userCategory"
                                  onChange={this.selectCategory}
                                  placeholder="Choose a category"
                                ></Select>
                              </Col>
                            </Row>
                          </FormGroup>
                        </div>
                        <div>
                          <FormGroup className="text-left">
                            <Row>
                              <Col>
                                <label className="form-control-label">
                                  Your question
                                  <div>
                                    <small>
                                      * please enter your question in 1 or 2
                                      sentences.
                                    </small>
                                  </div>
                                </label>
                              </Col>
                              <Col>
                                <Input
                                  className="form-control-alternative"
                                  value={this.state.question}
                                  name="question"
                                  onChange={this.handleInputChange}
                                  placeholder="Enter text"
                                  type="textarea"
                                  rows={6}
                                ></Input>
                              </Col>
                            </Row>
                          </FormGroup>
                        </div>
                      </Card>
                    </div>
                    <div className="text-center">
                      <Input
                        className="mt-2"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleSubmit();
                        }}
                        type="button"
                        value="Submit"
                      />
                      <div>
                        <small>
                          * please sign in with google account to post your
                          question to our physicians.
                        </small>
                      </div>
                    </div>
                  </Form>
                </div>
              </Popup>
            </Col>
          </Row>
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
                        color={
                          this.state.relatedArray.includes(item.Sr.toString())
                            ? "#163948"
                            : "gray"
                        }
                        style={{ borderColor: "black" }}
                        fill="#163948"
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
                      <div>
                        <a
                          href="http://www.proactiveforher.com/doctors/"
                          target="_blank"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          {item.doc_name}
                        </a>
                      </div>
                    </Col>
                    <Col>{item.ans}</Col>
                  </Row>
                  <div className="text-right">
                    {"Appreciate (" + item.appreciate + ")"}
                    <img
                      className="ml-2"
                      src={
                        this.state.appreciatedArray.includes(item.Sr.toString())
                          ? require("../download/images/clapping.png")
                          : require("../download/images/clap.png")
                      }
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
          </Row>
        </Container>
      </div>
    );
  }
}
