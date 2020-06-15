import React from "react";
import "./App.css";
import Filter from "./Filter";
import ModernFertility from "./tools/ModernFertility";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import IrregularPeriods from "./tools/IrregularPeriods";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Filter /> */}
      {/* <ModernFertility /> */}
      {/* <IrregularPeriods /> */}
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

export default App;
