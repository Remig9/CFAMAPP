import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {
  PageHeaderContainer,
  H1,
  Touch,
  Button,
  RegularText,
  RegularTextBold,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RH, RW, RF} from '../../helpers/resize';
import {church} from '../../helpers/churchdetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';

const mapStateToProps = (state) => ({
  user: state.user,
  offering: state.offering,
});

// create a component
const PaymentSummary = ({route, navigation, offering}) => {
  let amount = String(offering.offeringAmount);
  const [chooseCreditCard, setChooseCreditCard] = useState(true);
  const [chooseBankTransfer, setChooseBankTransfer] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCreditCard = () => {
    setChooseCreditCard(!chooseCreditCard);
    setChooseBankTransfer(false);
  };

  const handleBankTransfer = () => {
    setChooseBankTransfer(!chooseBankTransfer);
    setChooseCreditCard(false);
  };

  const handleProcessPayment = () => {
    setLoading(true);
    chooseCreditCard
      ? navigation.navigate('Payment')
      : alert('Not available at the moment');
  };

  useEffect(() => {
    String(offering.offeringAmount);
  }, []);

  const {type, currency} = route.params;
  return (
    <View style={styles.container}>
      <AppHeader2
        lefticon="arrow-back"
        title="Payment Summary"
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{marginTop: 15}}>
          <RegularTextBold style={{marginLeft: 20}}>
            Destination
          </RegularTextBold>
          <Touch style={[styles.destinationBox]}>
            <RegularText style={styles.churchName}>
              {offering.destinationDetails.name}
            </RegularText>

            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name="location-on"
                size={16}
                color={Colors.red}
                style={{marginTop: RH(1)}}
              />
              <RegularText style={styles.churchTxt}>
                {offering.destinationDetails.address}
              </RegularText>
            </View>

            <View style={{flexDirection: 'row'}}>
              <FontAwesome5
                name="user-alt"
                size={16}
                color={Colors.red}
                style={{marginTop: RH(1)}}
              />
              <H1 style={styles.churchTxt}>
                {' '}
                {offering.destinationDetails.pastor}
              </H1>
            </View>
          </Touch>
        </View>

        <View style={{paddingHorizontal: RW(4)}}>
          <View style={styles.summaryContainer}>
            <RegularTextBold style={[styles.summaryTxt, {color: '#8D8D8D'}]}>
              Offering mode
            </RegularTextBold>

            <RegularTextBold style={styles.summaryTxt}>{type}</RegularTextBold>
          </View>

          <View style={styles.summaryContainer}>
            <RegularTextBold style={[styles.summaryTxt, {color: '#8D8D8D'}]}>
              Frequency
            </RegularTextBold>

            <RegularTextBold style={styles.summaryTxt}>
              {offering.offeringSwitch == 'onceoff'
                ? 'Once Off'
                : offering.offeringSwitch}
            </RegularTextBold>
          </View>

          <View style={styles.summaryContainer}>
            <RegularTextBold style={[styles.summaryTxt, {color: '#8D8D8D'}]}>
              Transaction Date
            </RegularTextBold>

            <RegularTextBold style={styles.summaryTxt}>
              {moment(Date.now()).format('MMMM DD YYYY')}
            </RegularTextBold>
          </View>
          <View style={styles.summaryContainer}>
            <RegularTextBold style={[styles.summaryTxt, {color: '#8D8D8D'}]}>
              Total Amount
            </RegularTextBold>

            <RegularTextBold style={styles.summaryTxt}>
              {currency}
              {Number(amount)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </RegularTextBold>
          </View>
        </View>

        <View style={styles.modeContainer}>
          <RegularTextBold style={styles.offeringTxt}>
            {' '}
            Choose Method of Payment
          </RegularTextBold>

          <View style={styles.modeBoxContainer}>
            <View>
              <Touch
                onPress={handleCreditCard}
                style={[
                  styles.modeBox,
                  chooseCreditCard ? {borderColor: Colors.red} : null,
                ]}>
                <FontAwesome
                  name="credit-card"
                  size={30}
                  color={chooseCreditCard ? Colors.red : null}
                />

                <RegularText
                  style={[
                    styles.modeTxt,
                    chooseCreditCard ? {color: Colors.red} : null,
                  ]}>
                  Credit Card
                </RegularText>
              </Touch>
            </View>

            <View>
              <Touch
                onPress={handleBankTransfer}
                style={[
                  styles.modeBox,
                  chooseBankTransfer ? {borderColor: Colors.red} : null,
                ]}>
                <MaterialCommunityIcons
                  name="bank"
                  size={30}
                  color={chooseBankTransfer ? Colors.red : null}
                />
                <RegularText
                  style={[
                    styles.modeTxt,
                    chooseBankTransfer ? {color: Colors.red} : null,
                  ]}>
                  Bank Transfer
                </RegularText>
              </Touch>
            </View>
          </View>
        </View>

        <View style={{height: RH(20)}} />
      </ScrollView>

      <Button
        onPress={handleProcessPayment}
        style={{
          width: RW(80),
          borderWidth: 0,
          alignSelf: 'center',
          // position: 'absolute',
          bottom: RH(3),
        }}
        backgroundColor={Colors.red}
        color="white"
        name="PROCEED TO PAYMENT"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  offeringTxt: {
    fontSize: 14,
    // fontWeight: "bold",
    marginBottom: RH(1),
  },
  modeBox: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: 'gray',
    padding: 12,
    width: RW(45),
    // height: RH(8),
    alignItems: 'center',
    flexDirection: 'row',
  },
  modeContainer: {
    paddingHorizontal: RW(3),
    paddingVertical: RH(3),
  },

  modeBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  modeTxt: {
    // fontWeight: "bold",
    fontSize: 12,
    marginLeft: RW(2),
  },

  destinationContainer: {
    paddingHorizontal: RW(3),
    paddingVertical: RH(3),
  },

  churchName: {
    // fontWeight: "bold",
    fontSize: 14,
    // marginBottom: RH(1),
    marginLeft: RW(1.2),
  },
  destinationContainer: {
    paddingHorizontal: RW(3),
    paddingVertical: RH(3),
  },
  destinationBox: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: 'gray',
    padding: 12,
    width: RW(94),
    // height: RH(6),
    justifyContent: 'center',
    marginHorizontal: RW(3),
    marginVertical: RH(1),
    backgroundColor: '#F6F5F5',
  },
  churchTxt: {
    fontSize: 12,
    marginBottom: 4,
    marginLeft: RW(1.2),
    marginTop: RH(1),
  },

  summaryTxt: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft: RW(1.2),

    // fontWeight: "bold",
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.darkgray,
    borderBottomWidth: 1,
    padding: 12,
    marginTop: RH(2),
  },
});

export default connect(mapStateToProps)(PaymentSummary);
