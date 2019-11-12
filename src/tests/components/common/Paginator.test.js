import React from 'react';
import { mount } from 'enzyme';
import Paginator from '../../../components/common/Paginator';


describe('Paginator', () => {
  let wrapper;
  const mockCallBack = jest.fn();

  const props = {
    pageNumber: 5,
    currentPage: 2,
  };

  beforeEach(() => {
    wrapper = mount(<Paginator {...props} onClick={mockCallBack} /> );
  });

  it('should return null if pageNumber is not positive number', () => {
    const emptyPageNumberProps = {...JSON.parse(JSON.stringify(props)), pageNumber: undefined };
    const emptyWrapper = mount(<Paginator {...emptyPageNumberProps} /> );
    expect(emptyWrapper.html()).toBeNull()

  });

  it('should include correct value of elements of paginator', () => {
    expect(wrapper.find('li').length).toBe(5);
  });

  it('should fire callback when "a" was clicked not on current page', () => {
    const a2 = wrapper.find('li').at(2).find('a');
    a2.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0);

    const a1 = wrapper.find('li').first().find('a');
    a1.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);

    a2.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

});