import React from 'react';

import SearchItem from './SearchItem.js';

class SearchBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchQuery: "", isActive: false, page: 1, movieData: []};

        this.changePage = this.changePage.bind(this)
    }

    // since this is indeed a front-end job application
    // and not a full stack one, I will not be implementing
    // a back end in a separate instance of node/express
    // however that would be fun (and more secure).
    searchForMovie() {
        // dont show unless at least 3 letters are typed
        if(this.state.searchQuery.length >= 3){
            let { searchQuery, page } = this.state;
            // using local storage to preserve API request limit
            // if this was in a live app, there would be better back-end caching
            // i'd much prefer it have a 5-minute rolling cache in the back
            // since this might persist past the point where changes have happened
            // to the actual results

            // this also occasionally causes duplicate entries being saved. known bug
            // turns out this is a thing with the api sometimes returning duplicates.
            var movieDataFetched = localStorage.getItem(`page_${page}_search_${searchQuery}`);
            if(movieDataFetched){
                this.setState({movieData: JSON.parse(movieDataFetched)})
            } else {
                fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.REACT_APP_OMDB_KEY}&type=movie&page=${page}`)
                    .then( res => res.json() )
                    .then( data => {
                        localStorage.setItem(`page_${page}_search_${searchQuery}`, JSON.stringify(data))
                        this.setState({movieData: data})
                    })
            }
        } else {
            this.setState({movieData: []})
        }
    }

    renderMovieList() {
        let { movieData } = this.state;
        if(movieData){
            if(movieData.length===0){
                return <div className="error fade-in">&nbsp;Please enter at least 3 characters</div>
            }
            if(movieData.Response==="False"){
                return <div className="error fade-in">{this.state.movieData.Error}</div>
            }

            var nominations = JSON.parse(localStorage.getItem('nominated_movies'));
            return <div className="search-movies">
                { movieData.Search.map( elem => <SearchItem nominated={nominations} data={elem} key={elem.imdbID}/> ) }
                { this.renderPagination() }
            </div>
        } else {
            // I would do a proper 500 if i had time
            return <div className="error fade-in">Some issue has occured</div>
        }
    }

    changePage(pageTo){
        let { page, movieData } = this.state;
        let pageCount = Math.ceil(movieData.totalResults/10);
        if(pageTo !== page && pageTo >= 1 && pageTo <= pageCount){
            this.setState({page: pageTo}, this.searchForMovie)
        }
    }

    renderPagination() {
        let { page, movieData } = this.state;
        let pageCount = Math.ceil(movieData.totalResults/10);
        if(pageCount !== 1) {
            let leftClass = ""
            let rightClass = ""
            if (page === 1) {
                leftClass = " locked-arrow"
            }
            if (page === pageCount) {
                rightClass = " locked-arrow"
            }
            return <div className="pagination">
                        <div className={"select-arrow"+leftClass} onClick={ () => this.changePage(page - 1) }>
                            🡸
                        </div>
                        <div className="page-number">
                            Page {page} of { pageCount }
                        </div>
                        <div className={"select-arrow"+rightClass} onClick={ () => this.changePage(page + 1) }>
                            🡺
                        </div>
                    </div>
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
            isVisible = " border outer-border"
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
