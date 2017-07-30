import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { inject } from "mobx-react";
import theme from '../constants/Theme';

@inject("userStore")
export default class LogOut extends React.Component {
	render (){
		return (
			<TouchableOpacity onPress={() => this.props.userStore.logOut()} style={{marginTop:10}}>
				<View style={theme.btnWrap}>
					<Image source={require('../assets/images/off.png')} style={theme.btnImage}/>
					<Text style={theme.btnText}>CERRAR SESION</Text>
				</View>
			</TouchableOpacity>
		);
	}
}