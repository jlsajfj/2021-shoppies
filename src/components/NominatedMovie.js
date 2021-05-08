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
            posterElem = <img src={Poster} alt='Movie Poster' className="poster"/>;
        } else {
            posterElem = <img src={MissingPoster} alt='Movie Poster' className="poster"/>;
        }
        return <div>
            { posterElem }
        </div>
    }
}

export default NominatedMovie;