import React from 'react';

import Api from '../api';

export function apiConnector(WrappedComponent) {
    return class extends React.Component {
        static navigationOptions = WrappedComponent.navigationOptions || {};

        constructor(props){
          super(props);
          this.Api = Api.create();
        }

        render() {
          return (
            // that renders your component
            <WrappedComponent
              {...this.props}
              Api={this.Api}
            />
          )
        }
    }
}