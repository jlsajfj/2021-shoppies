import search_icon from './search_icon.svg';
import SearchBody from './SearchBody.js';
import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchValue: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.searchBodyChild = React.createRef();
    }

    handleChange(event){
        this.setState({searchValue: event.target.value});
    }

    handleSubmit(event){
        this.searchBodyChild.current.searchForMovie();
        event.preventDefault();
    }

    render () {
        let { searchValue } = this.state;
        return (
            <div className="search-main box">
                <div className="search-title">Search for Movies!</div>
                <form className="search-entry border outer-border" onSubmit={this.handleSubmit}>
                    <img src={search_icon} alt="Magnifying glass" className="search-icon"/>
                    <input onChange={this.handleChange}
                        className="search-text"
                        placeholder="Type here to search"/>
                </form>
                <SearchBody searchQuery={searchValue} ref={this.searchBodyChild}/>
            </div>
        )
    }
}

export default Search;
