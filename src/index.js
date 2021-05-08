import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import reportWebVitals from './reportWebVitals';

import './styles/index.css';
import './styles/Header.css';
import './styles/Banner.css';
import './styles/Search.css';
import './styles/SearchBody.css';
import './styles/SearchItem.css';
import './styles/MoviePopup.css';
import './styles/Nominations.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
