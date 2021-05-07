import search_icon from './search_icon.svg';
import SearchBody from './SearchBody.js';
import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchValue: '', searchActive: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({searchValue: event.target.value});
        this.setState({searchActive: true})
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render () {
        let { searchActive, searchValue } = this.state;
        return (
            <div className="search-main">
                <div className="search-title">Search for Movies!</div>
                <form className="search-border" onSubmit={this.handleSubmit}>
                    <img src={search_icon} alt="Magnifying glass" className="search-icon"/>
                    <input onChange={this.handleChange}
                        className="search-text"
                        placeholder="Type here to search"/>
                </form>
                {searchActive?<SearchBody searchQuery={searchValue}/>:null}
            </div>
        )
    }
}

export default Search;
