import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {
  PageHeaderContainer,
  Button,
  InputTextLabel,
  LargeInputTextLabel,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import Snackbar from '../../helpers/Snackbar';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import {connect} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {AppHeader2} from '../../components/components';

const mapStateToProps = (state) => ({
  user: state.user,
});

const PrayerRequestInput = ({navigation, user}) => {
  const [prayerPoint, setPrayerPoint] = useState(true);
  const [prayWithMe, setPrayWithMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestBy, setRequestBy] = useState('');
  const [prayFor, setPrayFor] = useState('');
  const [prayerPointText, setPrayerPointText] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

  const handleSubmitRequest = async () => {
    if (requestBy != '') {
      if (prayFor != '') {
        if (prayerPointText != '') {
          sendRequest();
        } else {
          setVisible(true);
          setMsg('Please enter your prayer point.');

          setType('w');
        }
      } else {
        setVisible(true);
        setMsg(
          'Please enter the name of the person you are requesting prayer for.',
        );
        setType('w');
      }
    } else {
      setVisible(true);
      setMsg('Please enter the name of the person requesting for prayer.');

      setType('w');
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    await axios
      .post(
        config.prayerrequest,
        {
          requestBy: requestBy,
          prayFor: prayFor,
          sendPR: prayerPoint,
          prayWith: prayWithMe,
          body: prayerPointText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            publicToken: publicToken.token,
            'x-auth-token': user.userToken,
          },
        },
      )
      .then((res) => {
        console.warn(res);
        setShowSuccess(true);
        setLoading(false);
        navigation.navigate('RequestSuccess');
      })
      .catch((err) => {
        console.warn(err.response.data);
        setLoading(false);
        // navigation.navigate("RequestSucess");
        setMsg(
          err.response.data
            ? err.response.data
            : 'Error processing request at the moment',
        );
        setType('w');
        getToken();
        sendRequest();
      });
  };

  const exitPrayerRequest = () => {
    setShowSuccess(false);
    navigation.navigate('PrayerRequest');
  };

  const handleSetPrayerPoint = () => {
    setPrayerPoint(true);
    setPrayWithMe(false);
  };
  const handlePrayWithMe = () => {
    setPrayWithMe(true);
    setPrayerPoint(false);
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
        title="Send Prayer Request"
      />
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Colors.mainColor}
          barStyle="light-content"
        />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.signup}>
          <View>
            <InputTextLabel
              label="Request by"
              input={{width: RW(90)}}
              labelstyle={styles.labelstyle}
              value={requestBy}
              onChangeText={(req) => setRequestBy(req)}
            />

            <InputTextLabel
              input={{width: RW(90)}}
              value={prayFor}
              onChangeText={(req) => setPrayFor(req)}
              label="Pray for"
              labelstyle={styles.labelstyle}
            />

            <LargeInputTextLabel
              largeInput={{width: RW(90)}}
              value={prayerPointText}
              onChangeText={(req) => setPrayerPointText(req)}
              label="Prayer Point"
              multiline={true}
              labelstyle={styles.labelstyle}
            />
            <View style={{height: RH(2)}} />

            <CheckBox
              style={styles.checkBox}
              onPress={() => handleSetPrayerPoint()}
              checked={prayerPoint}
              title={'Send my prayer point'}
              uncheckedColor={Colors.mainColor}
              checkedColor={Colors.red}
            />
            <View style={{height: RH(2)}} />

            <CheckBox
              style={styles.checkBox}
              onPress={() => handlePrayWithMe()}
              checked={prayWithMe}
              title={'Pray with Someone or Pastor'}
              uncheckedColor={Colors.mainColor}
              checkedColor={Colors.red}
            />
          </View>
          <View style={{height: RH(2)}} />
          <Button
            isLoading={loading}
            onPress={handleSubmitRequest}
            backgroundColor={Colors.red}
            name="SEND REQUEST"
            color="white"
            style={{borderWidth: 0, marginTop: 30}}
          />
          <View style={styles.signupWrapper}></View>
        </ScrollView>

        <Snackbar
          visible={visible}
          handleClose={handleClose}
          msg={msg}
          type={type}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  signup: {
    flex: 1,
    marginTop: 10,
    // marginHorizontal: RW(7),
  },
  labelstyle: {
    // fontWeight: 'bold',
    // fontSize: 20,
  },

  signupWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 40,
  },
  signupTxt: {
    color: Colors.green,
    fontSize: 18,
  },
  signupInfo: {
    fontSize: 18,
  },
  prayerlabel: {
    height: 100,
  },
  leftTextStyle: {
    fontSize: 18,
  },
  checkBox: {
    flex: 1,
    padding: 10,
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  modalItem: {
    padding: 24,
    marginVertical: 30,
    alignItems: 'center',
  },
  modalImage: {
    height: 100,
    width: 100,
  },
  successTxt: {
    // fontWeight: "bold",
    fontSize: 16,
    textAlign: 'center',
  },

  successHeader: {
    // fontWeight: "bold",
    textAlign: 'center',
    fontSize: RF(40),
    marginVertical: RH(3),
  },
  modalTouch: {
    position: 'absolute',
    right: 15,
    bottom: 2,
  },
  creditDetails: {
    // fontWeight: "bold",

    fontSize: 18,
    color: Colors.red,
  },
});

export default connect(mapStateToProps)(PrayerRequestInput);
