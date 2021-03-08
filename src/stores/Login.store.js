import { makeAutoObservable, observable } from 'mobx'

class LoginStore {
  username = null
  password = null
  userAccessToken = null
  user = null

  constructor() {
    makeAutoObservable(this)
  }

  fetchUserAccessToken() {
    const username = this.getUsername()
    let accessToken
    switch (username) {
      case 'mark':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNYXJrIiwidXNlcm5hbWUiOiJtYXJrIiwicm9sZSI6IlBSSU1BUlkiLCJDb21wYW55SWQiOiJlNTVlMDU0Yi1kN2QyLTRmZjMtOTc5Ny0xYWZmZWFiYTVjZjQiLCJncm91cElkIjoxMDEsIldhbGxldElkIjoiZDE5YTU4MzktNWI4NS00NzdmLWFkOWMtMGM4Zjg3MjM3YWM0In19.eloadBPjXpJBAY7mnUPqRyAz5yJHJ4BBAdYMlvT3TO4'
        break
      case 'mary':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNYXJ5IiwidXNlcm5hbWUiOiJtYXJ5Iiwicm9sZSI6IlNFQ09OREFSWSIsIkNvbXBhbnlJZCI6ImU1NWUwNTRiLWQ3ZDItNGZmMy05Nzk3LTFhZmZlYWJhNWNmNCIsImdyb3VwSWQiOjEwMSwiV2FsbGV0SWQiOiJlOTM0ZWI5Ni0yZDIwLTQ5NjktOWJkNi0xOWEwNjk3YTA4MzcifX0.qZY7whAmsWgb46hXXJyfVp7PXCNzglhzWlN1H5p8VjM'
        break
      case 'lisa':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJMaXNhIiwidXNlcm5hbWUiOiJsaXNhIiwicm9sZSI6IlBSSU1BUlkiLCJDb21wYW55SWQiOiIxODViODExZi05ZmEzLTRlOWUtODExNy1hNTg3Y2FjM2VmYTgiLCJncm91cElkIjoxMDMsIldhbGxldElkIjoiYzVkY2E5YzItNTMzYi00MTAwLTljYmUtN2MxZGNhNzUwOGM4In19.7TGZPwdle3Kz_nkwdKWLd4o9zPMWcju6faObyfv7FbA'
        break
      case 'danny':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJEYW5ueSIsInVzZXJuYW1lIjoiZGFubnkiLCJyb2xlIjoiU0VDT05EQVJZIiwiQ29tcGFueUlkIjoiMTg1YjgxMWYtOWZhMy00ZTllLTgxMTctYTU4N2NhYzNlZmE4IiwiZ3JvdXBJZCI6MTAzLCJXYWxsZXRJZCI6IjA1M2FjOWVjLTk1ZWQtNDRiOC1hODY3LTNlOWQwYzYzNzA0NiJ9fQ.4bjo1sy0svBDRubRa_o-jTBlW2wFl-rrAl-T6ja2DAs'
        break
      default:
        break
    }
    this.setUserAccessToken(accessToken)
    return accessToken
  }

  setUsername(value) {
    this.username = value
    return this.username
  }

  getUsername() {
    return this.username
  }

  setPassword(value) {
    this.password = value
    return this.password
  }

  getPassword() {
    return this.password
  }

  setUserAccessToken(value) {
    this.userAccessToken = value
    localStorage.setItem('userAccessToken', value)
    return this.userAccessToken
  }

  getUserAccessToken() {
    let userAccessToken = this.userAccessToken
    if (!userAccessToken) {
      userAccessToken = localStorage.getItem('userAccessToken')
    }
    return userAccessToken
  }

  setUser(value) {
    this.user = value
    localStorage.setItem('user', JSON.stringify(value))
    return this.user
  }

  getUser() {
    let user = this.user
    if (!user) {
      user = JSON.parse(localStorage.getItem('user'))
    }
    return user
  }
}

export default new LoginStore()
