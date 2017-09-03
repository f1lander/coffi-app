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

export class NunitoSemiBoldText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'nunito-semi-bold' }]}
      />
    );
  }
}

export class NunitoRegularText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'nunito-regular' }]}
      />
    );
  }
}

export class NunitoLightText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'nunito-light' }]}
      />
    );
  }
}

export class NunitoBoldText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: 'nunito-bold' }]}
      />
    );
  }
}
