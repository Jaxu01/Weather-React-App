import React from 'react';
class Weatherbox extends React.Component {
    constructor(props) {
        super(props)
    }
    dateBuilder (d) {
        let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
        let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]

        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }
    render () {
        return (
            <div>
                <div className="location-box">
                    <div className="location">{this.props.weather.name}, {this.props.weather.sys.country}</div>
                    <div className="date">{this.dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                    {Math.round(this.props.weather.main.temp)}°c
                    </div>
                    <div className="weather">{this.props.weather.weather[0].main}</div>
                </div>
            </div>
        )
    }
}
export default Weatherbox