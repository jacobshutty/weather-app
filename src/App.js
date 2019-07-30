import React from "react";
import "./styles/App.css";
import * as api from "./api";
import * as cookie from "./util/cookies";

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
      showError: false,
    };
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCookiesOnMount = this.handleCookiesOnMount.bind(this);
    this.handleGeolocationOnMount = this.handleGeolocationOnMount.bind(this);
  }
  componentDidMount() {
    this.handleCookiesOnMount();
    this.handleGeolocationOnMount();
  }

  handleCookiesOnMount() {
    const page = cookie.getCookie("page");
    if (page) {
      // switch to the last page the user looked at
      this.setState({ currentView: page });
    } else {
      // initialize cookie and default to temperature view
      cookie.setCookie("page", "currentTemp");
    }
  }
  handleGeolocationOnMount() {
    // get geolocation from browser
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      if (position) {
        api
          .getTemperatureByGeo(coords.latitude, coords.longitude)
          .then(response => {
            this.setState({ currentTemp: response });
          });
        api
          .getForecastByGeo(coords.latitude, coords.longitude)
          .then(response => {
            this.setState({ forecast: response });
          });
      }
    });
  }

  handleNavClick(name) {
    this.setState({ currentView: name });
    cookie.setCookie("page", name);
  }

  handleChange(event) {
    this.setState(
      {
        zip: event.target.value,
        // Clear current temp and forecast to hide shown temperature on zip code change
        currentTemp: "",
        forecast: "",
      },
      () => {
        if (this.state.zip.length === 5) {
          this.handleSubmit();
        }
      }
    );
  }

  handleSubmit(event) {
    if (event) event.preventDefault();
    api
      .getTemperatureByZip(this.state.zip)
      .then(response =>
        this.setState({
          currentTemp: response,
          showError: false,
        })
      )
      .catch(() => {
        this.setState({
          showError: true,
        });
      });
    api
      .getForecastByZip(this.state.zip)
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
            <CurrentTemperature currentTemp={this.state.currentTemp} />
          ) : (
            <Forecast zip={this.state.zip} forecast={this.state.forecast} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
