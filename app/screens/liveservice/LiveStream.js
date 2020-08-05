import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import {Touch, RegularTextBold, RegularText} from '../../helpers/components';
import Modal from 'react-native-modal';
import Fonts from '../../helpers/fonts';
import {config, publicToken, video} from '../../helpers/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {Content} from 'native-base';
import {RH, RF, RW} from '../../helpers/resize';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../helpers/colors';
import Nostream from './Nostream';
import {AppHeader2} from '../../components/components';

const LiveStream = ({navigation}) => {
  const [livestream, setLivestream] = useState(null);
  const [branchstreams, setBranchstreams] = useState('');
  const [streamOptions, setStreamOptions] = useState(false);
  const [branchStreamOptions, setBranchStreamOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNoStream, setShowNoStream] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const onRefresh = React.useCallback(() => {
    getToken();
  }, [refreshing]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    getAllStreams(token);
  };

  const showStreamOptions = () => {
    setStreamOptions(true);
  };

  const closeStreamOptions = () => {
    setStreamOptions(false);
  };

  const showBranchStreamOptions = () => {
    setBranchStreamOptions(true);
  };

  const closeBranchStream = () => {
    setBranchStreamOptions(false);
  };

  const getAllStreams = async (token) => {
    setLoading(true);
    await axios
      .get(config.getAllStreams, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': token,
        },
      })
      .then((res) => {
        setLivestream(res.data.live);
        console.log(res.data);
        if (res.data.live == null) {
          setShowNoStream(true);
        }
        setLoading(false);
        getBranchStreams(token);
      })
      .catch((err) => {
        console.warn('stream', err.response);
        setLoading(false);
      });
  };

  const getBranchStreams = async (token) => {
    setLoading(true);
    await axios
      .get(config.getBranchStreams, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': token,
        },
      })
      .then((res) => {
        setBranchstreams(res.data.live);
        console.warn(res.data);
        if (res.data.live == null) {
          setShowNoStream(true);
        } else {
          // setShowNoStream(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('branch', err.response);
        setLoading(false);
      });
  };
  const handleYoutubeStream = () => {
    let url = livestream.churchId.youtubeUrl;
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
      name: livestream.churchId.name,
    });
  };

  // const handleYoutubeStream = (url, name) => {
  //   closeStreamOptions();
  //   console.log(url);
  //   Linking.openURL(livestream.churchId.youtubeUrl);
  // };

  const handleFacebookStream = (url, name) => {
    closeStreamOptions();

    Linking.openURL(livestream.churchId.facebookUrl);
  };

  const handleInstagramStream = (url, name) => {
    closeStreamOptions();
    Linking.openURL(livestream.churchId.instagramUrl);
  };

  const EmptyComponent = () => {
    return (
      <View style={styles.nostream}>
        <RegularTextBold>No Branch Stream...</RegularTextBold>
      </View>
    );
  };

  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        title="Live Stream"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <ActivityIndicator size="large" color={colors.mainColor} />}
        {livestream && (
          <View style={{flex: 1}}>
            <Touch onPress={showStreamOptions}>
              <ImageBackground
                source={{uri: `${video.url}${livestream.img}`}}
                style={styles.liveImage}>
                <Feather name="play-circle" size={38} color="white" />
              </ImageBackground>
            </Touch>
            <View style={styles.streamHeader}>
              <RegularTextBold style={styles.streamName}>
                {livestream != null && livestream.name}
              </RegularTextBold>

              <RegularText style={styles.livestreamTxt}>
                {livestream &&
                  livestream.churchId &&
                  livestream.churchId.pastor}
              </RegularText>
            </View>

            <Content>
              <RegularTextBold style={styles.branchStreams}>
                Branch Streams
              </RegularTextBold>

              <FlatList
                data={branchstreams}
                ListEmptyComponent={EmptyComponent}
                renderItem={({item}) => {
                  return (
                    <Touch
                      style={styles.streamItems}
                      onPress={() => navigation.navigate('Branch Stream')}>
                      <Image
                        source={
                          branchstreams && {uri: `${video.url}${item.img}`}
                        }
                        style={styles.streamImage}
                      />

                      <View style={{alignItems: 'flex-start', width: RW(60)}}>
                        <View style={{flex: 2}}>
                          <RegularTextBold style={{fontSize: Fonts.size14}}>
                            {branchstreams != null && item.name}
                          </RegularTextBold>
                          <RegularText style={styles.livestreamTxt}>
                            {branchstreams && item.churchId.address}
                          </RegularText>
                          <RegularText style={styles.livestreamTxt}>
                            {branchstreams && item.churchId.pastor}
                          </RegularText>
                        </View>
                      </View>
                    </Touch>
                  );
                }}
                keyExtractor={(item) => item.churchId.pastor}
              />
            </Content>
          </View>
        )}
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
              ? livestream.youtube && (
                  <Touch
                    onPress={() => handleYoutubeStream()}
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
              ? livestream.facebook && (
                  <Touch
                    onPress={() => handleFacebookStream()}
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
              ? livestream.instagram && (
                  <Touch
                    onPress={() => handleInstagramStream()}
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

        {showNoStream && (
          <View style={{flex: 1, marginTop: RH(10)}}>
            <Nostream navigation={navigation} />
          </View>
        )}
      </ScrollView>
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
  streamHeader: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  liveImage: {
    width: RW(100),
    alignItems: 'center',
    justifyContent: 'center',
    height: RH(40),
  },
  streamName: {
    fontSize: 20,
    fontFamily: 'Lato',
    // fontWeight: 'bold',
  },
  branchStreams: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 18,
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
    resizeMode: 'contain',
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
    marginLeft: RW(4),
  },
});

export default LiveStream;

{
  /* <Modal
                        style={{flex: 1}}
                        isVisible={branchStreamOptions}
                        onBackdropPress={closeBranchStream}>
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
                 
                  */
}
