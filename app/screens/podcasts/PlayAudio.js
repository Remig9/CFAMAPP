import React, {Component} from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {H1, Touch, Button} from '../../helpers/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../helpers/colors';
import {RW, RH, RF} from '../../helpers/resize';
import {elevationShadowStyle} from '../../helpers/utils';

import colors from '../../helpers/colors';
import Modal from 'react-native-modal';
import ProgressBar from './components/ProgressBar';
import {Card} from 'react-native-paper';

export default class PlayAudio extends Component {
  render() {
    const {
      playing,
      handlePress,
      author,
      title,
      togglePlay,
      playMode,
      sharePodcast,
      handleFastBackwards,
      handleFastForward,
      duration,
      currentTime,
      completedPercentage,
      onProgressChanged,
      onSeek,
      currentImage,
    } = this.props;
    return (
      <Modal
        isVisible={playing}
        onBackdropPress={handlePress}
        onSwipeComplete={handlePress}
        swipeDirection="down">
        <View style={styles.openedMedia}>
          <View style={styles.topLine} />

          <Touch onPress={handlePress} style={styles.cancelBtn}>
            <Entypo name="cross" size={24} color="black" />
          </Touch>

          <View>
            <View style={{alignItems: 'center'}}>
              <Image style={styles.openAvatar} source={{uri: currentImage}} />
              <View style={{alignItems: 'center'}}>
                <H1 style={{fontSize: RF(42), paddingVertical: 12}}>
                  {title.substr(0, 20)}
                </H1>
                <H1 style={{fontSize: RF(38), color: Colors.gray}}>{author}</H1>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={styles.controlBtns}>
                <Touch
                  onPress={handleFastBackwards}
                  style={{paddingVertical: 22}}>
                  <MaterialIcons name="replay-10" size={RH(5)} color="black" />
                </Touch>
                <Touch onPress={togglePlay}>
                  <MaterialIcons
                    name={
                      playMode ? 'play-circle-filled' : 'pause-circle-filled'
                    }
                    size={RH(8)}
                    color={Colors.red}
                  />
                </Touch>
                <Touch
                  onPress={handleFastForward}
                  style={{paddingVertical: 22}}>
                  <MaterialIcons name="forward-30" size={RH(5)} color="black" />
                </Touch>
              </View>

              <View>
                <ProgressBar
                  // duration={duration}
                  // currentTime={currentTime}
                  // percent={completedPercentage}
                  // onNewPercent={onProgressChanged}

                  onSeek={onSeek}
                  trackLength={duration}
                  onSlidingStart={() => this.setState({paused: true})}
                  currentPosition={currentTime}
                />
              </View>

              <Card style={styles.sharePodcast}>
                <Touch style={styles.sharePod} onPress={sharePodcast}>
                  <Entypo name="share-alternative" size={24} color="black" />
                  <H1 style={{fontSize: RF(38)}}> Share Podcast</H1>
                </Touch>
              </Card>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  podcastView: {
    flexDirection: 'row',
    paddingHorizontal: RW(4),
    paddingVertical: RH(2),
    alignItems: 'center',
  },
  images: {
    height: RH(8),
    width: RW(18),
    borderRadius: RH(1),
  },
  podcastTxt: {
    marginLeft: RW(3),
  },
  title: {
    fontSize: RF(42),
    width: RW(58),
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: RW(30),
    alignItems: 'center',
  },
  timeTxt: {
    color: Colors.gray,
    fontSize: RF(30),
  },
  playBtn: {
    position: 'absolute',
    right: RW(3),
    padding: 10,
  },
  shrinkedMedia: {
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 12,
    ...elevationShadowStyle(3),

    width: RW(100),
  },
  cancelBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray,

    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelX: {color: 'white', fontSize: 18, alignSelf: 'center'},
  shrinkAvatar: {
    height: RH(7),
    width: RW(14),
    borderRadius: 6,
  },
  mediaPause: {
    position: 'absolute',
    right: 10,
  },
  topLine: {
    borderWidth: 4,
    borderColor: Colors.lightgray,
    width: RW(15),
    alignSelf: 'center',
    marginBottom: RH(5),
  },
  openAvatar: {
    height: RH(30),
    width: RW(70),
    borderRadius: 6,
  },
  controlBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    justifyContent: 'space-between',
    width: RW(50),
  },
  sliderStyle: {
    width: RW(90),
    height: 100,
    transform: [{scaleX: 1.0}, {scaleY: 1.3}],
  },
  sharePodcast: {
    width: RW(40),
    padding: RH(1.6),
    backgroundColor: colors.white,
    borderRadius: 7,

    marginTop: RH(5),
  },
  openedMedia: {
    paddingBottom: RH(6),
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    width: RW(100),
    flex: 1,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginLeft: RW(-5),
    marginTop: 22,
    marginBottom: RH(-6),
  },
  shrinkStyle: {
    borderWidth: 4,
    borderColor: Colors.lightgray,
    width: RW(15),
    alignSelf: 'center',
    marginBottom: RH(5),
  },
  sharePod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
