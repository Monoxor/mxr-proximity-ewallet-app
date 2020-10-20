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
const getRandomString = (length) => {
  var result = ''
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

class Transfer extends Component {
  state = {
    totalTransfer: 0
  }

  pushTransferPolicy = async () => {
    if (this.state.totalTransfer !== 5) {
      return
    }
    const query = `
      mutation($policyRecommendation: policyRecommendationInputType) {
        policyRecommendationCreate(policyRecommendation: $policyRecommendation) {
          id
          name
          rules
          type
          status
        }
      }
    `

    const variables = {
      policyRecommendation: {
        name: `INGRESS-${getRandomString(5)}-policy`,
        rules: `package ${getRandomString(
          5
        )}\n\ndefault allow = false \n\n\nallow {\n    contains(input.body.message, "<script>")\n}`,
        type: 'AUTHZ',
        status: 'NEW'
      }
    }
    const response = await axios.post(
      'https://kushal.parikh.sb.intern.monoxor.com:8080/graphql/proximity/protected',
      {
        query: query,
        variables: variables
      },
      {
        headers: {
          org_id: '5f87efeeb92578007fcbc36d',
          app_id: 'node-red',
          app_secret: 'automatestuff'
        }
      }
    )
  }

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
                this.setState((prevState) => ({
                  totalTransfer: prevState.totalTransfer + 1
                }))
                this.pushTransferPolicy()
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
