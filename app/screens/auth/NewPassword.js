import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {
  HeaderContainer,
  InputLabel,
  Button,
  PageHeaderContainer,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RH, RW} from '../../helpers/resize';

const Password = ({navigation}) => {
  return (
    <View style={styles.container}>
      <PageHeaderContainer
        backPress={() => navigation.goBack(null)}
        title="Set New Password"
        back="md-arrow-back"
      />

      <View style={styles.input}>
        <TextInput style={styles.emailInput} placeholder=" New Password" />

        <TextInput style={styles.emailInput} placeholder="Confirm  Password" />

        <Button
          // onPress={() => navigation.push("Password")}
          style={{top: 10, borderWidth: 0}}
          backgroundColor={Colors.red}
          name="Confirm Code"
          color="white"
        />
      </View>
    </View>
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
  input: {
    padding: 24,
    marginTop: RH(10),
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
    marginTop: RH(2),
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
});

export default Password;
