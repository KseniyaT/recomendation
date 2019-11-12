import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions/auth/index';
import Input from '../common/Input';
import Notification from '../common/Notification';

const { loginUser } = actions;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * It saves users printed values in an input to according state of the component
   * @param {Event} event - event object
   * @returns {void}
   */
  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  /**
   * It requested server to login an user with username/password
   * @param {Event} event - event object
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    const { errorMsg } = this.props;
    return (
      <form className="form form_centred" onSubmit={this.handleSubmit}>
        <h1 className="title">Login</h1>
        {
          errorMsg && <Notification errorMsg={errorMsg} />
        }
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          onChange={this.handleInputChange}
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleInputChange}
        />
        <div className="input-group">
          <button className="btn btn_full" type="submit">Login</button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  errorMsg: PropTypes.string,
  loginUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userInfo) => dispatch(loginUser(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
