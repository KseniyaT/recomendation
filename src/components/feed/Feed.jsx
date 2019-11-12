import React, { Fragment } from 'react';
import Header from '../common/Header';
import FeedContent from './FeedContent';

function Feed() { // eslint-disable-line require-jsdoc
  return (
    <Fragment>
      <Header />
      <FeedContent />
    </Fragment>
  );
}

export default Feed;
