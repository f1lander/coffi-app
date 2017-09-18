import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { inject } from "mobx-react";
import theme from '../constants/Theme';

@inject("authenticationStore")
export default class LogOut extends React.Component {
	render() {
		return (
			<TouchableOpacity onPress={() => this.props.authenticationStore.logout()} style={{ flex: 1, height: 50 }}>
				<View style={[theme.btnWrap, { flex: 1 }]}>
					<Image source={require('../assets/images/off.png')} style={theme.btnImage} />
					<Text style={theme.btnText}>LOGOUT</Text>
				</View>
			</TouchableOpacity>
		);
	}
}