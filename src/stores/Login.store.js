import { decorate, observable } from "mobx";

class LoginStore {
  constructor() {
    let username = null;
    let password = null;
    let userAccessToken = null;
    let user = null;
  }

  fetchUserAccessToken() {
    const username = this.getUsername();
    let accessToken;
    switch (username) {
      case "mark":
        accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNYXJrIiwidXNlcm5hbWUiOiJtYXJrIiwicm9sZSI6IlBSSU1BUlkiLCJjb21wYW55SWQiOjUwMSwiZ3JvdXBJZCI6MTAxLCJ3YWxsZXRJZCI6IjYwMSJ9fQ.Td1ntbFAPHiZu68TsQrqE-J3opT576MYITsvb67aYo4";
        break;
      case "mary":
        accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNYXJ5IiwidXNlcm5hbWUiOiJtYXJ5Iiwicm9sZSI6IlNFQ09OREFSWSIsImNvbXBhbnlJZCI6NTAxLCJncm91cElkIjoxMDEsIndhbGxldElkIjoiNjAzIn19.mrHXHOcyymo3TOq7QZWIQIQKjHpY9C2y7pQ2wAwqbMY";
        break;
      default:
        break;
    }
    this.setUserAccessToken(accessToken);
    return accessToken;
  }

  setUsername(value) {
    this.username = value;
    return this.username;
  }

  getUsername() {
    return this.username;
  }

  setPassword(value) {
    this.password = value;
    return this.password;
  }

  getPassword() {
    return this.password;
  }

  setUserAccessToken(value) {
    this.userAccessToken = value;
    localStorage.setItem("userAccessToken", value);
    return this.userAccessToken;
  }

  getUserAccessToken() {
    let userAccessToken = this.userAccessToken;
    if (!userAccessToken) {
      userAccessToken = localStorage.getItem("userAccessToken");
    }
    return userAccessToken;
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
}

decorate(LoginStore, {
  username: observable,
  password: observable,
  userAccessToken: observable,
  user: observable
});

export default new LoginStore();
