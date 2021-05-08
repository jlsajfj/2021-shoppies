import React from 'react';

import MoviePopup from './MoviePopup.js';

class SearchItem extends React.Component {
    constructor(props){
        super(props)
        this.popupShow = this.popupShow.bind(this)
        this.popupHide = this.popupHide.bind(this)
        this.nominate = this.nominate.bind(this)

        this.state = {movieData: props.data, largeActive: false, lockedButton: props.nominated && props.nominated.includes(props.data.imdbID)}
    }

    popupShow(){
        this.setState({largeActive: true})
    }

    popupHide(){
        this.setState({largeActive: false})
    }

    nominate(){
        var nominations = JSON.parse(localStorage.getItem('nominated_movies'));
        if(nominations&&!nominations.includes(this.state.movieData.imdbID)){
            nominations.push(this.state.movieData.imdbID);
        } else {
            nominations = [this.state.movieData.imdbID];
        }
        localStorage.setItem('nominated_movies', JSON.stringify(nominations));
        this.setState({lockedButton: true})
        console.log(nominations)
    }

    render (){
        let {largeActive, movieData, lockedButton} = this.state;
        return (
        <div className="search-item fade-in">
            <div className="item-title" onClick={this.popupShow}>{this.state.movieData.Title}</div>
            <div className="item-year">&nbsp;({this.state.movieData.Year})</div>
            <button className={"item-nominate" + (lockedButton?" locked":"")} onClick={this.nominate}>Nominate</button>
            { largeActive ? <MoviePopup data={movieData} hide={this.popupHide}/> : null }
        </div>
        );
    }
}

export default SearchItem;