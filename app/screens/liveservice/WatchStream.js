import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  H1,
  Touch,
  PageHeaderContainer,
  RegularTextBold,
  RegularText,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import Fonts from '../../helpers/fonts';
import {RF, RH, RW} from '../../helpers/resize';
import {church} from '../../helpers/churchdetails';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {WebView} from 'react-native-webview';
import {Container, Header, Right, Card, CardItem, Content} from 'native-base';

const {width, height} = Dimensions.get('window');

const LiveStream = ({navigation, route}) => {
  const [livestream, setLivestream] = useState([]);

  useEffect(() => {
    console.log('back', url);
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    getAllStreams(token);
  };

  const getAllStreams = async (token) => {
    await axios
      .get(config.getAllStreams, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': token,
        },
      })
      .then((res) => {
        setLivestream(res.data);
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const {url, name} = route.params;
  const newUrl = `https://www.youtube.com/embed/${url}`;
  console.log('params', newUrl);

  return (
    <>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />

      <PageHeaderContainer
        backPress={() => navigation.goBack()}
        title={`Live: ${name.substr(0, 20)}`}
        back="md-arrow-back"
      />
      <View style={styles.root}>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri: newUrl}}
          startInLoadingState={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },

  root: {
    flex: 1,
  },

  prayerlabel: {
    height: 100,
  },
  leftTextStyle: {
    fontSize: 18,
  },

  backgroundVideo: {
    height: RH(35),
  },
  videoHeader: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.7,
  },
  videoTitle: {
    fontSize: Fonts.size18,
    fontFamily: Fonts.RegularTextBold,
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
