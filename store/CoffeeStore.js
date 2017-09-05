import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

const defaultData = {
	rating: 0,
	reviews: [],
	personalReviews: [],
}

export default class CoffeeStore {
	@observable coffees = {};

	@action addCoffee(coffee) {
		let coffeeId = coffee.id;
		if(coffeeId){
			this.coffees[coffeeId] = {...defaultData, ...coffee}; 
		}
	}

	@action updateCoffee(coffeeId, newData){
		var data = this.coffees[coffeeId] || {id: coffeeId};
		this.coffees[coffeeId] = {...defaultData, ...data, ...newData};
	}
}