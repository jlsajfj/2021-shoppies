import Header from './Header.js'
import Banner from './Banner.js';
import Search from './Search.js'
import Nominations from './Nominations.js'
import '../styles/App.css';

import React from 'react';

class App extends React.Component {
  componentDidMount() {
    document.title = "The Shoppies 2021"
  }
  render () {
    return (
      <div>
        <Header />
        <Banner />
        <Search />
        <Nominations />
      </div>
    );
  }
}

export default App;
