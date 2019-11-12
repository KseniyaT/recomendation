import React from 'react';
import { mount } from 'enzyme';
import Table from '../../../components/common/Table';


describe('Table', () => {
  let wrapper;

  const props = {
    theadList: [
      { id: 1, label: 'th1' },
      { id: 2, label: 'th2' },
    ],
    tbodyList: [
      { id: 1, content: [ 'td11', 'td12'] },
      { id: 2, content: [ 'td21', 'td22'] },
    ],
  };

  beforeEach(() => {
    wrapper = mount(<Table {...props} /> );
  });

  it('should return null if no tbodyList prop', () => {
    const emptyListProps = {...JSON.parse(JSON.stringify(props)), tbodyList: undefined };
    const emptyWrapper = mount(<Table {...emptyListProps} /> );
    expect(emptyWrapper.html()).toBeNull()

  });

  it('should include correct value of elements of table', () => {
    expect(wrapper.find('th').length).toBe(2);
    expect(wrapper.find('td').length).toBe(4);
  });

});