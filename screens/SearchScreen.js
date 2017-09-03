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
    title: "Explora",
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
