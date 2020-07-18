import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {SvgUri} from 'react-native-svg';
class CountryInfo extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  constructor() {
    super();
    this.state = {
      dataSource: [],
      countryName: '',
      list: true,
      capital: '',
      population: '',
      latlng: '',
      flag: '',
      countryDataInfo: [],
      showdata: true,
    };
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2')
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

  renderData(perem) {
    const data = perem.item;
    console.log('data===>', JSON.stringify(data));
    const i = 0;
    return (
      <View style={{marginVertical: 20}}>
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Capital</Text>
          <Text style={{fontWeight: 'bold'}}>{data[i]}</Text>
        </View>
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Population</Text>
          <Text style={{fontWeight: 'bold'}}>{data[i+1]}</Text>
        </View>
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>latlng</Text>
          <Text style={{fontWeight: 'bold'}}>{data[i+2]}</Text>
        </View>
        <SvgUri width="30%" height="30%" uri={data[i+3]} />
        <TouchableOpacity
          /*
                  onPress={() => this.countrydata()}
*/
          style={{
            backgroundColor: 'rgba(255,47,39,0.52)',
            alignItems: 'center',
            justifyContent: 'center',
            height: 45,
            width: '80%',
            marginVertical: 30,
          }}>
          <Text style={{color: '#fff'}}>CapitalWeather</Text>
        </TouchableOpacity>
      </View>
    );
  }
  countrydata() {
    const data = this.state.dataSource,
      i = 0;
    const countryDataInfo = [];
    //console.log('data===>', JSON.stringify(data[i].population,))

    for (let i = 0; i < data.length; i++) {
      if (data[i].name.includes(this.state.countryName)) {
        countryDataInfo.push([
          data[i].capital,
          data[i].population,
          data[i].latlng,
          data[i].flag,
        ]);
      }
    }
    this.setState({
      countryDataInfo: countryDataInfo,
      showdata: true,
      list: false,
    });
  }

  render() {
    return (
      <View style={{marginVertical: 30}}>
        {this.state.list ? (
          <View style={{alignItems: 'center'}}>
            <TextInput
              value={this.state.countryName}
              onChangeText={(countryName) => this.setState({countryName})}
              placeholder={'Enter Country'}
              style={{height: 45, width: '80%', borderWidth: 0.6}}
            />
            <TouchableOpacity
              onPress={() => this.countrydata()}
              style={{
                backgroundColor:
                  this.state.countryName.length >= 1
                    ? '#ff0e0c'
                    : 'rgba(255,47,39,0.52)',
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                width: '80%',
                marginVertical: 30,
              }}>
              <Text style={{color: '#fff'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : this.state.showdata ? (
          <FlatList
            data={this.state.countryDataInfo}
            renderItem={(item) => this.renderData(item)}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={{marginVertical: 30}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Capital</Text>
              <Text style={{fontWeight: 'bold'}}>Capital</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default CountryInfo;
