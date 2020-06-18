import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { Ques } from "./constants/chatArray";
class Bot extends Component {
  // handleCategoryQues = (category) => {
  //   console.log(category);
  //   var allQuesArray = [];
  //   Ques.forEach((ques) => {
  //     if (ques.category === category) {
  //       allQuesArray.push({ value: ques.A, label: ques.Q, trigger: "answer" });
  //     }
  //   });
  //   return allQuesArray;
  // };
  render() {
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

    const steps = [
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
        <ChatBot steps={steps}></ChatBot>
        {/* <ReactSimpleChatbot steps={steps}></ReactSimpleChatbot> */}
      </div>
    );
  }
}
export default Bot;
