import React from "react";
import "./../styles/Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <div
          onClick={() => this.props.handleClick("currentTemp")}
          className={this.props.currentView === "currentTemp" ? "selected" : ""}
        >
          Current Temp
        </div>
        <div
          onClick={() => this.props.handleClick("forecast")}
          className={this.props.currentView === "forecast" ? "selected" : ""}
        >
          5 day forecast
        </div>
      </div>
    );
  }
}

export default Navigation;
