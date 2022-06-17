import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import State from './context/State';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <State>
    <App />
    </State>
  </React.StrictMode>,
  document.getElementById('root')
);


