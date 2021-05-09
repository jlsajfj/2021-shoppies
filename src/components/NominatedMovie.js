import React from 'react';

import MoviePopup from './MoviePopup.js';
import MissingPoster from './poster-missing.png';

class NominatedMovie extends React.Component {
    constructor(props) {
        super(props);

        this.popupShow = this.popupShow.bind(this)
        this.popupHide = this.popupHide.bind(this)

        this.state = { movieData: JSON.parse(props.data), popupActive: false }
    }

    popupShow(){
        this.setState({popupActive: true})
    }

    popupHide(){
        this.setState({popupActive: false})
    }

    render() {
        let { Title, Year, Poster } = this.state.movieData
        let posterElem = <img src={MissingPoster} alt={Title} className="poster"/>;;
        if(Poster !== "N/A"){
            posterElem = <img src={Poster} alt={Title} className="poster"/>;
        }
        return <div className="movie-item">
            <span className="movie-title-box" onClick={this.popupShow}>
                {Title}&nbsp;({Year})
            </span>
            { posterElem }
            <div className="close-nomination button" onClick={() => this.props.remove(this.props.idx)}>Remove</div>
            { this.state.popupActive ? <MoviePopup data={this.state.movieData} hide={this.popupHide}/> : null }
        </div>
    }
}

export default NominatedMovie;