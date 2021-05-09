import React from 'react';

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
    console.log(indexOfMovie)
    let movieTemp = this.state.movies;
    const movieFinal = movieTemp.filter( (elem, index) => index !== indexOfMovie);
    this.setState({movies: movieFinal})
    localStorage.setItem('nominated_movies', JSON.stringify(movieFinal))
  }

  render() {
    let { movies } = this.state;
    var inner = null;
    if(movies && movies.length !== 0){
      inner = <div className="nominations">
        { movies.map( (elem, index) => <NominatedMovie data={elem} remove={this.removeMovie} idx={index}/> ) }
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
  