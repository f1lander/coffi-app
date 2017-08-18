import React from 'react';
import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import { LoginScreen, RegisterScreen } from '../screens'
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const LoginStackNavigator = StackNavigator(
	{
		Login: {
			screen: LoginScreen,
			path: '/login'
        },
        
        Register:{
            screen: RegisterScreen,
            path:'/register'
        }        		
	}

);

export default class LoginNavigator extends React.Component {
	componentDidMount() {
		this._notificationSubscription = this._registerForPushNotifications();
	}

	componentWillUnmount() {
		this._notificationSubscription && this._notificationSubscription.remove();
	}

	render() {
		return <LoginStackNavigator />;
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
