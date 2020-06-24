import React, { Component } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Container,
  TabPane,
  TabContent,
} from "reactstrap";
import { Ques } from "./constants/chatArray";
export default class BotPro extends Component {
  state = {
    custom: "",
  };
  handleInputValue = (event) => {
    this.setState({
      [event.name]: event.value,
    });
  };
  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="Ask a Question or type a keyword"
          name="custom"
          value={this.state.custom}
        ></Input>
        <Row>
          <Col>
            <Button>Popular</Button>
          </Col>
          <Col>
            <Button>All topics</Button>
          </Col>
        </Row>
        <Container>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane id={1}>
              {Ques.map((ques) => (
                <div>
                  <Button>{Ques.Q}</Button>
                </div>
              ))}
            </TabPane>
            <TabPane id={2}></TabPane>
          </TabContent>
        </Container>
      </div>
    );
  }
}
