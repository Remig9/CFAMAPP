import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  H1,
  Container,
  Touch,
  AuthInput,
  Button,
} from '../../helpers/components';
import {Dropdown} from 'react-native-material-dropdown';
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
import {setUserToken} from '../../redux/actions/users.action';

import Snackbar from '../../helpers/Snackbar';
import {AuthContext} from '../../navigation/AuthProvider';

const mapStateToProps = ({offering, user}) => ({
  offering,
  user,
});

const mapDispatchToProps = {
  setChurchDestination,
  setUserToken,
};

const JoinChurch = ({
  navigation,
  setChurchDestination,
  offering: {destinationDetails},
  user: {userToken},
  setUserToken,
}) => {
  const [showCountry, setShowCountry] = useState(false);
  const [showState, setShowState] = useState(false);
  const [chooseState, setChooseState] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [valueCountry, setValueCountry] = useState('');
  const [valueState, setValueState] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryPlaceholder, setCountryPlaceholder] = useState(
    'Select Country...',
  );
  const [statePlaceholder, setStatePlaceholder] = useState('Select State...');

  const [countryId, setCountryId] = useState('');
  const [country, setCountry] = useState('');
  const [churches, setChurches] = useState([]);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  //Initiate church details state
  const {login} = useContext(AuthContext);

  const [listOfFilteredChurches, setListOfFilteredChurches] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    loadCountries(token);
  };

  const loadCountries = async (token) => {
    setLoading(true);
    await axios
      .get(config.loadCountries, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then(({data}) => {
        setValueCountry(data);
        console.warn('country', data);
        console.warn('hey', valueCountry);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        // loadCountries();
      });
  };

  const handleChooseState = async (state) => {
    console.warn(userToken);
    setLoading(true);
    await axios
      .get(config.loadStates + state, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then(({data}) => {
        console.warn('states', data);
        setValueState(data);
        console.warn('sttstst', valueState);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        //  loadCountries();
      });
  };

  const loadChurhes = async (state) => {
    setLoading(true);
    console.warn(userToken);

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
        setLoading(false);
      })
      .catch((err) => {
        console.warn('church error', err.response);
        // loadCountries();
      });
  };

  const showCountryList = () => {
    setShowCountry(!showCountry);
  };

  const showStateList = () => {
    setShowState(!showState);
  };

  const closeMenu = () => {
    setShowCountry(false);
  };

  const closeState = () => {
    setShowState(false);
  };

  const handleCountryPress = (country, name) => {
    setShowCountry(false);
    setCountryId(country);
    handleChooseState(country);
    setCountryPlaceholder(name);
  };

  const handleStatePress = (country, name) => {
    // alert(name);
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

  const handleChurchPicked = async (item, color) => {
    setChurchDestination(item);

    console.warn(config.joinChurch + item._id);

    await axios
      .put(
        config.joinChurch + item._id,
        {},
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': userToken,
          },
        },
      )
      .then((res) => {
        console.warn('church de', res.headers['x-auth-token']);
        setUserToken(res.headers['x-auth-token']);
        setVisible(true);
        setMsg(res.data);
        setType('w');
      })
      .catch((error) => {
        console.warn('chur de', error.response);
        console.warn('chur de', error);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  const handleComplete = () => {
    if (destinationDetails) {
      // navigation.navigate('SelectChurch', {
      //   address: destinationDetails.address,
      //   name: destinationDetails.name,
      // });
      login();
    } else {
      alert('Please select a church');
    }
  };
  return (
    <Provider>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <H1 style={styles.almostDone}>Almost Done</H1>
          <View style={styles.progressBar}>
            <View style={styles.dot} />
            <View
              style={[
                styles.line,
                countryPlaceholder == 'Select Country...'
                  ? {backgroundColor: 'gray'}
                  : null,
              ]}
            />
            <View
              style={[
                styles.dot,
                countryPlaceholder == 'Select Country...'
                  ? {backgroundColor: 'gray'}
                  : null,
              ]}
            />
            <View
              style={[
                styles.line,
                statePlaceholder == 'Select State...'
                  ? {backgroundColor: 'gray'}
                  : null,
              ]}
            />
            <View
              style={[
                styles.dot,
                statePlaceholder == 'Select State...'
                  ? {backgroundColor: 'gray'}
                  : null,
              ]}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.login}>
            <Container containerStyle={{flex: 1}}>
              <View style={{}}>
                <View>
                  <Text style={styles.formText}>Choose Country </Text>
                </View>

                <View style={styles.menuStyle}>
                  <Menu
                    visible={showCountry}
                    onDismiss={closeMenu}
                    anchor={
                      <Touch
                        onPress={showCountryList}
                        style={styles.inputStyle}>
                        <H1>{countryPlaceholder}</H1>
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={24}
                          color="black"
                          onPress={showCountryList}
                        />
                      </Touch>
                    }>
                    {valueCountry &&
                      valueCountry.map((item) => {
                        return (
                          <Menu.Item
                            onPress={() =>
                              handleCountryPress(item._id, item.name)
                            }
                            title={item.name}
                          />
                        );
                      })}
                  </Menu>

                  {/* <Dropdown
                    // value={this.state.label}
                    // overlayStyle={styles.stt}
                    inputContainerStyle={{
                      borderBottomColor: 'transparent',
                      marginBottom: RH(-1),
                    }}
                    data={showCountryList}
                    pickerStyle={styles.inputStyle}
                    placeholder={countryPlaceholder}
                    dropdownOffset={{top: 0}}
                    containerStyle={{
                      backgroundColor: '#FAFAFA',
                      borderWidth: 1,
                      borderRadius: 5,
                      width: '37%',
                      marginLeft: '1%',
                      height: '100%',
                      justifyContent: 'center',
                      padding: 10,
                    }}
                    onChangeText={(value) => handleCountryPress(value)}
                  /> */}
                </View>

                {countryId !== '' ? (
                  <>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.formText}> Choose State </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Menu
                        visible={showState}
                        onDismiss={closeState}
                        anchor={
                          <Touch
                            onPress={showStateList}
                            style={styles.inputStyle}>
                            <H1>{statePlaceholder}</H1>
                            <MaterialIcons
                              name="arrow-drop-down"
                              size={24}
                              color="black"
                            />
                          </Touch>
                        }>
                        {valueState &&
                          valueState.map((item) => {
                            return (
                              <Menu.Item
                                onPress={() =>
                                  handleStatePress(item.code, item.name)
                                }
                                title={item.name}
                              />
                            );
                          })}
                      </Menu>
                    </View>
                  </>
                ) : null}

                {typeof churches[0] !== 'undefined' && (
                  <>
                    <View>
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
                                onPress={() => handleChurchPicked(item, 'red')}
                                style={[
                                  styles.cardStyle,
                                  destinationDetails &&
                                    destinationDetails._id === item._id && {
                                      borderColor: Colors.red,
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
                                  <H1 style={styles.churchTxt}>
                                    {item.address}
                                  </H1>
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                  <FontAwesome5
                                    name="user-alt"
                                    size={16}
                                    color={Colors.red}
                                    style={{marginTop: RH(1)}}
                                  />
                                  <H1 style={styles.churchTxt}>
                                    {' '}
                                    {item.pastor}
                                  </H1>
                                </View>
                              </Touch>
                            </>
                          );
                        }}
                        keyExtractor={(item) => item._id}
                      />
                    </View>
                    <Snackbar
                      visible={visible}
                      handleClose={handleClose}
                      msg={msg}
                      type={type}
                    />
                    <Button
                      borderColor={Colors.red}
                      backgroundColor={Colors.red}
                      name="COMPLETE"
                      color="white"
                      onPress={handleComplete}
                    />
                  </>
                )}
              </View>
            </Container>
          </ScrollView>
        </View>
        {loading ? (
          <View style={styles.popUp2}>
            <ActivityIndicator size="large" color="#0f2575" />
          </View>
        ) : null}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
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
    borderRadius: 12,
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
    width: RW(90),
  },
  popUp2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinChurch);
