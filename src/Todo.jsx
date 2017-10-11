import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar'

const taskStyle = {
  position: 'fixed',
  bottom: "30px",
  right: "30px",
};

const textStyle = {
  paddingLeft: '16px',
  width: '220px'
};

const submitStyle = {
  marginLeft: '16px',
  marginTop: '5px'
}

class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      todoText: '',
      value: '',
      notes: [],
      openSnackbar: false,
      deletedNotes: [],
      deletedItem: ''
    };
  };

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClick = () => {
    fetch('http://localhost:3000/api/notes/Brandon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'todo': this.state.value })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ notes: data.notes, value: '' });
    });
  }

  handleItemClick = (i) => {
    this.setState({ deletedNotes: this.state.notes });
    const updatedArr = this.state.notes.slice()
    this.setState({ deletedNotes: this.state.notes, deletedItem: updatedArr.splice(i, 1) });
    fetch('http://localhost:3000/api/notes/update/Brandon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'todo': updatedArr })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('success post', console.log(data));
      this.setState({ notes: data.notes, value: '' });
    });
    this.setState({ openSnackbar: true });
  }

  handleUndo = () => {
    console.log('deleted', this.state.deletedNotes)
    fetch('http://localhost:3000/api/notes/update/Brandon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'todo': this.state.deletedNotes })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ notes: data.notes });
    });
    this.setState({ openSnackbar: false });
  }


  componentDidMount() {
    fetch('http://localhost:3000/api/notes/Brandon')
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data.notes })
      });
  }

  render() {
    const notesToRender = [];

    for (let i = 0; i < this.state.notes.length; i += 1) {
      notesToRender.push(<div key={i} id={i}><MenuItem key={i} onClick={() => this.handleItemClick(i)}>{this.state.notes[i]}</MenuItem></div>);
    }

    return (
      <div>
        <RaisedButton
          label="Open Tasks"
          style={taskStyle}
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={280}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          {/* <MenuItem >Menu Item</MenuItem>
          <MenuItem >Menu Item 2</MenuItem> */}
          {notesToRender}
          <TextField
            hintText="Add a task..."
            style={textStyle}
            value={this.state.value}
            onChange={function (event, newVal) {
              this.setState({ value: newVal });
            }.bind(this)}
          />
          <RaisedButton label="Submit" style={submitStyle} onClick={this.handleClick} />
        </Drawer>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.deletedItem + ' deleted from you todo list'}
          action="undo"
          autoHideDuration={4000}
          onActionTouchTap={this.handleUndo}
          onRequestClose={() => this.setState({ openSnackbar: false, })}
        />
      </div>
    );
  }
}

export default Todo;