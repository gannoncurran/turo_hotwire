// sample test to demo testing setup. Remove this.
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from './App';

describe('<App />', () => {
  it('should render h1 with "App"', () => {
    const wrapper = shallow(<App children={[<div key={1} />]} />);
    expect(wrapper.find('h1').at(0).contains('App')).to.equal(true);
  });

  it('should render links to "Home", "Subpage", "Counter" and "People"', () => {
    const wrapper = shallow(<App children={[<div key={1} />]} />);
    expect(wrapper.find('Link').length).to.equal(3);
    expect(wrapper.find('Link').at(0).contains('Home')).to.equal(true);
    expect(wrapper.find('Link').at(1).contains('Subpage')).to.equal(true);
    expect(wrapper.find('Link').at(2).contains('People')).to.equal(true);
  });
});
