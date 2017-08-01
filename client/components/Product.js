import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

/**
 * COMPONENT
 */
const Product = (props) => {
  console.log('hello');
  console.log(props.path);
  const myProduct = props.product;
  return (
    <div>
      <img src={myProduct.imagePath}></img>
      <h3>{myProduct.name}</h3>
      <h5>{myProduct.floatPrice}</h5>
      <p>{myProduct.description}</p>
      <button onClick={props.onClickEvent}>Add to Cart</button>
      <button>Buy it Now</button>
    </div>
  )
}

class ProductWrapper extends Component {
  onClickEvent(e){
    e.preventDefault();  
    this.props.handleClick(e, this.props.product, this.props.user);
  }

  render(){
    return (
        <Product {...this.props} />
      )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    user : state.user, 
    path: ownProps.match.params,
    product : state.products.filter(product => Number(product.id) === Number(props.path.productId))[0]
  }
}

// Write map dispatch to props!!!
const mapDispatch = (dispatch) => {
  return {
    handleClick (e, product, user) {   
      dispatch(addToCart(product, user))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(ProductWrapper));