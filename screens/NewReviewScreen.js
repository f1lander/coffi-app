import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

import { apiConnector } from '../navigation/Connectors';

import { Spinner } from 'native-base';

export class ScanCoffeeScreen extends React.Component {
  state = {
    image: null,
    loading: false
  };

  static navigationOptions = {
    title: 'SCAN',
  };

  componentDidMount() {
    const { navigate } = this.props.navigation;
    //navigate('Coffee', { id: "59ae0b46ce8f3d00112af083"});

    navigate('CoffeeRequest', {});
  }


  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image &&
        <Image source={{ uri: image }} style={{ top: 10, width: 200, height: 200 }} />}
        {
          !this.state.loading ? (
            <Button
              title="Scan a Coffee"
              onPress={this._pickImage}
            />
          ): (
            <View style={{flex:1, alignItems:'center'}}>
              <Spinner color='#FFCD30' />
            </View>
          )
        }

      </View>
    );
  }

  _pickImage = async () => {
    const { navigate } = this.props.navigation;
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, loading: true });
    }

    if (result.base64) {
      this.props.Api.searchCoffee({
        image: result.base64
      }).then(response => {
        if (response.ok) {
          if (response.data && response.data.id) {
            navigate('Coffee', { id: response.data.id });
          } else {
            navigate("CoffeeRequest", { uri: result.uri, base64: result.base64 });
          }
        } else {
          window.alert("Error");
        }

        this.setState({image: null, loading: false});
      });
    }

  };
}

export default apiConnector(ScanCoffeeScreen);