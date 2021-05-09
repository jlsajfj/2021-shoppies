import React from 'react';

import MissingPoster from './poster-missing.png';

class MoviePopup extends React.Component {
    constructor(props){
        super(props);
        this.state = { movieData: props.data }
        this.wrapperRef = React.createRef();
        this.outerClick = this.outerClick.bind(this)

        
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.outerClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.outerClick);
    }

    outerClick(event){
        if(this.wrapperRef && !this.wrapperRef.current.contains(event.target)){
            event.preventDefault()
            this.props.hide()
        }
    }

    searchForIMDB() {
        let { imdbID } = this.state.movieData;
        var movieDataFetched = localStorage.getItem(`imdb_${imdbID}`);
        if( movieDataFetched ) {
            return this.renderMovieData(JSON.parse(movieDataFetched))
        } else {
            fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_OMDB_KEY}&type=movie`)
            .then( res => res.json() )
            .then( data => {
                localStorage.setItem(`imdb_${imdbID}`, JSON.stringify(data))
                return this.renderMovieData(data)
            })
        }
    }

    renderMovieData(movieData) {
        let elems = [];
        for (const key in movieData){
            if(key === "Ratings"){
                continue;
            } else if (key === "Poster") {
                // do nothing
            } else {
                const value = movieData[key]
                elems.push(
                <tr className="sidebar-item">
                    <td className="side-item-key">{key}:</td>
                    <td className="side-item-value">&nbsp;{value}</td>
                </tr>
                )
            }
        }
        return (<table className="popup-sidebar">
            { elems }
        </table>);
    }

    render(){
        let { Title, Poster, imdbID } = this.state.movieData
        let posterElem = <img src={MissingPoster} alt={Title} className="movie-poster" />
        if(Poster !== "N/A"){
            posterElem = <img src={Poster} alt={Title} className="movie-poster" />;
        }
        let leftSide = <div className="popup-left">
                {posterElem}
                <a href={`https://www.imdb.com/title/${imdbID}/`} className="item-title info-button">More info</a>
            </div>
        let body = <div className="popup-body">
            { leftSide }
            {this.searchForIMDB()}
        </div>
        return ( 
        <div className="overlay"> {/* block clicks with an overlay */}
            <div className="fade-in border movie-display" ref={this.wrapperRef}>
                <div className="clear close-popup" onClick={this.props.hide} />
                <div className="movie-title">{Title}</div>
                { body }
            </div>
        </div> 
        );
    }
}

export default MoviePopup;