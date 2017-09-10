import React from "react";
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

import { Icon } from "@expo/vector-icons";
import LogOut from "../components/LogOut";
import FollowButtom from "../components/FollowButtton";
import theme from "../constants/Theme";
import api from "../api";

const ReviewItem = ({ review }) => {
	console.log(`Review => ${JSON.stringify(review)}`);
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
@observer
class ProfileScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			followers: [],
			following: [],
			avatar: ApiUtils.getAvatarUrl(this.props.owner || "me", "m"),
			reviews: [],
			userProfile: {}
		};
	}

	static navigationOptions = {
		title: "Profile",
	};

	componentDidMount() {
		this.props.Api.getProfile(this.props.owner || "me")
			.then((response) => {
				const userProfile = response.data;
				const state = this.state || {};
				state.userProfile = userProfile;
				this.setState(state);
			})
			.catch((err) => {
				console.error(err);
			});

		this.props.Api.getFollowersForUser(this.props.owner || "me")
			.then((response) => {
				const followers = response.data;
				const state = this.state || {};
				state.followers = followers;
				this.setState(state);
			})
			.catch((err) => {
				console.log(err);
			});

		this.props.Api.getFollowingForUser(this.props.owner || "me")
			.then((response) => {
				const following = response.data;
				const state = this.state || {};
				state.following = following;
				this.setState(state);
			})
			.catch((err) => { });

		this.props.Api.getReviewsForUser(this.props.owner || "me")
			.then((response) => {
				const reviews = response.data;
				console.log(JSON.stringify(reviews));
				const state = this.state || {};
				state.reviews = reviews;
				this.setState(state);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		console.log(this.state.avatar);
		return (
			<Container style={{ backgroundColor: "white" }}>
				<Grid>
					<Row style={{ alignItems: "center" }} size={1}>
						<Image style={theme.avatarImage} source={{
							uri: this.state.avatar ? this.state.avatar : require("../assets/images/avatar.png")
						}} />
						<View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
							<Text style={[theme.platoCoinText]}>{this.state.userProfile.fullname}</Text>
							<Text style={[theme.platoCoinText, { fontSize: 12, fontStyle: "normal" }]}>SPS, Honduras</Text>
						</View>
					</Row>

					<Row style={{ paddingHorizontal: 5, height: 70 }}>
						{
							!this.props.owner ?   < LogOut /> : <FollowButtom follower={"me"} following={this.props.owner} />
						}
					</Row>

					<Row style={{ height: 50 }}>
						<Col style={styles.container}>
							<Text style={styles.text}>{this.state.followers.length}</Text>
							<Text style={styles.subText}>Followers</Text>
						</Col>
						<Col style={styles.container}>
							<Text style={styles.text}>{this.state.following.length}</Text>
							<Text style={styles.subText}>Following</Text>
						</Col>
						<Col style={styles.container}>
							<Text style={styles.text}>10</Text>
							<Text style={styles.subText}>Reviews</Text>
						</Col>
					</Row>
					<Row size={2}>
						<List
							dataArray={this.state.reviews}
							style={{ flex: 1 }}
							renderRow={(review) => <ReviewItem review={review} />}>
							<ListItem itemHeader first>
								<Text>Recent Reviews</Text>
							</ListItem>
						</List>
					</Row>
				</Grid>
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