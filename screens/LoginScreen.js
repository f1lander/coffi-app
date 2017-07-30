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
export default class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	_handleFacebookLogin = async () => {
		try {
			const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
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
		}
	};

	render() {
		return (
			<Login />
		);
	}
}

@inject("userStore")
@observer
class Login extends React.Component {
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
							<TouchableOpacity onPress={() => this._handleFacebookLogin() } style={{height: 46, marginTop: 14}}>
								<View style={theme.btnWrap}>
									<Image source={require('../assets/images/facebook.png')} style={theme.btnImage}/>
									<Text style={[theme.platoCoinText, {fontSize: 14}]}>INICIAR SESION</Text>
								</View>
							</TouchableOpacity>
						</Image>
					</View>
				</View>
			);
		if(this.props.userStore.status == 'first_time')
			return (
				<AppIntro onDoneBtnClick={() => this.props.userStore.doneIntro()} doneBtnLabel="Listo" skipBtnLabel="">
					<View style={[theme.welcomeSlide]}>
						<Image level={-10} source={require('../assets/images/benbenuto.png')} style={theme.welcomeImage}/>
						<View level={5}><Text style={theme.text}>¡Bienvenido!</Text></View>
						<View level={20}><Text style={theme.subtext}>Coffii</Text></View>
					</View>
					<View style={[theme.welcomeSlide]}>
						<Image level={-10} source={require('../assets/images/good-review.png')} style={theme.welcomeImage}/>
						<View level={5}><Text style={theme.text}>Reviews</Text></View>
						<View level={20}><Text style={theme.subtext}>¿Como elegir un buen cafe? De eso no te preocupes, todos los días la comunidad está haciendo reviews</Text></View>
					</View>
					<View style={[theme.welcomeSlide]}>
						<Image level={-10} source={require('../assets/images/coffee.png')} style={theme.welcomeImage}/>
						<View level={5}><Text style={theme.text}>Busca, Compra y Disfruta</Text></View>
						<View level={20}><Text style={theme.subtext}>No te preocupes, encuentra los cafes mas votados por la comunidad.</Text></View>
					</View>
				</AppIntro>
			);
	}
}

