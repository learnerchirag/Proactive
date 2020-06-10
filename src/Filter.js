import React, { Component } from "react";
import methods from "./Methods.js";
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
} from "reactstrap";
import classnames from "classnames";
export default class Filter extends Component {
  state = {
    activeFilters: [],
  };
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
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
    var methodsArray = methods.methods;

    methodsArray.map((method) =>
      this.state.activeFilters.every((val) => method.filters.includes(val))
        ? (method.isShow = true)
        : (method.isShow = false)
    );
    console.log(methodsArray);
    const filterStatements = [
      "Best at preventing pregnancy",
      "Mistake proof",
      "Helps with periods",
      "Helps Prevent STIs",
      "No Doctor Required",
      "Less or No Hormones",
      "Doesn't reduce sexual pleasure",
      "Easy to keep private",
    ];
    return (
      <>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(1),
              })}
              onClick={() => this.changeFilters(1)}
            >
              Best At Preventing Pregnancy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(2),
              })}
              onClick={() => this.changeFilters(2)}
            >
              Mistake Proof
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(3),
              })}
              onClick={() => this.changeFilters(3)}
            >
              Helps with Periods
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(4),
              })}
              onClick={() => this.changeFilters(4)}
            >
              Helps Prevent STIs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(5),
              })}
              onClick={() => this.changeFilters(5)}
            >
              No Doctor Required
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(6),
              })}
              onClick={() => this.changeFilters(6)}
            >
              Less or No Hormones
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(7),
              })}
              onClick={() => this.changeFilters(7)}
            >
              Doesn't reduce sexual pleasure
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeFilters.includes(8),
              })}
              onClick={() => this.changeFilters(8)}
            >
              Easy to keep private
            </NavLink>
          </NavItem>
        </Nav>
        <Container fluid>
          <Row>
            {methodsArray.map((method) =>
              method.isShow ? (
                <Col md="4" className="my-3">
                  <Card className="shadow border-4 border-primary">
                    <CardHeader>
                      <h4>{method.id}</h4>
                    </CardHeader>
                    <CardBody>
                      {method.efficiency}
                      {/* {this.state.activeFilters.includes(1) && (
                        <div>Best at preventing pregnancy</div>
                      )}
                      {this.state.activeFilters.includes(2) && (
                        <div>Mistake Proof</div>
                      )}
                      {this.state.activeFilters.includes(3) && (
                        <div>Helps with Periods</div>
                      )}
                      {this.state.activeFilters.includes(4) && (
                        <div>Helps Prevent STIs</div>
                      )}
                      {this.state.activeFilters.includes(5) && (
                        <div>Doctor Required</div>
                      )}
                      {this.state.activeFilters.includes(6) && (
                        <div>Less or No Hormones</div>
                      )}
                      {this.state.activeFilters.includes(7) && (
                        <div>Doesn't reduce sexual pleasure</div>
                      )}
                      {this.state.activeFilters.includes(8) && (
                        <div>Easy to keep private</div>
                      )} */}
                      {this.state.activeFilters.map((filter) => {
                        return (
                          <div>
                            <div className="bold">
                              {filterStatements[filter - 1]}
                            </div>
                            <span className="text-muted">
                              {method.value[filter - 1]}
                            </span>
                          </div>
                        );
                      })}
                    </CardBody>
                  </Card>
                </Col>
              ) : null
            )}
          </Row>
        </Container>
      </>
    );
  }
}
