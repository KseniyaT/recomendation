import React from 'react';
import CONSTANTS from '../constants/index';

function NoMatch() { // eslint-disable-line require-jsdoc
  return (
    <div className="centred">
      <p>{CONSTANTS.MESSAGES.PAGE_NOT_FOUND}</p>
      <p>Stranichka est`? A esli naidu?! :-)</p>
    </div>
  );
}

export default NoMatch;
