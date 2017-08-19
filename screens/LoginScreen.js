import React from 'react';
import {
	Alert,
	Image,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { MonoText, AnnieText } from '../components/StyledText';
import { WebBrowser, Constants, Facebook } from 'expo';
import { observer, inject } from "mobx-react";
import { Toast } from "native-base";

import {
	StackNavigator,
} from 'react-navigation';


import { apiConnector }  from '../navigation/Connectors';

import AppIntro from 'react-native-app-intro';
import theme from '../constants/Theme';

@inject("authenticationStore")
class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<Login {...this.props}/>
		);
	}
}

@inject("authenticationStore")
@observer
class Login extends React.Component {

	async onPressLoginWithFb() {
		try {
			const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
				'113119379370031', { permissions: ['public_profile', 'email'] }
			);

			switch (type) {
				case 'success': {
					const fbResponse = await fetch(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${token}`);
					const profile = await fbResponse.json();
					const response = await this.props.Api.loginWithFacebook(token);
					console.log(response);
					if(response.ok){
						Alert.alert(
							'Logged in!',
							`Hi! ${profile.name}`,
						);
					}
					break;
				}
				case 'cancel': {
					Alert.alert(
						'Cancelled!',
						'Login was cancelled!',
					);
					break;
				}
				default: {
					Alert.alert(
						'Oops!',
						'Login failed!',
					);
				}
			}
		} catch (e) {
			Alert.alert(
				'Oops!',
				'Login failed!',
			);
			console.warn(e);
		}
	}

	render() {
		if (this.props.authenticationStore.status == 'first_time')
			return (
				<AppIntro onDoneBtnClick={() => this.props.auhenticationStore.doneIntro()} doneBtnLabel="Listo" skipBtnLabel="">
					<View style={[theme.welcomeSlide]}>
						<Image level={-10} source={require('../assets/images/benbenuto.png')} style={theme.welcomeImage} />
						<View level={5}><Text style={theme.text}>¡Bienvenido!</Text></View>
						<View level={20}><Text style={theme.subtext}>Coffii</Text></View>
					</View>
					<View style={[theme.welcomeSlide]}>
						<Image level={-10} source={require('../assets/images/good-review.png')} style={theme.welcomeImage} />
						<View level={5}><Text style={theme.text}>Reviews</Text></View>
						<View level={20}><Text style={theme.subtext}>¿Como elegir un buen cafe? De eso no te preocupes, todos los días la comunidad está haciendo reviews</Text></View>
					</View>
					<View style={[theme.welcomeSlide]}>
						<Image level={-10} source={require('../assets/images/coffee.png')} style={theme.welcomeImage} />
						<View level={5}><Text style={theme.text}>Busca, Compra y Disfruta</Text></View>
						<View level={20}><Text style={theme.subtext}>No te preocupes, encuentra los cafes mas votados por la comunidad.</Text></View>
					</View>
				</AppIntro>
			);

		return (
			<View style={theme.view}>
				<View style={theme.dayView}>
					<Image style={theme.dayImage} source={require('../assets/images/bg.jpg')}>
						<Image source={require('../assets/images/logo-c2.png')} style={theme.dayImageIcon} />
						<AnnieText style={theme.dayWelcome}>Bienvenido!</AnnieText>
						<TouchableOpacity onPress={this.onPressLoginWithFb.bind(this) } style={{ height: 46, marginTop: 14 }}>
							<View style={theme.btnWrap}>
								<Image source={require('../assets/images/facebook.png')} style={theme.btnImage} />
								<Text style={[theme.platoCoinText, { fontSize: 14 }]}>INICIAR SESION</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._handlePressRegister.bind(this)} style={{ height: 46, marginTop: 14 }}>
							<View style={theme.btnWrap}>
								<Text style={[theme.platoCoinText, { fontSize: 14 }]}>Registrarse</Text>
							</View>
						</TouchableOpacity>
					</Image>
				</View>
			</View>
		);
	}

	_handlePressRegister = () => {
		this.props.navigation.navigate('Register');
	}

}

export default apiConnector(LoginScreen);
