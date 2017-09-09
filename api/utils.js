import { BASE_URL } from './index'

export default {
    getAvatarUrl: (id, size='small') => {
        let url = `${BASE_URL}/users/${id}/avatar?s=${size}`;
        return url;
    },

    getCoffeeImageUrl: (id, size='small') => {
        let url = `${BASE_URL}/coffees/${id}/thumbnail?s=${size}`;
        console.log(url);
        return url;
    }
}