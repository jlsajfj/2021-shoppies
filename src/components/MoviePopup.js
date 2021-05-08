import React from 'react';

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
            this.props.hide()
        }
    }

    render(){
        return (
        <div className="fade-in">
            <div className="border movie-display" ref={this.wrapperRef}>
                abc
            </div>
        </div>
        );
    }
}

export default MoviePopup;