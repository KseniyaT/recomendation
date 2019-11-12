import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import Menu from '../../../components/common/Menu';


describe('Menu', () => {
  let wrapper;
  const mockClickCallBack = jest.fn();
  const mockScrollCallBack = jest.fn();

  const props = {
    list: [{ id: 1, name: 'Animation' }, { id: 2, name: 'Show' }],
    chosenId: undefined,
  };

  beforeEach(() => {
    wrapper = mount(<Menu {...props} onClick={mockClickCallBack} onScroll={mockScrollCallBack} /> );
  });

  it('should include list of items according list length', () => {
    expect(wrapper.find('li').length).toBe(2);
    const emptyListProp = { ...JSON.parse(JSON.stringify(props)), list: undefined };
    const wrapperEmpty = mount(<Menu {...emptyListProp} /> );
    expect(wrapperEmpty.find('li').length).toBe(0);
  });

  it('specific a should have icon', () => {
    const chosenAProps = { ...props, chosenId: 1 };
    const chosenAWrapper = mount(<Menu {...chosenAProps} /> );
    const a = chosenAWrapper.find('li').first().find('a');
    expect(a.find('i').length).toBe(1);
  });

  it('should call onClick callback when an user clicks on an item', () => {
    const a = wrapper.find('li').first().find('a');
    a.simulate('click');
    expect(mockClickCallBack.mock.calls.length).toEqual(1);
  });

  it('should call onSroll callback when an user scroll menu', () => {
    const a = wrapper.find('li').first().find('a');
    wrapper.simulate('scroll');
    expect(mockScrollCallBack.mock.calls.length).toEqual(1);
  })

});