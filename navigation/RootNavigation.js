import React from 'react';
import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
	{
		Main: {
			screen: MainTabNavigator,
			path: '/tabs'
		}
		
	},
	{
		navigationOptions: () => ({
			headerStyle: {
				backgroundColor: Colors.tintColor,
				borderBottomColor: 'rgba(0,0,0,0.1)'
			},
			headerTitleStyle: {
				fontWeight: 'normal',
				backgroundColor: Colors.tintColor,
				fontFamily: 'annie',
				color: '#fff'
			},
			headerBackTitleStyle: {
				fontWeight: 'normal',
				backgroundColor: Colors.tintColor,
				fontFamily: 'annie',
				color: '#fff',
				paddingRight: 15,
				paddingLeft: 15,
			},
			headerTintColor: '#fff'
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
		return <RootStackNavigator />;
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
