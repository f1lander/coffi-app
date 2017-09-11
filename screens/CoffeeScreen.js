import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Picker
} from 'react-native';
import { WebBrowser } from 'expo';

import { Container, Content, Card, CardItem, Left, Right, Body, Text, Icon, Button, Thumbnail, Input, Item, Spinner } from 'native-base';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import SmartPicker from 'react-native-smart-picker';

import { MonoText } from '../components/StyledText';

import Slider from 'react-native-slider';

import Stars from 'react-native-stars';

import StarsAssets from '../assets/images/stars';

import { apiConnector } from '../navigation/Connectors';

import { observer, inject } from "mobx-react";

import utils from '../api/utils'

import moment from 'moment';

import _ from 'lodash';

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

@inject("coffeeStore")
@observer
class CoffeeScreen extends React.Component {
  static navigationOptions = {
    title: "Coffee Detail",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      review: {},
      loadingCoffee: true,
      loadingReviews: true,
      loadingPersonalReviews: true,
    }
  }

  showProfile(userId) {
    const { navigate } = this.props.navigation;
    navigate("UserProfile", { owner: id });
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.loadData(params);
  }

  componentWillReceiveProps(newProps){
    const { params } = this.props.navigation.state;
    const newParams = newProps.navigation.state.params;

    if(params.id !== newParams.id){
      this.loadData(newParams);
    }
  }

  setCoffe(id){
    const {setParams} = this.props.navigation;
    setParams({id});
  }

  loadData(params) {
    this._loadPersonalReview(params.id);

    this.setState({
      loadingCoffee: true,
      loadingPersonalReviews: true,
      loadingReviews: true,
      loadingRelatedCoffess: true
    });

    this.props.Api.getCoffeeById(params.id)
      .then(response => {
        if (response.ok) {
          if (this.props.coffeeStore.coffees[params.id]) {
            this.props.coffeeStore.updateCoffee(params.id, response.data);
          } else {
            this.props.coffeeStore.addCoffee(response.data);
          }
          this.props.Api.getReviewsByCoffeeId(params.id)
          .then(response => {
            if (response.ok) {
              this.props.coffeeStore.updateCoffee(params.id, { reviews: response.data });
            } else {
              console.log('Error fetching reviews: ' + response.problem);
            }
    
            this.setState({
              loadingReviews: false
            });
          });
    
          this.props.Api.getMyReviewsByCoffeeId(params.id)
            .then(response => {
              if (response.ok) {
                console.log(response.data);
                this.props.coffeeStore.updateCoffee(params.id, { personalReviews: response.data });
              } else {
                console.log('Error fetching personal reviews: ' + response.problem);
              }
      
              this.setState({
                loadingPersonalReviews: false
              });
      
              this._loadPersonalReview(params.id);
            });
      
          this.props.Api.getRelatedCoffees(params.id)
            .then(response => {
              if (response.ok) {
                this.props.coffeeStore.updateCoffee(params.id, { related: response.data });
                response.data.varieties.map(coffee => {
                  this.props.coffeeStore.updateCoffee(coffee.id, {...coffee});
                });
              } else {
                console.log('Error fetching related coffee: ' + response.problem);
              }
      
              this.setState({
                loadingRelatedCoffess: false
              });
          });
        } else {
          console.log(response.problem);
        }

        this.setState({
          loadingCoffee: false
        });
      });
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
        {...StarsAssets.smallCoffeeBeans}
      />
    )
  }

  _renderCard(review) {
    return (
      <Card key={'review-' + review.id}>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={() => this.showProfile(review.userId)}>
              <Thumbnail source={{ uri: utils.getAvatarUrl(review.userId) }} />
            </TouchableOpacity>
            <Body>
              <Text>{review.user && (review.user.fullname || review.user.username)}</Text>
              <Text note>{review.user && review.user.location}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{review.comment}</Text>
          </Body>
        </CardItem>
        {
          review.method && (
            <CardItem>
              <Icon active name="flask" style={{ opacity: 0.7 }} />
              <Text>{review.method && (review.method.name || review.method.description)}</Text>
            </CardItem>
          )
        }
        <CardItem>
          <Left key={"rate-" + review.rating.toString()} >
            {this._renderStar(review.rating)}
          </Left>
          <Body>
            {review.method && (review.method.name || review.method.description)}
          </Body>
          <Right>
            <Text>{review.updatedAt && moment(review.updatedAt).fromNow()}</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }

  _getPersonalReview(coffeeId, methodId) {
    const data = this.props.coffeeStore.coffees[coffeeId];

    const myReviews = (data && data.personalReviews) ?
      _.keyBy(data.personalReviews.map(myReview => {
        return { ...myReview, type: myReview.methodId || 'global' }
      }), 'type') : {};

    return myReviews[methodId || 'global'];
  }

  _loadPersonalReview(coffeId, methodId) {
    const review = this._getPersonalReview(coffeId, methodId) || {
      comment: '',
      rating: 0,
      methodId
    };

    this.setState({ review });
  }

  updateRaiting(rating) {
    let currrentReview = this.state.review || {};
    this.setState({
      review: {
        ...currrentReview,
        rating
      }
    });
  }

  updateComment(comment) {
    let currrentReview = this.state.review || {};
    this.setState({
      review: {
        ...currrentReview,
        comment
      }
    });
  }

  sendReview() {
    const { params } = this.props.navigation.state;
    const { review } = this.state;
    this.setState({
      sendingReview: true,
    }, () => {
      this.props.Api.sendCoffeeReview(params.id, {
        rating: review.rating,
        comment: review.comment
      })
        .then(response => {
          if (response.ok) {
            console.log('Review has send!');
          } else {
            console.log('Error!');
          }

          this.setState({
            review: response.data,
            sendingReview: false
          });
        })
    })
  }

  render() {
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { review } = this.state;
    const data = this.props.coffeeStore.coffees[params.id];

    const isLoading = (
      this.state.loadingCoffee || this.state.loadingReviews || 
      this.state.loadingPersonalReviews || this.state.loadingRelatedCoffess
    );

    if (!data) {
      return <View></View>
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <ParallaxScrollView
            headerBackgroundColor="#333"
            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
            backgroundSpeed={10}
            renderBackground={() => (
              <View key="background">
                <Image style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }}
                  source={require('../assets/images/bg.jpg')} />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  width: window.width,
                  backgroundColor: 'rgba(0,0,0,.4)',
                  height: PARALLAX_HEADER_HEIGHT
                }} />
              </View>
            )}
            renderForeground={() => (
              <View key={"parallax-header-"+data.id} style={styles.parallaxHeader}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Image style={styles.avatar} source={{
                      uri: utils.getCoffeeImageUrl(data.id),
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE
                    }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewValue}>{data.avg_rating ? data.avg_rating.toFixed(1) : '-'}</Text>
                    <View key={"rate-" + data.rating.toString()} style={{ flex: 1, flexWrap: 'wrap' }}>
                      <Stars
                        disabled={true}
                        half={true}
                        rating={data.avg_rating || 0}
                        update={this.updateRaiting.bind(this)}
                        spacing={4}
                        starSize={15}
                        tintColor={'white'}
                        count={5}
                        {...StarsAssets.smallCoffeeBeans}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 30 }}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.sectionCoffeeText}>
                      {data.brand && data.brand.name}
                    </Text>
                    <Text style={styles.sectionCoffeeText}>
                      {((data.model || 'Original') + ', ' + (data.variety && (data.variety.name || data.variety.description)))}
                    </Text>
                    <Text style={styles.sectionTitleText}>
                      {data.brand && data.brand.country}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            renderStickyHeader={() => (
              <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{data.brand && data.brand.name} Coffee</Text>
              </View>
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>
                <TouchableOpacity onPress={() => goBack()} style={{ flexWrap: 'wrap' }}>
                  <Icon ios='ios-arrow-round-back' android="md-arrow-back" style={styles.fixedSectionIcon} />
                </TouchableOpacity>
              </View>
            )}>
            <View style={{ padding: 4 }}>
              {
                isLoading ? (
                  <Card>
                    <CardItem>
                      <View style={{flex:1, alignItems:'center'}}>
                        <Spinner color='#FFCD30' />
                      </View>
                    </CardItem>
                  </Card>
                ): null
              }
              {
                /* <Card>
                <CardItem header bordered>
                  <Text style={{color: '#FFCD30'}}>Variety</Text>
                </CardItem>
                <CardItem button onPress={() => {}}>
                  <Icon inactive name="md-pricetags" />
                  <Text>Catuai</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
                </Card> */
              }
              {
                !isLoading && data && data.related && data.related.varieties && data.related.varieties.length ? (
                  <Card>
                    <CardItem>
                      <SmartPicker
                        selectedValue={data.id}
                        label='Select variant'
                        androidBoxStyle={{ paddingHorizontal: 20, paddingVertical: 5 }}
                        iosBoxStyle={{ padding: 4 }}
                        onValueChange={(id) => { this.setCoffe(id) }}>
                        <Picker.Item key={data.id} label={(data.variety && data.variety.description) || data.varietyId} value={data.id} />
                        {
                          data.related.varieties.map(x => {
                            return (
                              <Picker.Item key={x.id} label={(x.variety && x.variety.description) || x.varietyId} value={x.id} />
                            )
                          })
                        }
                      </SmartPicker>
                    </CardItem>
                  </Card>
                ) : null
              }
              <Card>
                {
                  review ? (
                    <CardItem key={'start-' + ((review && review.id) || 'empty')}>
                      <View style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#eff0f2' }}>
                        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>{review.id ? 'Update your review!' : 'Give it a review!'} </Text>
                        <Stars
                          half={true}
                          rating={(review && review.rating) || 0}
                          update={(val) => { this.updateRaiting(val) }}
                          spacing={4}
                          starSize={40}
                          tintColor={'#FFCD30'}
                          count={5}
                          {...StarsAssets.largeCoffeeBeans}
                        />
                      </View>
                    </CardItem>
                  ) : (
                      <CardItem>
                        <Text>Loading...</Text>
                      </CardItem>
                    )
                }
                <CardItem>
                  <Item>
                    <Input
                      onChangeText={(val) => this.updateComment(val)}
                      placeholder='Add Comment'
                      value={this.state.review ? this.state.review.comment : ''}
                      numberOfLines={(review && review.comment && review.comment.length) ? 3 : 1}
                      multiline={true}
                    />
                  </Item>
                </CardItem>
                <CardItem>
                  <Button block light disabled={!review || this.state.sendingReview} onPress={this.sendReview.bind(this)}>
                    <Text>{this.state.sendingReview ? 'Sending...' : !(review && review.id) ? 'Send Review' : 'Update Review'}</Text>
                  </Button>
                </CardItem>
              </Card>
              <Card>
                <CardItem header>
                  <Text>Reviews</Text>
                </CardItem>
              </Card>
              {
                data.reviews.map(x => {
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
    fontSize: 30
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

export default apiConnector(CoffeeScreen);