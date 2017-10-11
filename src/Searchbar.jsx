//document.body.style.backgroundImage = "url('img_tree.png')";

import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';

const searchStyle = {
  // color: 'white',
  display: 'absolute',
  opacity: '0.5',
  margin: '0 auto',
  width: '400px',
  paddingLeft: '15px',
  paddingRight: '15px'
}

const dialogStyle = {
  height: '200px'
}

// onSearch = () => {
  // fetch(tempApi(this.state.zip))
  //   .then(response => response.json())
  //   .then(data => {
  //     this.setState({
  //       temp: Math.round(data.main.temp),
  //       humidity: data.main.humidity,
  //       coord: [data.coord.lat, data.coord.lon]
  //     })
  //   });
// };

class Searchbar extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: searchTerms,
      value: '',
      dialogOpen: false,
      imgUrl: ['','']
    };
  }

  handleSearch = (search) => {
    fetch('https://images-api.nasa.gov/search?q='+search)
      .then(response => response.json())
      .then(data => { 
        // console.log(data.collection.items[0].links[0])
        const urls = []
        let counter = 0;
        while(urls.length < 2 && counter < data.collection.items.length) {
          if (data.collection.items[counter].links[0].href.endsWith('jpg')) {
            urls.push(data.collection.items[counter].links[0].href);
          }
          counter += 1;
        }
        // console.log('urls', urls);
        // const urls = [data.collection.items[0].links[0].href, data.collection.items[1].links[0].href];
        this.setState({ 
          imgUrl: urls, 
         })
      });

    this.setState({ dialogOpen: true })
  };

  onUpdateInput = (value) => {
    this.setState({ value: value })
  };

  handleClose = () => {
    this.setState({ dialogOpen: false});
  };

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Search NASA images..."
          dataSource={this.state.dataSource}
          onUpdateInput={this.onUpdateInput}
          style={searchStyle}
          fullWidth={true}
          onNewRequest={this.handleSearch}
        />
        <Dialog
          title='Image search of nasa.gov'
          /* actions={actions} */
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          style={dialogStyle}
        >
        <img className="searchImage" onClick={this.handleClose} src={this.state.imgUrl[0]} />
        <img className="searchImage" onClick={this.handleClose} src={this.state.imgUrl[1]} />
        </Dialog>
        </div>
        )
  }
}

const searchTerms = [
  "Apollo", "Apollo 11", "Apollo 13", "Asteroids", "near-Earth", "Astronauts", "Astronomy", "Picture of the Day", "Black hole", "Career", "Cassini", "Challenger", "Chandra", "Columbia", "Comets", "near-Earth", "Constellations ", "Constellation X mission", "Contrails", "Eclipses", "Earth", "Employment", "Europa", "Galileo", "Gallery ", "Games ", "GPS", "Global Positioning System", "Helios", "History", "Hubble", "Hubble Space Telescope", "Hyper-X", "Images", "International Space Station", "Jobs", "John Glenn", "Jupiter", "Logo", "MAP (Microwave Anistropy Probe)", "Mars", "Mars Exploration Rovers ", "The planet", "Mars Exploration Program", "Mercury", "The planet", "The first NASA human spaceflight program", "Mir", "Moon", "Moon Landing", "Fake moon landing, or Moon landing hoax", "MPEG (MPG)", "NASA", "About NASA", "Mission Statement", "Ames Research Center (ARC)", "Dryden Flight Research Center (DFRC)", "Glenn Research Center (GRC)", "Goddard Space Flight Center (GSFC)", "Jet Propulsion Laboratory (JPL)", "Johnson Space Center (JSC)", "Kennedy Space Center (KSC)", "Langley Research Center (LaRC)", "Marshall Space Flight Center (MSFC)", "Stennis Space Center (SSC)", "Near Earth Asteroid Rendezvous (NEAR)", "Nebula", "Neil Armstrong", "Pathfinder", "Mars Rover", "Experimental, light aircraft", "Photographs and Pictures", "Pioneer 10", "Planet X", "Planets", "Pluto", "Robots", "Rockets", "Rovers", "Satellites", "Saturn", "The planet", "The engine that launched men toward the Moon", "Scramjet", "Screen Savers", "Imaging Technology Center", "SOHO", "SETI", "Space Flight Awareness", "Space Shuttle", "SETI", "Search for Extra-Terrestrial Intelligence", "Shuttle", "SOHO", "Solar and Heliospheric Observatory", "Solar system", "Solar wind", "Space", "Space Shuttle", "Space Station", "Stars", "Sun", "Solar studies", "Tours", "UFO", "Voyager", "Venus", "X-43"
]


export default Searchbar;