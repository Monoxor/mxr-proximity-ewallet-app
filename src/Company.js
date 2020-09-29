import React, { Component } from "react";
import { observer } from "mobx-react";
import theme from "./theme";
import Box from "@material-ui/core/Box";
import AppBar from "./components/AppBar";
import UserStore from "./stores/User.store";
import LoginStore from "./stores/Login.store";

class Company extends Component {
  async componentDidMount() {
    await UserStore.fetchUserCompany();
    await UserStore.fetchUsers();
  }

  _renderUsers() {
    const users = UserStore.getUsers();
    if (!users) {
      return;
    }
    let userList = [];
    users.map((user) => {
      userList.push(
        <tr key={Math.random()}>
          <td style={{ padding: 5 }}>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.companyId}</td>
          <td>{user.walletId}</td>
        </tr>
      );
      return null;
    });
    return (
      <table>
        <tbody>
        <tr>
          <th style={{width:70}}>User ID</th>
          <th style={{width:150}}>User</th>
          <th style={{width:100}}>Company</th>
          <th style={{width:50}}>Balance</th>
        </tr>
        {userList}
        </tbody>
      </table>
    );
  }

  render() {
    const users = UserStore.getUsers();
    const company = UserStore.getUserCompany();
    if (!users) {
      return <Box>Loading...</Box>;
    }
    return (
      <Box style={{ width: "100%", textAlign: "left" }}>
        <AppBar />
        <Box style={{ padding: 20, fontSize: 20, color: theme.primary }}>
          Company: {company ? company.name : null}
        </Box>
        <Box style={{ paddingLeft: 20, fontSize: 20 }}>Users</Box>
        <Box style={{ paddingLeft: 20 }}>{this._renderUsers()}</Box>
      </Box>
    );
  }
}

export default observer(Company);
