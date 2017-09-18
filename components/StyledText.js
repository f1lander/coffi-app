import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'space-mono' }]}
      />
    );
  }
}

export class AnnieText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'annie' }]}
      />
    );
  }
}

export class TicketText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'ticket' }]}
      />
    );
  }
}

export class NunitoText extends React.Component {
  render() {
    const nunitoType = { fontFamily: `nunito-${this.props.subFontType}` }
    return (
      <Text
        {...this.props}
        style={[this.props.style, this.props.nunitoType]}
      />
    );
  }
}
