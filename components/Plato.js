import React, { Component } from 'react';
import { inject } from "mobx-react";
import { Text, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import theme from '../constants/Theme';

@inject("platoStore")
export default class PlatoDelDia extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	_handleOpenDetails(){
		this.props.platoStore.data(this.props.data);
		this.props.navigation.navigate('Detalles');
	}

	render() {
		return (
			<TouchableOpacity onPress={()=> this._handleOpenDetails()} style={theme.platoView}>
				{this.props.data.picture ? 
					<Image style={theme.platoImage} source={{uri: this.props.data.picture}}/> : 
					<Image style={theme.platoImage} source={require('../assets/images/not.png')}/>}
				<Text style={theme.platoTitle}>{this.props.data.nombre}</Text>
			</TouchableOpacity>
		);
	}
}