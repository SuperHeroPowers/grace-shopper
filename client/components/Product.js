import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

/**
 * COMPONENT
 */
const Product = (props) => {
  const myProduct = props.products.filter(product => product.id === props.path.productId)[0];
  return (
    <div>
      <img src={myProduct.imgPath}></img>
      <h3>{myProduct.name}</h3>
      <h5>{myProduct.floatPrice}</h5>
      <p>{myProduct.description}</p>
      <button onClick={props.handleClick}>Add to Cart</button>
      <button>Buy it Now</button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    products: state.products,
    path: ownProps.match.url
  }
}

// Write map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(addToCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Product));

/**
 * PROP TYPES
 */
Product.propTypes = {
};