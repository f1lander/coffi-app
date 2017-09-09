import React from "react";

import { MonoText, AnnieText } from "../components/StyledText";
import { apiConnector } from "../navigation/Connectors";

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
    Text
} from "native-base";


class CoffeeRequestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };

        this.submitCoffeeRequest = this.submitCoffeeRequest.bind(this);
    }

    submitCoffeeRequest() {
        const { params } = this.props.navigation.state;

        const { goBack } = this.props.navigation;
        return this.props.Api.submitCoffeeRequest({
            comment: this.state.text,
            photo: params.base64,
        })
            .then((data) => {
                window.alert("Thank you!");
                goBack(null);
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    }

    render() {
        const { params } = this.props.navigation.state;

        return (
            <Container style={{ backgroundColor: "white" }}>
                <Content padder>
                    <Item>
                        <Text>It looks we were not able to find a coffee in our database, would you like to submit a request a review for this coffee to be added?</Text>
                    </Item>
                    <Item>
                        <Image style={{ height: 200, width: null, flex: 1, resizeMode: 'contain', }}
                            source={{ uri: params.uri, scale: 3 }} />
                    </Item>

                    <Item underline>
                        <Input
                            onChangeText={(text) => {
                                this.setState({ text });
                            }}
                            value={this.state.text}
                            style={{ margin: 15 }}
                            placeholder="Comment" />
                    </Item>
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