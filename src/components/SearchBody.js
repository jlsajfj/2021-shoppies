import React from 'react';

import SearchItem from './SearchItem.js';

class SearchBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchQuery: "", isActive: false, page: 1, movieData: []};
    }

    // since this is indeed a front-end job application
    // and not a full stack one, I will not be implementing
    // a back end in a separate instance of node/express
    // however that would be fun (and more secure).
    searchForMovie() {
        // dont show unless at least 3 letters are typed
        if(this.state.searchQuery.length >= 3){
            // using local storage to preserve API request limit
            // if this was in a live app, there would be better back-end caching
            // i'd much prefer it have a 5-minute rolling cache in the back
            // since this might persist past the point where changes have happened
            // to the actual results
            var movieDataFetched = localStorage.getItem(this.state.searchQuery);
            if(movieDataFetched == null){
                // console.log('fetching remote')
                fetch(`http://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=${process.env.REACT_APP_OMDB_KEY}&type=movie&page=${this.state.page}`)
                    .then( res => res.json() )
                    .then( data => {
                        localStorage.setItem(this.state.searchQuery, JSON.stringify(data))
                        this.setState({movieData: data})
                    })
            } else {
                // console.log('found local')
                this.setState({movieData: JSON.parse(movieDataFetched)})
            }
        } else {
            this.setState({movieData: []})
        }
    }

    renderMovieList() {
        if(this.state.movieData){
            if(this.state.movieData.length===0){
                return <div className="error fade-in">&nbsp;Please enter at least 3 characters</div>
            }
            if(this.state.movieData.Response==="False"){
                return <div className="error fade-in">{this.state.movieData.Error}</div>
            }

            return <div className="search-movies">
                {this.state.movieData.Search.map( elem => <SearchItem data={elem} key={elem.imdbID}/> )}
            </div>
        } else {
            // I would do a proper 500 if i had time
            return <div className="error fade-in">Some issue has occured</div>
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ searchQuery: this.props.searchQuery, isActive: this.props.searchQuery.length, page: 1 }, this.searchForMovie)
        }
    }

    render () {
        let { searchQuery, isActive } = this.state;
        let isVisible = " hidden none";
        if(isActive){
            isVisible = " border"
        }
        return (
            <div className={"search-body "+isVisible}>
                    Results for&nbsp;<span className="search-query">{searchQuery}</span>:&nbsp;
                    {this.renderMovieList()}
            </div>
        )
    }
}

export default SearchBody;
