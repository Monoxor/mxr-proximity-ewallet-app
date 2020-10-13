import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react";
import theme from "./theme";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserWallet from "./UserWallet";
import Login from "./Login";
import Company from "./Company";
import Transfer from "./Transfer";


class App extends Component {
  _renderRoutes() {
    return (
      <Router>
        <Switch>
          <Route path="/company/:companyId" component={Company} />
          <Route path="/user/:username/wallet" component={UserWallet} />
          <Route path="/user/:username/transfer" component={Transfer} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
  

  render() {
    return (
      <Box style={{ width: "100%", textAlign: "center" }}>
        {this._renderRoutes()}
      </Box>
    );
  }
}

export default observer(App);
