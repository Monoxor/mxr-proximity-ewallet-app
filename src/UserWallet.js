import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import theme from './theme'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import AppBar from './components/AppBar'
import Loading from './components/Loading'
import stores from './stores/Ewallet.store'
import proximityStore from './stores/Proximity.store'

const { userStore, companyStore, walletStore, transactionStore } = stores

const UserWallet = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { username } = useParams()

  const fetchData = async () => {
    setIsLoading(true)

    //Fetch user
    userStore.setSearchQuery({
      username: username
    })
    userStore.setSearchPageNum(0)
    userStore.setSearchPageObjectCount(1)
    const userResponse = await userStore.objectQuery()
    const foundUser = userResponse.rows[0]
    if (foundUser) {
      userStore.setSelectedObject(foundUser)
    }

    // Fetch wallet
    walletStore.setSearchQuery({
      UserId: foundUser.id
    })
    walletStore.setSearchPageNum(0)
    walletStore.setSearchPageObjectCount(1)
    const walletResponse = await walletStore.objectQuery()
    const foundWallet = walletResponse.rows[0]
    if(foundWallet) {
      walletStore.setSelectedObject(foundWallet)
    }
    // Fetch company
    const company = await companyStore.objectQueryById(foundUser.CompanyId)
    if(company) {
      companyStore.setSelectedObject(company)
    }
    //Fetch Transaction
    transactionStore.setSearchQuery({
      WalletId: foundWallet.id
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
    fetchData()

    return () => {
      userStore.resetAllFields()
      transactionStore.resetAllFields()
      walletStore.resetAllFields()
      companyStore.resetAllFields()
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
    const company = companyStore.getSelectedObject()
    const wallet = walletStore.getSelectedObject()
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
