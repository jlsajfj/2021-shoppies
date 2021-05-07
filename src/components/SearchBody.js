import React from 'react';

class SearchBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchQuery: props.searchQuery};
    }

    searchForMovie() {
        alert(this.state.searchQuery)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({searchQuery: this.props.searchQuery})
        }
    }

    render () {
        let { searchQuery } = this.state;
        return (
            <div className="search-border search-body">
                Search body text: {searchQuery}
            </div>
        )
    }
}

export default SearchBody;
