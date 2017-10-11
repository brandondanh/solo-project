import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const dialogStyle = {
  width: '30%'
}

const textStyle = {
  position: 'fixed',
  bottom: "30px",
  left: "30px",
};

class ZipCode extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: ''
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    // if(!isNaN(this.state.value))
      this.props.changeZip(this.state.value);
    this.setState({ open: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  }


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Change Zip" style={textStyle} onClick={this.handleOpen} />
        <Dialog
          title="Change Zip Code"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={dialogStyle}
        >
          <TextField
            hintText="Enter zip code..."
            //value={this.state.value}
            onChange={(e, val) => this.setState({value: val})}
          />
        </Dialog>
      </div>
    );
  }
}

export default ZipCode;