import React from "react";

import { MonoText, AnnieText } from "../components/StyledText";
import { apiConnector } from "../navigation/Connectors";

import Stars from 'react-native-stars';
import StarsAssets from '../assets/images/stars';

import {
    Image
} from "react-native";

import {
    Input,
    Container,
    Content,
    Item,
    Form,
    Button,
    Footer,
    FooterTab,
    Text,
    Picker
} from "native-base";


class CoffeeRequestScreen extends React.Component {
    static navigationOptions = {
        title: "Add Coffee",
      };

    constructor(props) {
        super(props);
        this.state = {
            review: {
                comment: "",
                rating: 0,
            },
            coffee: {
                brand: {},
            },
        };

        this.submitCoffeeRequest = this.submitCoffeeRequest.bind(this);
    }

    submitCoffeeRequest() {
        const { params } = this.props.navigation.state;
        const { goBack } = this.props.navigation;
        const { state } = this;

        const { coffee } = state;
        coffee.image = params.base64 || null;

        const postData = {
            review: state.review,
            coffee,
        };

        this.setState({
            sending: true,
        })

        return this.props.Api.submitCoffeeRequest(postData)
            .then((data) => {
                window.alert("Thank you!");
                goBack(null);
            })
            .catch((err) => {
                this.setState({
                    sending: false
                });

                window.alert("An error ocurred, Please try again!");
                console.log(JSON.stringify(err));
            });
    }

    onRoastingValueChange(roastingType) {
        const state = this.state;
        state.roasting_type = roastingType;
        this.setState(state);
    }

    onRatingChange(value) {
        const state = this.state;
        state.review.rating = value;
        this.setState(state);
    }

    onReviewCommentChange(value) {

    }


    render() {
        const { params } = this.props.navigation.state;

        return (
            <Container style={{ backgroundColor: "white" }}>

                <Content padder>
                    <Form>
                        <Item>
                            <Text style={{ margin: 10 }}>
                                It looks we were not able to find a coffee in our database, would you like to submit a request and review for this coffee to be added?
                        </Text>
                        </Item>
                        <Item style={{paddingTop: 10, paddingBottom: 10}}>
                            <Image style={{ height: 200, width: null, flex: 1, resizeMode: 'contain', }}
                                source={{ uri: params.uri, scale: 3 }} />
                        </Item>

                        <Item underline>
                            <Input
                                floatingLabel={true}
                                onChangeText={(brandName) => {
                                    let { coffee } = this.state;
                                    coffee.brand.name = brandName;
                                    this.setState({coffee});
                                }}
                                numberOfLines={1}
                                value={this.state.coffeeName}
                                style={{ margin: 10 }}
                                placeholder="Brand Name" />
                        </Item>

                        <Item underline>
                            <Input
                                keyboardType="numeric"
                                floatingLabel={true}
                                onChangeText={(altitude) => {
                                    let { coffee } = this.state;
                                    coffee.altitude = altitude;
                                    this.setState({coffee});
                                }}
                                numberOfLines={1}
                                value={this.state.altitude}
                                style={{ margin: 10 }}
                                placeholder="Altitude" />
                        </Item>
                        {/* 
                        <Picker
                            iosHeader="Roasting type"
                            mode="dropdown"
                            selectedValue={this.state.roasting_type}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                        </Picker> */}

                        <Item underline style={{paddingTop: 10, paddingBottom: 10, paddingRight: 10, justifyContent: 'space-between'}}>
                            <Text style={{ margin: 10, opacity: 0.7 }}>Personal Rating</Text>
                            <Stars
                                half={true}
                                rating={0}
                                update={(val) => { this.onRatingChange(val) }}
                                spacing={4}
                                starSize={25}
                                tintColor={'#FFCD30'}
                                count={5}
                                {...StarsAssets.smallCoffeeBeans}
                            />
                        </Item>

                        <Item underline>
                            <Input
                                floatingLabel={true}
                                onChangeText={(comment) => {
                                    const state = this.state;
                                    state.review.comment = comment;
                                    this.setState(state);
                                }}
                                numberOfLines={6}
                                value={this.state.review.comment}
                                style={{ margin: 10 }}
                                placeholder="Comment" />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full disabled={this.state.sending} onPress={() => this.submitCoffeeRequest()}>
                            <Text>{this.state.sending ? 'Sending...': 'Submit Coffee'}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >
        );
    }
}

export default apiConnector(CoffeeRequestScreen);