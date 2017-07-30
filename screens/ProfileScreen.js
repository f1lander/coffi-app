import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import { MonoText, AnnieText } from '../components/StyledText';
import { inject } from "mobx-react";
import { Toast, Form, Item, Input, Button, Picker } from "native-base";
import { Icon } from '@expo/vector-icons';
import LogOut from '../components/LogOut';
import theme from '../constants/Theme';
import api from '../api';

@inject("userStore")
export default class MiCuentaScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			places: [],
			user: this.props.userStore
		};
	}


	static navigationOptions = {
		title: 'Mi Cuenta',
	};

	componentWillMount(){
		api.get('/places').then((response)=>{
			if(response.problem)
				Toast.show({
					text: 'Error en la conexión ('+ response.problem +')',
					position: 'bottom',
					type: 'warning',
					duration: 5000
				});
			else
				this.setState({ places: response.data });
		});
	}

	handleValueChange(isValid, values, validationResults, postSubmit = null, modalNavigator = null){
		if(isValid === true){
			api.get('/profile/'+this.props.userStore.userid, values).then((response)=>{
				if(response.problem){
					Toast.show({
						text: 'Error en la conexión ('+ response.problem +')',
						position: 'bottom',
						type: 'warning',
						duration: 5000
					});

					postSubmit();
				}else{
					Toast.show({
						text: 'Se guardo el perfil con exito!',
						position: 'bottom',
						type: 'success',
						duration: 5000
					});

					postSubmit();
				}
			});
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
					<Image style={theme.avatarImage} source={this.props.userStore.avatar ? {uri: this.props.userStore.avatar} : require('../assets/images/avatar.png')} />
					<View style={{justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', flex: 1}}>
						<Image source={require('../assets/images/coin.png')} style={{ width: 40, height: 40 }}/>
						<Text style={theme.platoCoinText}> L.{this.props.userStore.credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
					</View>
					<TouchableOpacity>
						<View style={{ backgroundColor:'#FFCE60', marginLeft: 10, marginRight: 10, padding: 8, paddingLeft: 14, paddingRight: 14, borderRadius: 18 }}>
							<Text style={{ color: '#F77B5A', fontWeight: 'bold', borderRadius: 18 }}>COMPRAR</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View>
					<Form>
						<Item>
							<Image source={require('../assets/images/color/user.png')} style={theme.formImage}/>
							<Input placeholder="Nombre" defaultValue={this.state.user.name}/>
						</Item>
						<Item>
							<Image source={require('../assets/images/color/email.png')} style={theme.formImage}/>
							<Input placeholder="Correo Electrónico" defaultValue={this.state.user.email}/>
						</Item>
						<Item>
							<Image source={require('../assets/images/color/phone.png')} style={theme.formImage}/>
							<Input placeholder="Telefono" defaultValue={this.state.user.phone}/>
						</Item>
						<Item>
							<Image source={require('../assets/images/color/place.png')} style={theme.formImage}/>
							<Picker
								iosHeader="Lugar de entrega"
								selectedValue={this.state.user.place}
								onValueChange={(value) => this.setState({ user : { ...this.state.user, place: value } })}
								mode="dropdown" 
								style={{paddingLeft: 5}}>
								{this.state.places.map((item, key)=>{
									return(
										<Picker.Item label={item.nombre} value={item.id} key={key}/>
									);
								})}
							</Picker>
						</Item>

						<View style={{margin:10, marginTop: 20}}>
							<TouchableOpacity>
								<View style={theme.btnWrap}>
									<Image source={require('../assets/images/save.png')} style={theme.btnImage}/>
									<Text style={theme.btnText}>GUARDAR</Text>
								</View>
							</TouchableOpacity>

							<LogOut />
						</View>

					</Form>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#fff',
	}
});
