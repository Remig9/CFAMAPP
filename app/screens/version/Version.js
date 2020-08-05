import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {RegularText, LargeText, Button} from '../../helpers/components';
import colors from '../../helpers/colors';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
const Version = () => {
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />
      ​
      <View style={{flex: 0.3}} />​
      <View style={styles.container}>
        <Image source={require('../../../assets/images/update.png')} />
        <LargeText style={{fontSize: RF(50)}}>We've got new features</LargeText>
        ​
        <RegularText style={{width: 300, textAlign: 'center', opacity: 0.6}}>
          Update the app to gain access to the new exciting fatures
        </RegularText>
        ​
        <Button
          name="UPDATE APP"
          color="white"
          backgroundColor={Colors.red}
          style={{width: RW(80), borderWidth: 0}}
        />
      </View>
      ​
      <View style={{flex: 0.3}} />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 0.4,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallTxt: {
    color: 'white',
    fontSize: RF(65),
    marginTop: RH(4),
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    padding: 18,
  },
  versionContainer: {
    marginTop: RH(10),
    alignItems: 'center',
  },
});
export default Version;
