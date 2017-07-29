//renders either all campuses or all students
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

function Products (props){
  //can take in all products or products in a category
  const elements = props.products;
  return (
    <div className="container">
        <div className="row">
        {
          elements.map(el =>
          (<div key = {el.id} className="col-sm-6 col-md-4">
            <NavLink to={`products/${el.id}`} className="thumbnail">
            <img className="img-responsive" src={el.imagePath}></img></NavLink>
            <h4>{el.name}</h4>
            <h4>$ {el.price}</h4>
          </div>)
          )}
        </div>
      </div>
  );
}

const mapStateToProps = function (state, ownProps) {
  return {
    products: state.products,
    path: ownProps.match.url //matched portion of url
  };
};

export default withRouter(connect(mapStateToProps)(Products));
