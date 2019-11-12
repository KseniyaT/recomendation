import React, { Component } from 'react';
import { connect } from 'react-redux';
import authActions from '../../actions/auth/index';

const { logoutUser } = authActions;

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <header>
        <nav className="nav">
          <a onClick={this.handleLogoutClick} type="button" className="nav__btn">Logout</a>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(Header);
