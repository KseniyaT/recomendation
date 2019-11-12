import React from 'react';
import PropTypes from 'prop-types';

function ThemeInfo(props) { // eslint-disable-line require-jsdoc
  const { sentiment, label, isLoading } = props;
  let iconLigature = 'sentiment_very_satisfied';
  if (sentiment === 0) {
    iconLigature = 'sentiment_satisfied';
  } else if (sentiment === -1) {
    iconLigature = 'sentiment_very_dissatisfied';
  }
  return (
    <div className="theme-info">
      <p className="theme-info__name">{isLoading ? '...Loading' : label}</p>
      <i className="theme-info__icon material-icons">{iconLigature}</i>
    </div>
  );
}

ThemeInfo.propTypes = {
  sentiment: PropTypes.number,
  label: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ThemeInfo;
