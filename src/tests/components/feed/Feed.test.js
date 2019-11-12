import React from 'react';
import { shallow } from 'enzyme';
import Feed from '../../../components/feed/Feed';
import Header from '../../../components/common/Header';
import FeedContent from '../../../components/feed/FeedContent';

describe("Feed", () => {

  it("should be render properly",() => {
    const wrapper = shallow(<Feed />);
    const header = wrapper.find(Header);
    expect(header.length).toBe(1);
    const feedContant = wrapper.find(FeedContent);
    expect(feedContant.length).toBe(1);
  });

});