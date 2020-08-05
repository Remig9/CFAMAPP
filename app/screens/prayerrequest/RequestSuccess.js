import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  Button,
  H1,
  PageHeaderContainer,
  LargeText,
  RegularTextBold,
  RegularText,
} from '../../helpers/components';
import Network from '../../helpers/Network';
import {RH, RF, RW} from '../../helpers/resize';
import colors from '../../helpers/colors';
import {church} from '../../helpers/churchdetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {elevationShadowStyle} from '../../helpers/utils';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function RequestSuccess({navigation}) {
  return (
    <Network>
      <PageHeaderContainer
        title="Prayer Request"
        back="md-arrow-back"
        backPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.modalItem}>
          <Image
            style={styles.modalImage}
            source={require('../../../assets/images/congrats.png')}
          />
          <LargeText style={styles.successHeader}>Sent Successfully!</LargeText>
          <RegularText style={[styles.successTxt]}>
            Your message has been received and we will be contacting you shortly
            to follow up.
          </RegularText>
          <H1 style={[styles.successTxt]}>
            If you would like to speak to someone immediately feel free to call
          </H1>
        </View>
        <View style={{marginTop: RH(8)}}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${church.phone}`)}
            style={styles.callBtn}>
            <MaterialIcons name="call" size={24} color="black" />
            <RegularTextBold style={{marginLeft: 12}}>
              {church.phone}
            </RegularTextBold>
          </TouchableOpacity>

          <Button
            onPress={() => navigation.navigate('Thread')}
            color="white"
            name="CONTINUE"
            backgroundColor={Colors.red}
            style={styles.continueBtn}
          />
        </View>
      </View>
    </Network>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  successHeader: {
    fontWeight: 'bold',
    marginVertical: RH(6),
  },
  modalItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTxt: {
    textAlign: 'center',
    marginHorizontal: RW(10),
    lineHeight: 25,
    fontSize: RF(42),
  },
  continueBtn: {
    width: RW(80),
    borderWidth: 0,
  },
  callBtn: {
    width: RW(80),
    borderWidth: 0,
    flexDirection: 'row',
    ...elevationShadowStyle(3),
    backgroundColor: 'white',
    padding: RH(2),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
