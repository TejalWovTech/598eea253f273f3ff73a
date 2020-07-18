import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';

class Details extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  constructor() {
    super();
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://api.weatherstack.com/current?access_key=4a64d2a41090aa0dd4b45903370e18e0&QUERY=delhi')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
        console.log('response', JSON.stringify(responseJson));
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  }

  render() {
    return (
      <View style={{marginVertical: 20}}>
        <View style={{marginVertical: 10, alignItems: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Capital</Text>
          <Text style={{fontWeight: 'bold'}}>data[i]</Text>
        </View>
        <View style={{marginVertical: 10, alignItems: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Population</Text>
          <Text style={{fontWeight: 'bold'}}>data[i+1]</Text>
        </View>
        <View style={{marginVertical: 10, alignItems: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>latlng</Text>
          <Text style={{fontWeight: 'bold'}}>data[i+2]</Text>
        </View>
      </View>
    );
  }
}
export default Details;
