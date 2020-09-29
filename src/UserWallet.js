import React, { Component } from "react";
import { observer } from "mobx-react";
import theme from "./theme";
import Box from "@material-ui/core/Box";
import AppBar from "./components/AppBar";

import UserStore from "./stores/User.store";

class UserWallet extends Component {
  async componentDidMount() {
    const username = this.props.match.params.username;
    UserStore.setUsername(username);
    await UserStore.fetchUser();
    await UserStore.fetchUserCompany();
    await UserStore.fetchUserWallet();
  }
  _renderTransactions() {
    const wallet = UserStore.getUserWallet();
    if (!wallet || !wallet.transactions) {
      return;
    }
    let transactionsList = [];
    wallet.transactions.map((transaction) => {
      transactionsList.push(
        <Box key={Math.random()}>
          {transaction.productName} - {transaction.price}
        </Box>
      );
      return;
    });
    return transactionsList;
  }

  render() {
    const username = UserStore.getUsername();
    const user = UserStore.getUser();
    const company = UserStore.getUserCompany();
    const wallet = UserStore.getUserWallet();
    if (!user) {
      return null;
    }
    return (
      <Box style={{ width: "100%", textAlign: "left" }}>
        <AppBar />
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
            <Box style={{ marginTop: 10 }}>{this._renderTransactions()}</Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default observer(UserWallet);
