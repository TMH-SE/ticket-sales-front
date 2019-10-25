import { observable, action } from 'mobx'

class Store {
  @observable isAuth = !!window.localStorage.getItem('access-token')

  @observable isAdmin = !!window.localStorage.getItem('isAdmin')

  @action onLogin = (token, isAdmin) => {
    window.localStorage.setItem('access-token', token)
    this.isAuth = true
    if (isAdmin) {
      window.localStorage.setItem('isAdmin', isAdmin)
      this.isAdmin = true
    }
  }

  @action onLogout = (isAdmin) => {
    window.localStorage.clear()
    this.isAuth = false
    this.isAdmin = false
  }
}

const store = new Store()

export { store }