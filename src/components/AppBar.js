import React, { Component } from "react";
import { observer } from "mobx-react";
import theme from "./../theme";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoginStore from "./../stores/Login.store";
import ProximityStore from "../stores/Proximity.store";

class AppBar extends Component {
  render() {
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const user = LoginStore.getUser();
    return (
      <Box
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          height: 50,
          alignItems: "center",
          color: theme.textSecondaryLight,
          backgroundColor: theme.primaryLight
        }}
      >
        <Box
          style={{
            flex: 8,
            marginLeft: 10,
            fontSize: 25
          }}
        >
          eWallet
        </Box>
        <Box style={{ flex: 5, textAlign: "right", marginRight: 30}}>
          <input 
            style = {{marginBottom: 5}} type='checkbox' id='isProximityEnabled' checked={isProximityEnabled == "true" ? true : false} 
            onChange = {()=>{
              if (isProximityEnabled == "true") {
                ProximityStore.setIsProximityEnabled("false")
              } else {
                ProximityStore.setIsProximityEnabled("true")
              }
            }}
          />
          Proximity Enabled
        </Box>
        <Box style={{ flex: 1, textAlign: "right", marginRight: 10 }}>
          Hi {user ? user.name : null} !
        </Box>
      </Box>
    );
  }
}

export default observer(AppBar);
