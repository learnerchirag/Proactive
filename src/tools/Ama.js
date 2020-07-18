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
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faChevronCircleLeft,
  faChevronCircleRight,
  faTimes,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import cogoToast from "cogo-toast";
import Popup from "reactjs-popup";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import FooterMain from "../components/FooterMain";
export default class Ama extends Component {
  state = {
    amaData: null,
    amaDataSorted: null,
    expanded: null,
    uid: null,
    relatedArray: [],
    appreciatedArray: [],
    activeRelate: [],
    pageCount: 0,
    selectedPage: 0,
    category: "all",
    mobCategory: null,
    open: false,
    email: "",
    userCategory: "",
    question: "",
    dpArray: null,
  };
  componentDidMount = async () => {
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
    database.ref("tQ").once("value", (snap) => {
      console.log("1");
      var number = Number(snap.val());
      var pageCount =
        number % 8 === 0 ? Math.floor(number / 8) : Math.floor(number / 8) + 1;
      this.setState({ pageCount });
    });
    await database
      .ref("18wGXT__86iYjJG2lC0cHOWF-jQwYjyQo5VL4FDcahXg/Sheet1")
      .once("value", (snap) => {
        var data = snap.val();
        var dpArray = Object.values(data);
        this.setState({ dpArray });
      });
    database
      .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
      .orderByChild("Sr")
      .startAt(this.state.selectedPage * 8)
      .endAt(this.state.selectedPage * 8 + 7)
      .on("value", async (snapshot) => {
        console.log("2");
        var dataArray = snapshot.val();
        var amaData = Object.values(dataArray);
        console.log(amaData);
        var relatedArray = [];
        var appreciatedArray = [];

        if (firebase.auth().currentUser) {
          database
            .ref("relate/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
              if (snapshot.val()) relatedArray = Object.keys(snapshot.val());
              this.setState({ relatedArray });
            });
          database
            .ref("appreciate/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
              if (snapshot.val())
                appreciatedArray = Object.keys(snapshot.val());
              this.setState({ appreciatedArray });
            });
        }
        this.setState({
          amaData,
          category: "all",
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
    var newDate = new Date();
    var date =
      newDate.getDate() +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();
    console.log(date);
    var email;
    var name;
    var userCategory = this.state.userCategory.value;
    var question = this.state.question;
    if (userCategory === null || question.length === 0) {
      cogoToast.error("All fields required");
    } else if (currentUser) {
      email = currentUser.email;
      name = currentUser.displayName;
      console.log(email, userCategory);
      database
        .ref("newQueries/")
        .child(email.split("@")[0])
        .child(userCategory)
        .push({
          b: email,
          d: userCategory,
          e: question,
          c: name,
          a: date,
        });
      cogoToast.success("Your response has been recorded");
      this.setState({ open: false, question: "", userCategory: "" });
    } else {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var token = result.credential.accessToken;
          var user = result.user;
          email = user.email;
          name = user.displayName;
          database
            .ref("newQueries/")
            .child(email.split("@")[0])
            .child(userCategory)
            .push({
              b: email,
              d: userCategory,
              e: question,
              c: name,
              a: date,
            });
          cogoToast.success("Your response has been recorded");
          this.setState({ open: false, question: "", userCategory: "" });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(error);
        });
    }
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
            cogoToast.error("Already " + act + "d");
          } else {
            database
              .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1/")
              .update({ [i + "/" + act]: count + 1 });
            await database
              .ref(act)
              .child(uid + "/" + i)
              .set("responded");
            cogoToast.success(act + "d");
            console.log(
              i,
              this.state.appreciatedArray,
              this.state.relatedArray
            );
            if (act === "relate") {
              console.log("relat");
              this.setState({
                relatedArray: [...this.state.relatedArray, i],
              });
            } else {
              this.setState({
                appreciatedArray: [...this.state.appreciatedArray, i],
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  handlePagination = (event) => {
    this.setState(
      {
        selectedPage: event.selected,
      },
      () => {
        this.handleCategory(this.state.category);
      }
    );
  };
  handleCategory = (category) => {
    var amaData;
    var pageCount;
    var database = firebase.database();
    if (category !== "all") {
      database
        .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
        .orderByChild("category")
        .equalTo(category)
        .on("value", async (snapshot) => {
          var dataArray = snapshot.val();
          var data = Object.values(dataArray);
          pageCount =
            data.length % 8 === 0
              ? Math.floor(data.length / 8)
              : Math.floor(data.length / 8) + 1;
          if (this.state.selectedPage >= pageCount) {
            this.setState({ selectedPage: 0 });
          }
          if (this.state.selectedPage === pageCount - 1) {
            amaData = data.slice(this.state.selectedPage * 8);
          } else {
            amaData = data.slice(
              this.state.selectedPage * 8,
              this.state.selectedPage * 8 + 8
            );
          }

          console.log(amaData);
          this.setState({
            pageCount,
            amaData,
            category,
          });
        });
    } else {
      database.ref("tQ").once("value", (snap) => {
        var number = Number(snap.val());
        pageCount =
          number % 8 === 0
            ? Math.floor(number / 8)
            : Math.floor(number / 8) + 1;
        this.setState({ pageCount });
      });
      database
        .ref("1u4shxt1AAvJtyHT-oI566kyLzoaUjXwyQS6WiO-rePo/Sheet1")
        .orderByChild("Sr")
        .startAt(this.state.selectedPage * 8)
        .endAt(this.state.selectedPage * 8 + 7)
        .on("value", async (snapshot) => {
          var dataArray = await snapshot.val();
          amaData = Object.values(dataArray);
          this.setState({
            pageCount,
            amaData,
            category,
          });
        });
    }

    // var amaDataSorted = [];
    // for (let i = 0; i < pageCount; i++) {
    //   if (i === pageCount - 1) {
    //     amaDataSorted[i] = amaData.slice(i * 8);
    //   } else {
    //     amaDataSorted[i] = amaData.slice(i * 8, i * 8 + 8);
    //   }
  };
  selectCategoryMobile = (mobCategory) => {
    this.setState({ mobCategory });
    if (mobCategory) this.handleCategory(mobCategory.value);
    else this.handleCategory("all");
  };
  // handleDp = (doc_name) => {
  //   console.log(this.state.dpArray);
  //   this.state.dpArray &&
  //     this.state.dpArray.forEach((doc) => {
  //       if (doc.name === doc_name) {
  //         var dp = doc.dp;
  //         var link =
  //           "https://drive.google.com/uc?export=view&id=" +
  //           dp.split("d/")[1].slice(0, 33);
  //         console.log(dp, dp.split("d/")[1].slice(0, 33), link);
  //         return link;
  //       } else {
  //         console.log("nill");
  //         return "null";
  //       }
  //     });
  // };
  render() {
    var categoryOptions = [
      {
        value: "Hair and skin",
        label: "Hair and skin",
      },
      { value: "Irregular periods", label: "Irregular periods" },
      { value: "Weight gain", label: "Weight gain" },
      { value: "Mental health", label: "Mental health" },
      { value: "PCOS", label: "PCOS" },
      { value: "STI", label: "STI" },
      { value: "Fertility", label: "Fertility" },
      { value: "Birth control", label: "Birth control" },
      { value: "Prenatal", label: "Prenatal" },
      { value: "Sex education", label: "Sex education" },
      { value: "Vaginal infections", label: "Vaginal infections" },
      { value: "UTI", label: "UTI" },
    ];
    return (
      <>
        <Modal />

        {this.state.amaData === null ? (
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
            <Container fluid className="mt-5 pt-5 p-md-5">
              <div className="bc-tiles-wrapper mb-4">
                <div className="bc-tiles-intro-text mx-auto">
                  <h1
                    className="header-all"
                    style={{ fontFamily: "montserrat, sans-serif" }}
                  >
                    Welcome to Proactive for her AMA Platform.
                  </h1>
                  <div className="d-block para-all">
                    <p>
                      <strong>
                        You can use this platform to find common questions
                        around women healthcare and their answers provided by
                        top experts in that field.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <Row>
                <Col className="col-auto my-3 mx-auto">
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
                    Ask a question
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
                    <div className="py-2 px-md-5">
                      <div
                        className="sub-header-all text-center mb-3"
                        style={{
                          fontSize: "18px",
                          display: "flex",
                        }}
                      >
                        <div>
                          Join Proactive to get updates on latest content and
                          tools for women's healthcare approved by top
                          physicians.
                          <br></br>
                          <small style={{ color: "black" }}>
                            Your question will be posted on the forum
                            anonymously when it is answered by a certified
                            physician.
                          </small>
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
                                          * please classify the question in a
                                          health category.
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
                          <div
                            className="mt-2"
                            color="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleSubmit();
                            }}
                          >
                            <Button
                              style={{
                                backgroundColor: "#163948",
                                color: "white",
                              }}
                            >
                              Submit
                            </Button>
                          </div>
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
              <Row className="mx-md-5 my-5">
                <Col md="auto" className="cat-desk">
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
                          this.state.category === "PCOS"
                            ? "#DDADA6"
                            : "#163948",
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
                  <div className="my-3">
                    <Button
                      style={{
                        backgroundColor:
                          this.state.category === "Fertility"
                            ? "#DDADA6"
                            : "#163948",
                      }}
                      className="w-100 ama-categories"
                      onClick={() => {
                        this.handleCategory("Fertility");
                      }}
                    >
                      Fertility
                    </Button>
                  </div>
                  <div className="my-3">
                    <Button
                      style={{
                        backgroundColor:
                          this.state.category === "Birth control"
                            ? "#DDADA6"
                            : "#163948",
                      }}
                      className="w-100 ama-categories"
                      onClick={() => {
                        this.handleCategory("Birth control");
                      }}
                    >
                      Birth control
                    </Button>
                  </div>
                  <div className="my-3">
                    <Button
                      style={{
                        backgroundColor:
                          this.state.category === "Sex education"
                            ? "#DDADA6"
                            : "#163948",
                      }}
                      className="w-100 ama-categories"
                      onClick={() => {
                        this.handleCategory("Sex education");
                      }}
                    >
                      Sex Education
                    </Button>
                  </div>
                  <div className="my-3">
                    <Button
                      style={{
                        backgroundColor:
                          this.state.category === "Prenatal"
                            ? "#DDADA6"
                            : "#163948",
                      }}
                      className="w-100 ama-categories"
                      onClick={() => {
                        this.handleCategory("Prenatal");
                      }}
                    >
                      Prenatal
                    </Button>
                  </div>
                  <div className="my-3">
                    <Button
                      style={{
                        backgroundColor:
                          this.state.category === "Vaginal infections"
                            ? "#DDADA6"
                            : "#163948",
                      }}
                      className="w-100 ama-categories"
                      onClick={() => {
                        this.handleCategory("Vaginal infections");
                      }}
                    >
                      Vaginal Infections
                    </Button>
                  </div>
                  <div className="my-3">
                    <Button
                      style={{
                        backgroundColor:
                          this.state.category === "UTI" ? "#DDADA6" : "#163948",
                      }}
                      className="w-100 ama-categories"
                      onClick={() => {
                        this.handleCategory("UTI");
                      }}
                    >
                      UTI
                    </Button>
                  </div>
                </Col>
                <Col md="auto" className="cat-mob my-3">
                  <Button
                    style={{
                      backgroundColor: "#DDADA6",
                    }}
                    className="w-100 ama-categories"
                  >
                    <Select
                      isClearable
                      classNamePrefix="cat-sel-option"
                      className="cat-sel-container"
                      formatOptionLabel={{ backgroundColor: "#163948" }}
                      options={categoryOptions}
                      value={this.state.mobCategory}
                      name="userCategory"
                      onChange={this.selectCategoryMobile}
                      placeholder="All categories"
                    ></Select>
                  </Button>
                </Col>
                <Col>
                  {this.state.amaData.length !== 0 ? (
                    this.state.amaData.map((item, i) => (
                      <Card
                        onClick={() =>
                          this.setState({ expand: !this.state.expand })
                        }
                        //   style={{
                        //     maxHeight: this.state.expand ? null : "150px",
                        //     transition: "max-height 0.2s ease-out",
                        //   }}
                      >
                        <div
                          className="sub-header-all"
                          style={{ color: "black", fontSize: "18px" }}
                        >
                          {item.category}
                        </div>
                        <Row>
                          <Col className="col-auto">
                            <img
                              className="user-img"
                              src={require("../download/images/anonymous_lady.png")}
                            />
                          </Col>
                          <Col
                            className="sub-header-all"
                            style={{ fontSize: "22px" }}
                          >
                            {item.ques}
                          </Col>
                          <Col lg="auto" className="text-right">
                            {"Relate (" + item.relate + ")"}
                            <FontAwesomeIcon
                              className="ml-2"
                              color={
                                this.state.relatedArray.includes(
                                  item.Sr.toString()
                                )
                                  ? "#163948"
                                  : "gray"
                              }
                              style={{ borderColor: "black" }}
                              fill="#163948"
                              icon={faThumbsUp}
                              onClick={() =>
                                this.handleRelate(
                                  "relate",
                                  item.relate,
                                  item.Sr
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <div className="mt-3">Answered By:</div>
                        <Row>
                          <Col md="4" lg="2">
                            <Row>
                              <Col xs="auto" md="12">
                                <div>
                                  <a
                                    href="http://www.proactiveforher.com/doctors/"
                                    target="_blank"
                                  >
                                    <img
                                      height="75px"
                                      src={this.state.dpArray
                                        .map((doc) => {
                                          if (doc.name === item.doc_name) {
                                            var dp = doc.dp;
                                            var link =
                                              "https://drive.google.com/uc?export=view&id=" +
                                              dp.slice(32, 65);

                                            console.log(
                                              dp,
                                              dp.slice(32, 65),
                                              link
                                            );
                                            return link;
                                          } else return "";
                                        })
                                        .join("")}
                                    />
                                  </a>
                                </div>
                              </Col>
                              <Col>
                                <div>
                                  <a
                                    href="http://www.proactiveforher.com/doctors/"
                                    target="_blank"
                                    style={{
                                      color: "black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.doc_name}
                                  </a>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Card
                              style={{
                                maxHeight:
                                  this.state.expanded === i ? null : "3.9rem",
                                overflow: "hidden",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{ width: "-webkit-fill-available" }}
                                >
                                  {item.ans}
                                </div>
                                <div className="pl-2">
                                  {this.state.expanded === i ? (
                                    <FontAwesomeIcon
                                      onClick={() => {
                                        this.setState({ expanded: null });
                                      }}
                                      icon={faChevronUp}
                                      size="lg"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      onClick={() => {
                                        this.setState({ expanded: i });
                                      }}
                                      icon={faChevronDown}
                                      size="lg"
                                    />
                                  )}
                                </div>
                              </div>
                            </Card>
                          </Col>
                        </Row>
                        <div className="text-right mt-3">
                          {"Appreciate (" + item.appreciate + ")"}
                          <img
                            className="ml-2"
                            src={
                              this.state.appreciatedArray.includes(
                                item.Sr.toString()
                              )
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
                    ))
                  ) : (
                    <Card>
                      No questions asked. Please ask a question and get
                      answered.
                    </Card>
                  )}
                  <Row className="">
                    <Col>
                      <ReactPaginate
                        pageCount={this.state.pageCount}
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
                </Col>
              </Row>
              <Row>
                <Col className="col-auto my-3 mx-auto">
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
                    Ask a question
                  </Button>
                </Col>
              </Row>
            </Container>
            <FooterMain />
          </div>
        )}
      </>
    );
  }
}
