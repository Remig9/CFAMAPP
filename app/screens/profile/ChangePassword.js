import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  H1,
  Touch,
  PageHeaderContainer,
  Button,
  InputTextLabel,
  AuthInput,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import Snackbar from '../../helpers/Snackbar';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
import Network from '../../helpers/Network';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
});

const Password = ({navigation, user: {userToken}}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlePassword = async () => {
    if (currentPassword != '') {
      if (newPassword != '') {
        if (newPassword.length >= 7 && newPassword.length <= 20) {
          if (newPassword === confirmPassword) {
            changePassword();
          } else {
            setVisible(true);
            setMsg('Passwords do not match');
            setType('w');
          }
        } else {
          setVisible(true);
          setMsg('Password length should be between 7 and 20 characters');
          setType('w');
        }
      } else {
        setVisible(true);
        setMsg('Password can not be empty');
        setType('w');
      }
    } else {
      setVisible(true);
      setMsg('Password can not be empty');

      setType('w');
    }
  };

  const changePassword = async () => {
    setLoading(true);
    await axios
      .put(
        config.changePassword,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            publicToken: publicToken.token,
            'x-auth-token': userToken,
          },
        },
      )
      .then((res) => {
        setLoading(false);
        setVisible(true);
        setMsg('Password has been successfully changed!');
        setType('w');
        setCurrentPassword('');
        setConfirmPassword('');
        setNewPassword('');
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err.response.data);
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
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <PageHeaderContainer
        title="Change Password"
        back="md-arrow-back"
        backPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.topContainer}>
            <H1 style={styles.labelstyle}>Current Password</H1>
            <AuthInput
              secureTextEntry={hidePassword}
              showPassword={() => setHidePassword(!hidePassword)}
              inputIcon={
                hidePassword ? (
                  <Feather name="eye" size={20} />
                ) : (
                  <Feather name="eye-off" size={20} />
                )
              }
              value={currentPassword}
              onChangeText={(password) => setCurrentPassword(password)}
            />

            <H1 style={styles.labelstyle}>New Password</H1>
            <AuthInput
              secureTextEntry={hidePassword}
              showPassword={() => setHidePassword(!hidePassword)}
              inputIcon={
                hidePassword ? (
                  <Feather name="eye" size={20} />
                ) : (
                  <Feather name="eye-off" size={20} />
                )
              }
              value={newPassword}
              onChangeText={(password) => setNewPassword(password)}
            />

            <H1 style={styles.labelstyle}>Confirm New Password</H1>
            <AuthInput
              secureTextEntry={hidePassword}
              showPassword={() => setHidePassword(!hidePassword)}
              inputIcon={
                hidePassword ? (
                  <Feather name="eye" size={20} />
                ) : (
                  <Feather name="eye-off" size={20} />
                )
              }
              value={confirmPassword}
              onChangeText={(password) => setConfirmPassword(password)}
            />
          </View>

          <Button
            isLoading={loading}
            onPress={handlePassword}
            name="UPDATE PASSWORD"
            style={styles.updateBtn}
            backgroundColor={Colors.red}
            color={Colors.white}
          />
        </View>
      </ScrollView>
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
    backgroundColor: Colors.whitesmoke,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: RH(3),
  },
  labelstyle: {
    // fontWeight: "bold",
    fontSize: RF(46),
    marginTop: RH(3),
  },
  nameTxt: {
    fontSize: RF(28),
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
    width: RW(90),
    padding: 18,
    borderWidth: 0,
    marginTop: RH(10),
    alignSelf: 'center',
  },

  profileChange: {
    width: RW(30),
    padding: 9,
    borderWidth: 1,
    marginTop: RH(1),
    borderColor: Colors.red,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 9,
    borderColor: Colors.gray,
    width: RW(90),
    marginTop: RH(1),
  },
});

export default connect(mapStateToProps)(Password);
