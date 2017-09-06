import { BASE_URL } from './index'

export default {
    getAvatarUrl: (id, size='small') => {
        let url = `${BASE_URL}/users/${id}/avatar?s=${size}`;
        console.log(url);
        return url;
    }
}