import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from '../../../components/common/Input';

describe("Input", () => {
  const props = {
    id: '1',
    name: 'text',
    placeholder: 'test',
    onChange: jest.fn(),
  };

  it("should be render properly",() => {
    const wrapper = shallow(<Input {...props} />);
    const input = wrapper.find('input');
    expect(input.props().id).toEqual(props.id);
    expect(input.props().name).toEqual(props.name);
    expect(input.props().placeholder).toEqual(props.placeholder);
  });

  it("should call onChange method after input was changed",() => {
    const wrapper = shallow(<Input {...props} />);
    const input = wrapper.find('input');
    input.simulate('change');
    expect(input.props().onChange).toHaveBeenCalled();
  });
});