import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import Stars from 'react-native-stars';

import { MonoText } from '../components/StyledText';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Spinner } from 'native-base';

import { apiConnector }  from "../navigation/Connectors";

import utils from '../api/utils'

import moment from 'moment';

class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      reviews: []
    }
  }

  componentDidMount(){
    this.props.Api.getTimeline().then(response => {
      if(response.ok){
        this.setState({
          reviews: response.data,
          loading: false,
        })
      }else{
        this.setState({
          error: true,
          reviews: [],
          loading: false,
        }) 
      }
    });
  }

  static navigationOptions = {
    title: "Recents Tasting",
  };

  _renderStar = (rating) => {
    return (
      <Stars half={true}
        rating={rating}
        spacing={4}
        starSize={10}
        backingColor='#fafafa'
        disabled={true}
        count={5}
        fullStar={require('../node_modules/react-native-stars/example-images/starFilled.png')}
        emptyStar={require('../node_modules/react-native-stars/example-images/starEmpty.png')}
        halfStar={require('../node_modules/react-native-stars/example-images/starHalf.png')} />
    )
  }

  _renderCard(data) {
    return (
      <Card key={data.id}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: utils.getAvatarUrl(data.userId)}} />
            <Body>
              <Text>{data.user.fullname || data.user.username}</Text>
              <Text note>{data.user.location || ''}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1 }}>
            <Text>{data.comment}</Text>
          </View>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: data.image && data.image.url ||  utils.getCoffeeImageUrl(data.coffeeId)}} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            {this._renderStar(data.rating)}
          </Left>
          <Body>
            <Text>{data.coffee.brand.name}</Text>
          </Body>
          <Right>
            <Text>{data.updatedAt && moment(data.updatedAt).fromNow()}</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Content>
            {
              this.state.loading ?
              (
                <View style={{flex:1, alignItems:'center'}}>
                      <Spinner color='#FFCD30' />
                </View>
              ): null
            }
            {
              this.state.reviews.map(x => {
                return this._renderCard(x);
              })
            }
          </Content>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default apiConnector(NewsScreen);