import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Page404 } from './pages/404';
import { BasesView } from './pages/bases';
import { DronesView } from './pages/drones';
import { Home } from './pages/home';
import { Singup } from './pages/singup';
import { Login } from './pages/login';
import { ContextProvider } from './components/context';
import { DroneControl } from './pages/droneControl';
import { NewBase } from './pages/newBase';
import { NewDrone } from './pages/newDrone';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/bases' component={BasesView} />
          <Route path='/drones' component={DronesView} />
          <Route path='/drone-control' component={DroneControl} />
          <Route path='/new-drone' component={NewDrone} />
          <Route path='/new-base' component={NewBase} />
          <Route path='/signup' component={Singup} />
          <Route path='/login' component={Login} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
