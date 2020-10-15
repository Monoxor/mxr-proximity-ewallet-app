import { decorate, observable } from 'mobx'
import axios from 'axios'
import LoginStore from './Login.store'
import UserStore from './User.store'
import ProximityStore from './Proximity.store'


class TransferStore {
  constructor() {
    let fromUsername = null
    let fromUser = null
    let toUsername = null
    let toUser = null
    let amount = null
  }


  setFromUsername(value) {
    this.fromUsername = value
    return this.fromUsername
  }


  getFromUsername() {
    return this.fromUsername
  }


  setFromUser(value) {
    this.fromUser = value
    return this.fromUser
  }


  getFromUser() {
    return this.fromUser
  }


  setToUsername(value) {
    this.toUsername = value
    return this.toUsername
  }


  getToUsername() {
    return this.toUsername
  }


  setToUser(value) {
    this.toUser = value
    return this.toUser
  }


  getToUser() {
    return this.toUser
  }


  setAmount(value) {
    this.amount = value
    return this.amount
  }


  getAmount() {
    return this.amount
  }


  async onClickTransfer() {
    const amount = this.getAmount()
    const fromUsername = this.getFromUsername()
    UserStore.setUsername(fromUsername)
    const fromUser = await UserStore.fetchUser()
    this.setFromUser(fromUser)
    const toUsername = this.getToUsername()
    UserStore.setUsername(toUsername)
    const toUser = await UserStore.fetchUser()
    this.setToUser(toUser)
    const isProximityEnabled = ProximityStore.getIsProximityEnabled()
    const userAccessToken = LoginStore.getUserAccessToken()
    let url = 'http://kushal.parikh.sb.intern.monoxor.com:5000/transfer'
    if (isProximityEnabled == 'true') {
      url =
        'http://kushal.parikh.sb.intern.monoxor.com:5006/ewallet/transfer'
    }
    try {
      const res = await axios({
        url: url,
        method: 'POST',
        data: {
          fromUser: fromUser,
          toUser: toUser,
          amount: amount
        },
        headers: {
          'content-type': 'application/json',
          access_token: userAccessToken
        }
      })
      console.log(res.data)
      return { status: 'dev' }
    } catch (err) {
      console.log(err)
    }
  }
}

decorate(TransferStore, {
  fromUsername: observable,
  fromUser: observable,
  toUsername: observable,
  toUser: observable,
  amount: observable
})

export default new TransferStore()
