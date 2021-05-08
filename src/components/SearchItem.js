import React from 'react';

import MoviePopup from './MoviePopup.js';

class SearchItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {movieData: props.data, largeActive: false}
        this.popup = this.popup.bind(this)
    }

    popup(){
        this.setState({largeActive: true})
    }

    render (){
        let {largeActive, movieData} = this.state;
        return (
        <div className="search-item fade-in">
            <div className="item-title" onClick={this.popup}>{this.state.movieData.Title}</div>
            <div className="item-year">{this.state.movieData.Year}</div>
            { largeActive ? <MoviePopup data={movieData}/> : null }
        </div>
        );
    }
}

export default SearchItem;