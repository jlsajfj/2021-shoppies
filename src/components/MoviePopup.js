import React from 'react';

class MoviePopup extends React.Component {
    constructor(props){
        super(props);
        this.state = { movieData: props.data }
    }
    render(){
        return (
        <div className="fade-in">
            <div className="movie-overlay" onClick={ this.props.hide }>
                <div className="movie-display border">
                    abc
                </div>
            </div>
        </div>
        );
    }
}

export default MoviePopup;