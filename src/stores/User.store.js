import { decorate, observable } from "mobx";
import axios from "axios";
import LoginStore from "./Login.store";

class UserStore {
  constructor() {
    let username = null;
    let user = null;
    let userCompany = null;
    let userWallet = null;
    let users = null;
  }

  async fetchUser() {
    console.log("fetchUser");
    const username = this.getUsername();
    console.log(username);
    try {
      const res = await axios.get(
        `https://ruywk.sse.codesandbox.io/user/${username}`
      );
      this.setUser(res.data);
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async fetchUsers() {
    console.log("fetchUsers");
    const userAccessToken = LoginStore.getUserAccessToken();
    console.log(userAccessToken);
    const url =
      "http://pankaj.moolrajani.sb.intern.monoxor.com:5001/ewallet/users/search";
    // const url = `https://ruywk.sse.codesandbox.io/users/search`
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
          access_token: "userAccessToken"
        }
      });
      console.log(res);
      const users = res.data;
      return this.setUsers(users);
    } catch (err) {
      console.log(err);
    }
  }

  async fetchUserCompany() {
    console.log("fetchUserCompany");
    const userAccessToken = LoginStore.getUserAccessToken();
    console.log(userAccessToken);
    const user = this.getUser();
    const companyId = user.companyId;
    if (!user) {
      return;
    }
    try {
      const res = await axios.get(
        `https://ruywk.sse.codesandbox.io/company/${companyId}`,
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
    const user = this.getUser();
    if (!user) {
      return;
    }
    const walletId = user.walletId;
    try {
      const res = await axios.get(
        `https://ruywk.sse.codesandbox.io/wallet/${walletId}`
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
    localStorage.setItem("user", JSON.stringify(value));
    return this.user;
  }

  getUser() {
    let user = this.user;
    if (!user) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    return user;
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
