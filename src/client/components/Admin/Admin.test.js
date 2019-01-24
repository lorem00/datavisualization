import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AdminComponent } from './Admin';

const users = [
    {
        id: '59dd13e1a6796b873e23acfd',
        account: '3a838c14-7a8e-4bc0-8e30-ea2372f6daec',
        email: 'ajalbani@wootcloud.com',
        roles: [
            'admin',
            'customer',
        ],
    }];

// Snapshot for Admin React Component
describe('>>>A D M I N --- Snapshot',()=>{
    it('+++capturing Snapshot of Home', () => {
        const renderer = new ShallowRenderer();
        const renderedValue = renderer.render(<AdminComponent users={users}/>);
        expect(renderedValue).toMatchSnapshot();
    });
});
// ******************************************************************************
describe('>>>A D M I N --- REACT-REDUX (Shallow + passing {users} directly)',()=>{
    let wrapper;
    let data;
    console.log('********* RUN npm test -- -u ***************');
    beforeEach(()=>{
        wrapper = shallow(<AdminComponent users={users} />);
        // TODO: shallow render table component;
        // let bootstrap = shallow(wrapper.find('BootstrapTable')[0]);
        data = wrapper.find('BootstrapTable').prop('data');
    });
    it('+++ expect the component to have 1 Bootstrap table', () => {
        expect(wrapper.find('BootstrapTable')).toHaveLength(1);
    });
    it('+++ expect the component to have matching data passed in from props', () => {
        expect(data).toHaveLength(users.length);
    });
    it('+++ expect the component first props account to match first rows account', () => {
        expect(data[0].account).toEqual(users[0].account);
    });
});
