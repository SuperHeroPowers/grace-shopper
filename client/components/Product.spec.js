import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Product} from './components/Product';
import sinon from 'sinon';

decsribe('React-Redux', () => {
	describe('Product', () => {
		let product;
		beforeEach(() => {
			product = shallow(<Product el.name={'Heena'}, el.price={'100'}, image />)
		})
		it('return the name and price', () => {
			expect(product.find('h4').text()).to.be.equal("Heena")
			expect(product.find('h4').text()).to.be.equal("100")
			expect(product.find('img').simulate('image');

		});
	})
})