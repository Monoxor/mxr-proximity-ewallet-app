import { makeAutoObservable, observable } from 'mobx'

class ProximityStore {
  isProximityEnabled = false
  isUnauthorized = null
  constructor() {
    makeAutoObservable(this)
  }

  setIsProximityEnabled(value) {
    this.isProximityEnabled = value
    localStorage.setItem('isProximityEnabled', value ? 'true' : 'false')
    return this.isProximityEnabled
  }

  getIsProximityEnabled() {
    if (localStorage.getItem('isProximityEnabled')) {
      const isEnabled =
        localStorage.getItem('isProximityEnabled') === 'true' ? true : false
      this.setIsProximityEnabled(isEnabled)
    }
    return this.isProximityEnabled
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
