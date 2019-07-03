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
      forecast: "",
      showError: false
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
      zip: event.target.value,
      // Clear current temp and forecast to hide shown temperature on zip code change
      currentTemp: "",
      forecast: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    api
      .getTemperature(this.state.zip)
      .then(response =>
        this.setState({
          currentTemp: response,
          showError: false
        })
      )
      .catch(() => {
        this.setState({
          showError: true
        });
      });
    api
      .getForecast(this.state.zip)
      .then(response => this.setState({ forecast: response }));
  }

  render() {
    return (
      <div className="App">
        <div className="app-wrapper">
          {this.state.currentTemp ? (
            <Navigation
              handleClick={this.handleNavClick}
              currentView={this.state.currentView}
            />
          ) : (
            <h1>Please enter your zip code</h1>
          )}
          <form onSubmit={this.handleSubmit}>
            <label>
              Zip code:
              <input
                id="zip-input"
                type="text"
                value={this.state.zip}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {this.state.showError ? (
            <p className="error-message">Please enter a valid zip code</p>
          ) : null}
          {this.state.currentView === "currentTemp" ? (
            <CurrentTemperature
              zip={this.state.zip}
              currentTemp={this.state.currentTemp}
            />
          ) : (
            <Forecast zip={this.state.zip} forecast={this.state.forecast} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
