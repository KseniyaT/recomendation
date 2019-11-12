import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './routes/PrivatRoute';
import Feed from './components/feed/Feed';
import Login from './components/auth/Login';
import NoMatch from './components/NoMatch';
import configureStore, { history } from './store/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router>
            <div className="container">
              <Switch>
                <PrivateRoute exact path='/' />
                <Route path='/login' component={Login} />
                <Route path='/feed' component={Feed} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
