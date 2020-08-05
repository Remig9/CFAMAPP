import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {
  H1,
  Touch,
  Button,
  AuthInput,
  LargeText,
  RegularText,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {RW, RH, RF} from '../../helpers/resize';
import Snackbar from '../../helpers/Snackbar';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {setUserToken} from '../../redux/actions/users.action';
import {AuthContext} from '../../navigation/AuthProvider';

const mapDispatchToProps = {
  setUserToken,
};

const Login = ({navigation, setUserToken}) => {
  const {login} = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email != '') {
      if (validateEmail(email)) {
        if (password != '') {
          loginUsers();
          // login();
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
  };

  const loginUsers = async () => {
    setLoading(true);

    await axios
      .post(
        config.login,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            publicToken: publicToken.token,
          },
        },
      )
      .then(async (res) => {
        console.log(res);
        if (res.data.content.verified) {
          setUserToken(res.headers['x-auth-token']);
          await AsyncStorage.setItem('userToken', res.headers['x-auth-token']);
          login();
        } else {
          navigation.navigate('EnterCode', {
            email: res.data.content.email,
            phoneNumber: res.data.content.phoneNumber,
            country: res.data.content.countryCode,
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.warn(err.response.data);
        // login();

        setLoading(false);
        setVisible(true);
        setMsg(
          err.response.data !== undefined
            ? err.response.data
            : 'Unable to login, make sure you are connected to the internet',
        );

        setType('w');
      });
  };

  const validateEmail = (a) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(a).toLowerCase());
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
        style={styles.login}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center', paddingHorizontal: 40}}>
          <LargeText style={styles.infoTxt}>
            Log in your CAFAM account.
          </LargeText>

          <AuthInput
            type={'email-address'}
            placeholder="Email"
            labelstyle={styles.labelstyle}
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <AuthInput
            input={styles.inputStyle}
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

          <Button
            isLoading={loading}
            onPress={handleLogin}
            borderColor={Colors.red}
            backgroundColor={Colors.red}
            name="LOG IN"
            color="white"
            style={{width: RW(92)}}
          />

          <View style={{height: 34}} />
          <Touch
            onPress={() => navigation.push('Forgot')}
            style={{alignItems: 'center', paddingVertical: 10}}>
            <RegularText style={{color: Colors.red}}>
              Forgotten Password?
            </RegularText>
          </Touch>
        </View>
      </ScrollView>

      <View style={styles.signupWrapper}>
        <RegularText>Don't have an account ?</RegularText>
        <Touch onPress={() => navigation.push('Signup')}>
          <RegularText style={styles.signupTxt}> Sign up</RegularText>
        </Touch>
      </View>
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
  },
  login: {
    // padding: 24,
    // marginTop: 40,
  },
  labelstyle: {
    // fontWeight: 'bold',
    fontSize: 18,
    color: Colors.black,
  },
  inputStyle: {
    color: 'black',
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
  signupTxt: {
    color: Colors.red,
  },

  forgotInfo: {
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
    fontSize: 18,
    color: Colors.red,
    marginTop: 12,
    marginLeft: RW(-57),
    textDecorationLine: 'underline',
  },
  authInput: {
    fontSize: RF(30),
    // alignItems: "center",
  },
});

export default connect(null, mapDispatchToProps)(Login);
