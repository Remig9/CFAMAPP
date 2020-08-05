//import liraries
import React, {Component, useState} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {
  H1,
  Touch,
  PageHeaderContainer,
  Button,
  InputTextLabel,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RW} from '../../helpers/resize';

// create a component
const Tracking = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const labels = [
    'Transaction Approved',
    'Payment Confirmed',
    'Settlement in Progress',
    'Transaction Completed',
  ];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.green,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.green,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.green,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.green,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: RF(30),
    currentStepIndicatorLabelFontSize: RF(30),
    stepIndicatorLabelCurrentColor: Colors.green,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: RF(30),
    currentStepLabelColor: Colors.green,
  };

  const onPageChange = (position) => {
    setCurrentPosition(position);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <PageHeaderContainer
        title="Tracking"
        menu="md-menu"
        menuPress={() => navigation.toggleDrawer()}
      />
      <View style={styles.stepWrap}>
        <View style={styles.iconStyle}>
          <View>
            <Image source={require('../../../assets/images/museum.png')} />
          </View>
          <View>
            <Image source={require('../../../assets/images/number.png')} />
          </View>
          <View>
            <Image source={require('../../../assets/images/timer.png')} />
          </View>
          <View>
            <Image source={require('../../../assets/images/done-all.png')} />
          </View>
        </View>
        <View style={{flex: 8}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            direction={'vertical'}
            stepCount={4}
          />
        </View>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  stepStyles: {
    fontSize: RF(30),
  },

  stepWrap: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
  },

  iconStyle: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

//make this component available to the app
export default Tracking;
