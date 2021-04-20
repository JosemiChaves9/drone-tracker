import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { MainMap } from './pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BaseLayout } from './components/basePage';
import { Page404 } from './pages/404';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={MainMap} />
        <Route path='/bases' component={BaseLayout} />
        <Route path='/drones' component={BaseLayout} />
        <Route path='/drone-control' component={BaseLayout} />
        <Route path='/add-drone' component={BaseLayout} />
        <Route path='/add-base' component={BaseLayout} />
        <Route component={Page404} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
