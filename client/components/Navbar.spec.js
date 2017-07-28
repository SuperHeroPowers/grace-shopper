import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Navbar} from './components';
import sinon from 'sinon';

describe ('React-Redux test'. () => {
	describe('Navbar',() => {
		let navbar ;
		beforeEach(() => {
			navbar = shallow(<Navbar />)
		})
		it('return all the products', () => {
			expect(navbar.find())
		})