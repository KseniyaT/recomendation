import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../common/Menu';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
    this.handleFilterIconClick = this.handleFilterIconClick.bind(this);
  }

  /**
   * It shows/hide dropdown
   * @returns {void}
   */
  handleFilterIconClick() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    const { isMenuOpen } = this.state;
    const { list, isDisabled, chosenId, onClick, onScroll } = this.props;

    return (
      <div className="filter filter_left">
        <button
          className="filter__icon"
          disabled={isDisabled}
          onClick={this.handleFilterIconClick}
        >
          <i className="material-icons">filter_list</i>
        </button>
        {
          isMenuOpen &&
          <div className="filter__dropdown">
            <Menu
              list={list}
              chosenId={chosenId}
              onClick={onClick}
              onScroll={onScroll}
            />
          </div>
        }
      </div>
    );
  }
}

Filter.propTypes = {
  list: PropTypes.array,
  chosenId: PropTypes.any,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onScroll: PropTypes.func,
};

export default Filter;
