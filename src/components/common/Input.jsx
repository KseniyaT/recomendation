import React from 'react';
import PropTypes from 'prop-types';

function Input(props) { // eslint-disable-line require-jsdoc
  return (
    <div className="input-group">
      <div className="input-group__input-container">
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          className="input-group__input"
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default Input;
