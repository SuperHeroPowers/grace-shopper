import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BrowserRouter, withRouter, Route, Switch, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar'
import Products from './Products'

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
      <Navbar isLoggedIn = {isLoggedIn} handleClick={handleClick}/>
      <Products />
      {/*<BrowserRouter>*/}
        {/*<Switch>*/}
          {/*/!*<Route exact path="/" component={Home} />*!/*/}
          {/*/!*<Route exact path="/students" component={Student} />*!/*/}
          {/*/!*<Route exact path="/campuses" component={Campus} />*!/*/}
          {/*/!*<Route exact path="/students/new" component={NewStudent} />*!/*/}
          {/*/!*<Route exact path="/campuses/new" component={NewCampus} />*!/*/}
          {/*/!*<Route exact path="/students/edit/:studentId" component={NewStudent} />*!/*/}
          {/*/!*<Route exact path="/campuses/edit/:campusId" component={NewCampus} />*!/*/}
          {/*/!*<Route exact path="/students/view/:studentId" component={SingleStudent} />*!/*/}
          {/*/!*<Route exact path="/campuses/view/:campusId" component={SingleCampus} />*!/*/}
          {/*/!*<Route path="/readme" component={ReadMe} />*!/*/}
          {/*/!*<Route path="/video" component={Video} />*!/*/}
          {/*/!*<Route component={Products} />*!/*/}
          {/*/!*<Route component={Root} />*!/*/}
        {/*</Switch>*/}
      {/*</BrowserRouter>*/}
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
