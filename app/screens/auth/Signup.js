import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import {
  Touch,
  Button,
  AuthInput,
  LargeText,
  RegularText,
} from '../../helpers/components';
import Fonts from '../../helpers/fonts';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {RW, RH, RF} from '../../helpers/resize';
import CountryPicker from 'react-native-country-picker-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Snackbar from '../../helpers/Snackbar';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
// import Network from '../../helpers/Network';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import Terms from './Terms';
import Policy from './Policy';

const Signup = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [countryCode, setCountryCode] = useState('NG');
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handleSignup = async () => {
    console.warn(Platform.OS);
    if (firstName != '') {
      if (lastName != '') {
        if (email != '') {
          if (validateEmail(email)) {
            if (password != '') {
              if (password.length >= 7 && password.length <= 20) {
                if (phoneNumber != '') {
                  if (phoneNumber.length === 10) {
                    if (agreeTerms && agreePolicy) {
                      signupUsers();
                    } else {
                      setVisible(true);
                      setMsg(
                        'Accept Both Privacy Policy and also Terms and Condition',
                      );
                      setType('w');
                    }
                  } else {
                    setVisible(true);
                    setMsg(
                      "Enter a valid phone number, ignoring the first '0' ",
                    );
                    setType('w');
                  }
                } else {
                  setVisible(true);
                  setMsg('Please enter your phone number!');
                  setType('w');
                }
              } else {
                setVisible(true);
                setMsg('Password length should be between 7 and 20 characters');
                setType('w');
              }
            } else {
              setVisible(true);
              setMsg('Password required!!!');
              setType('w');
            }
          } else {
            setVisible(true);
            setMsg('Please enter a valid email address!');
            setType('w');
          }
        } else {
          setVisible(true);
          setMsg('Email Address is required!');
          setType('w');
        }
      } else {
        setVisible(true);
        setMsg('Please enter your Last Name!');
        setType('w');
      }
    } else {
      setVisible(true);
      setMsg('Please enter your First Name!');
      setType('w');
    }
  };

  const signupUsers = async () => {
    setLoading(true);
    await axios
      .post(
        config.signup,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          countryCode: country !== null ? country.callingCode[0] : '234',
          password: password,
          platform: Platform.OS,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            publicToken: publicToken.token,
          },
        },
      )
      .then(async (res) => {
        console.warn('....', res);
        setLoading(false);

        navigation.navigate('Confirm', {
          email,
          phoneNumber,
          country,
        });
      })
      .catch((err) => {
        console.warn(err.response);

        setLoading(false);

        setVisible(true);
        setMsg(err.response['data']);
        setType('w');
      });
  };

  const validateEmail = (a) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(a).toLowerCase());
  };

  const validatePassword = (str) => {
    let re = /^[a-z0-9]+$/i;
    return re.test(String(str).toLowerCase());
  };

  const showTerms = () => {
    setTerms(true);
  };

  const closeTerms = () => {
    setTerms(false);
  };

  const showPolicy = () => {
    setPolicy(true);
  };

  const closePolicy = () => {
    setPolicy(false);
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  return (
    // <Network>
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        style={styles.login}>
        <LargeText style={{textAlign: 'center'}}>
          Create your CAFAM account.
        </LargeText>

        <View style={styles.textFields}>
          <AuthInput
            type={'email-address'}
            placeholder="Email"
            labelstyle={styles.labelstyle}
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <AuthInput
            // input={styles.inputStyle}
            secureTextEntry={hidePassword}
            placeholder="Password"
            labelstyle={styles.labelstyle}
            showPassword={() => setHidePassword(!hidePassword)}
            inputIcon={
              hidePassword ? (
                <Feather name="eye" size={20} color="#c1c1c1" />
              ) : (
                <Feather name="eye-off" size={20} color="#c1c1c1" />
              )
            }
            value={password}
            onChangeText={(password) => setPassword(password)}
          />

          <AuthInput
            placeholder="First Name"
            labelstyle={styles.labelstyle}
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <AuthInput
            placeholder="Last Name"
            labelstyle={styles.labelstyle}
            value={lastName}
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>

        <View style={styles.mobileNumber}>
          <CountryPicker region="Africa" {...{countryCode, onSelect}} />
          <MaterialIcons
            name="arrow-drop-down"
            size={30}
            color="black"
            style={{marginLeft: RW(-2.5)}}
          />
          <TextInput
            placeholder="Mobile Number"
            style={[styles.authInput]}
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            keyboardType={'numeric'}
            placeholderTextColor={Colors.gray}
            // onChangeText={props.onChangeText}
            // numberOfLines={props.numberOfLines}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: RH(3),
            marginLeft: RW(10),
          }}>
          <CheckBox
            containerStyle={{marginRight: RW(-1)}}
            onPress={() => setAgreePolicy(!agreePolicy)}
            center
            checkedColor={Colors.red}
            checked={agreePolicy}
          />

          <RegularText>I agree to the</RegularText>
          <Touch onPress={showPolicy}>
            <RegularText style={styles.termsInfo}>Privacy Policy</RegularText>
          </Touch>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: RH(0),
            marginLeft: RW(10),
          }}>
          <CheckBox
            containerStyle={{marginRight: RW(-1)}}
            onPress={() => setAgreeTerms(!agreeTerms)}
            center
            checkedColor={Colors.red}
            checked={agreeTerms}
          />

          <RegularText>I agree to the</RegularText>
          <Touch onPress={showTerms}>
            <RegularText style={styles.termsInfo}>
              Terms and Condition
            </RegularText>
          </Touch>
        </View>
        <Button
          isLoading={loading}
          onPress={handleSignup}
          borderColor={Colors.red}
          backgroundColor={Colors.red}
          name="CREATE ACCOUNT"
          color="white"
          style={{width: RW(92), alignSelf: 'center'}}
        />

        {/* <View style={{ height: 34 }} /> */}
      </ScrollView>
      <View style={styles.signupWrapper}>
        <RegularText>Already have an account ?</RegularText>
        <Touch onPress={() => navigation.push('Login')}>
          <RegularText style={styles.signupTxt}> Log In</RegularText>
        </Touch>
      </View>

      <Modal
        animationInTiming={2000}
        isVisible={terms}
        onBackdropPress={closeTerms}>
        <Terms cancel={closeTerms} />
      </Modal>
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />

      <Modal isVisible={policy} onBackdropPress={closePolicy}>
        <Policy cancel={closePolicy} />
      </Modal>
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </View>
    // </Network>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  login: {
    // padding: 24,
  },
  labelstyle: {
    fontSize: Fonts.size18,
  },
  textFields: {
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center',
    marginBottom: RH(2),
  },
  mobileNumber: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 3,
    alignItems: 'center',
    marginTop: RH(2),
    padding: RH(0.6),
    width: RW(92),
    alignSelf: 'center',
    height: RH(8),
  },
  signupTxt: {
    color: Colors.red,
  },

  forgotInfo: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 24,
    color: Colors.red,
  },
  infoTxt: {
    textAlign: 'center',
    color: Colors.black,
  },

  leftTextStyle: {
    fontSize: 18,
  },
  checkBox: {
    flex: 1,
    padding: 10,
    marginTop: 12,
  },
  termsInfo: {
    // fontWeight: "bold",
    fontSize: 16,
    color: Colors.red,
    marginLeft: RW(1),
    width: RW(69),
    textDecorationLine: 'underline',
  },
  authInput: {
    flex: 1,
    fontSize: RF(48),
    alignItems: 'center',
    textAlign: 'center',
    left: RW(-10),
    color: Colors.black,
    height: RH(10),
  },
});

export default Signup;
