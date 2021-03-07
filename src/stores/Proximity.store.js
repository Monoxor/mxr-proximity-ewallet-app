import { makeAutoObservable, observable } from 'mobx'

class ProximityStore {
  isProximityEnabled = null
  isUnauthorized = null
  constructor() {
    makeAutoObservable(this)
  }

  setIsProximityEnabled(value) {
    this.isProximityEnabled = value
    localStorage.setItem('isProximityEnabled', value)
    return this.isProximityEnabled
  }

  getIsProximityEnabled() {
    let isProximityEnabled = this.isProximityEnabled
    if (!isProximityEnabled) {
      isProximityEnabled = localStorage.getItem('isProximityEnabled')
    }
    return isProximityEnabled
  }

  setIsUnauthorized(value) {
    this.isUnauthorized = value
    return this.isUnauthorized
  }

  getIsUnauthorized() {
    return this.isUnauthorized
  }
}

export default new ProximityStore()
