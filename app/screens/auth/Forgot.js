import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, StatusBar} from 'react-native';
import {
  Touch,
  InputLabel,
  Button,
  H1,
  AuthInput,
  LargeText,
  RegularText,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';

const Forgot = ({navigation}) => {
  const handleForgotPassword = () => {
    navigation.push('Login');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />

      <View style={styles.login}>
        <LargeText style={styles.welcomeTxt}>Forgot your</LargeText>
        <LargeText style={styles.nameTxt}>Password?</LargeText>
      </View>
      <View>
        <RegularText style={styles.enterTxt}>
          Please enter your email and we will send you a code to reset your
          password{' '}
        </RegularText>
      </View>

      <View>
        <View style={styles.authLabel}>
          <TextInput
            // value={props.value}
            style={[styles.authInput]}
            keyboardType="email-address"
            // onChangeText={props.onChangeText}
            placeholder={'Email address'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Touch style={{right: 10}}>{/* {props.inputIcon} */}</Touch>
        </View>

        <Button
          // onPress={() => navigation.push('Reset')}
          backgroundColor={Colors.red}
          borderColor={Colors.red}
          name="GET A PASSCODE"
          color="white"
          style={styles.sendBtn}
        />
      </View>
      <View style={styles.signupWrapper}>
        <RegularText style={styles.signupInfo}>
          Remembered your password ?
        </RegularText>
        <Touch onPress={handleForgotPassword}>
          <H1 style={styles.signupTxt}> Log In</H1>
        </Touch>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  login: {
    padding: 24,
    marginTop: 40,
  },
  input: {
    padding: 24,
  },
  labelstyle: {
    // fontWeight: 'bold',
    fontSize: 18,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(6.3),
    padding: 7,
    width: RW(86),
  },
  signupWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  signupTxt: {
    color: Colors.red,
    fontSize: 16,
  },
  signupInfo: {
    fontSize: 16,
  },
  welcomeTxt: {
    alignSelf: 'center',
  },
  nameTxt: {
    alignSelf: 'center',
    marginBottom: RH(5),
  },
  enterTxt: {
    // fontSize: RF(44),
    textAlign: 'center',
    alignSelf: 'center',
    width: RW(85),
    fontSize: 18,
  },
  authLabel: {
    padding: RH(0.5),
    borderRadius: RH(0.5),
    marginTop: RH(2.3),
    fontWeight: 'normal',
    // flex: 1,
    width: RW(83),
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#c1c1c1',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  authInput: {
    flex: 1,
    fontSize: RF(40),
    alignItems: 'center',
    height: RH(6),
    paddingHorizontal: RW(2),
    paddingVertical: 10,
    textAlign: 'center',
  },
  sendBtn: {
    width: RW(85),
    alignSelf: 'center',
  },
});

export default Forgot;
