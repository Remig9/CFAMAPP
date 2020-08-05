import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {H1, Touch, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';

import {RF, RH, RW} from '../../helpers/resize';
import {config, publicToken} from '../../helpers/config';
import Network from '../../helpers/Network';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';

const EnterAccount = ({route, navigation}) => {
  const [acctNum, setAcctNum] = useState('');
  const [digits, setDigits] = useState('');
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');

  const {bankCode} = route.params;

  const handleVerifyCard = async () => {
    await axios
      .post(
        config.bankTransaction,
        {
          payment: [
            {
              walletId: '5ed2cf37c1fdd76a1caf43e1',
              amount: 9,
            },
            {
              walletId: '5ed2cf37c1fdd76a1caf43e3',
              amount: 1,
            },
          ],
          bankCode: bankCode,
          accountNumber: acctNum,
          churchId: '5ed2cf36c1fdd76a1caf43df',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            publicToken: publicToken.token,
            'x-auth-token': publicToken.usertoken,
          },
        },
      )
      .then((res) => {
        console.warn(res);
        navigation.navigate('PaymentSuccessful', {
          message: res['data'],
        });
      })
      .catch((err) => {
        // console.warn(err.response.data);
        setVisible(true);
        setMsg(err.response.data);
        setType('w');
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
        <View style={styles.login}>
          <View>
            <H1 style={styles.welcomeTxt}>Enter your</H1>
            <H1 style={styles.nameTxt}>Account Number</H1>
          </View>

          <TextInput
            keyboardType={'phone-pad'}
            placeholder="Account Number"
            style={styles.labelstyle}
            value={acctNum}
            onChangeText={(num) => setAcctNum(num)}
            autoFocus={false}
          />
        </View>

        <Button
          onPress={handleVerifyCard}
          backgroundColor={Colors.red}
          name="VERIFY CARD"
          color="white"
          borderColor={Colors.red}
          style={styles.addBtn}
        />

        <Snackbar
          visible={visible}
          handleClose={handleClose}
          msg={msg}
          type={type}
        />
      </View>
    </Network>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    padding: 24,
    marginTop: 40,
  },
  labelstyle: {
    // fontWeight: 'bold',
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
    color: Colors.red,
    // fontWeight: "bold",
    fontSize: 18,
  },
  signupInfo: {
    // color: Colors.green,
    // fontWeight: "bold",
    fontSize: 18,
  },
  welcomeTxt: {
    fontSize: RF(46),
    marginTop: RH(5),
    alignSelf: 'center',
  },
  nameTxt: {
    fontSize: RF(50),
    // fontWeight: "bold",
    alignSelf: 'center',
    marginBottom: RH(5),
  },
  enterTxt: {
    fontSize: RF(30),
    textAlign: 'center',
    alignSelf: 'center',
  },
  labelstyle: {
    width: RW(85),
    height: RH(5),
    borderWidth: 1,
    borderColor: Colors.gray,
    marginTop: RH(5),
    padding: 5,
  },
  addBtn: {
    width: RW(85),
    alignSelf: 'center',
  },
});

export default EnterAccount;
