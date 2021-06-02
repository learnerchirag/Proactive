import React, { Component } from "react";
import "./App.css";
import SkinHair from "./SkinHair";
import ModernFertility from "./tools/ModernFertility";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import IrregularPeriods from "./tools/IrregularPeriods";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import firebase from "firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";
import "@firebase/functions";
import Bot from "./tools/Bot";
import BotPro from "./tools/BotPro";
import Ama from "./tools/Ama";
import FooterMain from "./components/FooterMain";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        {/* <SkinHair /> */}
        {/* <Ama /> */}
        {/* <FooterMain /> */}
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch> 
          <Route path="/forum" render={(props) => <Ama {...props} />} />
          <Route
              path="/tools/chat-bot"
              render={(props) => <BotPro {...props} />}
            /> 
          <Route
            path="/tools/irregular-periods"
            render={(props) => <IrregularPeriods {...props} />}
          />
          <Route
            path="/tools/fertility-timeline"
            render={(props) => <ModernFertility {...props} />}
          />
          <Route
            path="/tools/skin-hair"
            render={(props) => <SkinHair {...props} />}
          />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
