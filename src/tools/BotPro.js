import React, { Component } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Container,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  Card,
} from "reactstrap";
import { Ques } from "./constants/chatArray";
import classNames from "classnames";
import stringSimilarity from "string-similarity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
export default class BotPro extends Component {
  state = {
    custom: "",
    activeTab: 1,
    chattingArray: ["Hi! welcome to the proactive chatbot"],
    activeCategory: null,
    chatting: true,
    searchList: [],
    questions: [],
    filteredQuestions: [],
  };
  componentDidMount = () => {
    var questions = [];
    for (let i = 0; i < Ques.length; i++) {
      const element = Ques[i];
      questions.push(element.Q);
    }
    this.setState({ questions });
  };
  handleInputValue = (event) => {
    console.log(event.target.value);
    var questions = this.state.questions;
    var filteredQuestions = [];
    if (event.target.value.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        const element = questions[i];
        if (element.includes(event.target.value.toLowerCase())) {
          filteredQuestions.push({ Q: element, A: Ques[i].A });
        }
      }
      this.setState({
        activeTab: 4,
        filteredQuestions,
      });
    } else {
      this.setState({
        activeTab: 1,
      });
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleCustom = () => {
    var questions = this.state.questions;
    const bestMatch = stringSimilarity.findBestMatch(
      this.state.custom,
      questions
    );
    var chattingArray = this.state.chattingArray;
    chattingArray.push(this.state.custom);
    bestMatch.bestMatch.rating >= 0.3
      ? chattingArray.push(Ques[bestMatch.bestMatchIndex].A)
      : chattingArray.push("Try asking in a different way");
    this.setState({ chattingArray, chatting: true }, () => {
      var chatBox = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    });
    console.log(bestMatch);
  };
  handleChatting = (ques, ans) => {
    var chattingArray = this.state.chattingArray;
    chattingArray.push(ques);
    chattingArray.push(ans);

    this.setState({ chattingArray, chatting: true }, () => {
      var chatBox = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    });
  };
  handleCategory = (category) => {
    this.setState({ activeTab: 3, activeCategory: category });
  };
  render() {
    const categories = [
      "Masturbation",
      "Orgasm",
      "Sex Toys",
      "Virginity",
      "Sex & Sexual Hygiene",
    ];
    return (
      <>
        {!this.state.chatting && (
          <div
            className="questioning"
            style={{ padding: "50px 0px 0px 200px" }}
          >
            <Row className="mx-0">
              <Col>
                <Input
                  style={{
                    borderRadius: "30px",
                  }}
                  type="text"
                  placeholder="Ask a Question or type a keyword"
                  name="custom"
                  value={this.state.custom}
                  onChange={this.handleInputValue}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      this.state.custom.length !== 0 && this.handleCustom();
                    }
                  }}
                ></Input>
              </Col>
              {this.state.custom.length !== 0 && (
                <Col>
                  <Button onClick={this.handleCustom}>Ask</Button>
                </Col>
              )}
              <Col md="3" style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size="2x"
                  style={{
                    color: "white",
                    backgroundColor: "#163948",
                    borderRadius: "19px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.setState({ chatting: true });
                  }}
                />
              </Col>
            </Row>
            {this.state.activeTab !== 4 && (
              <React.Fragment>
                <Nav tabs style={{ border: "none", marginTop: "20px" }}>
                  {this.state.activeCategory ? (
                    <Row>
                      <Col>
                        <Button
                          onClick={() => {
                            this.setState({
                              activeTab: 2,
                              activeCategory: null,
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ marginRight: "25px" }}
                          />
                          {this.state.activeCategory}
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <Button
                          className={classNames("popular", {
                            active: this.state.activeTab === 1,
                          })}
                          onClick={() => {
                            this.setState({ activeTab: 1 });
                          }}
                        >
                          Popular
                        </Button>
                      </Col>
                      <Col md="auto">
                        <Button
                          className={classNames("all", {
                            active: this.state.activeTab === 2,
                          })}
                          onClick={() => {
                            this.setState({ activeTab: 2 });
                          }}
                        >
                          All topics
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Nav>
                {/* <Row className="mx-0">
                  <span
                    className="line"
                    style={{
                      height: "3px",
                      width: "250px",
                      background: "#163948",
                      marginLeft: "15px",
                    }}
                  ></span>
                </Row> */}
              </React.Fragment>
            )}

            <TabContent
              activeTab={this.state.activeTab}
              // style={{ margin: "20px 200px 10px 200px" }}
            >
              <TabPane tabId={1}>
                {Ques.map(
                  (ques) =>
                    ques.popular && (
                      <div>
                        <Button
                          onClick={() => this.handleChatting(ques.Q, ques.A)}
                        >
                          {ques.Q}
                        </Button>
                      </div>
                    )
                )}
              </TabPane>
              <TabPane tabId={2}>
                {categories.map((category) => (
                  <div>
                    <Button onClick={() => this.handleCategory(category)}>
                      {category}
                    </Button>
                  </div>
                ))}
              </TabPane>
              <TabPane tabId={3}>
                {Ques.map(
                  (ques) =>
                    ques.category === this.state.activeCategory && (
                      <div>
                        <Button
                          onClick={() => this.handleChatting(ques.Q, ques.A)}
                        >
                          {ques.Q}
                        </Button>
                      </div>
                    )
                )}
              </TabPane>
              <TabPane tabId={4}>
                {this.state.filteredQuestions.map((ques) => (
                  <div>
                    <Button onClick={() => this.handleChatting(ques.Q, ques.A)}>
                      {ques.Q}
                    </Button>
                  </div>
                ))}
              </TabPane>
            </TabContent>
          </div>
        )}
        {this.state.chatting && (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              height: "100%",
              justifyContent: "flex-end",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              id="chatBox"
              // className="px-5"
              style={{
                maxHeight: "calc(100% - 87px)",
                overflowY: "scroll",
                padding: "0px 200px",
                fontSize: "1.2rem",
              }}
            >
              {this.state.chattingArray.map((entry, i) =>
                i % 2 === 0 ? (
                  <div
                    style={{
                      textAlign: "left",
                      maxWidth: "40%",
                      marginLeft: "initial",
                    }}
                  >
                    <Card
                      className="shadow py-3"
                      style={{
                        backgroundColor: "#163948",
                        color: "white",
                        borderRadius: "30px",
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      {entry}
                    </Card>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "right",
                      maxWidth: "40%",
                      marginLeft: "auto",
                    }}
                  >
                    <Card
                      className="shadow py-3"
                      style={{
                        color: "#163948",
                        borderRadius: "30px",
                        borderBottomRightRadius: "0px",
                        borderColor: "#163948",
                      }}
                    >
                      {entry}
                    </Card>
                  </div>
                )
              )}
            </div>
            <Row className="mx-0 my-2">
              <Col style={{ padding: "0px 100px", display: "flex" }}>
                <img
                  src={require("../download/images/bot.jpg")}
                  height="100px"
                />
                <Button
                  style={{
                    width: "60%",
                    backgroundColor: "white",
                    color: "#163948",
                    fontSize: "1.5rem",
                    borderRadius: "50px",
                    textAlign: "left",
                  }}
                  className="py-3 pl-5"
                  onClick={() =>
                    this.setState({ chatting: false, custom: "", activeTab: 1 })
                  }
                >
                  Ask me anything
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
}
