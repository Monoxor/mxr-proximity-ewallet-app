import React, { Component } from 'react'
import { observer } from 'mobx-react'
import theme from './../theme'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import LoginStore from './../stores/Login.store'
import ProximityStore from '../stores/Proximity.store'

class AppBar extends Component {
  render() {
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const user = LoginStore.getUser()
    if (!user) {
      return null
    }
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          style={{
            width: '100%',
            height: 200,
            textAlign: 'left',
            display: 'flex',
            height: 50,
            alignItems: 'center',
            color: theme.textSecondaryLight,
            backgroundColor: theme.primaryLight
          }}
        >
          <Box
            style={{
              flex: 8,
              marginLeft: 10,
              fontSize: 25
            }}
          >
            eWallet
          </Box>
          <Box style={{ flex: 5, textAlign: 'right', marginRight: 30 }}>
            <input
              style={{ marginBottom: 5 }}
              type='checkbox'
              id='isProximityEnabled'
              checked={isProximityEnabled}
              onChange={(e) => {
                ProximityStore.setIsProximityEnabled(e.target.checked)
              }}
            />
            Proximity Enabled
          </Box>
          <Box style={{ flex: 1, textAlign: 'right', marginRight: 10 }}>
            Hi {user ? user.name : null} !
          </Box>
        </Box>
        <Box style={{ display: 'flex' }}>
          <Box style={{ padding: 10 }}>
            <Link to={`/user/${user.username}/wallet`}>Wallet</Link>
          </Box>
          <Box style={{ padding: 10 }}>
            <Link to={`/user/${user.username}/transfer`}>Transfer</Link>
          </Box>
          <Box style={{ padding: 10 }}>
            <Link to={`/simulation`}>Simulation</Link>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default observer(AppBar)
