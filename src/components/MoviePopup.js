import React from 'react';

class MoviePopup extends React.Component {
    constructor(props){
        super(props);
        this.state = { movieData: props.data }
    }
    render(){
        return (<div className={"movie-popup fade-in"}>hello</div>)
    }
}

export default MoviePopup;