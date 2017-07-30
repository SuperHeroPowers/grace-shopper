//renders user info and past order history
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { deleteUserPermanant, putUser } from '../store';
import { NavLink } from 'react-router-dom';

const UserProfile = (props) => {
  const { user, orders, onClickEvent } = props;

  return (
      <div className="container">
        <div>
          <h3>Welcome, { user.name || user.email}</h3>
          <img src={ user.imagePath } className="img-thumbnail" />
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Order History</div>
          <table className='table'>
            <thead>
            <tr>
              <th>Order Number</th>
              <th>Date Placed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            orders && orders.filter(order => order.status !== 'created').map(order => (
              <tr key={order.id}>
                <td><NavLink to={`/orders/${order.id}`}>{ order.id }</NavLink></td>
                <td>{order.dateProcessed}</td>
                <td>{order.status}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <button onClick = {onClickEvent} type="button" className="btn-btn-warning">Edit</button>
        <button onClick = {onClickEvent} type="button" className="btn-btn-danger">Delete</button>
      </div>
    </div>
  );
}

class UserProfileLoader extends Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      this.props.user = nextProps.user;
    }
  }
  onClickEvent(evt){
    const user = this.props.user;
    evt.preventDefault();
    this.props.handleClick(evt, user);
  }
  render () {
    return (
      <UserProfile {...this.props} />
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  //state.user is the current user that is logged in
  return {
    user: state.user,
    orders: state.orders.filter(order => order.userId === state.user.id)
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleClick (evt, user) {
      evt.preventDefault();
      evt.target.name === 'edit' ? dispatch(putUser(user)) : dispatch(deleteUserPermanant(user.Id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileLoader);

