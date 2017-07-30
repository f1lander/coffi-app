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

import { Container, Content, Card, CardItem, Text, Icon, Button, CheckBox } from 'native-base';

import { MonoText } from '../components/StyledText';

import Slider from 'react-native-slider';

import Stars from 'react-native-stars';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: "Search"
  };

  constructor(props){
    super(props);
    this.state = {
      price: 1
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
              <Container>
                <Content>
                    <Card>
                        <CardItem>              
                            <Icon name="calculator" style={{ color: '#DD5044' }} />
                            <Text style={{flex: 1}}>Price</Text>
                            <CheckBox checked={true} />
                        </CardItem>
                        <CardItem>
                          <View style={{flex: 1}}>
                            <Slider
                              value={this.state.value}
                              onValueChange={(value) => this.setState({value})} />
                          </View>              
                        </CardItem>
                        <CardItem>              
                            <Icon name="star-half" style={{ color: '#DD5044' }} />
                            <Text style={{flex: 1}}>Ranking</Text>
                            <CheckBox checked={true} />
                        </CardItem>
                        <CardItem>
                          <View style={{flex: 1}}>
                          <Stars
                            half={true}
                            rating={2.5}
                            update={(val)=>{this.setState({stars: val})}}
                            spacing={4}
                            starSize={40}
                            count={5}
                            fullStar={require('../node_modules/react-native-stars/example-images/starFilled.png')}
                            emptyStar={require('../node_modules/react-native-stars/example-images/starEmpty.png')}
                            halfStar={require('../node_modules/react-native-stars/example-images/starHalf.png')}/>
                          </View>                  
                        </CardItem>
                   </Card>
                   <Button full>
                     <Text>Search</Text>
                   </Button>
                </Content>
            </Container>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  startsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
