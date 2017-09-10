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
        coffee.image = params.base64;

        const postData = {
            review: state.review,
            coffee,
        };

        console.log(JSON.stringify(postData));

        return this.props.Api.submitCoffeeRequest(postData)
            .then((data) => {
                window.alert("Thank you!");
                goBack(null);
            })
            .catch((err) => {
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
                        <Item>
                            <Image style={{ height: 200, width: null, flex: 1, resizeMode: 'contain', }}
                                source={{ uri: params.uri, scale: 3 }} />
                        </Item>

                        <Item underline>
                            <Input
                                floatingLabel={true}
                                onChangeText={(brandName) => {
                                    const state = this.state;
                                    state.coffee.brand.name = brandName;
                                    this.setState(state);
                                }}
                                numberOfLines={1}
                                value={this.state.coffeeName}
                                style={{ margin: 15 }}
                                placeholder="Brand Name" />
                        </Item>

                        <Item underline>
                            <Input
                                keyboardType="numeric"
                                floatingLabel={true}
                                onChangeText={(altitude) => {
                                    const state = this.state;
                                    state.coffee.altitude = altitude;
                                    this.setState(state);
                                }}
                                numberOfLines={1}
                                value={this.state.altitude}
                                style={{ margin: 15 }}
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

                        <Stars
                            half={true}
                            rating={0}
                            update={(val) => { this.onRatingChange(val) }}
                            spacing={4}
                            starSize={40}
                            tintColor={'#FFCD30'}
                            style={{ margin: 15 }}
                            count={5}
                            {...StarsAssets.largeCoffeeBeans}
                        />

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
                                style={{ margin: 15 }}
                                placeholder="Comment" />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => this.submitCoffeeRequest()}>
                            <Text>Submit Coffee</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >
        );
    }
}

export default apiConnector(CoffeeRequestScreen);