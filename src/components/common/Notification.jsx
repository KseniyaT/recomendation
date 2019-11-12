import React from 'react';
import PropTypes from 'prop-types';

function Notification(props) { // eslint-disable-line require-jsdoc
  return (
    <div className="notification notification_error">{props.errorMsg}</div>
  );
}

Notification.propTypes = {
  errorMsg: PropTypes.string,
};

export default Notification;
