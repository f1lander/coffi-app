import {create} from 'apisauce';

const BASE_URL = 'http://localhost:3000/api/v1';

const api = create({
	baseURL: BASE_URL
});

module.exports = api;