import Header from './Header.js'
import Search from './Search.js'
import Nominations from './Nominations.js'
import '../styles/App.css';

import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    
    this.updateNominations = this.updateNominations.bind(this)
  }
  updateNominations(){
  }
  render () {
    return (
      <div>
        <Header />
        <Search />
        <Nominations />
      </div>
    );
  }
}

export default App;
