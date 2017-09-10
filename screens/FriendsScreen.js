import React, { Component } from 'react';
import { Container, Header, Tabs, Tab, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { apiConnector } from "../navigation/Connectors";

import { observer, inject } from "mobx-react";

import utils from '../api/utils'

const tabProps = {
  activeTabStyle: {
    backgroundColor: '#3c4858'
  },
  activeTextStyle: {
    color: 'white'
  },
  tabStyle: {
    backgroundColor: '#3c4858'
  },
  textStyle: {
    color: 'white'
  },
}

@inject("userStore")
@observer
class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
  };

  componentDidMount() {
    this.props.Api.getFollowing('me')
      .then(response => {
        if (response.ok) {
          this.props.userStore.updateFollowing(response.data);
        }
      })

    this.props.Api.getFollowers('me')
      .then(response => {
        if (response.ok) {
          this.props.userStore.updateFollowers(response.data);
        }
        console.log(response);
      })
  }

  getFollowing() {
    return this.props.userStore.following.map(
      id => {
        return this.props.userStore.users[id]
      }
    )
  }

  getFollowers() {
    return this.props.userStore.followers.map(
      id => {
        return this.props.userStore.users[id]
      }
    )
  }

  handlePressUser(id) {
    const { navigate } = this.props.navigation;
    navigate("UserProfile", { owner: id });
  }

  renderRow(data) {
    return (
      <ListItem button avatar key={'user-' + data.id} onPress={() => this.handlePressUser(data.id)} style={{ paddingBottom: 5 }}>
        <Left>
          <Thumbnail source={{ uri: utils.getAvatarUrl(data.id) }} />
        </Left>
        <Body>
          <Text>{data.fullname || data.username}</Text>
          <Text note></Text>
        </Body>
        <Right>
          <Text note></Text>
        </Right>
      </ListItem>
    )
  }

  render() {
    return (
      <Container>
        <Tabs initialPage={1} tabBarUnderlineStyle={{ backgroundColor: '#FFCD30' }}>
          <Tab {...tabProps} heading="Following">
            <Content style={{ paddingTop: 10 }}>
              <List>
                {
                  this.getFollowing().map(
                    user => {
                      return this.renderRow(user)
                    }
                  )
                }
              </List>
            </Content>
          </Tab>
          <Tab {...tabProps} heading="Followers">
            <Content style={{ paddingTop: 10 }}>
              <List>
                {
                  this.getFollowers().map(
                    user => {
                      return this.renderRow(user)
                    }
                  )
                }
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default apiConnector(FriendsScreen);
