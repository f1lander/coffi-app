import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Alert, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, KeepAwake } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'mobx-react';
import { Root } from "native-base";

import RootNavigation from './navigation/RootNavigation';
import AppRoot from './navigation/AppRoot';
import LoginScreen from './screens/LoginScreen';
import theme from './constants/Theme';
import stores from "./store";

import { Text } from 'react-native';

export default class App extends React.Component {
	state = {
		assetsAreLoaded: false,
	};

	componentWillMount() {
		this._loadAssetsAsync();
	}

	render() {
		if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen) {
			return <AppLoading />;
		} else {
			return (
				<Provider {...stores}>
					<Root>
						<View style={theme.container}>
							<KeepAwake />
							{Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
							{Platform.OS === 'android' &&
							<View style={theme.statusBarUnderlay} />}
							<AppRoot/>
						</View>
					</Root>
				</Provider>
			);
		}
	}

	async _loadAssetsAsync() {
		try {
			await Promise.all([
				Asset.loadAsync([
					require('./assets/images/bg.jpg'),
					
					require('./assets/images/facebook.png'),
					require('./assets/images/whatsapp.png'),
					require('./assets/images/coin.png'),
					
					require('./assets/images/not.png'),
					require('./assets/images/off.png'),
					require('./assets/images/save.png'),
					require('./assets/images/reserva.png'),

					require('./assets/images/avatar.png'),
					require('./assets/images/color/user.png'),
					require('./assets/images/color/email.png'),
					require('./assets/images/color/phone.png'),
					require('./assets/images/color/place.png')
				]),
				Font.loadAsync([
					Ionicons.font,
					{ 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
					{ 'annie': require('./assets/fonts/Aniie.ttf') },
					{ 'ticket': require('./assets/fonts/Ticketing.ttf') },
					{ 'nunito-semi-bold': require('./assets/fonts/Nunito-SemiBold.ttf') },
					{ 'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf') },
					{ 'nunito-light': require('./assets/fonts/Nunito-Light.ttf') },
					{ 'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf') },
				]),
			]);
		} catch (e) {
			console.warn(
				'There was an error caching assets (see: App.js), perhaps due to a ' +
				'network timeout, so we skipped caching. Reload the app to try again.'
			);
			console.log(e);
		} finally {
			console.log('loaded');
			this.setState({ assetsAreLoaded: true });
		}
	}
}
