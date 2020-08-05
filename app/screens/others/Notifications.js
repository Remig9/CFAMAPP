import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import {H1, RegularTextBold, Touch} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from '../../helpers/Snackbar';
import Network from '../../helpers/Network';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';
import Modal from 'react-native-modal';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import moment from 'moment';

const mapStateToProps = (state) => ({
  user: state.user,
});

const Inbox = ({navigation, user}) => {
  const [inboxes, setInboxes] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [userId, setUserId] = useState('');
  const [read, setRead] = useState(false);

  const modalShow = () => {
    setShowModal(true);
  };
  const cancelModal = () => {
    setShowModal(false);
  };

  const onRefresh = React.useCallback(() => {
    getNotifications();
    getDetails();
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotifications();
      getDetails();
    });
    return unsubscribe;
  }, [navigation]);

  const getNotifications = async () => {
    setLoading(true);
    await axios
      .get(config.notification, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': user.userToken,
        },
      })
      .then((res) => {
        console.warn('notifications', res.data.notification);
        setNotifications(res.data.notification);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('get notifications ', err.response);
        setLoading(false);
      });
  };

  const getDetails = async () => {
    setLoading(true);

    await axios
      .get(config.signup, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': user.userToken,
        },
      })
      .then((res) => {
        console.warn('my id', res.data._id);
        setUserId(res.data._id);
        setLoading(false);

        // console.warn(maybe);
      })
      .catch((err) => {
        console.warn('get details ', err.response);

        setLoading(false);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };
  const EmptyComponent = () => {
    return (
      <View style={styles.noNotification}>
        <H1 style={{fontSize: 20}}>You don't have any Notifications yet!</H1>
      </View>
    );
  };

  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
        title="Notifications"
        righticon="more-vertical"
        onRightPress={modalShow}
      />
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      {loading && (
        <ActivityIndicator
          color={Colors.mainColor}
          style={{flex: 1}}
          size="large"
        />
      )}

      <FlatList
        data={notifications}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={EmptyComponent}
        renderItem={({item, index}) => (
          <View style={styles.inboxContainer}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollview}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
              pagingEnabled
              decelerationRate="fast">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Notification Details', {
                    id: item._id,
                    title: item.title,
                    body: item.body,
                    image: item.imgx400,
                    time: moment(item.createdAt).fromNow(),
                  })
                }
                style={styles.item}>
                <View style={styles.rectButton}>
                  <View>
                    <RegularTextBold
                      style={[
                        styles.messageText,
                        {
                          fontWeight: item.read.includes(userId)
                            ? null
                            : 'bold',
                        },
                      ]}>
                      {item.title}
                    </RegularTextBold>
                    <Text style={styles.dateText}>
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>

                  {item.read.includes(userId) ? (
                    <View style={styles.readMessage}>
                      <FontAwesome
                        name="envelope-open"
                        size={24}
                        color="black"
                      />
                    </View>
                  ) : (
                    <View style={styles.unreadMessage}>
                      <FontAwesome
                        name="envelope"
                        size={24}
                        color={Colors.red}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
      <Modal
        onBackdropPress={cancelModal}
        onBackButtonPress={cancelModal}
        isVisible={showModal}>
        <View style={styles.popModal}>
          <Touch style={styles.popItem}>
            <H1 style={styles.popText}>Clear all Notifications</H1>
          </Touch>
        </View>
      </Modal>
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inboxContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  noNotification: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    display: 'flex',
    flexDirection: 'row',
    width: '130%',
  },
  popModal: {
    backgroundColor: 'white',
    width: RW(40),
    padding: RW(4),
    position: 'absolute',
    top: RH(6),
    right: 4,
    borderRadius: 12,
  },
  item: {
    flexBasis: '100%',
    maxWidth: '100%',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  unreadMessage: {
    backgroundColor: Colors.lightred,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readMessage: {
    backgroundColor: Colors.gray,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectButton: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  messageText: {
    fontSize: 17,
    marginLeft: RW(4),
    marginTop: RH(2),
    fontFamily: 'Lato',
    width: RW(60),
  },
  dateText: {
    backgroundColor: 'transparent',
    marginLeft: RW(4),

    color: '#999',
  },
  emailIcon: {
    height: 20,
    width: 20,
    backgroundColor: Colors.mainColor,
    borderRadius: 12,
    // borderWidth: 1,

    marginRight: 10,
    padding: 3,
  },
});

export default connect(mapStateToProps)(Inbox);
