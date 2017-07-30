import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NewsScreen from '../screens/NewsScreen';
import NewReviewScreen from '../screens/NewReviewScreen';

export default TabNavigator(
  {
    News: {
      screen: NewsScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Friends: {
      screen: FriendsScreen,
    },
    NewReview: {
      screen: NewReviewScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'News':
            iconName = 'ios-restaurant-outline';
            break;
          case 'Profile':
            iconName = 'ios-contact-outline';
            break;
          case 'Search':
            iconName = 'ios-bookmarks-outline';
            break;
          case 'Friends':
            iconName = 'ios-cart-outline';
            break;
          case 'NewReview':
            iconName = 'ios-cart-outline';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={32}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopColor: 'rgba(0,0,0,0.1)',
        backgroundColor: Colors.tintColor
      }
    }
  }
);
