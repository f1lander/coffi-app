import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class UserStore {
    @observable users = {};
    @observable following = [];
    @observable followers = [];

	@action updateFollowers(users) {
        this.followers = users.map (u => {
            this.users[u.id] = u;
            return u.id;
        });
	}

	@action updateFollowing(users){
        this.following = users.map (u => {
            this.users[u.id] = u;
            return u.id;
        });
	}
}