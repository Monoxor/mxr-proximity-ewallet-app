import React, { Component } from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'
import theme from './theme'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AppBar from './components/AppBar'
import LoginStore from './stores/Login.store'
import TransferStore from './stores/Transfer.store'


class Transfer extends Component {


  render() {
    return (
      <Box style={{ width: '100%', textAlign: 'left' }}>
        <AppBar />
        <Box
          style={{
            padding: 20,
            marginTop: 30,
            fontSize: 30,
            color: theme.primary
          }}
        >
          Transfer
          <Box style={{ marginTop: 50 }}>
            <TextField
              label='From'
              placeholder='From'
              size='small'
              variant='outlined'
              onChange={(e) => TransferStore.setFromUsername(e.target.value)}
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <TextField
              lable='To'
              placeholder='To'
              size='small'
              variant='outlined'
              onChange={(e) => TransferStore.setToUsername(e.target.value)}
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <TextField
              lable='Amount'
              placeholder='Amount'
              size='small'
              variant='outlined'
              onChange={(e) => TransferStore.setAmount(e.target.value)}
            />
          </Box>
          <Box style={{ marginTop: 10 }}>
            <TextField
              lable='Message'
              placeholder='Message'
              size='small'
              variant='outlined'
              onChange={(e) => TransferStore.setMessage(e.target.value)}
            />
          </Box>
          <Box style={{ marginTop: 20 }}>
            <Button
              style={{
                backgroundColor: theme.primary,
                color: theme.textSecondaryLight
              }}
              onClick={async () => {
                await TransferStore.onClickTransfer()
              }}
            >
              Transfer
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default observer(Transfer)
