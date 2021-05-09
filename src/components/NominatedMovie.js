import React from 'react';

import MissingPoster from './poster-missing.png';

class NominatedMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(props.data)
        
        this.removeThis = this.removeThis.bind(this)
    }

    removeThis() {
        var movies = localStorage.getItem('nominated_movies');
        const current = JSON.stringify(this.state);
        if(movies){
            var remaining = JSON.parse(movies)
            if(remaining.includes(current)) {
                const indexOfCur = remaining.indexOf(current);
                console.log(indexOfCur)
                remaining.splice(indexOfCur, 1)
                localStorage.setItem('nominated_movies', JSON.stringify(remaining))
                window.dispatchEvent( new Event('storage') )
            }
        }
    }

    render() {
        let { Title, Year, imdbID, Poster } = this.state
        let posterElem;
        if(Poster !== "N/A"){
            posterElem = <img src={Poster} alt={Title} className="poster"/>;
        } else {
            posterElem = <img src={MissingPoster} alt={Title} className="poster"/>;
        }
        return <div className="movie-item">
            <span className="movie-title">
                {Title}&nbsp;({Year})
            </span>
            { posterElem }
            <div className="close-nomination button" onClick={this.removeThis}>Remove</div>
        </div>
    }
}

export default NominatedMovie;