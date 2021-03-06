import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Navbar, Login, Signup, UserHome, Lobby, Train, Battle, CodeEditor, Footer} from './components'
import {me} from './store'

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
          <Navbar />
          
          <Switch>

              {/* Routes placed here are available to all visitors */}
            {!isLoggedIn && <Route exact path="/" component={Login} />}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/" component={Lobby} />
                  <Route exact path="/train" component={Train} />
                  <Route exact path="/users/:userId/battle" component={Battle} />
                  <Route exact path="/editor" component={CodeEditor} />
                  <Route exact path="/users/:userId/profile" component={UserHome} />

                </Switch>
            }
          </Switch>

          {
            //<Footer />
          }
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
      dispatch(me())
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
