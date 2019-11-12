import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import apiHelpers from '../helpers/api';


class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const isUserLogined = apiHelpers.isUserLogged();
    return (
      <Route
        render = { (props) => {
          return (isUserLogined ?
            <Redirect to={{ pathname: '/feed', state: { from: props.location } }} /> :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
        }}
      />
    );
  };
}

export default PrivateRoute;
