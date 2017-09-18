import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class ReviewStore {
	@observable coffee = "";
	@observable user = "";
	@observable comment = "";	
	@observable rating = "";
	@observable url = "";

	@action data(data: Object) {
		if (data.coffee) {
			this.coffee = data.coffee;
		}
		if (data.user) {
			this.user = data.user;
		}
		if (data.comment) {
			this.comment = data.comment;
		}		
		if (data.comment) {
			this.comment = data.comment;
		}
		if (data.url) {
			this.url = data.url;
		}
	}
}