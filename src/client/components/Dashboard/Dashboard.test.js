import React from 'react'
import { shallow, mount } from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import {Dashboard} from './container';
import PageHeading from './../common/PageHeading';
import Authorization from '../../components/common/utils/Authorization';

describe('DASHBOARD --- Snapshot', () => {
  it('captures a snapshot of the component', () => {
    const renderedValue =  shallow(<Dashboard />);
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('DASHBOARD', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard />);
  });
  it('renders the stateless component',  () => {
    expect(wrapper).toBeTruthy();
  });
  it('has a <PageHeading> component', () => {
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });
  it('has a <div> with className="page-content"', () => {
    expect(wrapper.find('div.page-content')).toHaveLength(1);
  });
});
