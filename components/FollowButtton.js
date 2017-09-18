import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import theme from '../constants/Theme';

import { observer, inject } from "mobx-react";
import { observe } from "mobx";

import { apiConnector } from "../navigation/Connectors";

@inject("userStore")
@observer
class FollowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: false,
            checked: false,
        };

        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        console.log("CALLING COMPONENTDIDMOUNT ON FOLLOW BUTTON");
        const disposer = observe(this.props.userStore.currentObservedUser, (change) => {
            console.log("Se cambió");
            this.getFollowingState();
        });

        if (this.props.userStore.currentObservedUser.id) {
            this.getFollowingState();
        }
    }

    getFollowingState() {
        const following = this.props.userStore.currentObservedUser;
        this.props.Api.isFollowing("me", following.id)
            .then((response) => {
                this.setState({
                    checked: true,
                    follow: response.status === 404
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onPress() {
        const promise = this.state.follow ?
            this.props.Api.follow(this.props.userStore.currentObservedUser.id) :
            this.props.Api.unfollow(this.props.userStore.currentObservedUser.id);

        promise
            .then((response) => {
                if (response.data && response.data.success) {
                    const state = this.state;

                    if (!state.follow) {
                        this.props.userStore.removeFollowing(this.props.userStore.currentObservedUser);
                    } else {
                        this.props.userStore.addFollowing(this.props.userStore.currentObservedUser);
                    }

                    state.follow = !state.follow;
                    this.setState(state);
                }
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {!this.state.checked ? null :
                    <TouchableOpacity onPress={this.onPress} style={{ flex: 1, height: 50 }}>
                        <View style={[theme.btnWrap, { flex: 1 }]}>
                            <Text style={theme.btnText}>{this.state.follow ? "Follow" : "Unfollow"}</Text>
                        </View>
                    </TouchableOpacity>}
            </View>
        );
    }
}

export default apiConnector(FollowButton);