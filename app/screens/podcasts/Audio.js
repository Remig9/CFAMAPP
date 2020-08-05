import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  Share,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {H1, Touch, Button} from '../../helpers/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../helpers/colors';
import {RW, RH, RF} from '../../helpers/resize';
import {elevationShadowStyle} from '../../helpers/utils';
import colors from '../../helpers/colors';
import PlayAudio from './PlayAudio';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import {config, publicToken, video, churchdetails} from '../../helpers/config';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';
import {setPauseAudio} from '../../redux/actions/podcast.action';

const mapStateToProps = ({user, podcast}) => ({
  user,
  podcast,
});

const mapDispatchToProps = {
  setPauseAudio,
};

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPodcast: false,
      playingPodcast: false,
      podcastPlayed: '',
      podcastAudio: '',
      author: '',
      paused: false,
      currentTime: 0.0,
      rate: 1,
      duration: null,
      playingFile: '',
      refreshing: false,
      loading: false,
    };
    this.player = null;
  }

  componentDidMount() {
    this.getAudios();
    this.props.setPauseAudio(false);
  }

  getAudios = async () => {
    const {userToken} = this.props.user;
    this.setState({
      loading: true,
    });
    await axios
      .get(config.getAudios, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        this.setState({
          podcastAudio: res.data,
          refreshing: false,
          loading: false,
        });
        console.warn('audios', res.data);
      })
      .catch((err) => {
        this.setState({
          refreshing: false,
          loading: false,
        });
        console.warn(err);
      });
  };

  onRefresh = () => {
    this.getAudios();
  };

  handleOpenPodcast = () => {
    this.setState({
      openPodcast: !this.state.openPodcast,
    });
  };

  handlePlayingPodcast = async (text, author, audio, img, duration) => {
    await this.setState({
      playingPodcast: true,
      podcastPlayed: text,
      author,
      playingFile: audio,
      playingImage: img,
      duration,
    });
    console.warn(`${video.url}${this.state.playingFile}`);
  };

  displayErrorMsg = () => {
    alert('error playing podcast, please try again');
  };

  //music player controls

  onLoad = (data) => {
    console.warn('data-onLoad', data.duration);
    this.setState({duration: data.duration});
  };

  handlePause = (state) => {
    this.setState((state) => ({
      paused: this.props.podcast.pauseAudio,
    }));
    this.props.setPauseAudio(!this.props.podcast.pauseAudio);
  };

  handleSharePodcast = async () => {
    const {podcastPlayed, author} = this.state;
    try {
      const result = await Share.share({
        message: `Listen to ${podcastPlayed} by ${author}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onProgress = (data) => {
    this.setState({
      currentTime: data.currentTime,
    });
  };

  handleFastBackwards = () => {
    const {currentTime} = this.state;
    console.warn(currentTime);
    this.player.seek(parseFloat(currentTime) - 10);
  };

  handleFastForward = () => {
    const {currentTime} = this.state;
    this.player.seek(parseFloat(currentTime) + 30);
  };

  onProgress = (data) => {
    this.setState({
      currentTime: data.currentTime,
    });
    // console.warn(this.state.currentTime);
  };

  getCurrentTimePercentage(currentTime, duration) {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  onProgressChanged(newPercent, paused) {
    let {duration} = this.state;
    let newTime = (newPercent * duration) / 100;
    this.setState({currentTime: newTime, paused: paused});
    this.player.seek(newTime);
  }

  onSeek(time) {
    time = Math.round(time);
    this.playert && this.player.seek(time);
    this.setState({
      currentTime: time,
      paused: false,
    });
  }

  render() {
    const {
      openPodcast,
      playingPodcast,
      podcastPlayed,
      podcastAudio,
      author,
      paused,
      rate,
      currentTime,
      duration,
      playingFile,
      playingImage,
      refreshing,
      loading,
    } = this.state;

    const completedPercentage =
      this.getCurrentTimePercentage(currentTime, duration) * 100;
    // console.warn("per", completedPercentage);

    return (
      <>
        <StatusBar
          backgroundColor={colors.mainColor}
          barStyle="light-content"
        />
        {loading && (
          <ActivityIndicator
            color={Colors.mainColor}
            style={{flex: 1}}
            size="large"
          />
        )}
        <FlatList
          data={podcastAudio}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderItem={({item}) => (
            <Touch
              onPress={() =>
                this.handlePlayingPodcast(
                  item.title,
                  item.author,
                  item.file,
                  item.img,
                  item.duration,
                )
              }
              style={styles.podcastView}>
              <Image
                style={styles.images}
                source={{uri: `${video.url}${item.img}`}}
              />

              <View style={styles.podcastTxt}>
                <H1 style={styles.title}>{item.title}</H1>
                <H1 style={styles.subtitle}>{item.author}</H1>
                <View style={styles.textStyle}>
                  <H1 style={styles.timeTxt}>
                    {moment(item.publishDate).fromNow()}
                  </H1>
                  <H1 style={{fontSize: 17, color: Colors.gray}}>•</H1>
                  <H1 style={styles.timeTxt}>
                    {Math.floor((item.duration / 60 + Number.EPSILON) * 100) /
                      100}{' '}
                    min
                  </H1>
                </View>
              </View>

              <Touch
                onPress={() =>
                  this.handlePlayingPodcast(
                    item.title,
                    item.author,
                    item.file,
                    item.img,
                    item.duration,
                  )
                }
                style={styles.playBtn}>
                <MaterialIcons
                  name={'play-circle-outline'}
                  size={38}
                  color={Colors.red}
                />
              </Touch>
            </Touch>
          )}
          keyExtractor={(item) => item.text}
        />

        <PlayAudio
          author={author}
          title={podcastPlayed}
          playing={openPodcast}
          currentImage={`${video.url}${playingImage}`}
          handlePress={this.handleOpenPodcast}
          togglePlay={this.handlePause}
          playMode={this.props.podcast.pauseAudio}
          sharePodcast={this.handleSharePodcast}
          handleFastBackwards={this.handleFastBackwards}
          handleFastForward={this.handleFastForward}
          duration={duration}
          currentTime={currentTime}
          completedPercentage={completedPercentage}
          onProgressChanged={this.onProgressChanged.bind(this)}
          onSeek={this.onSeek.bind(this)}
        />

        {playingPodcast && (
          <>
            <Video
              ref={(ref) => {
                this.player = ref;
              }}
              rate={rate}
              onBuffer={this.onBuffer}
              audioOnly
              onProgress={this.onProgress}
              poster="https://baconmockup.com/300/200/"
              source={{
                uri: `${video.url}${playingFile}`,
              }}
              paused={this.props.podcast.pauseAudio}
              navigation={this.props.navigation}
              onBack={() => this.props.navigation.goBack(null)}
              onError={this.displayErrorMsg}
              onProgress={this.onProgress}
              onSeek={this.onSeekComplete}
              disableFocus={false}
              playInBackground={true}
              playWhenInactive={true}
            />
            <Touch
              style={styles.shrinkedMedia}
              onPress={this.handleOpenPodcast}>
              <View>
                <View style={styles.shrinkStyle} />
                <View style={{flexDirection: 'row', marginBottom: RH(3)}}>
                  <Image
                    style={styles.shrinkAvatar}
                    source={{uri: `${video.url}${playingImage}`}}
                  />
                  <View style={{marginLeft: RW(4)}}>
                    <H1 style={{fontSize: 18, width: RW(50)}}>
                      {podcastPlayed}
                    </H1>
                    <H1 style={styles.authorTxt}>{author}</H1>
                  </View>

                  <Touch onPress={this.handlePause} style={styles.mediaPause}>
                    <MaterialIcons
                      name={
                        this.props.podcast.pauseAudio
                          ? 'play-circle-outline'
                          : 'pause-circle-outline'
                      }
                      size={38}
                      color={Colors.red}
                    />
                  </Touch>
                </View>
              </View>
            </Touch>
          </>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);

const styles = StyleSheet.create({
  podcastView: {
    flexDirection: 'row',
    paddingHorizontal: RW(4),
    paddingVertical: RH(2),
    alignItems: 'center',
  },
  images: {
    height: 80,
    width: 80,
    borderRadius: RH(1),
  },
  podcastTxt: {
    marginLeft: RW(3),
  },
  authorTxt: {
    fontSize: 12,
    color: Colors.gray,
    width: RW(50),
    marginTop: 6,
  },
  title: {
    fontSize: 14,
    width: RW(58),
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    width: RW(58),
    textTransform: 'capitalize',
    marginVertical: 3,
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: RW(35),
    alignItems: 'center',
  },
  timeTxt: {
    color: Colors.gray,
    fontSize: 12,
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
    backgroundColor: 'lightgray',
    // padding: 12,
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
    flexDirection: 'row',
    alignItems: 'center',
    width: RW(40),
    justifyContent: 'space-around',
    padding: RH(1.6),
    backgroundColor: colors.white,
    borderRadius: 7,
    ...elevationShadowStyle(3),
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
});
