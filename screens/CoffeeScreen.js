import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { WebBrowser } from 'expo';

import { Container, Content, Card, CardItem, Left, Right, Body, Text, Icon, Button, Thumbnail } from 'native-base';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { MonoText } from '../components/StyledText';

import Slider from 'react-native-slider';

import Stars from 'react-native-stars';

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

export default class CoffeeScreen extends React.Component {
  static navigationOptions = {
    title: "Coffee Detail",
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
        reviews: [
          {
            id: 1,
            username: "filander",
            comment: "Muy Buen cafe",
            location: "San Pedro Sula",
            coffeName: "Cafe 504",
            rate: 4.5,
            avatarUrl: "https://placeimg.com/100/100/nature",
            imageUrl: "https://placeimg.com/640/480/nature",
            timeAgo: "11h ago"
          },
          {
            id: 2,
            username: "filander",
            comment: "No muy bueno",
            location: "San Pedro Sula",
            coffeName: "Cafe ORO",
            rate: 1.5,
            avatarUrl: "https://placeimg.com/100/100/nature",
            imageUrl: "https://placeimg.com/640/480/nature",
            timeAgo: "11h ago"
          }
        ]
      }
  }

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

  _renderCard(data){
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: data.avatarUrl }} />
            <Body>
              <Text>{ data.username }</Text>
              <Text note>{ data.location }</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1 }}>
            <Text>{ data.comment }</Text>
          </View>
        </CardItem>
        <CardItem>
          <Left>
            {this._renderStar(data.rate)}
          </Left>
          <Right>
            <Text>{ data.timeAgo }</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <ParallaxScrollView
          headerBackgroundColor="#333"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}
            renderBackground={() => (
              <View key="background">
                <Image source={{uri: 'http://www.juanvaldezcafe.com/sites/default/files/cumbre_descafeinado.jpg',
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: 'rgba(0,0,0,.4)',
                              height: PARALLAX_HEADER_HEIGHT}}/>
              </View>
            )}
            renderForeground={() => (
              <View key="parallax-header" style={ styles.parallaxHeader }>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <Image style={ styles.avatar } source={{
                            uri: 'http://www.juanvaldezcafe.com/sites/default/files/cumbre_descafeinado.jpg',
                            width: AVATAR_SIZE,
                            height: AVATAR_SIZE
                        }}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.reviewValue}>2.5</Text>
                        <View style={{flex: 1, flexWrap: 'wrap'}}>
                            <Stars
                                disabled={true}
                                half={true}
                                rating={2.5}
                                update={(val)=>{this.setState({stars: val})}}
                                spacing={4}
                                starSize={15}
                                tintColor={'white'}
                                count={5}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={ styles.sectionCoffeeText }>
                            Juan Valdez
                        </Text>
                        <Text style={ styles.sectionTitleText }>
                            Colombia
                        </Text>
                    </View>
                </View>
              </View>
            )}

            renderStickyHeader={() => (
              <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>Juan Valdez Coffee</Text>
              </View>
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>
                <TouchableOpacity onPress={() => goBack()} style={{flexWrap: 'wrap'}}>
                    <Icon ios='ios-arrow-round-back' android="md-arrow-back" style={styles.fixedSectionIcon}/>
                </TouchableOpacity>
              </View>
            )}>

            <View style={{padding: 4}}>
                <Card>
                    <CardItem>
                        <View style={{flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#eff0f2'}}>
                            <Text style={{fontWeight: 'bold', paddingVertical: 10}}>Give it a review!</Text>
                            <Stars
                                half={true}
                                rating={2.5}
                                update={(val)=>{this.setState({stars: val})}}
                                spacing={4}
                                starSize={40}
                                tintColor={'#d87504'}
                                count={5}/>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Button block light>
                            <Text>Send Review</Text>
                        </Button>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <Text>Reviews</Text>
                    </CardItem>
                </Card>
                {
                    this.state.reviews.map(x => {
                        return this._renderCard(x);
                    })
                }
            </View>
          </ParallaxScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  reviewValue: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
  },
  stickySectionText: {
    marginLeft: 50,
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  fixedSectionIcon: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: 4,
  },
  sectionCoffeeText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 24,
    paddingBottom: 5
  },
  sectionTitleText: {
    textAlign: 'left',
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
