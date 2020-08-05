import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {H1, Touch} from '../../helpers/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../helpers/colors';
import {RW, RH, RF} from '../../helpers/resize';
import {elevationShadowStyle} from '../../helpers/utils';
import axios from 'axios';
import {config, publicToken, video} from '../../helpers/config';
import moment from 'moment';
import {connect} from 'react-redux';
import Snackbar from '../../helpers/Snackbar';

const mapStateToProps = ({user}) => ({
  user,
});

function Video({navigation, user: {userToken}}) {
  const [podcastvideos, setPodcastvideos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    getVideos();
  }, [refreshing]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setLoading(true);
    await axios
      .get(config.getVideos, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setPodcastvideos(res.data);
        setLoading(false);

        setRefreshing(false);
        console.warn('video', res.data);
      })
      .catch((err) => {
        console.warn(err);
        setRefreshing(false);
        setLoading(false);

        setMsg(
          'Unable to load contents, make sure you are connected to the internet.',
        );
        setType('w');
        setVisible(true);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  return (
    <>
      {loading && (
        <ActivityIndicator
          color={Colors.mainColor}
          style={{flex: 1}}
          size="large"
        />
      )}
      <FlatList
        data={podcastvideos}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <Touch
            onPress={() =>
              navigation.navigate('Video Podcast', {
                url: item.file,
              })
            }
            style={styles.podcastView}>
            <Image
              style={styles.images}
              source={{uri: `${video.url}${item.imgx400}`}}
            />
            <View style={styles.podcastTxt}>
              <H1 style={styles.title}>{item.title}</H1>
              <H1 style={styles.subtitle}>{item.author}</H1>

              <View style={styles.textStyle}>
                <H1 style={styles.timeTxt}>
                  {moment(item.publishDate).fromNow()}{' '}
                </H1>
                <H1 style={{fontSize: 13, color: Colors.gray}}>•</H1>
                <H1 style={styles.timeTxt}>
                  {Math.floor(item.duration / 60)} minutes
                </H1>
              </View>
            </View>

            <Touch
              onPress={() =>
                navigation.navigate('Video Podcast', {
                  url: item.file,
                })
              }
              style={styles.playBtn}>
              <MaterialIcons
                name="play-circle-outline"
                size={35}
                color={Colors.red}
              />
            </Touch>
          </Touch>
        )}
        keyExtractor={(item) => item.text}
      />
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </>
  );
}

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
    width: RW(40),
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
  shrinkedMedia: {
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 12,
    ...elevationShadowStyle(3),
  },
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
    width: RW(90),
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
    backgroundColor: Colors.white,
    borderRadius: 7,
    marginTop: 10,
    ...elevationShadowStyle(3),
  },
});

export default connect(mapStateToProps)(Video);
