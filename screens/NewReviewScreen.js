import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

import { apiConnector }  from '../navigation/Connectors';

import { Spinner } from 'native-base';

export class ScanCoffeeScreen extends React.Component {
  state = {
    image: null,
  };

  static navigationOptions = {
    title: 'Add Review',
  };

  componentDidMount(){
    const { navigate } = this.props.navigation;
    //navigate('Coffee', { id: "59ae0b46ce8f3d00112af083"});
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

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    if (result.base64) {
      this.setState({
        loading: true
      }, () => {
        this.props.Api.searchCoffee({
          image: result.base64
        }).then(response => {
          if(response.ok){
            if(response.data && response.data.id){
              navigate('Coffee', { id: response.data.id});
            }else{
              window.alert('Not found');
            }
          }else{
            window.alert("Error");
          }

          this.setState({
            loading: false
          })
        });
      })
    }

  };
}

export default apiConnector(ScanCoffeeScreen);