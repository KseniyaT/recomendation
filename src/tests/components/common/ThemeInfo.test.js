import React from 'react';
import { mount } from 'enzyme';
import ThemeInfo from '../../../components/common/ThemeInfo';


describe('ThemeInfo', () => {
  let wrapper;

  const props = {
    sentiment: 1,
    label: 'test',
    isLoading: false,
  };

  beforeEach(() => {
    wrapper = mount(<ThemeInfo {...props} /> );
  });

  it('should include correct value of elements', () => {
    expect(wrapper.find('i').text()).toEqual('sentiment_very_satisfied');
    expect(wrapper.find('p').text()).toEqual('test');

    const newSentimentProps = { ...props, sentiment: 1 };
    const newSentimentWrapper = mount(<ThemeInfo {...newSentimentProps} /> );
    expect(newSentimentWrapper.find('i').text()).toEqual('sentiment_very_satisfied');

    const newSentimentProps2 = { ...props, sentiment: -1 };
    const newSentimentWrapper2 = mount(<ThemeInfo {...newSentimentProps2} /> );
    expect(newSentimentWrapper2.find('i').text()).toEqual('sentiment_very_dissatisfied');

    const newSentimentProps3= { ...props, isLoading: true };
    const newSentimentWrapper3 = mount(<ThemeInfo {...newSentimentProps3} /> );
    expect(newSentimentWrapper3.find('p').text()).toEqual('...Loading');
  });

});