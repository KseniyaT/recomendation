import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../helpers/utils';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleMenuScroll = this.handleMenuScroll.bind(this);
  }

  /**
   * It counts height of dropdown menu and position in scroll element
   * and calls onScroll prop with those values as arguments
   * @param {Event} event - event object
   * @returns {void}
   */
  handleMenuScroll(event) {
    const height = utils.getLisHeight([...event.target.children]);
    const scrollTop = event.target.scrollTop + event.target.clientHeight;
    typeof this.props.onScroll === 'function' &&
    this.props.onScroll({ height, scrollTop: scrollTop });
  }

  render() {
    const { list, chosenId, onClick } = this.props;
    return (
      <ul className="menu" onScroll={this.handleMenuScroll}>
        { list.map(({ id, name }) => {
          return (
            <li className="menu__element" key={id}>
              <a
                className="menu__link"
                onClick={() => onClick({ value: name, id })}
              >
                {name}
                { chosenId === id && <i className="menu__icon material-icons">done_all</i>}
              </a>
            </li>);
        }) }
      </ul>
    );
  }
}

Menu.propTypes = {
  onClick: PropTypes.func,
  onScroll: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  chosenId: PropTypes.any,
};

Menu.defaultProps = {
  list: [],
};

export default Menu;
