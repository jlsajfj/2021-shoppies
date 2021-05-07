import search_icon from './search_icon.svg';
import './Search.css';
import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        console.log(this.state.value);
        event.preventDefault();
    }

    render () {
        return (
            <div className="search-body">
                <div className="search-title">Search for Movies!</div>
                <form className="search-input" onSubmit={this.handleSubmit}>
                    <img src={search_icon} alt="Magnifying glass" className="search-icon"/>
                    <input onChange={this.handleChange}
                        className="search-text"
                        placeholder="Type here to search"/>
                </form>
            </div>
        )
    }
}

export default Search;
