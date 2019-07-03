import React from "react";
import "./../styles/Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <div className="nav-links">
        <button
          onClick={() => this.props.handleClick("currentTemp")}
          className={this.props.currentView === "currentTemp" ? "selected" : ""}
        >
          Current Temp
        </button>
        <button
          onClick={() => this.props.handleClick("forecast")}
          className={this.props.currentView === "forecast" ? "selected" : ""}
        >
          5 day forecast
        </button>
      </div>
    );
  }
}

export default Navigation;
