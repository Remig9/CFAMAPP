import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {H1, Touch, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RW, RH, RF} from '../../helpers/resize';
import colors from '../../helpers/colors';
import {config, publicToken, video} from '../../helpers/config';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Network from '../../helpers/Network';

const mapStateToProps = ({user}) => ({
  user,
});

function GlobalEvents({navigation, user: {userToken}}) {
  const [churchEvent, setChurchEvent] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
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
      .get(config.globalEvents, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setChurchEvent(res.data);
        setRefreshing(false);
        setLoading(false);
        console.warn(res);
      })
      .catch((err) => {
        setRefreshing(false);
        setLoading(false);

        console.warn(err);
      });
  };

  return (
    <Network>
      <SafeAreaView style={{flex: 1}}>
        <View style={{paddingHorizontal: RW(4), width: RW(95)}}>
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
        </View>
      </SafeAreaView>
    </Network>
  );
}

export default connect(mapStateToProps)(GlobalEvents);

const styles = StyleSheet.create({
  podcastView: {
    flexDirection: 'row',
    // marginHorizontal: RW(8),
    paddingVertical: RH(2),
    alignItems: 'center',
    flex: 1,
  },
  images: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  podcastTxt: {
    marginLeft: RW(3),
    width: RW(50),
  },
  title: {
    fontSize: 17,
    // fontWeight: "bold",
  },
  host: {
    fontSize: 14,
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
