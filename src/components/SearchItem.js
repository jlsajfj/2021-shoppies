import React from 'react';

class SearchItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {movieData: props.data, displayLarge: false}
        this.popup = this.popup.bind(this)
    }

    popup(){
        this.setState({displayLarge: true})
        console.log(this.state)
    }

    render (){
        let {displayLarge} = this.state;
        return (
        <div className="search-item">
            <div className="item-title" onClick={this.popup}>{this.state.movieData.Title}</div>
            <div className="item-year">{this.state.movieData.Year}</div>
            <div className={"item-popup"+(displayLarge?"":" hidden")}>abcdefg</div>
        </div>
        );
    }
}

export default SearchItem;