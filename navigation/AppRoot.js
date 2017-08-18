import React from 'react';

import { observer, inject } from "mobx-react";

import RootNavigation from './RootNavigation';
import LoginNavigation from './LoginNavigation';

import { Text } from 'react-native'

@inject("authenticationStore")
@observer
export default class AppRoot extends React.Component {
	componentDidMount(){
		console.log('hello');
    }
    
    render() {

        if (this.props.authenticationStore.status == 'logged_in') {
            return <RootNavigation />;
        }

        return <LoginNavigation />

    }

}
