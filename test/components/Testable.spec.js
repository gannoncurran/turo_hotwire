import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Testable from '../../src/components/Testable';

describe('<Testable />', () => {
  it('should render name prop into the first paragraph', () => {
    const wrapper = shallow(<Testable name="Fred" value="6" />);
    expect(wrapper.find('p').at(0).contains('Fred')).to.equal(true);
  });

  it('should render value prop into the second paragraph', () => {
    const wrapper = shallow(<Testable name="Nancy" value="5" />);
    expect(wrapper.find('p').at(1).contains('5')).to.equal(true);
  });
});
