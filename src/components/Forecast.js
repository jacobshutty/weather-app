import React from "react";
import "./../styles/Forecast.css";

class Forecast extends React.Component {
  render() {
    let forecast = [];
    for (const day in this.props.forecast) {
      forecast.push(
        <div className="row">
          {this.props.forecast[day].map(item => (
            <div key="item.id">{item.day}</div>
          ))}
        </div>
      );
    }
    return forecast;
  }
}

export default Forecast;
