import React from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, AsyncStorage } from "react-native";

import { MonoText, AnnieText } from "../components/StyledText";

import { apiConnector } from "../navigation/Connectors";

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

import Stars from "react-native-stars";

import {
	Grid,
	Col,
	Row,
} from "react-native-easy-grid";

import { observer, inject } from "mobx-react";

import { Icon } from "@expo/vector-icons";
import LogOut from "../components/LogOut";
import theme from "../constants/Theme";
import api from "../api";

const fullStar = require("../assets/images/starFilled.png");
const halfStar = require("../assets/images/starHalf.png");
const emptyStar = require("../assets/images/starEmpty.png");

const ReviewItem = ({ review }) => {
	return (
		<ListItem>
			<Card>
				<CardItem style={{ flexDirection: "row", flex: 1 }}>
					<Image style={[theme.avatarImage, { width: 70, height: 70 }]} source={require("../assets/images/avatar.png")} />
					<View>
						<Text>{review.brand}</Text>
						<Text>{review.method}</Text>
					</View>
				</CardItem>
				{/* <CardItem style={{ flexDirection: "row", flex: 1, alignItems: "flex-end", justifyContent: "space-between", }}> */}
				<CardItem footer style={{ flex: 1 }}>
					<Text style={{ flex: 1 }}>Today</Text>
					<Stars
						style={{ alignSelf: "flex-end" }}
						half={true}
						value={review.score}
						spacing={4}
						starSize={20}
						count={5}
						fullStar={fullStar}
						emptyStar={emptyStar}
						halfStar={halfStar} />
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
			avatar: "",
			user: {
				reviews: [],
			}
		};

		AsyncStorage.getItem("@Coffii:userId")
			.then(userId => {
				console.log(`http://192.168.0.12:3000/api/users/${userId}/avatar?s=medium`);
				this.setState({ avatar: `http://192.168.0.12:3000/api/users/${userId}/avatar?s=medium`, user: this.state.user })
			});
	}

	static navigationOptions = {
		title: "Profile",
	};

	componentWillMount() {
	}

	componentDidMount() {
		this.props.Api.getProfile()
			.then((user) => {
				this.setState({ user, avatar: this.state.avatar });
			})
			.catch((err) => {
				// console.error(err);
			});
	}

	handleValueChange(isValid, values, validationResults, postSubmit = null, modalNavigator = null) {
		// if(isValid === true){
		// 	api.get("/profile/"+this.state.userStore.userid, values).then((response)=>{
		// 		if(response.problem){
		// 			Toast.show({
		// 				text: "Error en la conexión ("+ response.problem +")",
		// 				position: "bottom",
		// 				type: "warning",
		// 				duration: 5000
		// 			});

		// 			postSubmit();
		// 		}else{
		// 			Toast.show({
		// 				text: "Se guardo el perfil con exito!",
		// 				position: "bottom",
		// 				type: "success",
		// 				duration: 5000
		// 			});

		// 			postSubmit();
		// 		}
		// 	});
		// }
	}

	render() {

		return (
			<Container style={{ backgroundColor: "white" }}>
				<Grid>
					<Row style={{ alignItems: "center" }} size={1}>
						<Image style={theme.avatarImage} source={this.state.avatar ? { uri: this.state.avatar } : require("../assets/images/avatar.png")} />
						<View style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
							<Text style={[theme.platoCoinText]}>{this.state.user.fullname}</Text>
							<Text style={[theme.platoCoinText, { fontSize: 12, fontStyle: "normal" }]}>SPS, Honduras</Text>
						</View>
						<LogOut />
					</Row>

					<Row style={{ height: 50 }}>
						<Col style={styles.container}>
							<Text style={styles.text}>10</Text>
							<Text style={styles.subText}>Followers</Text>
						</Col>
						<Col style={styles.container}>
							<Text style={styles.text}>5</Text>
							<Text style={styles.subText}>Following</Text>
						</Col>
						<Col style={styles.container}>
							<Text style={styles.text}>10</Text>
							<Text style={styles.subText}>Reviews</Text>
						</Col>
					</Row>
					<Row size={2}>
						<List
							dataArray={this.state.user.reviews}
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