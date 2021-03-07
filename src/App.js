import React, { Component } from 'react'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import { observer } from 'mobx-react'
import { Box } from '@material-ui/core'
import Login from './Login'
import UserWallet from './UserWallet'
import Transfer from './Transfer'
// import Simulate from './Simulate'

class App extends Component {
  _renderRoutes() {
    return (
      <Router>
        <Switch>
          {/* <Route path='/simulation' component={Simulate} />  */}
          <Route path='/user/:username/transfer' component={Transfer} />
          <Route path='/user/:username/wallet' component={UserWallet} />
          <Route path='/login' component={Login} />
          <Redirect path='/' to='/login' />
        </Switch>
      </Router>
    )
  }

  render() {
    return (
      <Box style={{ width: '100%', textAlign: 'center' }}>
        {this._renderRoutes()}
      </Box>
    )
  }
}

export default observer(App)
