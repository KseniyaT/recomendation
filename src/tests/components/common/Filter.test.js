import React from 'react';
import { mount } from 'enzyme';
import Filter from '../../../components/common/Filter';
import Menu from '../../../components/common/Menu';


describe('Filter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Filter /> );
  });

  it('should include/exclude btn and menu when it is open/closed', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.filter__icon').length).toBe(1);
    expect(wrapper.find(Menu).length).toBe(0);

    wrapper.find('.filter__icon').simulate('click');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.filter__icon').length).toBe(1);
    expect(wrapper.find(Menu).length).toBe(1);

    wrapper.find('.filter__icon').simulate('click');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.filter__icon').length).toBe(1);
    expect(wrapper.find(Menu).length).toBe(0);
  });

});