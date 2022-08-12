import React from 'react'
import Weatherbox from './Weatherbox.js'

const api = {
  key: "dc862ca896c6425009a609e2e15221cb",
  base: "https://api.openweathermap.org/data/2.5/"
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      weather: {}
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords
      console.log(position)
      this.lookUpCity(latitude, longitude)
    });
  }

  async lookUpCity (latitude, longitude) {
    const result = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api.key}`)
    const resultJSON = await result.json()
    console.log(resultJSON)
    
    this.lookUpWeather(resultJSON[0].name)
  }
  
  async lookUpWeather (query) {
    if (!query) {
      query = this.state.query
    }
    query = query.replace("gmina ", "")
    console.log(query)
    if (query.length < 3) {
      return alert('At least two characters needed to search')
    }
    const result = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    const resultJSON = await result.json()

    this.setState({query:"", weather: resultJSON})
  }

  search (evt) {
    evt.preventDefault()
    this.lookUpWeather()
  }

  handleChange = (e) => this.setState({query: e.target.value})

  render() {
    return (
      <div className={(typeof this.state.weather.main != "undefined")
      ? ((this.state.weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <form onSubmit={this.search.bind(this)}>
              <input 
                type="text"
                className="search-bar"
                placeholder='Miejscowość...'
                onChange={this.handleChange}
                value={this.state.query}
              />
            </form>
          </div>
          {(typeof this.state.weather.main != "undefined") ? (
            <Weatherbox weather={this.state.weather} />
          ) : ''}
        </main>
        <footer>Strona stworzona przez Jakuba Piwtoraka</footer>
      </div>
    )
  }
}

export default App
