//renders user info and past order history
//two ways to navigate to this page: through /account or through /users:userId.
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { deleteUserPermanant, putUser } from '../store';
import { NavLink } from 'react-router-dom';

const UserProfile = (props) => {
  const { user, currentUser, orders, onClickEvent } = props;
  //the profile owner and the admin can edit and delete this profile
  const authorized = currentUser && (currentUser.isAdmin || currentUser.id === user.id);

  return (
      <div className="container">
        <div>
          <h3>Welcome, { user.name || user.email}</h3>
          <img src={ user.profileImgPath } width="400" className="img-thumbnail" />
        </div>
        {
          authorized ?
          <div>
            <button onClick = {onClickEvent} type="button" className="btn-btn-warning">Edit</button>
            <button onClick = {onClickEvent} type="button" className="btn-btn-danger">Delete</button>
          </div> : null
        }
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
      </div>
    </div>
  );
}

class UserProfileLoader extends Component {

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
  const userId = Number(ownProps.match.params.userId);
  return {
    //the logged in user is current user
    currentUser: state.user,
    //if userId is not in the params, navigated through /home
    user: state.users.find(user => user.id === userId) || state.user,
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

