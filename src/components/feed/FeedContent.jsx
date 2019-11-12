import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import Paginator from '../common/Paginator';
import Filter from '../common/Filter';
import Table from '../common/Table';
import ThemeInfo from '../common/ThemeInfo';
import reviewActions from '../../actions/reviews/index';
import themeActions from '../../actions/themes/index';
import CONSTANTS from '../../constants/index';
import utils from '../../helpers/utils';

const { getReviews } = reviewActions;
const { getThemes } = themeActions;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      reviewOffset: 0,
      maxPageNumber: 0,
      filterId: undefined,
      reviewLimit: CONSTANTS.DEFAULTS.REVIEW_LIMIT,
      themeLimit: CONSTANTS.DEFAULTS.THEME_LIMIT,
    };
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleLoadNextLinesClick = this.handleLoadNextLinesClick.bind(this);
    this.handleMenuScroll = this.handleMenuScroll.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.props.getThemes();
    this.props.getReviews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reviewsList !== this.props.reviewsList) {
      const reviewOffset = prevState.reviewOffset + this.props.reviewsList.length;
      const newPageNumber = Math.floor(reviewOffset/prevState.reviewLimit);
      const maxPageNumber = prevState.maxPageNumber > newPageNumber ?
        prevState.maxPageNumber :
        newPageNumber;
      this.setState({
        reviewOffset,
        maxPageNumber,
      });
    }
  }

  /**
   * It calls reviews request with theme value params
   * when an user clicks on an element in filter list or on remove filter btn
   * @param {String} value - name of theme
   * @param {*} id - unique id of theme
   * @returns {void}
   */
  handleFilterClick({ value, id }) {
    let filterId = id;
    let filterValue = value;
    if (this.state.filterId === id) {
      filterId = undefined;
      filterValue = '';
    }
    this.setState({
      filterValue,
      filterId,
      reviewOffset: 0,
      maxPageNumber: 0,
      reviewLimit: CONSTANTS.DEFAULTS.REVIEW_LIMIT,
    });
    const params = id && this.state.filterId !== id ? { theme_id: id } : null;
    !this.props.isReviewsLoading && this.props.getReviews(params);
  }

  /**
   * It asks for next {revoewLimit} lines to show it
   * @returns {void}
   */
  handleLoadNextLinesClick() {
    !this.props.isReviewsLoading &&
    this.props.getReviews({
      offset: this.state.reviewOffset,
      limit: this.state.reviewLimit,
      ...(this.state.filterId && { theme_id: this.state.filterId }),
    });
  }

  /**
   * It asks for next {themeLimit} lines to show it in dropdown
   * when an user scrolls it and scrollTop is more than 10/13 of the dropdonw
   * @param {Number} height - height of elemets in dropdown
   * @param {Number} scrollTop - scroll position in dropdown
   * @returns {void}
   */
  handleMenuScroll({ height, scrollTop }) {
    if (scrollTop > height/1.3) {
      !this.props.isThemeListLoading &&
      this.props.getThemes({ offset: this.props.themesOffset, limit: this.state.themeLimit });
    }
  }

  handlePageClick(index) {
    if (!this.props.isReviewsLoading) {
      const offset = index * this.state.reviewLimit;
      this.setState({
        reviewOffset: offset,
      });
      !this.props.isReviewsLoading &&
      this.props.getReviews({
        offset: index * this.state.reviewLimit,
        limit: this.state.reviewLimit,
        ...(this.state.filterId && { theme_id: this.state.filterId }),
      });
    }
  }

  render() {
    const { filterValue, filterId, reviewLimit, reviewOffset, maxPageNumber } = this.state;
    const {
      specificThemeObj, reviewsList, themesList,
      isThemeListLoading, isReviewsLoading, isThemeObjLoading,
    } = this.props;

    const isLoading = !reviewsList.length && isReviewsLoading;
    const currentPage = Math.floor(reviewOffset / reviewLimit) - 1;

    const content = isLoading ?
      <Spinner /> :
      <div className="wrapper">
        <div className="wrapper__header">
          {
            filterValue &&
            <p className="wrapper__title">
              <span className="wrapper__title__text">Sort by: {filterValue}</span>
              <a
                className="wrapper__title__icon-container" type="button"
                onClick={() => this.handleFilterClick({ value: '', id: undefined })}
              >
                <i className="wrapper__title__icon material-icons">close</i>
              </a>
            </p>
          }
          <Filter
            list={themesList}
            chosenId={filterId}
            isDisabled={isThemeListLoading}
            onClick={this.handleFilterClick}
            onScroll={this.handleMenuScroll}
          />

        </div>
        <div className="wrapper__body">
          {
            reviewsList.length ?
              <Table
                theadList={[{ id: 0, label: 'Theme' }, { id: 1, label: 'Feedback' }]}
                tbodyList={
                  reviewsList.map((reviewObj) => {
                    return {
                      id: reviewObj.id,
                      content: [
                        reviewObj.themes && reviewObj.themes.map((theme) => {
                          return (
                            <ThemeInfo
                              key={utils.generateUniqKey(`${reviewObj.id}_${theme.theme_id}`)}
                              sentiment={theme.sentiment}
                              label={specificThemeObj[theme.theme_id]}
                              isLoading={isThemeObjLoading}
                            />
                          );
                        }),
                        reviewObj.comment,
                      ],
                    };
                  })
                }
              />:
              <div>{CONSTANTS.MESSAGES.NOTHING_FOUND}</div>
          }
        </div>
        <div className="wrapper__footer">
          <Paginator pageNumber={maxPageNumber} currentPage={currentPage} onClick={this.handlePageClick} />
          {
            reviewsList.length === CONSTANTS.DEFAULTS.REVIEW_LIMIT &&
            <a
              className={isLoading ? 'link link_disabled' : 'link'}
              onClick={this.handleLoadNextLinesClick}
            >
              Load next {reviewLimit} lines
            </a>
          }
        </div>
      </div>;
    return (
      <section className="main">
        {content}
      </section>
    );
  }
}

Feed.propTypes = {
  themesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  reviewsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    themes: PropTypes.array,
  })),
  themesOffset: PropTypes.number,
  specificThemeObj: PropTypes.object,
  isThemeObjLoading: PropTypes.bool,
  isThemeListLoading: PropTypes.bool,
  isReviewsLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  themesList: state.themes.themesList,
  themesOffset: state.themes.themesOffset,
  isThemeObjLoading: state.themes.isThemeObjLoading,
  isThemeListLoading: state.themes.isThemeListLoading,
  specificThemeObj: state.themes.specificThemeObj,
  reviewsList: state.reviews.reviewsList,
  isReviewsLoading: state.reviews.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getReviews: (obj) => dispatch(getReviews(obj)),
  getThemes: (obj) => dispatch(getThemes(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
