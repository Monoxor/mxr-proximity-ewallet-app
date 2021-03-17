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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2VhODFmMDktMDJlMS00MjEyLWIxNDktYWU4YzE4NjlmYTU3IiwibmFtZSI6Ik1hcmsiLCJ1c2VybmFtZSI6Im1hcmsiLCJyb2xlIjoiUFJJTUFSWSIsIkNvbXBhbnlJZCI6ImU1NWUwNTRiLWQ3ZDItNGZmMy05Nzk3LTFhZmZlYWJhNWNmNCIsImdyb3VwSWQiOjEwMSwiV2FsbGV0SWQiOiJkMTlhNTgzOS01Yjg1LTQ3N2YtYWQ5Yy0wYzhmODcyMzdhYzQifX0.fbyAMrnTazJ05wA1_4XmiGRs07DLhzhCVby96pZl00M'
        break
      case 'mary':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNGNkMjBiNDYtNzkzZi00OTg0LWJkMDItODMwNDBhNjBkMDUzIiwibmFtZSI6Ik1hcnkiLCJ1c2VybmFtZSI6Im1hcnkiLCJyb2xlIjoiU0VDT05EQVJZIiwiQ29tcGFueUlkIjoiZTU1ZTA1NGItZDdkMi00ZmYzLTk3OTctMWFmZmVhYmE1Y2Y0IiwiZ3JvdXBJZCI6MTAxLCJXYWxsZXRJZCI6ImU5MzRlYjk2LTJkMjAtNDk2OS05YmQ2LTE5YTA2OTdhMDgzNyJ9fQ.1yRZr3hi8O75MMndL9TSBuddWqCXDbd9g29LF3VcztU'
        break
      case 'lisa':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDdiZTA2ZTYtYjExMy00ODczLTk2YTYtMGYxODUyYWE0NDk5IiwibmFtZSI6Ikxpc2EiLCJ1c2VybmFtZSI6Imxpc2EiLCJyb2xlIjoiUFJJTUFSWSIsIkNvbXBhbnlJZCI6IjE4NWI4MTFmLTlmYTMtNGU5ZS04MTE3LWE1ODdjYWMzZWZhOCIsImdyb3VwSWQiOjEwMywiV2FsbGV0SWQiOiJjNWRjYTljMi01MzNiLTQxMDAtOWNiZS03YzFkY2E3NTA4YzgifX0.rKi_xS78FpcPhmIT8ppVOxptpuDmqI4Rj0sY8HjZ2J4'
        break
      case 'danny':
        accessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTI1ZTI0MTktZjI0NC00MWVmLTlhYmUtMzBjOTVjNzgwMTc5IiwibmFtZSI6IkRhbm55IiwidXNlcm5hbWUiOiJkYW5ueSIsInJvbGUiOiJTRUNPTkRBUlkiLCJDb21wYW55SWQiOiIxODViODExZi05ZmEzLTRlOWUtODExNy1hNTg3Y2FjM2VmYTgiLCJncm91cElkIjoxMDMsIldhbGxldElkIjoiMDUzYWM5ZWMtOTVlZC00NGI4LWE4NjctM2U5ZDBjNjM3MDQ2In19.CNGT53k2mvZ3eWsF1BoOdjw-Ik2M_QL_Ji2a-iwwGzQ'
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
