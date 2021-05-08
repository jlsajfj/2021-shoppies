import React from 'react';

class Nominations extends React.Component {
  constructor(props){
    super(props)
    let nominated = JSON.parse(localStorage.getItem('nominated_movies'))
    this.state = { movies: nominated }
  }

  componentDidMount() {
    window.addEventListener("storage", e => {
      let nominated = JSON.parse(localStorage.getItem('nominated_movies'))
      this.setState({movies: nominated}, () => console.log(this.state))
    });
  }

  render() {
    let { movies } = this.state;
    let mainClass = " hidden"
    if(movies && movies.length !== 0){
      mainClass = ""
    }
    return (
      <div className={"box"+mainClass}>
          { movies }
      </div>
    );
  }
}

export default Nominations;
  