import React from 'react';
import { mount } from 'enzyme';
import Notification from '../../../components/common/Notification';


describe('Notification', () => {
  let wrapper;

  const props = {
    errorMsg: ''
  };

  beforeEach(() => {
    wrapper = mount(<Notification {...props} /> );
  });

  it('should render the component', () => {
    expect(wrapper.childAt(0).hasClass('notification')).toEqual(true);
  });

  it('should show error msg', () => {
    const msg = {errorMsg: 'Message'};
    const wrapperMsg = mount(<Notification {...msg} /> );
    expect(wrapperMsg.text()).toEqual(msg.errorMsg);
  });

});