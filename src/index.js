import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Beers from './features/beers/index.jsx'
import Styles from './features/styles/index.jsx'
import Dashboard from './features/dashboard/index.jsx'

ReactDOM.render(
	(
    <Router history={Router.hashHistory}>
    		<App>
      		<Switch>
        		<Route exact path="/" component={Dashboard} />
        		<Route path="/beers" component={Beers} />
       	 	  <Route path="/styles" component={Styles} />
      		</Switch>
    		</App>
  	</Router>
	),
	document.getElementById('root')
);
registerServiceWorker();
