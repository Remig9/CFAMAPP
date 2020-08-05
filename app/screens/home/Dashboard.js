import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Box, Textview} from '../../components/components';
import {Body, ListItem, List, Thumbnail, Left} from 'native-base';
import {AuthContext} from '../../navigation/AuthProvider';
import colors from '../../helpers/colors';
import moment from 'moment';
import Snackbar from '../../helpers/Snackbar';
import axios from 'axios';
import {config, publicToken, video} from '../../helpers/config';
import {connect} from 'react-redux';
import Upcoming from './Upcoming';
import Recents from './Recents';
import Quicklinks from './Quicklinks';
import {setUserDetails} from '../../redux/actions/users.action';
import {setChurchDestination} from '../../redux/actions/offering.action';
import AsyncStorage from '@react-native-community/async-storage';
import messaging, {firebase} from '@react-native-firebase/messaging';

const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = {
  setUserDetails,
  setChurchDestination,
};

console.disableYellowBox = true;

function Dashboard({
  navigation,
  user: {userToken, userDetails},
  setChurchDestination,
  setUserDetails,
}) {
  const {logout, onboard} = useContext(AuthContext);

  const [churchEvent, setChurchEvent] = useState([]);
  const [globalEvent, setGlobalEvent] = useState([]);

  const [pageLoading, setPageLoading] = useState(false);
  const [podcastvideos, setPodcastvideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [noStream, setNoStream] = useState(false);
  const [livestream, setLivestream] = useState(null);

  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    firebase.messaging().onNotificationOpenedApp((remoteMessage) => {
      navigate(remoteMessage.data.screen);
    });

    // Check whether an initial notification is available
    firebase
      .messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          navigate(remoteMessage.data.screen);
        }
      });

    getUserDetails();
    getGlobalEvents();
    getVideos();
    checkToken();
    getDestination();
    getToken();
    subscribeToTopic1();
    getAllStreams();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('token', token);
  };

  const subscribeToTopic1 = () => {
    messaging()
      .subscribeToTopic(publicToken.token)
      .then(() => console.log('Subscribed to topic!'));
  };

  const subscribeToTopic2 = (id) => {
    messaging()
      .subscribeToTopic(`${publicToken.token}-${id}`)
      .then(() => console.log('Subscribed to topic2!'));
  };

  const date = Date.now();
  var today = new Date();
  var greeting;
  const curHour = today.getHours();
  if (curHour < 12) {
    greeting = 'Good morning,';
  } else if (curHour > 11 && curHour < 17) {
    greeting = 'Good afternoon,';
  } else {
    greeting = 'Good evening,';
  }

  const checkToken = () => {
    if (userToken == null) {
      // logout();
    }
  };

  const getChurchEvents = async () => {
    setPageLoading(true);
    await axios
      .get(config.getEvents, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        let allEvents = globalEvent.concat(res.data);
        setPageLoading(false);
        setChurchEvent(allEvents);
        setRefreshing(false);
        console.warn('events', res);
      })
      .catch((err) => {
        setPageLoading(false);
        console.warn(
          'Unable to load contents, make sure you are connected to the internet.',
        );
        setRefreshing(false);
        setMsg(
          'Unable to load contents, make sure you are connected to the internet.',
        );
        setType('w');
        setVisible(true);
        getChurchEvents();
      });
  };

  const getGlobalEvents = async (token) => {
    setPageLoading(true);
    await axios
      .get(config.globalEvents, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        getChurchEvents();
        setGlobalEvent(res.data);
        setRefreshing(false);
        setPageLoading(false);
        // console.warn('global', res);
      })
      .catch((err) => {
        setPageLoading(false);
        setRefreshing(false);
        // console.warn(err);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };
  const getVideos = async () => {
    await axios
      .get(config.getVideos, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setPodcastvideos(res.data);
        setRefreshing(false);
        // console.warn('video', res.data);
      })
      .catch((err) => {
        console.warn(err);
        setRefreshing(false);
        setMsg(
          'Unable to load contents, make sure you are connected to the internet.',
        );
        setType('w');
        setVisible(true);
      });
  };

  const getDestination = async () => {
    setPageLoading(true);
    await axios
      .get(config.getDestination, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setPageLoading(false);
        setRefreshing(false);
        setChurchDestination(res.data);
      })
      .catch((error) => {
        setPageLoading(false);
        setRefreshing(false);
        console.warn('chur de', error.response);
        error.response.status == 400 ? onboard() : null;
        error.response.status == 406 ? logout() : null;
        console.warn('chur de', error);
      });
  };

  const getUserDetails = async () => {
    setPageLoading(true);
    await axios
      .get(config.signup, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        console.warn('user details', res.data);
        setPageLoading(false);
        setRefreshing(false);
        setUserDetails(res.data);
        subscribeToTopic2(res.data.churchId);
      })
      .catch((err) => {
        setPageLoading(false);
        setRefreshing(false);
        console.warn('home error', err);
      });
  };

  const onRefresh = React.useCallback(() => {
    getUserDetails();
    getGlobalEvents();
    getVideos();
    checkToken();
    getDestination();
    getToken();
    subscribeToTopic1();
  }, [refreshing]);

  const getAllStreams = async (token) => {
    await axios
      .get(config.getAllStreams, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setLivestream(res.data.live);
        setRefreshing(false);
        console.log(res.data);
        if (res.data.live == null) {
          setNoStream(true);
        }
      })
      .catch((err) => {
        setRefreshing(false);
        console.warn('stream', err.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {pageLoading && (
        <ActivityIndicator
          color={colors.mainColor}
          style={{flex: 1}}
          size="large"
        />
      )}
      <StatusBar backgroundColor={colors.mainColor} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Box paddingHorizontal={10}>
          {userDetails && (
            <Box>
              <Box marginBottom={10}>
                <List>
                  <ListItem avatar>
                    <Left>
                      {userDetails == null ? (
                        <Thumbnail source={{uri: video.url}} />
                      ) : (
                        <TouchableOpacity
                          onPress={() => navigation.push('Profile')}>
                          <Thumbnail
                            source={{uri: video.url + userDetails.img}}
                          />
                        </TouchableOpacity>
                      )}
                    </Left>
                    <Body>
                      <Textview color="gray">
                        {moment(date).format('MMMM Do YYYY.')}
                      </Textview>
                      <Textview bold size={16}>
                        {greeting}{' '}
                        {userDetails == null ? '' : userDetails.lastName}
                      </Textview>
                    </Body>
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
          <Recents
            livestream={livestream ? livestream : null}
            podcast={podcastvideos[0] ? podcastvideos[0] : []}
            events={churchEvent[0] ? churchEvent[0] : []}
            url={video.url}
            navigation={navigation}
          />
        </Box>

        <Upcoming
          events={churchEvent}
          url={video.url}
          navigation={navigation}
        />

        <Quicklinks navigation={navigation} />
        <Snackbar
          visible={visible}
          handleClose={handleClose}
          msg={msg}
          type={type}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
