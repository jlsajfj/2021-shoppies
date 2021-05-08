import React from 'react';

import MoviePopup from './MoviePopup.js';

class SearchItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {movieData: props.data, largeActive: false}
        this.popupShow = this.popupShow.bind(this)
        this.popupHide = this.popupHide.bind(this)
    }

    popupShow(){
        this.setState({largeActive: true})
    }

    popupHide(){
        this.setState({largeActive: false})
    }

    render (){
        let {largeActive, movieData} = this.state;
        return (
        <div className="search-item fade-in">
            <div className="item-title" onClick={this.popupShow}>{this.state.movieData.Title}</div>
            <div className="item-year">{this.state.movieData.Year}</div>
            { largeActive ? <MoviePopup data={movieData} hide={this.popupHide}/> : null }
        </div>
        );
    }
}

export default SearchItem;