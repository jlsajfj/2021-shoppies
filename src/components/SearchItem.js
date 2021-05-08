import React from 'react';

import MoviePopup from './MoviePopup.js';

class SearchItem extends React.Component {
    constructor(props){
        super(props)
        this.popupShow = this.popupShow.bind(this)
        this.popupHide = this.popupHide.bind(this)
        this.nominate = this.nominate.bind(this)
        this.lockButton = this.lockButton.bind(this)
        const locked = props.nominated && props.nominated.length === 5
        const selected = props.nominated && props.nominated.includes(JSON.stringify(props.data))
        this.state = { movieData: props.data, largeActive: false, lockedButton: locked, selectedButton: selected }
    }

    popupShow(){
        this.setState({largeActive: true})
    }

    popupHide(){
        this.setState({largeActive: false})
    }

    lockButton() {
        this.setState({ lockedButton: true })
    }

    componentDidMount() {
        window.addEventListener("no-more-nominations", this.lockButton);
    }

    componentWillUnmount() {
        window.removeEventListener("no-more-nominations", this.lockButton);
    }

    nominate(){
        var nominations = JSON.parse(localStorage.getItem('nominated_movies'));
        if(nominations){
            if(!nominations.includes(JSON.stringify(this.state.movieData))){
                nominations.push(JSON.stringify(this.state.movieData));
                localStorage.setItem('nominated_movies', JSON.stringify(nominations));
                window.dispatchEvent( new Event('storage') )
                if(nominations.length === 5){
                    window.dispatchEvent( new Event('no-more-nominations') )
                }
            }
        } else {
            nominations = [JSON.stringify(this.state.movieData)];
            localStorage.setItem('nominated_movies', JSON.stringify(nominations));
            window.dispatchEvent( new Event('storage') )
        }
        this.setState({selectedButton: true})
    }

    render (){
        let {largeActive, movieData, lockedButton, selectedButton} = this.state;
        let buttonState = "item-nominate";
        if(selectedButton) {
            buttonState += " selected"
        } else if (lockedButton) {
            buttonState += " locked";
        }
        return (
        <div className="search-item fade-in">
            <div className="item-title" onClick={this.popupShow}>{this.state.movieData.Title}</div>
            <div className="item-year">&nbsp;({this.state.movieData.Year})</div>
            <button className={buttonState} onClick={this.nominate}>Nominate</button>
            { largeActive ? <MoviePopup data={movieData} hide={this.popupHide}/> : null }
        </div>
        );
    }
}

export default SearchItem;