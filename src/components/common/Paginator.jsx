import React from 'react';
import PropTypes from 'prop-types';

function Paginator(props) { // eslint-disable-line require-jsdoc
  if (!props.pageNumber || +props.pageNumber < 0) return null;

  const handleItemClick = ({ event, index }) => {
    event.preventDefault();
    if (index === props.currentPage) return;
    typeof props.onClick === 'function' && props.onClick(index);
  };

  const paginationItems = [];
  for (let index = 0; index < props.pageNumber; index++) {
    paginationItems.push(
      <li className="paginator__element" key={index}>
        <a
          className={
            props.currentPage === index ? 'paginator__link paginator__link_active': 'paginator__link'
          }
          onClick={(event) => handleItemClick({ event, index })}
          type="button"
        >
          {index+1}
        </a>
      </li>
    );
  }

  return <ul className="paginator">{paginationItems}</ul>;
}

Paginator.propTypes = {
  pageNumber: PropTypes.number,
  currentPage: PropTypes.number,
  onClick: PropTypes.func,
};

export default Paginator;
