import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import theme from './theme'
import { Box, TextField, Button } from '@material-ui/core'
import AppBar from './components/AppBar'
import Loader from './components/Loading'
import LoginStore from './stores/Login.store'
import stores from './stores/Ewallet.store'

const { userStore, walletStore, transactionStore } = stores

const Transfer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [fromUser, setFromUser] = useState()
  const [toUser, setToUser] = useState()
  const [message, setMessage] = useState()
  const [amount, setAmount] = useState()

  useEffect(() => {
    return () => {
      userStore.resetAllFields()
      walletStore.resetAllFields()
    }
  }, [])

  const handleTransferAndTransaction = async () => {
    setIsLoading(true)
    //update from and to user balance
    userStore.setSearchQuery({
      username: {
        $in: [fromUser, toUser]
      }
    })
    userStore.setSearchPageNum(0)
    userStore.setSearchPageObjectCount(2)
    const userResponse = await userStore.objectQuery()
    if (userResponse.rows.length === 2) {
      const foundUserFrom = userResponse.rows.find(
        (row) => row.username === fromUser
      )
      const foundUserTo = userResponse.rows.find(
        (row) => row.username === toUser
      )
      walletStore.setSearchQuery({
        UserId: {
          $in: [foundUserFrom.id, foundUserTo.id]
        }
      })
      walletStore.setSearchPageNum(0)
      walletStore.setSearchPageObjectCount(2)
      const walletResponse = await walletStore.objectQuery()
      if (walletResponse.rows.length === 2) {
        const foundWalletFrom = walletResponse.rows.find(
          (row) => row.UserId === foundUserFrom.id
        )
        const foundWalletTo = walletResponse.rows.find(
          (row) => row.UserId === foundUserTo.id
        )
        walletStore.setFormFields({
          id: foundWalletFrom.id,
          balance: foundWalletFrom.balance - amount
        })
        await walletStore.objectUpdate()
        transactionStore.setFormFields({
          type: `Transfered to ${foundUserTo.username}`,
          amount: amount,
          WalletId: foundWalletFrom.id
        })
        await transactionStore.objectCreate()
        walletStore.setFormFields({
          id: foundWalletTo.id,
          balance: foundWalletTo.balance + amount
        })
        await walletStore.objectUpdate()
        transactionStore.setFormFields({
          type: `Received from ${foundUserFrom.username}`,
          amount: amount,
          WalletId: foundWalletTo.id
        })
      }

      await transactionStore.objectCreate()
    }

    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader />
  }

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
            value={fromUser}
            onChange={(e) => setFromUser(e.target.value)}
          />
        </Box>
        <Box style={{ marginTop: 10 }}>
          <TextField
            label='To'
            placeholder='To'
            size='small'
            variant='outlined'
            value={toUser}
            onChange={(e) => setToUser(e.target.value)}
          />
        </Box>
        <Box style={{ marginTop: 10 }}>
          <TextField
            label='Amount'
            placeholder='Amount'
            size='small'
            variant='outlined'
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
        </Box>
        <Box style={{ marginTop: 10 }}>
          <TextField
            label='Message'
            placeholder='Message'
            size='small'
            variant='outlined'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <Box style={{ marginTop: 20 }}>
          <Button
            style={{
              backgroundColor: theme.primary,
              color: theme.textSecondaryLight
            }}
            onClick={handleTransferAndTransaction}
          >
            Transfer
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default observer(Transfer)
