import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TextInput, Keyboard} from 'react-native';
import {H1, Button} from '../../helpers/components';
import {RH, RF, RW} from '../../helpers/resize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../helpers/colors';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';
import {useNavigation} from '@react-navigation/native';
import RNPaystack from 'react-native-paystack';
import {connect} from 'react-redux';
import {config, publicToken} from '../../helpers/config';

RNPaystack.init({
  publicKey: 'pk_test_ad7a147f2ffb330860e2181e403d65f206a8abc7',
});

const mapStateToProps = ({offering, user}) => ({
  user,
});

const {width, height} = Dimensions.get('window');

const NewCard = ({user: {userDetails, userToken}, closeCard}) => {
  const navigation = useNavigation();
  const [validMonth, setValidMonth] = useState('');
  const [validYear, setValidYear] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  const [cardNumber, setCardNumber] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');
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

  const handleAddCard = () => {
    if (cardNumber == '') {
      setVisible(true);
      setMsg('Please add your card number');
      setType('w');
      return;
    }

    if (cardNumber.length < 6) {
      setVisible(true);
      setMsg('Enter a valid card number');
      setType('w');
      return;
    }

    if (validMonth == '') {
      setVisible(true);
      setMsg('Please add your validity date');
      setType('w');
      return;
    }
    if (validYear == '') {
      setVisible(true);
      setMsg('Please add your validity date');
      setType('w');
      return;
    }
    if (validMonth.length !== 2) {
      setVisible(true);
      setMsg('Enter a valid valid date');
      setType('w');
      return;
    }
    if (validYear.length !== 2) {
      setVisible(true);
      setMsg('Enter a valid valid date');
      setType('w');
      return;
    }
    if (cvvNumber == '') {
      setVisible(true);
      setMsg('Please add your cvv number');
      setType('w');
      return;
    }

    if (cvvNumber.length !== 3) {
      setVisible(true);
      setMsg('Enter a valid cvv number');
      setType('w');
      return;
    }
    handleTransaction();
  };

  const handleTransaction = () => {
    setLoading(true);

    RNPaystack.chargeCard({
      cardNumber: cardNumber,
      // cardNumber: "4084084084084081",
      expiryMonth: validMonth,
      expiryYear: validYear,
      cvc: cvvNumber,
      email: userDetails.email,
      amountInKobo: 10 * 100,
    })
      .then((response) => {
        console.log(response);
        finaliseTransaction(response.reference);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        console.log(error.message);
        setVisible(true);
        setMsg(error.message);
        setType('w');
        console.log(error.code);
      });
  };

  const finaliseTransaction = async (ref) => {
    setLoading(true);
    await axios
      .post(
        config.loadUserCards,
        {
          cardNumber: cardNumber,
          tranRef: ref,
          //month: validMonth,
          //year: validYear,
        },
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': userToken,
          },
        },
      )
      .then((res) => {
        setLoading(false);
        console.warn('once off', res);
        alert('Card succesfully added!');
        closeCard();
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err.response);
        // closeCard();
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
    <>
      <View style={[styles.bottomSheet]}>
        <View style={styles.popUp} />

        <View style={styles.bottomContainer}>
          <H1 style={styles.addTxt}>Add new card</H1>
          <FontAwesome name="credit-card" size={28} color="black" />
        </View>

        <View style={{padding: 15}}>
          <View>
            <H1 style={styles.cardTxt}>Card Number</H1>
            <TextInput
              value={cardNumber}
              onChangeText={(num) => setCardNumber(num)}
              keyboardType={'numeric'}
              style={styles.cardNumber}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: RH(2)}}>
            <View>
              <H1 style={[styles.cardTxt]}>Valid Till</H1>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  value={validMonth}
                  onChangeText={(txt) => setValidMonth(txt)}
                  keyboardType={'numeric'}
                  style={styles.cardValidity}
                  maxLength={2}
                  placeholder="MM"
                />
                <TextInput
                  value={validYear}
                  onChangeText={(txt) => setValidYear(txt)}
                  keyboardType={'numeric'}
                  style={[styles.cardValidity, {marginLeft: 6}]}
                  maxLength={2}
                  placeholder="YY"
                />
              </View>
            </View>

            <View>
              <H1 style={[styles.cardTxt, {marginLeft: 20}]}>CVV</H1>
              <TextInput
                value={cvvNumber}
                onChangeText={(num) => setCvvNumber(num)}
                keyboardType={'numeric'}
                style={styles.cardValid}
                maxLength={3}
              />
            </View>
          </View>
        </View>

        <Button
          isLoading={loading}
          onPress={handleAddCard}
          backgroundColor={Colors.red}
          name="ADD CARD"
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
    </>
  );
};

export default connect(mapStateToProps)(NewCard);

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

    // alignItems: 'center',
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
    color: 'black',
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
    fontSize: RF(30),
  },
  cardValid: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(7),
    width: RW(42.3),
    marginLeft: RW(4),
    marginTop: 10,
    fontSize: RF(30),
    padding: 4,
    color: 'black',
  },
  cardValidity: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 6,
    height: RH(7),
    width: RW(20),
    // marginLeft: RW(1),
    marginTop: 10,
    fontSize: RF(30),
    padding: 4,
    color: 'black',
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
