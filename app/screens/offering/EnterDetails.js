import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TextInput, Keyboard} from 'react-native';
import {H1, Button} from '../../helpers/components';
import {RH, RF, RW} from '../../helpers/resize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../helpers/colors';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import RNPaystack from 'react-native-paystack';
import {config, publicToken} from '../../helpers/config';

RNPaystack.init({
  publicKey: 'pk_test_ad7a147f2ffb330860e2181e403d65f206a8abc7',
});

const mapStateToProps = ({offering, user}) => ({
  offering,
  user,
});

const {width, height} = Dimensions.get('window');

const EnterDetails = ({
  paymentType,
  closeDetails,
  lastDigits,
  month,
  year,
  offering: {
    cardNumber,
    offeringAmount,
    offeringSwitch,
    offeringType,
    destinationDetails,
    paymentPlan,
  },
  user: {userDetails, userToken},
}) => {
  const navigation = useNavigation();
  const [cvv, setCvv] = useState('');
  // const [month, setMonth] = useState('');
  // const [year, setYear] = useState('');

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  });
  const _keyboardDidShow = () => {
    setKeyboardStatus(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardStatus(false);
  };

  const processTransaction = async () => {
    if (!cvv) {
      setVisible(true);
      setMsg('Enter your cvv number');
      setType('w');
      return;
    }
    if (!month) {
      setVisible(true);
      setMsg('Enter your expiry details');
      setType('w');
      return;
    }

    if (!year) {
      setVisible(true);
      setMsg('Enter your expiry details');
      setType('w');
      return;
    } else {
      setLoading(true);
      RNPaystack.chargeCard({
        cardNumber: cardNumber.toString(),
        expiryMonth: month,
        expiryYear: year,
        cvc: cvv,
        email: userDetails.email,
        amountInKobo: offeringAmount * 100,
        plan: paymentPlan ? paymentPlan : null,
      })
        .then((response) => {
          console.log(response);
          setLoading(false);
          finaliseTransaction(response.reference);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.message);
          setVisible(true);
          setLoading(false);
          setMsg(error.message);
          setType('w');
          console.log(error.code);
        });
    }
  };

  const finaliseTransaction = async (ref) => {
    setLoading(true);
    const request = {
      walletId: offeringType,
      amount: offeringAmount,
      churchId: destinationDetails._id,
      tranRef: ref,
      recursive: paymentPlan ? true : false,
      interval: offeringSwitch,
      saveCard: false,
    };

    offeringSwitch != 'onceoff'
      ? await axios
          .post(config.transaction, request, {
            headers: {
              publicToken: publicToken.token,
              'x-auth-token': userToken,
            },
          })
          .then((res) => {
            setLoading(false);
            closeDetails();
            console.warn('recurring', res);
            navigation.navigate('PaymentSuccessful', {
              amount: offeringAmount,
            });
          })
          .catch((err) => {
            setLoading(false);
            console.warn(err.response);
            setVisible(true);
            setMsg(err.response.data);
            setType('w');
          })
      : await axios
          .post(
            config.transaction,
            {
              walletId: offeringType,
              amount: offeringAmount,
              churchId: destinationDetails._id,
              tranRef: ref,
              recursive: false,
              saveCard: false,
            },
            {
              headers: {
                publicToken: publicToken.token,
                'x-auth-token': userToken,
              },
            },
          )
          .then((res) => {
            closeDetails();
            setLoading(false);
            console.warn('once off', res);
            navigation.navigate('PaymentSuccessful', {
              amount: offeringAmount,
            });
          })
          .catch((err) => {
            setLoading(false);
            console.warn(err.response);
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
  useEffect(() => {
    console.log('monnnnnntthththhthth', month);
    console.log('monnnnnntthththhthth', year);
  }, []);
  return (
    <View
      style={[
        styles.bottomSheet,
        keyboardStatus
          ? {position: 'relative', justifyContent: 'center'}
          : null,
      ]}>
      <View style={styles.popUp} />

      <View style={styles.bottomContainer}>
        <H1 style={styles.addTxt}>Process {paymentType} payment</H1>
        <FontAwesome name="credit-card" size={28} color="black" />
      </View>

      <View style={{padding: 15}}>
        <View>
          <H1 style={styles.cardTxt}>Card Number</H1>
          <View style={styles.cardNumber}>
            <H1 style={styles.cardNumberTxt}>************ {lastDigits}</H1>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: RH(2)}}>
          <View>
            <H1 style={[styles.cardTxt]}>Valid Till</H1>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                value={month}
                editable={false}
                // onChangeText={(txt) => setMonth(txt)}
                // keyboardType={'numeric'}
                style={styles.cardValidity}
                // maxLength={2}
                // placeholder="MM"
                // placeholderTextColor={Colors.gray}
              />
              <TextInput
                value={year}
                editable={false}
                // onChangeText={(txt) => setYear(txt)}
                // keyboardType={'numeric'}
                style={[styles.cardValidity, {marginLeft: 6}]}
                // maxLength={2}
                // placeholder="YY"
                // placeholderTextColor={Colors.gray}
              />
            </View>
          </View>

          <View>
            <H1 style={[styles.cardTxt, {marginLeft: 20}]}>CVV</H1>
            <TextInput
              value={cvv}
              onChangeText={(num) => setCvv(num)}
              keyboardType={'numeric'}
              style={styles.cardValid}
              maxLength={3}
              placeholderTextColor={Colors.black}
            />
          </View>
        </View>
      </View>

      <Button
        isLoading={loading}
        onPress={processTransaction}
        backgroundColor={Colors.red}
        name="PROCESS TRANSACTION"
        color="white"
        borderColor={Colors.red}
        style={styles.addBtn}
      />
      {/* <View style={{ height: RH(60), flex: 1 }} /> */}
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </View>
  );
};

export default connect(mapStateToProps)(EnterDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: RH(-3),
    width: width,
    // height: RH(50),
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 8,
    marginLeft: RW(-4.5),
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: RH(0.5),
    alignItems: 'center',
  },
  addTxt: {
    fontSize: RF(50),
    fontWeight: 'bold',
  },
  addBtn: {
    width: RW(85),
    alignSelf: 'center',
  },
  cardNumber: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(7),
    width: RW(90),
    marginTop: 5,
    fontSize: RF(30),
    padding: 4,
    // marginBottom: -8,
  },
  cardTxt: {
    // fontWeight: "bold",
    fontSize: RF(40),
  },
  cardCVV: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(7),
    width: RW(42.3),
    marginTop: 10,
    padding: 10,
    fontSize: RF(45),
  },
  cardNumberTxt: {
    fontSize: RF(49),
    marginTop: RH(1),
  },
  cardValid: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(7),
    width: RW(42.3),
    marginLeft: RW(4),
    marginTop: 10,
    fontSize: RF(45),
    padding: 4,
    color: Colors.black,
  },
  cardValidity: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(7),
    width: RW(20),
    // marginLeft: RW(1),
    marginTop: 10,
    fontSize: RF(45),
    padding: 4,
    color: Colors.black,
  },
  popUp: {
    backgroundColor: Colors.popup,
    // height: 10,
    width: 90,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: RH(-0.5),
  },
  saveCard: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
