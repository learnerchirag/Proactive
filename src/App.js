import React, { Component } from "react";
import "./App.css";
import Filter from "./Filter";
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
export default class App extends Component {
  componentDidMount = async () => {
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
    // firebase.initializeApp(config);
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Bot />
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              path="/tools/irregular-periods"
              render={(props) => <IrregularPeriods {...props} />}
            />
            <Route
              path="/tools/modern-fertility"
              render={(props) => <ModernFertility {...props} />}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
