import './SearchBody.css';
import React from 'react';

class SearchBody extends React.Component {
    constructor(props){
        super(props);
        console.log(props)
    }

    render () {
        return (
            <div className="search-body">
                Search body text
            </div>
        )
    }
}

export default SearchBody;
