import React from 'react';

import MissingPoster from './poster-missing.png';

class NominatedMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(props.data)
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
                {Title}&nbsp;<span className="item-year">({Year})</span>
            </span>
            { posterElem }
            <div className="close-nomination">Remove</div>
        </div>
    }
}

export default NominatedMovie;