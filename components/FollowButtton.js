import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { inject } from "mobx-react";
import theme from '../constants/Theme';

import { apiConnector } from "../navigation/Connectors";

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
        const follower = this.props.follower ? this.props.follower : "me";
        const { following } = this.props;

        this.props.Api.isFollowing(follower, following)
            .then((response) => {
                this.setState({
                    checked: true,
                    follow: response.status === 404
                });
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    }

    onPress() {
        const promise = this.state.follow ?
            this.props.Api.follow(this.props.following) :
            this.props.Api.unfollow(this.props.following);

        promise
            .then((response) => {
                if (response.data && response.data.success) {
                    const state = this.state;
                    state.follow = !state.follow;
                    this.setState(state);
                }
            })
            .catch((err) => console.log(err));
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