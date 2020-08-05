import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RegularTextBold, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {AppHeader2} from '../../components/components';

const LiveStream = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => {
      console.log('dhdhdhh');
      navigation.navigate('Dashboard');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stream}>
        <Image source={require('../../../assets/images/video.png')} />

        <RegularTextBold style={styles.streamTxt}>
          Sadly there are no branch streaming at the moment.
        </RegularTextBold>

        <Button
          onPress={() => navigation.navigate('Dashboard')}
          name="Back to Homepage"
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
  },
  stream: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RW(10),
  },
  inbox: {
    flex: 1,
    padding: 24,
    marginTop: RH(0.6),
    backgroundColor: 'white',
  },

  prayerlabel: {
    height: 100,
  },
  leftTextStyle: {
    fontSize: 18,
  },

  videoWatch: {
    color: Colors.gray,
  },
  liveImage: {
    height: 60,
    width: 60,
  },
  streamTxt: {
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

export default LiveStream;
