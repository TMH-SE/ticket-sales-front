import { observable, action } from 'mobx'

class Store {
  @observable isAuth = !!window.localStorage.getItem('access-token')

  @observable isAdmin = false

  @action onLogin = (token, isAdmin) => {
    window.localStorage.setItem('access-token', token)
    this.isAuth = true
    this.isAdmin = isAdmin
  }

  @action onLogout = (isAdmin) => {
    window.localStorage.clear()
    this.isAuth = false
    this.isAdmin = false
    window.location.href = '/login'
  }
}

const store = new Store()

export { store }