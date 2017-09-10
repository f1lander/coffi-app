import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ProfileScreen from '../screens/ProfileScreen';
import ExploraScreen from '../screens/ExploraScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NewsScreen from '../screens/NewsScreen';
import NewReviewScreen from '../screens/NewReviewScreen';

export default TabNavigator(
  {
    News: {
      screen: NewsScreen,
    },
    Search: {
      screen: ExploraScreen,
    },
    NewReview: {
      screen: NewReviewScreen,
    },
    Friends: {
      screen: FriendsScreen,
    },
    Profile: {
      screen: ProfileScreen,

    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'News':
            iconName = 'ios-bookmarks-outline';
            break;
          case 'Profile':
            iconName = 'ios-contact-outline';
            break;
          case 'NewReview':
            iconName = 'ios-qr-scanner-outline';
            break;
          case 'Search':
            iconName = 'ios-search-outline';
            break;
          case 'Friends':
            iconName = 'ios-contacts-outline';
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
