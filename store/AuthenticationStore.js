import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class AuthenticationStore {
	constructor() {
	  isAuthenticating = true
	  AsyncStorage.getItem('token').then(action((data) => {
		this.token = data
		this.isAuthenticating = false
	  }))  
	}

	_save(){
	  return AsyncStorage.setItem('token', this.token);
	}

	_clear(){
		return AsyncStorage.removeItem('token');
	}
	
	@observable isAuthenticating = false
	@observable token = null
	@observable firstTime = false

	@computed get isAuthenticated () {
	  return this.token ? true : false
	}

	@computed get status () {
		return this.token ? (this.firstTime ? 'first_time' : 'logged_in'): 'logged_out'
	}

	@action initIntro() {
		this.firstTime = true;
	}

	@action doneIntro() {
		this.firstTime = false;
	}

	@action login (token) {
	  //invariant(!this.isAuthenticating, 'Cannot login while authenticating.')
	  //invariant(!this.isAuthenticated, 'Cannot login while authenticated.')

	  // more code above, here is the relevant setting of token
	
		if(token){
			this.isAuthenticating = true;
			this.token = token;
			this._save().then(() => {
				this.isAuthenticating = false;
			});
		}
	}
  
	@action logout () {
	  //invariant(!this.isAuthenticating, 'Cannot logout while authenticating.')
	  //invariant(this.isAuthenticated, 'Cannot logout while not authenticated.')
  
	  this.token = null
	  this._clear();
	}
}