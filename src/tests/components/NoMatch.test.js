import React from 'react';
import { mount } from 'enzyme';
import NoMatch from '../../components/NoMatch';
import CONSTANTS from '../../constants/index';


describe('NoMatch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<NoMatch /> );
  });

  it('should render the component', () => {
    expect(wrapper.childAt(0).hasClass('centred')).toEqual(true);
    expect(wrapper.find('p').first().text()).toEqual(CONSTANTS.MESSAGES.PAGE_NOT_FOUND);
  });

});