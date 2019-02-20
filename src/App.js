import React, { Component } from "react";
import "./App.css";
import OurComponent from "./components/ourcomponent"; // We import our component.

class App extends Component {
  render() {
    return (
      <div className="App">
        <OurComponent> </OurComponent>
      </div>
    );
  }
}

export default App;
