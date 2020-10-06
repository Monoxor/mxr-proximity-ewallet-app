import React, { Component } from "react";
import { observer } from "mobx-react";
import {toJS} from "mobx";
import theme from "./theme";
import Box from "@material-ui/core/Box";
import AppBar from "./components/AppBar";
import UserStore from "./stores/User.store";
import ProximityStore from "./stores/Proximity.store";
class UserWallet extends Component {
  async componentDidMount() {
    const username = this.props.match.params.username;
    UserStore.setUsername(username);
    await UserStore.fetchUser();
    await UserStore.fetchUserCompany();
    await UserStore.fetchUserWallet();
  }

  _renderTransactions() {
    const wallet = toJS(UserStore.getUserWallet());
    if (!wallet || !wallet.transactions || wallet.transactions.length < 1) {
      return <Box style = {{color: 'red'}}>Unauthorized !</Box>;
    }
    let transactionsList = [];
    let transactions = wallet.transactions
    let isProximityEnabled = ProximityStore.getIsProximityEnabled()
    if (isProximityEnabled == "true") {
      transactions = wallet.transactions[0]
      console.log(transactions)
    }
    transactions = null
    if (!transactions) {
      return null
    }
    transactions.map((transaction) => {
      transactionsList.push(
        <Box key={Math.random()}>
          {transaction.productName} - {transaction.price}
        </Box>
      );
    });
    return transactionsList;
  }

  _renderWalletPage() {
    console.log('_renderWalletPage')
    const username = UserStore.getUsername();
    const user = UserStore.getUser();
    const company = UserStore.getUserCompany();
    const wallet = UserStore.getUserWallet();
    const isUnauthorized = ProximityStore.getIsUnauthorized()
    if (isUnauthorized) {
      return (
        <Box style = {{marginTop: 30, marginLeft: 30}}>
          <Box style = {{color: 'red', fontSize: 30}}>Unauthorized !</Box>
        </Box>
      )
    }
    if (!user || !company || !wallet) {
      return null;
    }
    const transactions = this._renderTransactions()
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
          <Box style={{ marginTop: 10 }}>{transactions}</Box>
        </Box>
      </Box>
      
    )
  }
  render() {
    return (
      <Box style={{ width: "100%", textAlign: "left" }}>
        <AppBar />
        {this._renderWalletPage()}
      </Box>
    );
  }
}

export default observer(UserWallet);
