import React from 'react';
import { Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import { Text } from 'react-native';

const LoginStackNavigator = StackNavigator(
	{
		Login: {
			screen: LoginScreen,
        },
        
        Register:{
            screen: RegisterScreen,
        }        		
	}
);

export default class LoginNavigation extends React.Component {
	render() {
		return <LoginStackNavigator {...this.props}/>;
	}
}