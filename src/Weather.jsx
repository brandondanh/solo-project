import React from 'react';
import ZipCode from './ZipCode.jsx';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    opacity: '.9',
    textAlign: 'center',
    // verticalAlign: 'middle',
    display: 'inline-block',
  };

  const infoStyle = {
      fontWeight: 'bold',
      fontSize: '30px',
      lineHeight: '0px',
      marginTop: '30%'
  }

  const columnStyle = {
    // height: 350,
    width: 120,
    marginTop: '-2%',
    marginLeft: '5px'
  };

const tempApi = (zip) => 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid=0facc1dae4bee4f4ff30bd45ad24e85d'
const uvApi = (lat, lon) => 'http://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+lon+'&appid=0facc1dae4bee4f4ff30bd45ad24e85d'

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
        temp: '',
        humidity: '',
        uvIndex: '',
        zip: '',
        coord: ['','']
    };
  }

  changeZip = (zip) => {
    fetch('http://localhost:3000/api/weather/Brandon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'zip': zip })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ notes: data.notes, value: '' });
    });

    this.setState({
      zip: zip
    }, this.fetchWeather);
  }

  fetchWeather = () => {
    fetch(tempApi(this.state.zip))
      .then(response => response.json())
      .then(data => { 
        this.setState({ 
          temp: Math.round(data.main.temp), 
          humidity: data.main.humidity,
          coord: [data.coord.lat, data.coord.lon]
         })

         fetch(uvApi(this.state.coord[0],this.state.coord[1]))
          .then(response => response.json())
          .then(data => {
          this.setState({ uvIndex: data.value })
        });
      });
  }
  componentWillMount() {
    fetch('http://localhost:3000/api/notes/Brandon')
      .then(response => response.json())
      .then(data => {
        this.setState({ zip: data.zip })
      })
      .then(this.fetchWeather)
      ;
  }
  // componentDidMount() {
  //   this.fetchWeather();
  // }

  render() {
    return (
        <div style={columnStyle}>
          <Paper style={style} zDepth={5} children={<div><p>Location</p><p style={infoStyle}>{this.state.zip}</p></div>} />
          <Paper style={style} zDepth={5} children={<div><p>Temp</p><p style={infoStyle}>{this.state.temp}K</p></div>} />
          <Paper style={style} zDepth={5} children={<div><p>Humidity</p><p style={infoStyle}>{this.state.humidity}%</p></div>}/>
          <Paper style={style} zDepth={5} children={<div><p>UV Index</p><p style={infoStyle}>{this.state.uvIndex}</p></div>}/>
          <ZipCode zip={this.state.zip} changeZip={(zip) => {this.changeZip(zip)}} />
        </div>
    );
  }
}

export default Weather;