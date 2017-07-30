import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class PlatoStore {
	@observable nombre = "";
	@observable picture = "";
	@observable descripcion = "";
	@observable complementos = "";
	@observable precio = "";
	@observable url = "";

	@action data(data: Object) {
		if (data.nombre) {
			this.nombre = data.nombre;
		}
		if (data.picture) {
			this.picture = data.picture;
		}
		if (data.descripcion) {
			this.descripcion = data.descripcion;
		}
		if (data.complementos) {
			this.complementos = data.complementos;
		}
		if (data.precio) {
			this.precio = data.precio;
		}
		if (data.url) {
			this.url = data.url;
		}
	}
}