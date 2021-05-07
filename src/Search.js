import search_icon from './search_icon.svg';
import './Search.css';

function Search() {
    function abc(){

    }
  return (
    <div className="search-body">
        <div className="search-title">Search for Movies!</div>
        <div className="search-input">
            <img src={search_icon} alt="Magnifying glass" className="search-icon"/>
            <input onChange={abc}
                className="search-text"
                placeholder="Type here to search"/>
        </div>
    </div>
  );
}

export default Search;
