import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => this.setState({smurfs: res.data}))
      .catch(err => console.log('Aw Shit, Clitus the tractor wont start!' + err));
}

smurfPoster = (name, age, height ) => {
  console.log(name, age, height );
  axios.post('http://localhost:3333/smurfs', {name, height, age})
  .then(res =>this.setState({smurfs: res.data}))
  .catch(err => console.log(err + 'SMURF UNABLE TO POST'))
}



  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
       
          <Route exact path="/" render={props => (
            <Smurfs {...props} smurfs={this.state.smurfs} smurfASmurf={this.smurfASmurf}/>
        )} />
         <Link to={`/`}><h2>Smurfs</h2></Link>
        <Route path ='/smurfform' render ={props => ( 
          <SmurfForm smurfPoster={this.smurfPoster}/>
        )}
            />
      <Link to={'/smurfform'}><h3>Create Smurfs</h3></Link>
      </div>
    );
  }
}

export default App;
