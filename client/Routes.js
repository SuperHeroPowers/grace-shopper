import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserProfile, Products, Product, OrderList, OrderProduct, Cart} from './components'
import {me, fetchProducts, fetchOrders} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {

    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/products/:productId" component={Product} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/orders" component={OrderList} />
            <Route exact path="/orders/:orderId" component={OrderProduct} />
            <Route exact path="/cart" component={Cart} />

            {
              isLoggedIn ?
                <Switch>
                  {/* Routes placed here are only available after logging in */}

                  <Route exact path="/home" component={UserProfile} />
                </Switch> : null
            }
            {/* Displays our Login component as a fallback */}
            <Redirect to='/products'/>
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(fetchProducts());
      dispatch(fetchOrders());
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
