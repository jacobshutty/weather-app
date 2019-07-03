import React from "react";

class CurentTemperature extends React.Component {
  render() {
    return (
      <div>
        {this.props.currentTemp ? (
          <h1>
            The current temp is {this.props.currentTemp.currentTemp} degrees
            fahrenheit
          </h1>
        ) : null}
      </div>
    );
  }
}

export default CurentTemperature;
