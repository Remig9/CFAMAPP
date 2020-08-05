import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {H1, Button, LargeText, RegularText} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {church} from '../../helpers/churchdetails';

const Confirm = ({navigation, route}) => {
  const {email, phoneNumber, country} = route.params;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <View style={styles.login}>
        <Image
          style={styles.imageStyle}
          source={require('../../../assets/images/congrats.png')}
        />
        <LargeText style={styles.congrats}>Congratulations!</LargeText>
        <RegularText style={styles.churchConfirm}>
          Great! You've successfully signed up for {church.name} church app.
        </RegularText>

        <RegularText style={styles.churchTxt}>
          We've sent code to your email address and mobile number. Please check
          your mailbox or sms inbox on your phone for code. It may take up to 5
          minutes before it shows up in your inbox.
        </RegularText>
        <Button
          borderColor={Colors.red}
          onPress={() =>
            navigation.push('EnterCode', {
              email,
              phoneNumber,
              country,
            })
          }
          style={{top: 10, width: '100%'}}
          backgroundColor={Colors.red}
          name="PROCEED TO ENTER CODE"
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    // alignItems:"center",
    padding: 16,
  },
  login: {
    padding: 24,
  },
  labelstyle: {
    fontSize: 18,
  },
  imageStyle: {
    alignSelf: 'center',
    marginBottom: 32,
  },

  congrats: {
    color: Colors.white,
    alignSelf: 'center',
  },

  churchConfirm: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.white,
  },
  churchTxt: {
    marginTop: 12,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 22,
  },
});

export default Confirm;
