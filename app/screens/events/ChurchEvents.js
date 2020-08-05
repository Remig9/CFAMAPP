import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {H1, Touch} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RW, RH, RF} from '../../helpers/resize';
import colors from '../../helpers/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {config, publicToken, video} from '../../helpers/config';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';
import Network from '../../helpers/Network';
import Snackbar from '../../helpers/Snackbar';

const mapStateToProps = ({user}) => ({
  user,
});

function ChurchEvent({navigation, user: {userToken}}) {
  const [churchEvent, setChurchEvent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getToken();
  }, [refreshing]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    getChurchEvents(token);
  };

  const getChurchEvents = async (token) => {
    setLoading(true);
    await axios
      .get(config.getEvents, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setChurchEvent(res.data);
        setLoading(false);
        setRefreshing(false);
        console.warn('events', res);
      })
      .catch((err) => {
        setLoading(false);
        console.warn(
          'Unable to load contents, make sure you are connected to the internet.',
        );
        setRefreshing(false);
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: RW(4), width: RW(95)}}>
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
          showsVerticalScrollIndicator={false}
          data={churchEvent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <Touch
              onPress={() =>
                navigation.navigate('Church Events', {
                  title: item.title,
                  text: item.body,
                  address: item.address,
                  image: item.imgx400,
                  startDate: item.startDate,
                  endtDate: item.endDate,
                  host: item.host,
                  id: item._id,
                  attending: item.attendance,
                })
              }
              style={styles.podcastView}>
              <Image
                style={styles.images}
                source={{uri: `${video.url}${item.imgx150}`}}
              />

              <View style={styles.podcastTxt}>
                <H1 style={styles.title}>{item.title}</H1>
                <H1 style={styles.host}>Host: {item.host}</H1>
                <H1 style={styles.address}>{item.address}</H1>

                <View style={styles.textStyle}>
                  <H1 style={styles.timeTxt}>
                    {moment(item.startDate).format('DD-MM-YYYY')} -{' '}
                    {moment(item.endDate).format('DD-MM-YYYY')}
                  </H1>
                  <H1 style={{fontSize: 17, color: Colors.gray}}> • </H1>
                  <H1 style={styles.timeTxt}>
                    {moment(item.startDate).format('hh:mm A')}
                  </H1>
                </View>
              </View>
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
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps)(ChurchEvent);

const styles = StyleSheet.create({
  podcastView: {
    flexDirection: 'row',
    paddingVertical: RH(2),
    alignItems: 'center',
  },
  images: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  podcastTxt: {
    marginLeft: RW(3),
    width: RW(100),
  },
  title: {
    fontSize: 17,
  },
  host: {
    fontSize: 15,
    // fontWeight: "bold",
  },
  address: {
    color: colors.gray,
    fontSize: 12,
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: RW(50),
    alignItems: 'center',
  },
  timeTxt: {
    color: Colors.gray,
    fontSize: 11,
  },
  playBtn: {
    position: 'absolute',
    right: RW(3),
    padding: 10,
  },
});
