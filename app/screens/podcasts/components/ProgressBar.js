import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {RW, RH} from '../../../helpers/resize';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

const ProgreeBar = ({trackLength, currentPosition, onSeek, onSlidingStart}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  // console.warn(trackLength);

  return (
    <View style={styles.container}>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor={Colors.red}
        maximumTrackTintColor={'gray'}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        style={{width: RW(90), height: 20}}
        thumbTintColor={Colors.red}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={[
            styles.text,
            {marginLeft: RW(3.5), marginTop: RH(2), color: 'gray'},
          ]}>
          {elapsed[0] + ':' + Math.round(elapsed[1])}
        </Text>
        {/* <View style={{ flex: 1 }} /> */}
        <Text
          style={[styles.text, {width: 40, marginTop: RH(2), color: 'gray'}]}>
          {/* {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]} */}
          {'- ' + Math.floor(remaining[0]) + ':' + Math.floor(remaining[1])}
        </Text>
      </View>
    </View>
  );
};

export default ProgreeBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
    width: 200,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  },
});
