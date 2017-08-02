import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {addToCart} from '../store';

/**
 * COMPONENT
 */
class Product extends Component {
  // console.log('hello');
  // console.log(props.path);
  constructor(props) {
    super(props);
    this.onClickEvent = this.onClickEvent.bind(this);
  }

  render () {
    const {myProduct, onClickEvent} = this.props;
    return (<div>
      <img src={myProduct.imagePath}></img>
      <h3>{myProduct.name}</h3>
      <h5>{myProduct.floatPrice}</h5>
      <p>{myProduct.description}</p>
      <button onClick={this.onClickEvent}>Add to Cart</button>
      <button>Buy it Now</button>
    </div>)
  }


  onClickEvent(evt){
    const {myProduct, user, handleClick} = this.props
    evt.preventDefault();
    console.log('add to cart clicked')
    handleClick(evt, myProduct, user);
  }
}
/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    user : state.user,
    path: ownProps.match.params,
    myProduct: state.products.find(product => Number(product.id) === Number(ownProps.match.params.productId))
  }
}

// Write map dispatch to props!!!
const mapDispatch = (dispatch) => {
  return {
    handleClick (evt, product, user) {
      evt.preventDefault();
      console.log('product', product, 'user', user)
      dispatch(addToCart(product, user))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Product));
