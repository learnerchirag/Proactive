import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { Ques } from "./constants/chatArray";
import stringSimilarity from "string-similarity";
var customQuesArray = [];

class Bot extends Component {
  state = {
    customQuesArray: [],
  };
  componentDidMount() {
    document.title = "Proactive ChatBot";
  }
  handleCustomTrigger = (value, steps) => {
    console.log(value, steps);
    Ques.forEach((ques) => {
      if (stringSimilarity.compareTwoStrings(value, ques.Q) >= 0.5) {
        customQuesArray.push({
          value: ques.A,
          label: ques.Q,
          trigger: "answer",
        });
      }
    });
    console.log(customQuesArray);
    // this.setState({
    //   customQuesArray: customQuesArray,
    // });
    if (customQuesArray.length === 0) {
      return "askElse";
    } else {
      return "customQuesArray";
    }
  };
  render() {
    console.log(this.state.customQuesArray);
    const popQuesArray = [];
    const mastQuesArray = [];
    const orgasmQuesArray = [];
    const virginityQuesArray = [];
    const sexToysQuesArray = [];
    const sshQuesArray = [];
    const categoryOptions = [
      {
        value: "popular questions",
        label: "Popular Questions",
        trigger: "popQues",
      },
      {
        value: "all questions",
        label: "All Questions",
        trigger: "allCategory",
      },
      {
        value: "custom Question",
        label: "Custom Questions",
        trigger: "customQues",
      },
    ];
    const allCategory = [
      {
        value: "Masturbation",
        label: "Masturbation",
        trigger: "masturbation",
      },
      {
        value: "Orgasm",
        label: "Orgasm",
        trigger: "orgasm",
      },
      {
        value: "Sex Toys",
        label: "Sex Toys",
        trigger: "sexToys",
      },
      {
        value: "Virginity",
        label: "Virginity",
        trigger: "virginity",
      },
      {
        value: "Sex & Sexual Hygiene",
        label: "Sex & Sexual Hygiene",
        trigger: "ssh",
      },
    ];
    Ques.forEach((ques) => {
      if (ques.popular) {
        popQuesArray.push({ value: ques.A, label: ques.Q, trigger: "answer" });
      }
      if (ques.category === "Masturbation") {
        mastQuesArray.push({ value: ques.A, label: ques.Q, trigger: "answer" });
      }
      if (ques.category === "Orgasm") {
        orgasmQuesArray.push({
          value: ques.A,
          label: ques.Q,
          trigger: "answer",
        });
      }
      if (ques.category === "Virginity") {
        virginityQuesArray.push({
          value: ques.A,
          label: ques.Q,
          trigger: "answer",
        });
      }
      if (ques.category === "Sex Toys") {
        sexToysQuesArray.push({
          value: ques.A,
          label: ques.Q,
          trigger: "answer",
        });
      }
      if (ques.category === "Sex & Sexual Hygiene") {
        sshQuesArray.push({ value: ques.A, label: ques.Q, trigger: "answer" });
      }
    });

    let steps = [
      {
        id: "0",
        message: "Welcome to proactive chatbot!",
        trigger: "1",
      },
      {
        id: "1",
        options: categoryOptions,
      },
      {
        id: "popQues",
        options: popQuesArray,
      },
      {
        id: "customQues",
        user: true,
        placeholder: "Enter keyword to search for your query",
        trigger: ({ value, steps }) => this.handleCustomTrigger(value, steps),
      },
      {
        id: "allCategory",
        message: "Select a category to proceed",
        trigger: "allCategory-2",
      },
      {
        id: "allCategory-2",
        options: allCategory,
      },

      {
        id: "masturbation",
        options: mastQuesArray,
      },
      {
        id: "orgasm",
        options: orgasmQuesArray,
      },
      {
        id: "virginity",
        options: virginityQuesArray,
      },
      {
        id: "sexToys",
        options: sexToysQuesArray,
      },
      {
        id: "ssh",
        options: sshQuesArray,
      },
      {
        id: "customQuesArray",
        options: customQuesArray,
      },
      {
        id: "askElse",
        message: "Ask something else",
        trigger: "1",
      },
      {
        id: "answer",
        message: "{previousValue}",
        trigger: "final",
      },
      {
        id: "final",
        options: [
          { value: "satisfied", label: "Satisfied", trigger: "closing" },
          { value: "return", label: "More Doubts?", trigger: "1" },
        ],
      },
      {
        id: "closing",
        message: "Have a nice day!!",
        end: true,
      },
    ];
    return (
      <div>
        <ChatBot
          width="90%"
          height="80%"
          floating={true}
          floatingStyle={{ background: "#163948" }}
          headerStyle={{ background: "#163948" }}
          footerStyle={{ position: "absolute", bottom: "0", width: "100%" }}
          // bubbleStyle={{ background: "#163948" }}
          bubbleOptionStyle={{ display: "block", background: "#163948" }}
          style={{ marginLeft: "auto", marginRight: "auto" }}
          steps={steps}
        ></ChatBot>
      </div>
    );
  }
}
export default Bot;
