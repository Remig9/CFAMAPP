import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  H1,
  Touch,
  PageHeaderContainer,
  RegularTextBold,
  RegularText,
  Button,
} from '../../helpers/components';
import Modal from 'react-native-modal';
import Fonts from '../../helpers/fonts';
import {config, publicToken, video} from '../../helpers/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import {Content} from 'native-base';
import {RH, RF, RW} from '../../helpers/resize';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../helpers/colors';
import {AppHeader2} from '../../components/components';
import Nostream from './NoBranchStream';

const BranchStreams = ({navigation}) => {
  const [livestream, setLivestream] = useState('');
  const [streamOptions, setStreamOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNoStream, setShowNoStream] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    getToken();
  }, [refreshing]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    getAllStreams(token);
  };

  const showStreamOptions = (facebook, instagram, youtube) => {
    setStreamOptions(true);
  };

  const closeStreamOptions = () => {
    setStreamOptions(false);
  };

  const getAllStreams = async (token) => {
    setLoading(true);
    await axios
      .get(config.getBranchStreams, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': token,
        },
      })
      .then((res) => {
        setLivestream(res.data.live);
        console.log('branch stream', res.data.live);
        if (res.data.live.length == 0) {
          setShowNoStream(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('branch stream error', err.response.data);
        setLoading(false);
      });
  };

  const handleYoutubeStream = (link, name) => {
    let url = link;
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    console.log(params.v);
    closeStreamOptions();
    navigation.navigate('WatchStream', {
      url: params.v,
      name: name,
    });
  };

  const handleFacebookStream = (url, name) => {
    closeStreamOptions();
    Linking.openURL(url);
  };

  const handleInstagramStream = (url, name) => {
    closeStreamOptions();
    Linking.openURL(url);
  };

  const handleHomePage = () => {
    navigation.navigate('Dashboard');

    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 2000);
  };
  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        title="Live Stream"
        onBack={() => navigation.goBack()}
      />
      {showNoStream && (
        <View style={styles.nostream}>
          <Nostream navigation={navigation} />
        </View>
      )}

      {loading && <ActivityIndicator size="large" color={colors.mainColor} />}
      {!loading && (
        <View style={{flex: 1}}>
          <Content>
            <FlatList
              data={livestream}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => {
                return (
                  <Touch
                    style={styles.streamItems}
                    onPress={() => showStreamOptions()}>
                    <Image
                      source={livestream && {uri: `${video.url}${item.img}`}}
                      style={styles.streamImage}
                    />

                    <View style={{alignItems: 'flex-start', width: RW(60)}}>
                      <View style={{flex: 2}}>
                        <RegularTextBold style={{fontSize: Fonts.size14}}>
                          {livestream != null && item.name}
                        </RegularTextBold>
                        <RegularText style={styles.livestreamTxt}>
                          {livestream && item.churchId.address}
                        </RegularText>
                        <RegularText style={styles.livestreamTxt}>
                          {livestream && item.churchId.pastor}
                        </RegularText>
                      </View>
                    </View>

                    <Modal
                      style={{flex: 1}}
                      isVisible={streamOptions}
                      onBackdropPress={closeStreamOptions}>
                      <View style={styles.modalStyle}>
                        <View style={styles.headerTxt}>
                          <RegularTextBold style={{fontSize: 18}}>
                            How do you want to watch?
                          </RegularTextBold>
                        </View>

                        {livestream != null
                          ? item.youtube && (
                              <Touch
                                onPress={() =>
                                  handleYoutubeStream(
                                    item.churchId.youtubeUrl,
                                    item.name,
                                  )
                                }
                                style={styles.streamOptions}>
                                <Image
                                  source={require('../../../assets/images/youtube.png')}
                                />
                                <RegularText style={styles.streamApp}>
                                  Youtube Live
                                </RegularText>
                              </Touch>
                            )
                          : null}

                        {livestream != null
                          ? item.facebook && (
                              <Touch
                                onPress={() =>
                                  handleFacebookStream(
                                    item.churchId.facebookUrl,
                                    item.name,
                                  )
                                }
                                style={styles.streamOptions}>
                                <Image
                                  source={require('../../../assets/images/facebook.png')}
                                />
                                <RegularText style={styles.streamApp}>
                                  Facebook Live
                                </RegularText>
                              </Touch>
                            )
                          : null}

                        {livestream != null
                          ? item.instagram && (
                              <Touch
                                onPress={() =>
                                  handleInstagramStream(
                                    item.churchId.instagramUrl,
                                    item.name,
                                  )
                                }
                                style={styles.streamOptions}>
                                <Image
                                  source={require('../../../assets/images/instagram.png')}
                                />
                                <RegularText style={styles.streamApp}>
                                  Instagram Live
                                </RegularText>
                              </Touch>
                            )
                          : null}
                      </View>
                    </Modal>
                  </Touch>
                );
              }}
              keyExtractor={(item) => item.churchId.pastor}
            />
          </Content>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalStyle: {
    backgroundColor: 'white',
    // height: RH(35),
    width: RW(75),
    paddingVertical: RH(5),
    paddingHorizontal: RW(8),
    alignSelf: 'center',
    borderRadius: 4,
  },
  streamItems: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 18,
  },
  headerTxt: {
    alignItems: 'center',
  },
  livestreamTxt: {
    fontSize: Fonts.size12,
    color: 'grey',
    marginTop: 6,
  },
  backgroundVideo: {
    height: RH(35),
  },
  streamOptions: {
    flexDirection: 'row',
    marginTop: RH(4),
    alignItems: 'center',
  },
  streamImage: {
    width: 100,
    height: 80,
    // resizeMode: 'contain',
    marginRight: 12,
  },
  streamApp: {fontSize: 18, marginLeft: RW(5)},
  videoHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.7,
  },
  videoTitle: {
    fontSize: Fonts.size16,
    fontFamily: Fonts.RegularTextBold,
    marginBottom: 8,
  },
  videoWatch: {
    color: Colors.gray,
  },
  liveImage: {
    height: 60,
    width: 60,
  },
  liveTxt: {
    // fontWeight: "bold",
    fontSize: RF(36),
  },
  liveWatchers: {
    marginTop: RH(1.6),
  },
  watchersTxt: {
    color: colors.gray,
  },
  otherTxt: {
    paddingHorizontal: 28,
    includeFontPadding: true,
    paddingVertical: 30,
    fontSize: RF(25),
    lineHeight: 24,
  },
  nostream: {
    flex: 1,
    marginTop: RH(20),
    alignItems: 'center',
  },
  streamTxt: {
    // fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
    marginVertical: RH(3),
    fontFamily: 'Merriweather',
  },
});

export default BranchStreams;
