import React from 'react';

import NominatedMovie from './NominatedMovie.js'

class Nominations extends React.Component {
  constructor(props){
    super(props)
    let nominated = JSON.parse(localStorage.getItem('nominated_movies'))
    this.state = { movies: nominated }
    
    this.onStorageUpdate = this.onStorageUpdate.bind(this)
  }

  onStorageUpdate(event) {
    let nominated = JSON.parse(localStorage.getItem('nominated_movies'))
    this.setState({movies: nominated})
  }

  componentDidMount() {
    window.addEventListener("storage", this.onStorageUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.onStorageUpdate)
  }

  render() {
    let { movies } = this.state;
    var inner = null;
    if(movies && movies.length !== 0){
      inner = <div className="nominations">
        { movies.map( elem => <NominatedMovie data={elem} /> ) }
      </div>
    } else {
      inner = "you have no nominations"
    }
    return <div className="box">
      { inner }
    </div>
  }
}

export default Nominations;
  