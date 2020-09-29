import { decorate, observable } from "mobx";
import axios from "axios";
import LoginStore from "./Login.store";

class ProximityStore {
  constructor() {
    let isProximityEnabled = null;
    let isUnauthorized = null
  }

  setIsProximityEnabled(value) {
    this.isProximityEnabled = value;
    localStorage.setItem('isProximityEnabled', value)
    return this.isProximityEnabled;
  }

  getIsProximityEnabled() {
    let isProximityEnabled = this.isProximityEnabled
    if (!isProximityEnabled) {
      isProximityEnabled = localStorage.getItem('isProximityEnabled')
    }
    return isProximityEnabled;
  }

  setIsUnauthorized(value) {
    this.isUnauthorized = value
    return this.isUnauthorized
  }

  getIsUnauthorized() {
    return this.isUnauthorized
  }


}

decorate(ProximityStore, {
  isProximityEnabled: observable,
  isUnauthorized: observable
});

export default new ProximityStore();
