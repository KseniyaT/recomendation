import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Login from '../../../components/auth/Login';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Input from '../../../components/common/Input';
import Notification from '../../../components/common/Notification';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login', () => {
  let store;
  let rendererComponent;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        errorMsg: '',
      },
    });

    store.dispatch = jest.fn();

    rendererComponent = renderer.create(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    wrapper = mount( <Provider store={store}> <Login /> </Provider> );
  });

  it('should render with given state from Redux store', () => {
    expect(rendererComponent.toJSON()).toMatchSnapshot();
  });

  it('should call dispatch method when the form is submitted', () => {
    const fakeEvent = { preventDefault: () => {} };
    rendererComponent.root.findByType('form').props.onSubmit(fakeEvent);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('renders main rendererComponents', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(Input).length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('changes corresponding states when inputs values are changed', () => {
    const wrapperClass = mount(shallow(<Login store={ store } />).get(0));
    wrapperClass.find('input[type="text"]').simulate('change', { target: { id: 'username', value: 'usernametest' }});
    expect(wrapperClass.state('username')).toEqual('usernametest');
    wrapperClass.find('input[type="password"]').simulate('change', { target: { id: 'password', value: 'Qwerty' }});
    expect(wrapperClass.state('password')).toEqual('Qwerty');
  });

  it('should show an error message then it is and should not when the errorMsg is empty', () => {
    const store1 = mockStore({
      auth: {
        errorMsg: 'Message',
      },
    });
    const containerWithOutError = mount(<Login store={ store } />);
    expect(containerWithOutError.find(Notification).length).toBe(0);
    const containerWithError = mount(<Login store={ store1 } />);
    expect(containerWithError.find(Notification).length).toBe(1);
    expect(containerWithError.find(Notification).text()).toEqual('Message');
  });

});
