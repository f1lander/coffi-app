import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { api } from "../api";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  static navigationOptions = {
    title: 'Add Review',
  };

  componentDidMount(){
    const { navigate } = this.props.navigation;
  }


  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Scan a Coffee"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ top: 10, width: 200, height: 200 }} />}
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

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    if (result.base64) {
      fetch('https://cofi-api.herokuapp.com/api/coffees/search/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: result.base64,
        
        })
      }).then(response => response.json())
      .then(responseJson => {
        window.alert(JSON.stringify(responseJson))
        if(responseJson.id){
          navigate('Coffee', { id: responseJson.id})
        }
      })
      .catch(error => {
        window.alert("Error");
        console.error(error);
      });
      
    }

  };
}