import {configure, shallow} from 'enzyme';
// shallow does not render children components
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import App from "./App";
import Canvas from "./components/Canvas/Canvas";

configure({
    adapter: new Adapter()
})

describe('<App/>', () => {
    it('Should have a Canvas', () => {
        const wrapper = shallow(<App/>)

        // see if wrapper contains certain content
        expect(wrapper.find(Canvas)).toHaveLength(1)
    })
})
