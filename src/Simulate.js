import React, { Component, createRef } from 'react'
import { observer } from 'mobx-react'
import axios from 'axios'

import theme from './theme'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AppBar from './components/AppBar'
import LoginStore from './stores/Login.store'
import UserStore from './stores/User.store'
import ProximityStore from './stores/Proximity.store'
const getRandomString = (length) => {
  var result = ''
  var characters = 'abcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

class Simulate extends Component {
  state = {
    logs: [],
    isLoading: false
  }

  logContainer = createRef()

  pushPolicyRecomendations = async () => {
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
        )}\n\ndefault allow = false \n\n\nallow {\n    endswith(input.path, format_int(input.headers.user.companyId, 10))\n}`,
        type: 'AUTHZ',
        status: 'NEW'
      }
    }
    const response = await axios.post(
      'https://graphql-prod.monoxor.com/graphql/proximity/protected',
      {
        query: query,
        variables: variables
      },
      {
        headers: {
          org_id: '5f32573f9ec86e0a3577882e',
          app_id: 'node-red',
          app_secret: 'automatestuff'
        }
      }
    )
  }

  pushLogs = (log) => {
    this.setState((prevState) => ({
      logs: [...prevState.logs, log]
    }))
    this.logContainer.current.scrollBy({
      top: this.logContainer.current.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

  handleSimulation = async () => {
    const users = ['mark', 'mary', 'lisa', 'danny']

    //Login user
    this.setState({ isLoading: true })
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * 4)
      LoginStore.setUsername(users[randomIndex])
      const username = LoginStore.getUsername()
      UserStore.setUsername(username)
      const user = await UserStore.fetchUser()
      UserStore.setUser(user)
      LoginStore.setUser(user)
      const userAccessToken = LoginStore.fetchUserAccessToken()
      LoginStore.setUserAccessToken(userAccessToken)
      this.pushLogs(`Logged in as ${username}`)
      const otherUsers = users.filter((user) => user !== username)
      for (let j = 0; j < otherUsers.length; j++) {
        const otherUser = otherUsers[j]
        UserStore.setUsername(otherUser)
        await UserStore.fetchUser()
        await UserStore.fetchUserCompany()
        await UserStore.fetchUserWallet()
        const isUnauthorized = ProximityStore.getIsUnauthorized()
        this.pushLogs(
          `${user.name} with role ${user.role} is trying to access ${otherUser}'s wallet`
        )
        if (isUnauthorized) {
          this.pushLogs('<span style="color:red;">deny:(<span>')
        } else {
          this.pushLogs('<span style="color:green;">allow:)<span>')
        }
        ProximityStore.setIsUnauthorized(false)
        await new Promise((res) => setTimeout(res, 1000))
      }
      await new Promise((res) => setTimeout(res, 1000))
    }

    await this.pushPolicyRecomendations()
    this.setState({ isLoading: false })
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
          <Button
            variant='contained'
            color='primary'
            style={{ backgroundColor: theme.primary }}
            onClick={this.handleSimulation}
            disabled={this.state.isLoading}
          >
            Run Simulation
          </Button>
        </Box>
        <Box
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '50px 10px',
            height: 300,
            overflowY: 'scroll'
          }}
          ref={this.logContainer}
        >
          <ul>
            {this.state.logs && this.state.logs.length > 0 ? (
              this.state.logs.map((log) => (
                <li
                  key={Math.random()}
                  style={{ padding: '5px 0' }}
                  dangerouslySetInnerHTML={{ __html: log }}
                ></li>
              ))
            ) : (
              <li>No Logs</li>
            )}
          </ul>
        </Box>
      </Box>
    )
  }
}

export default observer(Simulate)
