import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class CoffeeStore {
	@observable name = "";
	@observable picture = "";
	@observable description = "";	
	@observable precio = "";
	@observable url = "";

	@action data(data: Object) {
		if (data.nombre) {
			this.name = data.name;
		}
		if (data.picture) {
			this.picture = data.picture;
		}
		if (data.description) {
			this.description = data.description;
		}		
		if (data.price) {
			this.price = data.price;
		}
		if (data.url) {
			this.url = data.url;
		}
	}
}