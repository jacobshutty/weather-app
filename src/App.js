import React from "react";
import "./styles/App.css";
import * as api from "./api";

import Navigation from "./components/Navigation";
import CurrentTemperature from "./components/CurrentTemperature";
import Forecast from "./components/Forecast";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "currentTemp",
      zip: "",
      currentTemp: "",
      forecast: ""
    };
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNavClick(name) {
    this.setState({ currentView: name });
  }

  handleChange(event) {
    this.setState({
      zip: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    api.getTemperature(this.state.zip).then(response =>
      this.setState({
        currentTemp: response
      })
    );
    api
      .getForecast(this.state.zip)
      .then(response => this.setState({ forecast: response }));
  }

  render() {
    return (
      <div className="App">
        {this.state.currentTemp ? (
          <Navigation
            handleClick={this.handleNavClick}
            currentView={this.state.currentView}
          />
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <label>
            Zip code:
            <input
              type="text"
              value={this.state.zip}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {this.state.currentView === "currentTemp" ? (
          <CurrentTemperature
            zip={this.state.zip}
            currentTemp={this.state.currentTemp}
          />
        ) : (
          <Forecast zip={this.state.zip} forecast={this.state.forecast} />
        )}
      </div>
    );
  }
}

export default App;
