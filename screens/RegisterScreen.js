import React from 'react';
import {
	Image,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { MonoText, AnnieText } from '../components/StyledText';
import { WebBrowser, Constants, Facebook } from 'expo';
import { observer, inject } from "mobx-react";
import { Toast } from "native-base";


import AppIntro from 'react-native-app-intro';
import theme from '../constants/Theme';

import RootNavigation from '../navigation/RootNavigation';

@inject("userStore")
export default class RegisterScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	_handleFacebookRegister = async () => {
		try {
			const { type, token, expires } = await Facebook.RegisterWithReadPermissionsAsync(
				'1573625069363621', { permissions: ['public_profile','email'] }
			);

			switch (type) {
				case 'success': {
					const response = await fetch(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${token}`);
					const profile = await response.json();
					Alert.alert(
						'Logged in!',
						`Hi ${profile.name}!`,
					);
					console.log(expires);
					console.log(profile);
					break;
				}
				case 'cancel': {
					Alert.alert(
						'Cancelled!',
						'Register was cancelled!',
					);
					break;
				}
				default: {
					Alert.alert(
						'Oops!',
						'Register failed!',
					);
				}
			}
		} catch (e) {
			Alert.alert(
				'Oops!',
				'Register failed!',
			);
		}
	};

	render() {
		return (
			<Register />
		);
	}
}

@inject("userStore")
@observer
class Register extends React.Component {
	render() {
		if(this.props.userStore.status == 'logged_in')
			return  <RootNavigation />;

		if(this.props.userStore.status == 'logged_out')
			return (
				<View style={theme.view}>
					<View style={theme.dayView}>
						<Image style={theme.dayImage} source={require('../assets/images/bg.jpg')}>
							<Image source={require('../assets/images/logo-c2.png')} style={theme.dayImageIcon}/>
							<AnnieText style={theme.dayWelcome}>Bienvenido!</AnnieText>							
							<TouchableOpacity onPress={() => this.props.userStore.initIntro()} style={{height: 46, marginTop: 14}}>
								<View style={theme.btnWrap}>
									<Image source={require('../assets/images/facebook.png')} style={theme.btnImage}/>
									<Text style={[theme.platoCoinText, {fontSize: 14}]}>INICIAR SESION</Text>
								</View>
							</TouchableOpacity>
						</Image>
					</View>
				</View>
			);
	}
}

