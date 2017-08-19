import React from 'react';

import { observer, inject } from "mobx-react";

import RootNavigation from './RootNavigation';
import LoginNavigation from './LoginNavigation';

import { Text } from 'react-native'

import Api from '../api';

@inject("authenticationStore")
@observer
export default class AppRoot extends React.Component {
    constructor(props){
        super(props);
        this.Api = new Api();
    }

    render() {

        if (this.props.authenticationStore.status == 'logged_in') {
            return <RootNavigation Api={this.Api}/>;
        }

        return <LoginNavigation Api={this.Api}/>

    }

}
