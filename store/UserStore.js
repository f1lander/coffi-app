import { AsyncStorage } from 'react-native';
import { observable, action, computed } from "mobx";

export default class UserStore {

    @observable currentObservedUser = {};
    @observable users = {};
    @observable following = [];
    @observable followers = [];

    @action updateFollowers(users) {
        this.followers = users.map(u => {
            this.users[u.id] = u;
            return u.id;
        });
    }

    @action updateFollowing(users) {
        console.log(JSON.stringify(users));
        this.following = users.map(u => {
            this.users[u.id] = u;
            return u.id;
        });
    }

    @action addFollowing(userToAdd) {
        if (this.following.indexOf(userToAdd.id) === -1) {
            this.following.push(userToAdd.id);
        }

        this.users[userToAdd.id] = userToAdd;
    }

    @action addFollower(userToAdd) {
        if (this.followers.indexOf(userToAdd.id) === -1) {
            this.followers.push(userToAdd.id);
        }

        this.users[userToAdd.id] = userToAdd;
    }

    @action removeFollowing(user) {
        const userId = user.id;

        this.following = this.following.filter((id) => id !== userId);

        if (this.followers.indexOf(user.id) === -1) {
            delete this.users[user.id];
        }
    }

    @action removeFollower(userToRemove) {
        const { id } = userToRemove;

        this.followers = this.followers.filter((id) => id !== userToRemove);

        if (this.following.indexOf(userToRemove) === -1) {
            delete this.users[userToRemove];
        }
    }

    @action setCurrentUser(user) {
        console.log("Setting the user");
        this.currentObservedUser.id = user.id;
        this.currentObservedUser.fullname = user.fullname;
        this.currentObservedUser.username = user.username;
    }
}