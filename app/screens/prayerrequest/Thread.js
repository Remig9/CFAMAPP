import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  H1,
  Touch,
  ContainerCard,
  PageHeaderContainer,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import moment from 'moment';
import Network from '../../helpers/Network';
import {connect} from 'react-redux';
import Snackbar from '../../helpers/Snackbar';

const mapStateToProps = (state) => ({
  user: state.user,
});

const PrayerRequest = ({navigation, user}) => {
  const [showAnswered, setShowAnswered] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showArchive, setShowArchive] = useState(false);
  const [prayerId, setPrayerId] = useState('');
  const [archivePrayers, setArchivePrayers] = useState([]);
  const [prayerRequest, setPrayerRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [inboxes, setInboxes] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    showAllPrayerThread();
    getAllInbox();
  }, [refreshing]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getToken();
    });
    return unsubscribe;
  }, [navigation]);

  const getToken = async () => {
    showAllPrayerThread();
    getAllInbox();
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
    setShowArchive(false);
    setShowAnswered(false);
  };

  const handleShowAnswered = () => {
    setShowAnswered(!showAnswered);
    setShowArchive(false);
    setShowAll(false);
  };

  const handleShowArchived = () => {
    setShowArchive(!showArchive);
    setShowAnswered(false);
    setShowAll(false);
  };

  const showAllPrayerThread = async () => {
    setLoading(!loading);
    await axios
      .get(config.prayerrequest, {
        headers: {
          'Content-Type': 'application/json',
          publicToken: publicToken.token,
          'x-auth-token': user.userToken,
        },
      })
      .then((res) => {
        setPrayerRequest(res.data);
        console.warn(res.data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        // console.warn(err);
        console.warn(err.response);
        showAllPrayerThread();
        setLoading(false);
        setRefreshing(false);
        setVisible(true);
        setMsg(
          'Error processing request at the moment, please refresh the page or try again!',
        );
        setType('w');
      });
  };

  const handleArchiveRequest = async () => {
    await axios
      .put(config.archivePrayerRequest + prayerId, {
        headers: {
          'Content-Type': 'application/json',
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        console.log(res);
        setArchivePrayers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllInbox = async () => {
    setLoading(!loading);
    await axios
      .get(config.getInbox, {
        headers: {
          'Content-Type': 'application/json',
          publicToken: publicToken.token,
          'x-auth-token': user.userToken,
        },
      })
      .then((res) => {
        console.warn('inbox', res['data']);
        let inbox =
          res['data'].length > 0 &&
          res['data'].filter((data) => data.flag == 'unread');

        setInboxes(inbox.length);
        console.warn('inboxes', inbox.length);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.warn('inbox error', err.response);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  return (
    <Network>
      <PageHeaderContainer
        title="Prayer Request"
        back="md-arrow-back"
        icon1="inbox"
        iconSize={25}
        icon2="plus"
        icon2Size={30}
        icon1Style={styles.icon1Style}
        icon2Style={styles.icon1Style}
        backPress={() => navigation.goBack(null)}
        otherPress={() => navigation.navigate('UserInbox')}
        otherPress2={() => navigation.navigate('RequestInput')}
        redDot={inboxes > 0 ? styles.reddot : null}
      />
      <View style={styles.container}>
        <View style={{marginTop: RH(1)}}>
          {loading && (
            <ActivityIndicator
              color={Colors.mainColor}
              style={{flex: 1}}
              size="large"
            />
          )}
          <ContainerCard>
            <TouchableOpacity
              onPress={handleShowAll}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: RH(1),
              }}>
              <View style={{}}>
                <MaterialIcons name="unarchive" size={24} color="black" />
              </View>
              <H1 style={styles.requestTxt}>All Prayer Request</H1>

              <View style={{position: 'absolute', right: 15}}>
                {showAll ? (
                  <MaterialCommunityIcons
                    name="arrow-up-drop-circle"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialIcons
                    name="arrow-drop-down-circle"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShowAnswered}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: RH(1),
              }}>
              <View style={styles.answerCheckbox}>
                <Image
                  style={{height: 10, width: 10}}
                  source={require('../../../assets/images/check.png')}
                />
              </View>
              <H1 style={styles.requestTxt}>Answered</H1>

              <View style={{position: 'absolute', right: 15}}>
                {showAnswered ? (
                  <MaterialCommunityIcons
                    name="arrow-up-drop-circle"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialIcons
                    name="arrow-drop-down-circle"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            </TouchableOpacity>
          </ContainerCard>
        </View>

        <View style={styles.inbox}>
          {showAll && prayerRequest !== [] ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={prayerRequest}
              renderItem={({item}) => {
                return (
                  <Touch
                    onPress={() =>
                      navigation.navigate('RequestDetails', {
                        prayFor: item.prayFor,
                        time: moment(
                          item.updatedAt,
                          'YYYY-MM-DDTHH: mm: ss',
                        ).format('dddd, MMMM DD'),
                        body: item.body,
                      })
                    }
                    style={styles.emailContainer}>
                    <View style={styles.emailIcon}>
                      <H1>{item.prayFor.substr(0, 1).toUpperCase()}</H1>
                    </View>
                    <View>
                      <H1 style={styles.emailAdress}>
                        {item.prayFor.substr(0, 26)}...
                      </H1>
                      <H1 style={styles.emailHeader}>
                        {item.body.substr(0, 26)}
                      </H1>
                    </View>
                    <H1 style={styles.emailTime}>
                      {moment(item.updatedAt, 'YYYY-MM-DDTHH: mm: ss').format(
                        'dddd, MMMM DD',
                      )}
                    </H1>
                  </Touch>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          ) : null}

          {showAnswered && prayerRequest !== [] ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={prayerRequest}
              renderItem={({item}) => {
                if (!item.answered)
                  return (
                    <Touch
                      onPress={() =>
                        navigation.navigate('RequestDetails', {
                          prayFor: item.prayFor,
                          time: moment(
                            item.updatedAt,
                            'YYYY-MM-DDTHH: mm: ss',
                          ).format('dddd, MMMM DD'),
                          body: item.body,
                        })
                      }
                      style={styles.emailContainer}>
                      <View style={styles.emailIcon}>
                        <H1>{item.prayFor.substr(0, 1).toUpperCase()}</H1>
                      </View>
                      <View>
                        <H1 style={styles.emailAdress}>{item.prayFor}</H1>
                        <H1 style={styles.emailHeader}>
                          {item.body.substr(0, 26)}
                        </H1>
                      </View>
                      <H1 style={styles.emailTime}>
                        {moment(item.updatedAt, 'YYYY-MM-DDTHH: mm: ss').format(
                          'dddd, MMMM DD',
                        )}
                      </H1>
                    </Touch>
                  );
              }}
              keyExtractor={(item) => item._id}
            />
          ) : null}
        </View>
      </View>

      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </Network>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inbox: {
    flex: 1,
    padding: 12,
    marginTop: RH(0.6),
    backgroundColor: 'white',
  },
  labelstyle: {
    // fontWeight: 'bold',
    fontSize: 18,
  },
  forgotTxt: {
    color: Colors.borderred,
    fontSize: 16,
    position: 'absolute',
    right: 6,
    marginTop: 30,
  },
  reddot: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 1,
    left: RW(-2),
    marginTop: Platform.OS == 'ios' ? RH(6) : null,
  },
  icon1Style: {
    marginTop: Platform.OS == 'ios' ? RH(6) : null,
    marginLeft: 12,
  },
  signupWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 40,
  },
  signupTxt: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupInfo: {
    // color: Colors.green,
    fontWeight: 'bold',
    fontSize: 18,
  },
  prayerlabel: {
    height: 100,
  },
  leftTextStyle: {
    fontSize: 18,
  },
  checkBox: {
    flex: 1,
    padding: 10,
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  modalItem: {
    padding: 12,
    marginVertical: 30,
    alignItems: 'center',
  },
  modalImage: {
    height: 100,
    width: 100,
  },
  successTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalTouch: {
    position: 'absolute',
    right: 15,
    bottom: 2,
  },
  creditDetails: {
    fontWeight: 'bold',

    fontSize: 18,
    color: Colors.red,
  },
  otherIcon: {
    height: 25,
    width: 28,
    marginLeft: 18,
    alignSelf: 'center',
    marginBottom: 12,
  },
  answerCheckbox: {
    backgroundColor: Colors.green,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestTxt: {
    fontSize: RF(30),
    marginLeft: 12,
    color: Colors.mainColor,
  },
  archiveIcon: {
    height: 20,
    width: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RH(0.7),
  },
  emailIcon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: 'center',
    marginRight: 20,
    padding: 3,
    justifyContent: 'center',
  },
  emailAdress: {
    color: Colors.gray,
    fontSize: RF(38),
  },
  emailHeader: {
    fontSize: RF(37),
    fontWeight: 'bold',
  },
  emailTime: {
    position: 'absolute',
    right: 4,
    color: Colors.gray,
    fontSize: RF(28),
  },
});

export default connect(mapStateToProps)(PrayerRequest);
