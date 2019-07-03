import React from "react";
import "./../styles/Forecast.css";

class Forecast extends React.Component {
  render() {
    let forecast = [];
    for (const day in this.props.forecast) {
      forecast.push(
        <div className="row" key={day}>
          <h1>{day.date}</h1>
          {this.props.forecast[day].map(item => (
            <div key={item.id} className="forecast-day">
              <b>{item.day}</b>
              <p>{item.time}</p>
              <img src={item.icon} alt="weather icon" />
              <p>{item.conditions}</p>
              <p>{item.temp}&deg;F </p>
            </div>
          ))}
        </div>
      );
    }
    return this.props.forecast ? (
      <div>
        <h1>5 day forecast for zip code {this.props.zip}</h1>
        {forecast}
      </div>
    ) : null;
  }
}

export default Forecast;
