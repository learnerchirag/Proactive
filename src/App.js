import React from "react";
import "./App.css";
import Filter from "./Filter";
import ModernFertility from "./tools/ModernFertility";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Filter /> */}
      <ModernFertility />
    </div>
  );
}

export default App;
