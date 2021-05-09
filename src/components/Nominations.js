import React from 'react';

import SadTrophy  from './sad-trophy.png'
import NominatedMovie from './NominatedMovie.js'

class Nominations extends React.Component {
  constructor(props){
    super(props)
    let nominated = JSON.parse(localStorage.getItem('nominated_movies'))
    this.state = { movies: nominated }
    
    this.onStorageUpdate = this.onStorageUpdate.bind(this)
    this.removeMovie = this.removeMovie.bind(this)
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

  removeMovie(indexOfMovie) {
    let movieTemp = this.state.movies;
    const movieFinal = movieTemp.filter( (elem, index) => index !== indexOfMovie);
    localStorage.setItem('nominated_movies', JSON.stringify(movieFinal))
    window.location.reload()
  }

  render() {
    let { movies } = this.state;
    var inner = null;
    if(movies && movies.length !== 0){
      inner = <div className="nominations">
        { movies.map( (elem, index) => <NominatedMovie data={elem} remove={this.removeMovie} idx={index}/> ) }
      </div>
    } else {
      inner = <div className="no-nominations">
        <img src={SadTrophy} alt="Frowning trophy cup" className="sad-trophy" />
        You have no nominations at the moment. Please search for a movie above.
      </div>
    }
    return <div className="box">
      <div className="title">
        Your nominations:
      </div>
      { inner }
    </div>
  }
}

export default Nominations;
  