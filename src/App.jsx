import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Todo from './Todo.jsx';
import Weather from './Weather.jsx';
import Searchbar from './Searchbar.jsx';
import Login from './Login.jsx';
import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';
import FloatingActionButton from 'material-ui/FloatingActionButton';


const lightStyle = {
  position: 'fixed',
  top: "30px",
  right: "30px",
}

/**
 * A counter button: tap the button to increase the count.
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // loginPage: [],
      // todoPage: [],
      theme: lightBaseTheme,
      count: 0,
      
    };
  }

  // componentWillMount(){
  //   var loginPage =[];
  //   loginPage.push(<Login />);
  //   this.setState({
  //                 loginPage:loginPage
  //                   })
  // }

  toggleTheme = () => {
    // console.log(this.state);
    if (this.state.theme === darkBaseTheme) {
      this.setState({theme: lightBaseTheme});
    } else {
      this.setState({theme: darkBaseTheme});
    }
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
        <div id='home'>
          <Searchbar />
          <FloatingActionButton mini={true} style={lightStyle} onClick={this.toggleTheme}>
            <Lightbulb />
          </FloatingActionButton>
          <Weather />
          <Todo />
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
