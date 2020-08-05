import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, FlatList, Dimensions} from 'react-native';
import {RegularTextBold, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {useNavigation} from '@react-navigation/native';

const Nostream = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.stream}>
        <Image
          // style={{marginTop: RH(10)}}
          source={require('../../../assets/images/video.png')}
        />

        <RegularTextBold style={styles.streamTxt}>
          Sadly there is no live stream at the moment.
        </RegularTextBold>

        <Button
          onPress={() => navigation.navigate('Branch Stream')}
          name="See Branch Streams"
          color={Colors.white}
          backgroundColor={Colors.red}
          style={{width: RW(50), borderWidth: 0}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stream: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RW(10),
  },

  streamTxt: {
    // fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
    marginVertical: RH(5),
    fontFamily: 'Merriweather',
  },
  liveWatchers: {
    marginTop: RH(1.6),
  },
  watchersTxt: {
    color: Colors.gray,
  },
  otherTxt: {
    paddingHorizontal: 28,
    includeFontPadding: true,
    paddingVertical: 30,
    fontSize: RF(25),
    lineHeight: 24,
  },
});

export default Nostream;
