import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, AsyncStorage } from "react-native";

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

const ReviewItem = ({ review }) => {
	return (
		<ListItem key={review.id}>
			<Card>
				<CardItem style={{ flexDirection: "row", flex: 1 }}>
					<Image style={[theme.avatarImage, { width: 70, height: 70 }]} source={require("../assets/images/avatar.png")} />
					<View>
						<Text>{review.coffee.brand.name}</Text>
						<Text>{review.method ? review.method.name : ""}</Text>
					</View>
				</CardItem>

				<CardItem footer style={{ flex: 1 }}>
					<Text style={{ flex: 1 }}>{moment(review.updatedAt).fromNow()}</Text>
					<Stars
						style={{ alignSelf: "flex-end" }}
						half={true}
						disabled={true}
						value={review.rating}
						spacing={4}
						starSize={20}
						count={5}
						{...StarsAssets.smallCoffeeBeans} />
				</CardItem>
			</Card>
		</ListItem>
	);
};

@inject("authenticationStore")
@inject("userStore")
@observer
class ProfileScreen extends Component {

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
		title: "PROFILE",
		header: null
	};

	componentDidMount() {
		this.props.Api.getProfile(this.state.owner)
			.then((response) => {
				console.log("FINISHED GETTING PROFILE");
				const userProfile = response.data;
				this.props.userStore.setCurrentUser(userProfile);

				const state = this.state;
				state.userProfile = userProfile;
				console.log(`OWNER => ${JSON.stringify(this.state.userProfile)}`);
				this.setState(state);
			})
			.catch((err) => console.error(err));

		this.props.Api.getFollowersForUser(this.state.owner)
			.then((response) => {
				const followers = response.data;
				const state = this.state || {};
				state.followers = followers;
				this.setState(state);
			})
			.catch((err) => console.error(err));

		this.props.Api.getFollowingForUser(this.state.owner)
			.then((response) => {
				const following = response.data;
				const state = this.state;
				state.following = following;
				this.setState(state);
			})
			.catch((err) => console.error(err));

		this.props.Api.getReviewsForUser(this.state.owner)
			.then((response) => {
				const reviews = response.data;
				const state = this.state || {};
				state.reviews = reviews;
				this.setState(state);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	showButtonsIfReady() {
		if (this.state.owner === "me") {
			return (<LogOut />);
		} else if (this.state.userProfile.id) {
			return (<FollowButton />);
		}

		return null;
	}

	navigate() {
		const { navigate } = this.props.navigation;
		navigate("SettingsProfile");
	}

	render() {
		return (
			<Container style={theme.containerProfile}>

				<View style={theme.headingProfile}>
					<View style={theme.headingTitleBox}>
						<Text style={theme.headingTitle}>Filander</Text>
						<Text style={theme.headingSubtTitle}>Edit your profile</Text>
					</View>
					<View style={theme.avatarView}>
						<Image style={theme.avatarImage} source={require("../assets/images/avatar.png")} />
					</View>
				</View>
				<View style={theme.bodyProfile}>
					<Content>
						<List>
							<ListItem onPress={()=> this.navigate() } style={{height:75}} icon>
								<Left>
									<Icon name="ios-settings-outline" />
								</Left>
								<Body>
									<Text style={theme.bodyListItem}>Settings</Text>
								</Body>
							</ListItem>
							<ListItem style={{height:75}} icon>
								<Left>
									<Icon name="ios-cafe-outline" />
								</Left>
								<Body>
									<Text style={theme.bodyListItem}>Become a Coffiitributor</Text>
								</Body>
							</ListItem>
							<ListItem style={{height:75}} onPress={() => this.showAlert()} icon>
								<Left>
									<Icon name="ios-star-outline" />
								</Left>
								<Body>
									<Text style={theme.bodyListItem}>Give us feedback</Text>
								</Body>
							</ListItem>
							<ListItem style={{height:75}} icon>
								<Left>
									<Icon name="ios-help-buoy-outline" />
								</Left>
								<Body>
									<Text style={theme.bodyListItem}>Help</Text>
								</Body>
							</ListItem>
						</List>
					</Content>
				</View>

			</Container >
		);
	}
}

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



export default apiConnector(ProfileScreen);