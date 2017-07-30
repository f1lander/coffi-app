import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class UserStore {
	// logged_out | logged_in | first_time
	@observable status = 'logged_out';

	@observable userid = 1;
	@observable name = "Ivan Suazo";
	@observable email = "joshepw@gmail.com";
	@observable phone = "+(504) 9999-9999";
	@observable place = 0;

	@observable avatar = "";
	@observable credit = 0;

	constructor(){
		AsyncStorage.multiGet([
			'status', 
			'userid', 
			'name', 
			'email', 
			'picture', 
			'credit',
			'phone',
			'place'
		]).then((data) => {

			let userData = {
				status : data[0][1],
				userid : data[1][1],
				name   : data[2][1],
				email  : data[3][1],
				avatar : data[4][1],
				credit : data[5][1],
				phone  : data[6][1],
				place  : data[7][1]
			};

			if (userData.status)
				this.status = userData.status;

			if (userData.userid)
				this.userid = userData.userid;

			if (userData.name)
				this.name = userData.name;

			if (userData.email)
				this.email = userData.email;

			if (userData.phone)
				this.phone = userData.phone;

			if (userData.avatar)
				this.avatar = userData.avatar;

			if (userData.credit)
				this.credit = userData.credit;

			if (userData.place)
				this.place = userData.place;
		});
	}

	@action logIn() {
		this.status = 'logged_in';
	}

	@action logOut() {
		this.status = 'logged_out';
	}

	@action doneIntro() {
		this.status = 'logged_in';
	}

	@action initIntro() {
		this.status = 'first_time';
	}

	@action data(data: Object) {
		if (data.name)
			this.name = data.name;

		if (data.userid)
			this.userid = data.userid;

		if (data.email)
			this.email = data.email;

		if (data.avatar)
			this.avatar = data.avatar;

		if (data.credit)
			this.credit = data.credit;

		if (data.phone)
			this.phone = data.phone;
		
		if (data.place)
			this.place = data.place;
	}
}