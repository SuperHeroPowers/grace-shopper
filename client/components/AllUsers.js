//showing all users, presentational
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
//page is for admin only
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

const AllUsers = (props) => {

  const {users, currentUser} = props;
  const authorized = currentUser.isAdmin;
  console.log('rendering all users component')
  return (
    <div>
    {
      authorized ?
      <div className="list-group-item min-content user-item">
      {
        users.map(user => (
        <div className="media" key={user.id}>
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={user.profileImgPath} />
          </div>
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="Jean Doe">{user.firstName + ' ' + user.lastName}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
          </NavLink>
        </div>))
      }
      </div> :
      <div className="container">
        <h2>Hey! You are not authorized to access this page!</h2>
      </div>
    }
    </div>
  );
}
/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = function (state, ownProps) {
  //state.user is the current user that is logged in
  return {
    currentUser: state.user,
    users: state.users
  };
};

export default connect(mapStateToProps)(AllUsers);
