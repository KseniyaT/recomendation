import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Header from '../../../components/common/Header';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Header', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({});

    store.dispatch = jest.fn();

    wrapper = mount( <Provider store={store}> <Header /> </Provider> );
  });

  it('should include link to logout in nav', () => {
    expect(wrapper.length).toBe(1);
    expect( wrapper.find('nav').length).toBe(1);
    expect( wrapper.find('a').length).toBe(1);
  });

  it('should call dispatch method when the logout link is clicked', () => {
    wrapper.find('a').simulate('click');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

});