import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import FeedContent from '../../../components/feed/FeedContent';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Spinner from '../../../components/common/Spinner';
import Paginator from '../../../components/common/Paginator';
import Filter from '../../../components/common/Filter';
import Table from '../../../components/common/Table';
import ThemeInfo from '../../../components/common/ThemeInfo';
import CONSTANTS from '../../../constants/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FeedContent', () => {
  let store;
  let rendererComponent;
  let wrapper;
  let wrapperClass;

  const defaultStore = {
    themes: {
      themesList: [
        { id: 6334, name: 'Accounts' },
        { id: 6335, name: 'Transactions' }
      ],
      themesOffset: 0,
      specificThemeObj: { 6334: 'Accounts', 6335: 'Transactions' },
      isThemeObjLoading: false,
      isThemeListLoading: false,
    },
    reviews: {
      reviewsList: [
        { id: 59458292, comment: "exelent", themes: [{ theme_id: 6334, sentiment: 0 }] },
        { id: 59457786, comment: "Excellent keep it up", themes: [{ theme_id: 6335, sentiment: 1 }] }
      ],
      isLoading: false,
    },
  };

  beforeEach(() => {
    store = mockStore(JSON.parse(JSON.stringify(defaultStore)));
    rendererComponent = renderer.create(
      <Provider store={store}>
        <FeedContent />
      </Provider>
    );

    store.dispatch = jest.fn();

    wrapperClass = mount(shallow(<FeedContent store={store} />).get(0));
  });

  it('should render with given state from Redux store', () => {
    expect(rendererComponent.toJSON()).toMatchSnapshot();
  });

  it('should call dispatch method when the paginator is clicked', () => {
    const fakeEvent = { preventDefault: () => {} };
    rendererComponent.root.findByType(Paginator).props.onClick(fakeEvent);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should render all rendererComponents if data is loaded', () => {
    expect(wrapperClass.length).toBe(1);
    expect(wrapperClass.find(Paginator).length).toBe(1);
    expect(wrapperClass.find(Filter).length).toBe(1);
    expect(wrapperClass.find(Table).length).toBe(1);
    expect(wrapperClass.find(ThemeInfo).length).toBe(2);
    expect(wrapperClass.find('.wrapper').length).toBe(1);
    expect(wrapperClass.find(Spinner).length).toBe(0);
  });

  it('should show spinner whole data is loading', () => {
    const loadingStore = JSON.parse(JSON.stringify(defaultStore));
    const storeLoading = mockStore({ ...loadingStore, reviews: { reviewsList: [], isLoading: true } });
    const wrapperLoading = mount( <Provider store={storeLoading}> <FeedContent /> </Provider> );
    expect(wrapperLoading.length).toBe(1);
    expect(wrapperLoading.find(Spinner).length).toBe(1);
    expect(wrapperLoading.find('.wrapper').length).toBe(0);
  });

  it('should show according message if no review results', () => {
    const loadingStore = JSON.parse(JSON.stringify(defaultStore));
    const storeNoReview = mockStore({ ...loadingStore, reviews: { reviewsList: [], isLoading: false } });
    const wrapperNoReview = mount( <Provider store={storeNoReview}> <FeedContent /> </Provider> );
    expect(wrapperNoReview.length).toBe(1);
    expect(wrapperNoReview.find(Spinner).length).toBe(0);
    expect(wrapperNoReview.find('.wrapper__body > div').text()).toEqual(CONSTANTS.MESSAGES.NOTHING_FOUND);
  });

  it('should calls dispatch function when an user clicks on "Load more" link', () => {
    const list = [];
    for(let i = 0; i < 20; i++) {
      list.push({ id: i, comment: "exelent", themes: [{ theme_id: i, sentiment: 0 }] });
    }
    const longStore = JSON.parse(JSON.stringify(defaultStore));
    const longReview = mockStore({ ...longStore, reviews: { reviewsList: list } });
    const longWrapper = mount( <Provider store={longReview}> <FeedContent /> </Provider> );
    const a = longWrapper.find('.wrapper__footer').find('.link');
    a.simulate('click');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should change filterValue state and call dispatch function when an user click on remove filter icon', () => {
    wrapperClass.setState({ filterValue: 'testFilter' });
    expect(wrapperClass.state('filterValue')).toEqual('testFilter');
    const a = wrapperClass.find('.wrapper__title > a');
    a.simulate('click');
    expect(wrapperClass.state('filterValue')).toEqual('');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should call dispatch function when an user clicks on Filter (or scroll)', () => {
    wrapperClass.setState({ filterValue: 'testFilter2' });
    expect(wrapperClass.state('filterValue')).toEqual('testFilter2');

    wrapperClass.find(Filter).setState({ isMenuOpen: true });

    wrapperClass.find('.menu').find('.menu__link').first().simulate('click');
    expect(wrapperClass.state('filterValue')).toEqual('Accounts');
    expect(store.dispatch).toHaveBeenCalled();

    const mockedEvent = { target: { children: [{ clientHeight: 30 }], clientHeight: 20, scrollTop: 30 } };
    wrapperClass.find('.menu').simulate('scroll', mockedEvent);
    expect(store.dispatch).toHaveBeenCalled();
  });

});