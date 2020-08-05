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
import {H1} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import moment from 'moment';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';
import Network from '../../helpers/Network';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllInbox();
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllInbox();
    });
    return unsubscribe;
  }, [navigation]);

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
        setInboxes(res['data']);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
        getAllInbox();
        setVisible(true);
        setMsg(
          'Error processing request at the moment, please refresh the page or try again!',
        );
        setType('w');
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };
  const EmptyComponent = () => {
    return (
      <View style={styles.noInbox}>
        <H1 style={{fontSize: RF(45)}}>You don't have any Inbox yet!</H1>
      </View>
    );
  };

  return (
    <Network>
      <AppHeader2
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
        title="Inbox"
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
        data={inboxes}
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
                  navigation.navigate('InboxDetails', {
                    body: item.body,
                    time: moment(item.updatedAt).format('L'),
                    id: item._id,
                    readStatus: item.flag,
                    prayFor: item.threadId.prayFor,
                    churchEmail: item.churchId.email,
                    pastorName: item.churchId.pastor,
                  })
                }
                style={styles.item}>
                <View style={styles.rectButton}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {item.flag === 'unread' ? (
                        <View style={styles.dot} />
                      ) : (
                        <View style={styles.nodot} />
                      )}
                      <Text style={styles.fromText}>
                        {item.threadId.prayFor}
                      </Text>
                    </View>
                    <Text numberOfLines={3} style={styles.messageText}>
                      {item.body.substr(0, 110)}
                    </Text>
                  </View>
                  <Text style={styles.dateText}>
                    {moment(item.updatedAt).format('L')}
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
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
  inboxContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  scrollview: {
    display: 'flex',
    flexDirection: 'row',
    width: '130%',
  },
  item: {
    flexBasis: '100%',
    maxWidth: '100%',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  rectButton: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  archive: {
    flexBasis: '30%',
    maxWidth: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontSize: RF(47),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  messageText: {
    fontSize: 14,
    marginLeft: RW(4),
    marginTop: 2,
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 6,
    top: 10,
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
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.mainColor,
    marginRight: RW(2),
  },
  nodot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // backgroundColor: Colors.white,
    marginRight: RW(2),
  },
  noInbox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: RH(40),
  },
});

export default connect(mapStateToProps)(Inbox);
