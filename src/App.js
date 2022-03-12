import Recat, { Component } from 'react';
import Form from './component/Form';
import Weather from './component/Weather';
const API_KEY = "63b6646506a2d15285886ba395edd012"
class App extends Component {
  state = {
    tempreature: '',
    city: '',
    country: '',
    humidity: '',
    description:'',
    error: ''

  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`)
    const data = await api.json();
    console.log(data)
    if (city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description:data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        tempreature: '',
        city: '',
        country: '',
        humidity: '',
        description:'',
        error: 'Please enter data'
      })
    }
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='form-container'>
        <h2 >Weather App</h2>
        <Form getWeather={this.getWeather} />
        <Weather 
        tempreature = {this.state.tempreature}
        city={this.state.city}
        country={this.state.country}
        humidity= {this.state.humidity}
        description={this.state.description}
        error= {this.state.error} />
</div>
      </div>
    )
  }
}


export default App;
