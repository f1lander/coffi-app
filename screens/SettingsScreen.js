import React from "react";
import { ScrollView, Platform, StyleSheet, View, Image, TouchableOpacity, AsyncStorage } from "react-native";

import { MonoText, AnnieText } from "../components/StyledText";

import { apiConnector } from "../navigation/Connectors";

import moment from "moment";

import Stars from 'react-native-stars';

import StarsAssets from '../assets/images/stars';

import ApiUtils from "../api/utils";

import {
	Toast,
	Form,
	Item,
	Input,
	Button,
	Picker,
	Content,
	Container,
	Text,
	List,
	Left,
	Right,
	Body,
	Icon,
	Switch,
	ListItem,
	Card,
	CardItem
} from "native-base";

import {
	Grid,
	Col,
	Row,
} from "react-native-easy-grid";

import { observer, inject } from "mobx-react";

//import { Icon } from "@expo/vector-icons";
import LogOut from "../components/LogOut";
import FollowButton from "../components/FollowButtton";
import theme from "../constants/Theme";
import api from "../api";

@inject("authenticationStore")
@inject("userStore")
@observer
class SettingsProfile extends React.Component {

	constructor(props) {
		super(props);

		let owner = "me";
		if (this.props.navigation
			&& this.props.navigation.state
			&& this.props.navigation.state.params
			&& this.props.navigation.state.params.owner) {

			owner = this.props.navigation.state.params.owner
		}

		this.state = {
			followers: [],
			following: [],
			avatar: ApiUtils.getAvatarUrl(owner, "m"),
			reviews: [],
			userProfile: {},
			owner,
		};
	}

	static navigationOptions = {
		title: Platform.OS !== 'ios' ? 'Settings' : "",
		headerBackTitle: null,

	};

	componentDidMount() {

	}

	showButtonsIfReady() {
		if (this.state.owner === "me") {
			return (<LogOut />);
		} else if (this.state.userProfile.id) {
			return (<FollowButton />);
		}

		return null;
	}

	showAlert() {
		console.log('hola');
	}

	render() {
		return (
			<Container style={theme.containerProfile}>
				{
					Platform.OS === 'ios' ?
						(

							<View style={theme.headingSettings}>
								<Text style={theme.headingSettingsTitle}>Settings</Text>
							</View>
						)
						: null
				}
				<View style={theme.bodyProfile}>
					<Content>
						<List>
							<ListItem style={{ height: 75 }} icon>

								<Body>
									<Text style={theme.bodyListItem}>Terms of Services</Text>
								</Body>

							</ListItem>
							<ListItem style={{ height: 75 }} icon>

								<Body>
									<Text style={theme.bodyListItem}>Privacy</Text>
								</Body>

							</ListItem>
							<ListItem style={{ height: 75 }} icon>

								<Body>
									<Text style={theme.bodyListItem}>Notifications</Text>
								</Body>

							</ListItem>
							<ListItem onPress={() => this.props.authenticationStore.logout()} style={{ height: 75 }} icon>

								<Body>
									<Text style={theme.bodyListItem}>Log out</Text>
								</Body>

							</ListItem>
						</List>
					</Content>
				</View>

			</Container >
		);
	}
}
<div id="currentTarget">
	<span id="target">
		Target
  </span>
</div>
const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		backgroundColor: 'lightgrey',
		borderWidth: StyleSheet.hairlineWidth,
	},

	text: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18
	},
	subText: {
		textAlign: "center",
		fontSize: 12
	}
});



export default apiConnector(SettingsProfile);