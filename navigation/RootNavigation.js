import React from 'react';
import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import MainTabNavigator from './MainTabNavigator';
import ProfileScreen from "../screens/ProfileScreen";
import CoffeeScreen from '../screens/CoffeeScreen';
import CoffeeRequestScreen from "../screens/CoffeeRequestScreen";
import SettingsScreen from "../screens/SettingsScreen";
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
	{
		Main: {
			screen: MainTabNavigator,
			path: '/tabs'
		},
		Coffee: {
			screen: CoffeeScreen
		},
		CoffeeRequest: {
			screen: CoffeeRequestScreen,
		},
		UserProfile: {
			screen: ProfileScreen,
		},
		SettingsProfile: {
			screen: SettingsScreen
		}
	},
	{
		navigationOptions: () => ({
			headerStyle: {
				backgroundColor: Colors.tintColor,
				borderBottomColor: 'transparent'
			},
			headerTitleStyle: {
				fontWeight: 'normal',
				backgroundColor: 'transparent',
				fontFamily: 'nunito-black',
				color: Colors.tabIconDefault
			},
			headerBackTitle: null,
			// headerBackTitleStyle: {
			// 	fontWeight: 'normal',
			// 	backgroundColor: Colors.secondary,
			// 	fontFamily: 'nunito-black',
			// 	color: Colors.primary,
			// 	paddingRight: 15,
			// 	paddingLeft: 15,
			// },
			headerTintColor: Colors.primary
		}),
	}
);

export default class RootNavigator extends React.Component {
	componentDidMount() {
		this._notificationSubscription = this._registerForPushNotifications();
	}

	componentWillUnmount() {
		this._notificationSubscription && this._notificationSubscription.remove();
	}

	render() {
		return <RootStackNavigator {...this.props} />;
	}

	_registerForPushNotifications() {
		// Send our push token over to our backend so we can receive notifications
		// You can comment the following line out if you want to stop receiving
		// a notification every time you open the app. Check out the source
		// for this function in api/registerForPushNotificationsAsync.js
		registerForPushNotificationsAsync();

		// Watch for incoming notifications
		this._notificationSubscription = Notifications.addListener(
			this._handleNotification
		);
	}

	_handleNotification = ({ origin, data }) => {
		console.log(
			`Push notification ${origin} with data: ${JSON.stringify(data)}`
		);
	};
}
