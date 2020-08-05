import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Linking,
  StatusBar,
} from 'react-native';
import {
  H1,
  Touch,
  PageHeaderContainer,
  Button,
  InputTextLabel,
  RegularTextBold,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {church} from '../../helpers/churchdetails';

const Profile = ({navigation, route}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <PageHeaderContainer
        title="Support"
        back="md-arrow-back"
        backPress={() => navigation.goBack()}
      />

      <View style={styles.supportWrap}>
        <View style={styles.circleStyle}>
          <Image source={require('../../../assets/images/support.png')} />
        </View>

        <View style={styles.callStyle}>
          <RegularTextBold style={styles.nameTxt}>
            Call us on {church.phone}
          </RegularTextBold>
        </View>
        <View>
          <Button
            onPress={() => Linking.openURL(`tel:${church.phone}`)}
            name="DIAL NOW"
            style={styles.updateBtn}
            backgroundColor={Colors.red}
            color={Colors.white}
          />
          <Button
            name="CHAT US UP"
            style={[styles.updateBtn]}
            color={Colors.red}
            backgroundColor={Colors.white}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whitesmoke,
  },

  circleStyle: {
    height: 170,
    width: 170,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: RH(8),
    backgroundColor: Colors.skyblue,
  },

  supportWrap: {
    flex: 1,
    justifyContent: 'space-around',
  },

  labelstyle: {
    // fontWeight: "bold",
    fontSize: RF(28),
    marginTop: RH(3),
  },
  nameTxt: {
    fontSize: RF(40),
    // fontWeight: "bold",
  },
  detailstyle: {
    fontSize: RF(28),
    color: Colors.gray,
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RH(3),
    paddingHorizontal: RW(8),
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.gray,
    marginTop: RH(3),
  },
  profileBtn: {
    width: RW(30),
    padding: 9,
    borderWidth: 0,
    marginTop: RH(1),
  },
  updateBtn: {
    width: RW(80),
    padding: 14,
    borderWidth: 0,
    marginTop: RH(2),
    alignSelf: 'center',
  },

  profileChange: {
    width: RW(30),
    padding: 9,
    borderWidth: 1,
    marginTop: RH(1),
    borderColor: Colors.red,
  },
  callStyle: {
    marginVertical: RH(3),
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 9,
    borderColor: Colors.gray,
    width: RW(90),
    marginTop: RH(1),
  },
});

export default Profile;
