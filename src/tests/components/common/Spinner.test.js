import React from 'react';
import { mount } from 'enzyme';
import Spinner from '../../../components/common/Spinner';


describe('Spinner', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Spinner /> );
  });

  it('should render the component', () => {
    expect(wrapper.childAt(0).hasClass('spinner')).toEqual(true);
  });

});