import React , {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar'
<<<<<<< HEAD
import OrderList from './OrderList';
import { Route, Switch, Redirect } from 'react-router-dom';
=======
import Products from './Products'
>>>>>>> fbae9e6d52f7730e3abb815c59a291ca3fd1ce77

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {

  const {children, handleClick, isLoggedIn} = props;

  return (
    <div>
<<<<<<< HEAD
    <Switch>
      <Navbar isLoggedin = {false} handleClick={handleClick}/>
      <Route path="/orders" component={OrderList} />
      {children}
      </Switch>
=======
      <Navbar isLoggedIn = {isLoggedIn} handleClick={handleClick}/>
      <Products />
>>>>>>> fbae9e6d52f7730e3abb815c59a291ca3fd1ce77
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
