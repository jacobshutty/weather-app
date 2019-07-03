import React from "react";

class CurentTemperature extends React.Component {
  render() {
    return (
      <div>
        {this.props.currentTemp ? (
          <div>
            <h1>Current temperature for {this.props.zip}</h1>
            <h2>{this.props.currentTemp.currentTemp} &deg;F</h2>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CurentTemperature;
