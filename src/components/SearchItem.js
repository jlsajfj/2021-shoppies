import React from 'react';

class SearchItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {movieData: props.data}
        console.log(this.state)
    }

    render (){
        return <div>{this.state.movieData.Title}</div>
    }
}

export default SearchItem;