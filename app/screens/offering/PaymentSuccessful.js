import React, {useState} from 'react';
import {View, BackHandler, Image, StyleSheet} from 'react-native';
import {H1, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {connect} from 'react-redux';
import {setOfferingAmount} from '../../redux/actions/offering.action';
import {useFocusEffect} from '@react-navigation/native';
import {churchdetails} from '../../helpers/config';

const mapStateToProps = ({user, offering}) => ({
  user,
  offering,
});

const mapDispatchToProps = {
  setOfferingAmount,
};

const Confirm = ({
  route,
  navigation,
  setOfferingAmount,
  offering: {destinationDetails},
}) => {
  const [isSelectionModeEnabled, setIsSelectionModeEnabled] = useState(true);
  // const [disableSelectionMode, setDisableSelectionMode] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [isSelectionModeEnabled, disableSelectionMode]),
  );

  const disableSelectionMode = () => {
    setIsSelectionModeEnabled(false);
  };
  const handleSuccess = () => {
    navigation.navigate('Dashboard');
    setOfferingAmount('');
  };

  const {amount} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Image
          style={styles.imageStyle}
          source={require('../../../assets/images/congrats.png')}
        />
        <H1 style={styles.congrats}>Congratulations!</H1>
        <H1 style={styles.churchConfirm}>Payment Successful</H1>

        <H1 style={styles.churchTxt}>
          Thank You. Your Payment to {destinationDetails.name},{' '}
          {destinationDetails.address}, with the total sum of N
          {Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
          was successful.
        </H1>

        <Button
          borderColor={Colors.red}
          onPress={handleSuccess}
          style={{top: 60}}
          backgroundColor={Colors.red}
          name="PROCEED TO HOME PAGE"
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
    // justifyContent: 'center',
    padding: 16,
  },
  login: {
    padding: 24,
    marginTop: RH(15),
  },
  labelstyle: {
    // fontWeight: 'bold',
    fontSize: 18,
  },
  imageStyle: {
    alignSelf: 'center',
    marginBottom: 32,
    // height: 150,
    // width:150
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

  congrats: {
    color: Colors.white,
    // fontWeight: "bold",
    fontSize: RF(50),
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
  churchConfirm: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: Colors.white,
  },
  churchTxt: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
