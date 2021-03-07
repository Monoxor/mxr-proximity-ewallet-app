import { useState } from 'react'
import { observer } from 'mobx-react'
import theme from './theme'
import { useHistory } from 'react-router-dom'
import { Box, TextField, Button } from '@material-ui/core'
import stores from './stores/Ewallet.store'
import loginStore from './stores/Login.store'
import Loading from './components/Loading'
const { userStore } = stores

const Login = () => {
  const { push } = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const login = async () => {
    setIsLoading(true)
    const password = loginStore.getPassword()
    if (password && password === 'pass') {
      const username = loginStore.getUsername()
      userStore.setSearchQuery({
        username: username
      })
      userStore.setSearchPageNum(0)
      userStore.setSearchPageObjectCount(1)
      const users = await userStore.objectQuery()
      const foundUser = users.rows[0]
      if (foundUser) {
        userStore.setSelectedObject(foundUser)
        loginStore.setUser(foundUser)
        const userAccessToken = loginStore.fetchUserAccessToken()
        loginStore.setUserAccessToken(userAccessToken)
        push(`/user/${username}/wallet`)
      }
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <Box style={{ width: '100%', textAlign: 'center' }}>
      <Box style={{ marginTop: 100, fontSize: 40, color: theme.primary }}>
        eWallet
      </Box>
      <Box style={{ marginTop: 50 }}>
        <TextField
          placeholder='username'
          size='small'
          variant='outlined'
          onChange={(e) => loginStore.setUsername(e.target.value)}
        />
      </Box>
      <Box style={{ marginTop: 10 }}>
        <TextField
          placeholder='password'
          size='small'
          variant='outlined'
          type='password'
          onChange={(e) => loginStore.setPassword(e.target.value)}
        />
      </Box>
      <Box style={{ marginTop: 20 }}>
        <Button
          style={{
            backgroundColor: theme.primary,
            color: theme.textSecondaryLight
          }}
          onClick={login}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default observer(Login)
