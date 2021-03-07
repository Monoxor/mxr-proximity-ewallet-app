import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import theme from './theme'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import AppBar from './components/AppBar'
import Loading from './components/Loading'
import stores from './stores/Ewallet.store'
import proximityStore from './stores/Proximity.store'

const { userStore, transactionStore } = stores

const UserWallet = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { username } = useParams()

  const fetchUserAndTransactions = async () => {
    setIsLoading(true)

    //Fetch user, wallet and company
    userStore.setSearchQuery({
      username: username
    })
    userStore.setSearchPageNum(0)
    userStore.setSearchPageObjectCount(1)
    const userResponse = await userStore.objectQuery([
      {
        model: 'Company'
      },
      {
        model: 'Wallet'
      }
    ])
    const foundUser = userResponse.rows[0]
    if (foundUser) {
      userStore.setSelectedObject(foundUser)
    }

    //Fetch Transaction
    transactionStore.setSearchQuery({
      WalletId: foundUser.Wallet.id
    })
    transactionStore.setSearchPageObjectCount(25)
    const transactionResponse = await transactionStore.objectQuery()
    const foundTransactions = transactionResponse.rows
    if (foundTransactions) {
      transactionStore.setObjects(foundTransactions)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUserAndTransactions()

    return () => {
      userStore.resetAllFields()
      transactionStore.resetAllFields()
    }
  }, [])

  const _renderTransactions = () => {
    const transactions = transactionStore.getObjects()
    let transactionsList = []

    transactions &&
      transactions.map((transaction) => {
        transactionsList.push(
          <Box key={Math.random()}>
            {transaction.type} - ${transaction.amount}
          </Box>
        )
      })
    return transactionsList
  }

  const _renderWalletPage = () => {
    const user = userStore.getSelectedObject()
    const company = user.Company
    const wallet = user.Wallet
    const isUnauthorized = proximityStore.getIsUnauthorized()
    if (isUnauthorized) {
      return (
        <Box style={{ marginTop: 30, marginLeft: 30 }}>
          <Box style={{ color: 'red', fontSize: 30 }}>Unauthorized !</Box>
        </Box>
      )
    }
    if (!user || !company || !wallet) {
      return null
    }
    return (
      <Box style={{ paddingLeft: 20 }}>
        <Box style={{ marginTop: 100, fontSize: 40, color: theme.primary }}>
          {user.name}'s Wallet
        </Box>
        <Box style={{ marginTop: 50, fontSize: 20 }}>
          Your balance is: ${wallet ? wallet.balance : null}
        </Box>
        <Box style={{ marginTop: 10 }}>
          Company: {company ? company.name : null}
        </Box>
        <Box style={{ marginTop: 30, marginBottom: 20 }}>
          <Box>
            <b>Transactions: </b>
          </Box>
          <Box style={{ marginTop: 10 }}>{_renderTransactions()}</Box>
        </Box>
      </Box>
    )
  }

  if (isLoading) {
    return <Loading />
  }
  const user = userStore.getSelectedObject()
  return (
    <Box style={{ width: '100%', textAlign: 'left' }}>
      <AppBar />
      {user ? _renderWalletPage() : ''}
    </Box>
  )
}

export default observer(UserWallet)
