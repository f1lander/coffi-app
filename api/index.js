import {create} from 'apisauce';

const BASE_URL = 'https://cofi-api.herokuapp.com/api';

const api = create({
	baseURL: BASE_URL
});

module.exports = api;