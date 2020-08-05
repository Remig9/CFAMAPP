import React, {useRef, useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, StatusBar} from 'react-native';
import {
  H1,
  Touch,
  Button,
  LargeText,
  RegularText,
} from '../../helpers/components';
import Colors from '../../helpers/colors';

import {RF, RH, RW} from '../../helpers/resize';
import {config, publicToken} from '../../helpers/config';
import Network from '../../helpers/Network';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';
import {setUserToken} from '../../redux/actions/users.action';
import {connect} from 'react-redux';
import colors from '../../helpers/colors';
import {AuthContext} from '../../navigation/AuthProvider';

const mapDispatchToProps = {
  setUserToken,
};

const EnterCode = ({navigation, route, setUserToken}) => {
  const {onboard} = useContext(AuthContext);

  const [otp, setOtp] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const otpInput = useRef(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const setText = () => {
    otpInput.current.setValue(otp);
  };

  const {email, phoneNumber, country} = route.params;

  const handleOtpValidation = async () => {
    setLoading(true);
    await axios
      .put(
        config.verifyOtp,
        {
          otpCode: otp,
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            publicToken: publicToken.token,
          },
        },
      )
      .then(async (res) => {
        setLoading(false);
        console.warn(res);
        console.warn(res.headers['x-auth-token']);
        setUserToken(res.headers['x-auth-token']);
        await AsyncStorage.setItem('userToken', res.headers['x-auth-token']);
        console.warn('token', token);
        onboard();
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err.response['data']);
        console.warn(otp);
        setVisible(true);
        setMsg(err.response['data']);
        setType('w');
        onboard();
      });
  };
  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };
  return (
    <Network>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Colors.mainColor}
          barStyle="light-content"
        />
        <View>
          <View style={styles.login}>
            <View>
              <LargeText style={styles.welcomeTxt}>Verify your</LargeText>
              <LargeText style={styles.nameTxt}>code</LargeText>

              <RegularText style={styles.enterTxt}>
                Please enter the code sent to{' '}
              </RegularText>
              <H1 style={styles.enterTxt}>
                {' '}
                {country == null ? '+234' : country}
                {phoneNumber}
              </H1>
            </View>

            <TextInput
              keyboardType={'numeric'}
              placeholder="OTP Code"
              placeholderTextColor={colors.gray}
              style={styles.labelstyle}
              value={otp}
              onChangeText={(num) => setOtp(num)}
              maxLength={4}
              autoFocus={false}
            />
          </View>

          <Button
            isLoading={loading}
            onPress={handleOtpValidation}
            backgroundColor={colors.red}
            color="white"
            name="CONTINUE"
            style={{width: 300, alignSelf: 'center', borderWidth: 0}}
          />
        </View>
        <View style={styles.signupWrapper}>
          <RegularText style={styles.signupInfo}>
            Didn't get the code ?
          </RegularText>
          <Touch>
            <RegularText style={styles.signupTxt}> Resend now</RegularText>
          </Touch>
        </View>
      </View>
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </Network>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    padding: 24,
  },
  labelstyle: {
    width: RW(75),
    height: RH(6),
    borderWidth: 1,
    borderColor: Colors.gray,
    marginTop: RH(5),
    padding: 5,
    borderRadius: 6,
    textAlign: 'center',
    color: colors.black,
  },

  signupWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  signupTxt: {
    color: Colors.red,
  },

  welcomeTxt: {
    alignSelf: 'center',
  },
  nameTxt: {
    alignSelf: 'center',
    marginBottom: RH(5),
  },
  enterTxt: {
    fontSize: RF(50),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default connect(null, mapDispatchToProps)(EnterCode);
