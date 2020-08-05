import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {H1, Touch, Button, PageHeaderContainer} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RH, RF, RW} from '../../helpers/resize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {elevationShadowStyle} from '../../helpers/utils';
import {Searchbar} from 'react-native-paper';
import {publicToken, config} from '../../helpers/config';
import axios from 'axios';
import {Paragraph, Menu, Divider, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {setChurchDestination} from '../../redux/actions/offering.action';
import Snackbar from '../../helpers/Snackbar';
import {AppHeader2, Textview} from '../../components/components';
import {ChurchDropdown, ChurchModal} from '../../components';

console.disableYellowBox = true;

const mapStateToProps = ({offering}) => ({
  offering,
});

const mapDispatchToProps = {
  setChurchDestination,
};

const AddChurch = ({
  navigation,
  setChurchDestination,
  offering: {destinationDetails},
}) => {
  const [showCountry, setShowCountry] = useState(false);
  const [showState, setShowState] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [valueCountry, setValueCountry] = useState('');
  const [valueState, setValueState] = useState('');
  const [countryPlaceholder, setCountryPlaceholder] = useState(
    'Select Country...',
  );
  const [statePlaceholder, setStatePlaceholder] = useState('Select State...');

  //for android
  const [showCountryAndroid, setShowCountryAndroid] = useState(false);
  const [showStateAndroid, setShowStateAndroid] = useState(false);
  const [listOfCountriesAndroid, setListOfCountriesAndroid] = useState([]);
  const [listOfStateAndroid, setListOfStateAndroid] = useState([]);

  const [countryId, setCountryId] = useState('');
  const [churches, setChurches] = useState([]);

  //Initiate church details state
  const [listOfFilteredChurches, setListOfFilteredChurches] = useState('');
  const [userToken, setUserToken] = useState('');

  //handle selection
  const [churchSelect, setChurchSelect] = useState(false);

  //sncakbar
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    loadCountries(token);

    setUserToken(token);
  };

  const loadCountries = async (token) => {
    await axios
      .get(config.loadCountries, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': token,
        },
      })
      .then(({data}) => {
        const sort = [];
        data.forEach((element) => {
          sort.push({label: element.name, value: element._id});
        });

        setValueCountry(sort);
        console.warn('countries', sort);

        setListOfCountriesAndroid(data);
        console.warn('country', data);
        setUserToken(token);
      })
      .catch((err) => {
        console.warn('country', err);
        // loadCountries();
      });
  };

  const handleChooseState = async (state) => {
    await axios
      .get(config.loadStates + state, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then(({data}) => {
        const sort = [];
        data.forEach((element) => {
          sort.push({label: element.name, value: element._id});
        });

        setValueState(sort);
        console.warn('countries', sort);
        setListOfStateAndroid(data);
        console.warn('country', data);

        // console.warn('states', data);
        // setValueState(data);
      })
      .catch((err) => {
        console.warn('state erro', err);
        //  loadCountries();
      });
  };

  const loadChurhes = async (state) => {
    await axios
      .get(`${config.signup}/church?countryId=${countryId}&state=${state}`, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then(({data}) => {
        console.warn('churches', data);
        setChurches(data);
      })
      .catch((err) => {
        console.warn('load error', err);
        // loadCountries();
      });
  };

  const showStateList = () => {
    setShowState(!showState);
  };

  const closeState = () => {
    setShowState(false);
  };

  const handleCountryPress = (country) => {
    console.warn(country);
    setShowCountry(false);
    setCountryId(country);
    handleChooseState(country);
  };

  const handleStatePress = (country, name) => {
    setShowState(false);
    setStatePlaceholder(name);
    loadChurhes(name);
  };

  const onChangeSearch = (query) => {
    let filteredData = churches.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = query.toUpperCase();
      return itemData.includes(textData);
    });
    setListOfFilteredChurches(filteredData);
    setSearchQuery(query);
  };

  const handleChurchPicked = (item) => {
    setChurchDestination(item);
    setChurchSelect(true);
  };

  const handleContinue = () => {
    if (churchSelect) {
      navigation.navigate('Offering');
    } else {
      setVisible(true);
      setMsg(
        'Please select a church before you continue, or use the back button.',
      );
      setType('w');
    }
  };
  //android functions
  const handleShowCountries = () => {
    setShowCountryAndroid(true);
  };
  const handleCloseCountries = () => {
    setShowCountryAndroid(false);
  };
  const handleCountryPicked = (name, id) => {
    handleChooseState(id);
    setShowCountryAndroid(false);
    setCountryPlaceholder(name);
    setCountryId(id);
  };

  const handleShowStates = () => {
    setShowStateAndroid(true);
  };
  const handleCloseStates = () => {
    setShowStateAndroid(false);
  };
  const handleStatePicked = (name, id) => {
    loadChurhes(name);
    setShowStateAndroid(false);
    setStatePlaceholder(name);
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  const EmptyComponent = () => {
    return (
      <View style={{flex: 1}}>
        <Textview>There is no church available in this location</Textview>
      </View>
    );
  };
  return (
    <Provider>
      <View style={styles.container}>
        <AppHeader2
          lefticon="arrow-back"
          title="Add Church"
          onBack={() => navigation.goBack()}
        />

        <ScrollView>
          <View style={styles.offeringContainer}>
            <View style={styles.rowView}>
              <View style={{marginTop: 10}}>
                <Text style={styles.formText}> Country </Text>

                {Platform.OS == 'android' ? (
                  <ChurchModal
                    handleShowItems={handleShowCountries}
                    visible={showCountryAndroid}
                    onBackdropPress={handleCloseCountries}
                    onBackButtonPress={handleCloseCountries}
                    data={listOfCountriesAndroid}
                    handleItemPicked={handleCountryPicked}
                    placeholder={countryPlaceholder}
                  />
                ) : (
                  <ChurchDropdown
                    value={countryPlaceholder}
                    items={valueCountry}
                    labelRoot={{width: 100}}
                    viewContainer={{width: RW(42)}}
                    handleValue={(country) => handleCountryPress(country)}
                  />
                )}
              </View>

              {/* {countryId !== '' ? ( */}
              <>
                <View style={{marginTop: 10}}>
                  <Text style={styles.formText}> State </Text>

                  {Platform.OS == 'android' ? (
                    <ChurchModal
                      handleShowItems={handleShowStates}
                      visible={showStateAndroid}
                      onBackdropPress={handleCloseStates}
                      onBackButtonPress={handleCloseStates}
                      data={listOfStateAndroid}
                      handleItemPicked={handleStatePicked}
                      placeholder={statePlaceholder}
                    />
                  ) : (
                    <ChurchDropdown
                      value={statePlaceholder}
                      items={valueState}
                      labelRoot={{width: 100}}
                      viewContainer={{width: RW(42)}}
                      handleValue={(state) => handleStatePress(state)}
                    />
                  )}
                </View>
              </>
              {/* ) : null} */}
            </View>

            {typeof churches[0] !== 'undefined' && (
              <>
                <View style={{paddingHorizontal: RW(5)}}>
                  <View style={styles.selectChurch}>
                    <Searchbar
                      placeholder="Search"
                      onChangeText={onChangeSearch}
                      value={searchQuery}
                    />
                  </View>
                  <FlatList
                    data={
                      listOfFilteredChurches &&
                      listOfFilteredChurches.length > 0
                        ? listOfFilteredChurches
                        : churches
                    }
                    renderItem={({item}) => {
                      return (
                        <>
                          <Touch
                            onPress={() => handleChurchPicked(item)}
                            style={[
                              styles.cardStyle,
                              destinationDetails &&
                                destinationDetails._id === item._id && {
                                  borderColor: 'red',
                                },
                            ]}>
                            <H1 style={styles.churchName}>{item.name}</H1>
                            <View style={{flexDirection: 'row'}}>
                              <MaterialIcons
                                name="location-on"
                                size={16}
                                color={Colors.red}
                                style={{marginTop: RH(1)}}
                              />
                              <H1 style={styles.churchTxt}>{item.address}</H1>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                              <FontAwesome5
                                name="user-alt"
                                size={16}
                                color={Colors.red}
                                style={{marginTop: RH(1)}}
                              />
                              <H1 style={styles.churchTxt}> {item.pastor}</H1>
                            </View>
                          </Touch>
                        </>
                      );
                    }}
                    keyExtractor={(item) => item._id}
                  />
                  {churches.length == 0 && <EmptyComponent />}
                </View>
                <Button
                  onPress={handleContinue}
                  style={{
                    width: RW(88),
                    borderWidth: 0,
                    alignSelf: 'center',
                  }}
                  backgroundColor="red"
                  color="white"
                  name="CONTINUE"
                />
              </>
            )}
          </View>
          <Snackbar
            visible={visible}
            handleClose={handleClose}
            msg={msg}
            type={type}
          />
          <View style={{height: RH(20)}} />

          <View style={{height: RH(10)}} />
        </ScrollView>
      </View>
    </Provider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.mainColor,
  },
  login: {
    flex: 1,
    marginTop: RH(3),
    height: 100,
  },

  progressBar: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: RH(4),
    alignItems: 'center',
  },

  dot: {
    backgroundColor: Colors.white,
    height: 10,
    width: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: Colors.white,
  },
  labelstyle: {
    fontSize: 18,
  },
  forgotTxt: {
    color: Colors.red,
    fontSize: 16,
    position: 'absolute',
    right: 6,
    marginTop: 30,
  },
  signupWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  signupTxt: {
    color: Colors.green,
    // fontWeight: "bold",
    fontSize: 18,
  },
  signupInfo: {
    // color: Colors.green,
    // fontWeight: "bold",
    fontSize: 18,
  },
  cardStyle: {
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.gray,
    marginTop: RH(4),
    borderRadius: 8,
  },
  churchName: {
    fontSize: 17,
    // fontWeight: "bold",
    marginBottom: 8,
  },
  churchTxt: {
    fontSize: 12,
    marginBottom: 4,
    marginTop: RH(1),
    marginLeft: RW(1.2),
  },
  mapStyle: {
    width: 200,
    height: 200,
  },
  almostDone: {
    color: Colors.white,
    // fontWeight: "bold",
    fontSize: 20,
    alignSelf: 'center',
    marginTop: RH(12),
  },

  formText: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 8,
    marginTop: 4,
  },
  pickerInput: {
    marginTop: 12,
  },
  pickerStyle: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: Colors.gray,
    backgroundColor: 'white',
    borderColor: Colors.black,
    height: RH(7),
    paddingRight: 30, // to ensure the text is never behind the icon
  },

  menuStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeBtn: {
    width: '100%',
    padding: RH(2.2),
    backgroundColor: Colors.red,
    borderRadius: 10,
    marginTop: RH(3),
    alignItems: 'center',
    borderColor: Colors.red,
    borderWidth: 1,
    ...elevationShadowStyle(3),
  },
  disabledBtn: {
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
  },
  btnTxt: {
    color: Colors.white,
    fontSize: RF(40),
    // fontWeight: "bold",
  },
  selectChurch: {
    marginTop: RH(4),
    marginBottom: RH(-1),
    paddingHorizontal: 8,
  },
  searchStyle: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    // marginTop: RH(-4),
    marginBottom: 3,
    width: 100,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    width: RW(40),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RW(4),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChurch);
