import React from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { MonoText, AnnieText } from '../components/StyledText';
import { WebBrowser, Constants, Facebook } from 'expo';
import { observer, inject } from "mobx-react";
import { Toast } from "native-base";

import {
    StackNavigator,
} from 'react-navigation';


import AppIntro from 'react-native-app-intro';
import theme from '../constants/Theme';

import RootNavigation from '../navigation/RootNavigation';
import LoginNavigation from '../navigation/LoginNavigation';

@inject("userStore")
@observer
export default class AppRoot extends React.Component {
    render() {

        if (this.props.userStore.status == 'logged_in') {
            return <RootNavigation />;
        }

        return <LoginNavigator />


    }

}
