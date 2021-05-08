import React from 'react';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        
        this.lockNominations = this.lockNominations.bind(this)

        let nominated = JSON.parse(localStorage.getItem('nominated_movies'))
        if(nominated && nominated.length === 5){
            this.state = { no_more: true }
        } else {
            this.state = { no_more: false }
        }
    }

    lockNominations() {
        this.setState({ no_more: true })
    }

    componentDidMount() {
        window.addEventListener("no-more-nominations", this.lockNominations);
    }

    componentWillUnmount() {
        window.removeEventListener("no-more-nominations", this.lockNominations);
    }

    render() {
        let { no_more } = this.state;
        var classes = "banner"
        if(no_more){
            classes+=" show-banner"
        }
        return (
            <div className={classes}>
                You have 5 nominations!
            </div>
        );
    }
}

export default Banner;