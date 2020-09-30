import { decorate, observable } from "mobx";
import axios from "axios";
import LoginStore from "./Login.store";
import ProximityStore from "./Proximity.store";

class UserStore {
  constructor() {
    let username = null;
    let user = null;
    let userCompany = null;
    let userWallet = null;
    let users = null;
  }

  async fetchUser() {
    const username = this.getUsername();
    if (!username) {
      return
    }
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const userAccessToken = LoginStore.getUserAccessToken();
    let url = `http://do-prod.monoxor.com:5000/user/${username}`
    if (isProximityEnabled == "true") {
      url = `http://pankaj.moolrajani.sb.intern.monoxor.com:5002/ewallet/user/${username}`
    }
    try {
      const res = await axios({
        url: url,
        method: "get",
        data: {},
        headers: {
          "content-type": "application/json",
          access_token: userAccessToken
        }
      });
      if (res.status == 401) {
        console.log('setting unauthorized')
        ProximityStore.setIsUnauthorized(true)
        return
      } 
      return this.setUser(res.data);
    } catch (err) {
      if (err.message.includes(401)) {
        ProximityStore.setIsUnauthorized(true)
      }
    }
    return null;
  }

  async fetchUsers() {
    console.log('fetchUsers')
    
    const isProximityEnabled=ProximityStore.getIsProximityEnabled()
    
    const userAccessToken = LoginStore.getUserAccessToken();
    let url = 'http://do-prod.monoxor.com:5000/users/search'
    if (isProximityEnabled == "true") {
      url = "http://pankaj.moolrajani.sb.intern.monoxor.com:5001/ewallet/users/search";
    } 
    try {
      const res = await axios({
        url: url,
        method: "POST",
        data: {
          companyId: 501,
          groupId: 101
        },
        headers: {
          "content-type": "application/json",
          access_token: userAccessToken
        }
      });
      if (res.status == 401) {
        console.log('setting unauthorized')
        ProximityStore.setIsUnauthorized(true)
        return
      } 
      const users = res.data;
      return this.setUsers(users);
    } catch (err) {
      if (err.message.includes(401)) {
        ProximityStore.setIsUnauthorized(true)
      }
      console.log(err);
    }
  }

  async fetchUserCompany() {
    const userAccessToken = LoginStore.getUserAccessToken();
    const user = this.getUser();
    if (!user) {
      return
    }
    const companyId = user.companyId;
    if (!user) {
      return;
    }
    try {
      const res = await axios.get(
        `http://do-prod.monoxor.com:5000/company/${companyId}`,
        {},
        {
          headers: {
            access_token: userAccessToken
          }
        }
      );
      const company = res.data;
      return this.setUserCompany(company);
    } catch (err) {
      console.log(err);
    }
  }


  async fetchUserWallet() {
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const userAccessToken = LoginStore.getUserAccessToken();
    const user = this.getUser()
    if (!user) {
      return
    }
    let url = `http://do-prod.monoxor.com:5000/wallet/${user.walletId}`
    if (isProximityEnabled == "true") {
      url = `http://pankaj.moolrajani.sb.intern.monoxor.com:5003/ewallet/wallet/${user.walletId}`
    }
    try {
      const res = await axios({
        url: url,
        method: "get",
        data: {},
        headers: {
          "content-type": "application/json",
          access_token: userAccessToken
        }
      });
      if (res.status == 401) {
        console.log('setting unauthorized')
        ProximityStore.setIsUnauthorized(true)
        return
      } 
      return this.setUserWallet(res.data);
    } catch (err) {
      if (err.message.includes(401)) {
        ProximityStore.setIsUnauthorized(true)
      }
    }
    return null;
  }

  async fetchUserWallet1() {
    const user = this.getUser();
    if (!user) {
      return;
    }
    const walletId = user.walletId;
    try {
      const res = await axios.get(
        `http://do-prod.monoxor.com:5000/wallet/${walletId}`
      );
      const wallet = res.data;
      return this.setUserWallet(wallet);
    } catch (err) {
      console.log(err);
    }
  }

  setUsername(value) {
    this.username = value;
    return this.username;
  }

  getUsername() {
    return this.username;
  }

  setUser(value) {
    this.user = value;
    return this.user;
  }

  getUser() {
    return this.user
  }

  setUserCompany(value) {
    this.userCompany = value;
    return this.userCompany;
  }

  getUserCompany() {
    return this.userCompany;
  }

  setUserWallet(value) {
    this.userWallet = value;
    return this.userWallet;
  }

  getUserWallet() {
    return this.userWallet;
  }

  setUsers(value) {
    this.users = value;
    return this.users;
  }

  getUsers() {
    return this.users;
  }
}

decorate(UserStore, {
  username: observable,
  user: observable,
  userCompany: observable,
  userWallet: observable,
  users: observable
});

export default new UserStore();
