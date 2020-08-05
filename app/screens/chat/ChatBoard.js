import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import {H1, Touch} from '../../helpers/components';

import {RH, RF, RW} from '../../helpers/resize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader2} from '../../components/components';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../helpers/colors';
import colors from '../../helpers/colors';

const mapStateToProps = ({user}) => ({
  user,
});

const ChatPage = ({navigation, route, user: {userDetails}}) => {
  const {data} = route.params;

  //set initial state
  const [message, setMessage] = React.useState('');
  const [messages, updateMessages] = React.useState([]);
  const [uniqueUrl, setUniqueUrl] = React.useState();

  // modal control
  const [isAddVisible, setIsAddVisible] = React.useState(false);

  //set up room with firebase
  const roomDatabaseConnectionUrl = `/room_${data.id}`;
  const roomDatabaseConnect = database().ref(roomDatabaseConnectionUrl);

  const chatsUpdateDBConnectUrl = `/room_${data.id}/chats`;
  const chatsUpdateDBConnect = database().ref(chatsUpdateDBConnectUrl);

  const chatDBConnectUrl = `/room_${data.id}/chats`;
  const chatsDBConnect = database().ref(chatDBConnectUrl);

  // firebase root connection
  const initFirebaseRealtime = () => {
    try {
      roomDatabaseConnect.on('value', (res) => {
        res = res.val();
        // getRealtimeUsers(res.online);
      });
    } catch (error) {}
  };

  //  Firebase Update User Data
  const updateRecords = async () => {
    try {
      let route = `/room_${data.id}/users/${userDetails._id}`;
      let roomDB = database().ref(route);
      await roomDB.set({
        avatar: userDetails.img,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
      });
      // updateRoomUsers();
    } catch (error) {}
  };

  /**Realtime Chat */
  const listenToRoom = () => {
    try {
      chatsDBConnect.on('value', (snapshot) => {
        if (snapshot.val()) {
          let arr = [];
          let res = snapshot.val();
          Object.keys(res)
            .sort()
            .reverse()
            .forEach((el) => {
              arr.push(res[el]);
            });
          arr.sort((a, b) => a.startedAt - b.startedAt).reverse();
          updateMessages(arr);
          console.log('arrays', arr);
        }
      });
    } catch (error) {}
  };

  // Update User Chat Profile
  const updateUserProfileInChats = () => {
    try {
      chatsUpdateDBConnect.once('value', (snapshot) => {
        if (snapshot.val()) {
          let arr = [];
          let res = snapshot.val();
          Object.keys(res)
            .sort()
            .reverse()
            .forEach((el) => {
              arr.push(res[el]);
            });
          arr.forEach((el) => {
            if (el.userId === userDetails._id) {
              let route = `/room_${data.id}/chats/${el.timestamp}`;
              (el.first_name = userDetails.firstName),
                (el.last_name = userDetails.lastName),
                (el.avatar = userDetails.avatar),
                database().ref(route).set(el);
            }
          });
        }
      });
    } catch (error) {}
  };

  //Send new message
  const sendChat = async (doc = null, id, type = null, name = null) => {
    let cleanMessage = message.trim();
    setMessage('');
    if (cleanMessage === '' && type == null) {
      setMessage('');
      return;
    }
    try {
      let timestamp = new Date().getTime();
      var payload = {
        id: `${timestamp}`,
        userId: userDetails._id,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        avatar: userDetails.img,
        message: cleanMessage,
        sent: true,
        // file: {uri: `${doc}`, id, fileName: name, fileType: type},
        timestamp,
      };
      //tempUpdateChats(cleanMessage, timestamp);

      setTimeout(() => {
        let route = `/room_${data.id}/chats/${timestamp}`;
        let roomDB = database().ref(route);
        roomDB.set({
          ...payload,
          startedAt: Firebase.database.ServerValue.TIMESTAMP,
        });
        listenToRoom();
      }, 1);
    } catch (error) {
      console.warn(error);
    }
  };

  //pick document

  useEffect(() => {
    console.log(userDetails);
    initFirebaseRealtime();
    updateRecords();
    listenToRoom();
    setTimeout(() => updateUserProfileInChats(), 55);

    return () => {
      let route = `/room_${data.id}/online/${userDetails._id}`;
      database().ref(route).remove();
      setTimeout(() => {
        roomDatabaseConnect.off();
        chatsUpdateDBConnect.off();
        chatsDBConnect.off();
      }, 500);
    };
  }, []);

  // call this function, passing-in your date

  function filter(myDate) {
    // get from-now for this date
    var fromNow = moment().utcOffset(myDate).fromNow();

    // ensure the date is displayed with today and yesterday
    return moment(myDate).calendar(null, {
      // when the date is closer, specify custom values
      lastWeek: 'dddd, LT',
      lastDay: '[Yesterday] LT',
      sameDay: ' LT',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd, LT',
      sameElse: 'DD/MM/YYYY, LT',
    });
  }

  const showAdd = () => {
    setIsAddVisible(true);
  };
  const closeAdd = () => {
    setIsAddVisible(false);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      closeAdd();
      console.log(image);
    });
  };

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true,
      multiple: true,
    }).then((image) => {
      closeAdd();

      console.log(image);
    });
  };

  const deleteMessage = async (id, timestamp) => {
    let route = `/room_${data.id}/chats/${timestamp}`;
    var adaRef = database().ref(route);
    adaRef
      .remove()
      .then(function () {
        listenToRoom();
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
  };

  return (
    <>
      <AppHeader2
        title={data.name}
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />

          <FlatList
            inverted
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({item}) => (
              <View>
                {item.userId !== userDetails._id ? (
                  <View style={{padding: 10}}>
                    <Touch style={styles.receiverStyle}>
                      <View style={styles.headerText}>
                        <H1 style={styles.nameReceiver}>
                          {item.first_name} {item.last_name}
                        </H1>
                        <Touch onPress={() => alert('hdh')}>
                          <MaterialIcons
                            style={styles.moreReciever}
                            name="keyboard-arrow-down"
                            size={24}
                            color="black"
                          />
                        </Touch>
                      </View>
                      <H1 style={styles.receiverMsg}>{item.message}</H1>
                    </Touch>
                    <View style={styles.receivertimeStyle}>
                      <H1 style={styles.receivertimeStamp}>
                        {filter(item.startedAt)}
                      </H1>
                    </View>
                  </View>
                ) : (
                  <View style={{padding: 10}}>
                    <Touch
                      // onLongPress={() => deleteMessage(item.id, item.timestamp)}
                      style={styles.senderStyle}>
                      {/* <H1 style={styles.nameReceiver}>
                        {item.first_name} {item.last_name}
                      </H1> */}
                      <Touch style={{padding: 5}}>
                        <MaterialIcons
                          style={styles.moreSender}
                          name="keyboard-arrow-down"
                          size={24}
                          color="white"
                        />
                      </Touch>
                      <H1 style={styles.senderMsg}>{item.message}</H1>
                    </Touch>
                    <View style={styles.timeStyle}>
                      <H1 style={styles.timeStamp}>{filter(item.startedAt)}</H1>
                      <Ionicons name="ios-checkmark" size={13} color="black" />
                    </View>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          <View
            style={{
              height: RH(10),
            }}
          />

          <View style={{position: 'absolute', bottom: 5}}>
            <View style={styles.inputContainer}>
              <Touch onPress={showAdd}>
                <MaterialCommunityIcons name="plus" size={30} color={'black'} />
              </Touch>

              <TextInput
                value={message}
                onChangeText={(txt) => setMessage(txt)}
                multiline={true}
                style={styles.inputField}
                placeholder="Type a message"
              />
              <Touch style={{width: RW(12)}} onPress={sendChat}>
                <MaterialIcons name="send" size={24} color={colors.primary} />
              </Touch>
            </View>
          </View>
        </View>

        <Modal
          onBackdropPress={closeAdd}
          isVisible={isAddVisible}
          animationInTiming={300}
          backdropOpacity={0.2}>
          <ScrollView
            contentContainerStyle={{justifyContent: 'flex-end'}}
            style={styles.bottomModal}>
            <Touch onPress={openCamera} style={styles.addItems}>
              <Feather name="camera" size={30} color={colors.mainColor} />
              <H1 style={styles.addText}>Camera</H1>
            </Touch>
            <Touch onPress={openLibrary} style={styles.addItems}>
              <FontAwesome name="photo" size={30} color={colors.mainColor} />
              <H1 style={styles.addText}>Photo Library</H1>
            </Touch>
            <Touch onPress={closeAdd} style={styles.addItems}>
              <Feather name="x-circle" size={30} color={colors.red} />
              <H1 style={styles.addText}>Cancel</H1>
            </Touch>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </>
  );
};

// define your stylesm
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.primary,
    height: RH(15),
  },
  containerStyle: {
    marginTop: 30,
    // paddingHorizontal: 20,
    height: RH(100),
    width: RW(100),
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  bottomModal: {
    position: 'absolute',
    bottom: RH(1),
    width: RW(95),
    // height: RH(20),
    backgroundColor: '#F5F5F5',
    marginLeft: RW(-2.3),
    borderRadius: RH(1.4),
    flex: 1,
    flexWrap: 'nowrap',
  },
  addText: {
    fontSize: 22,
    marginLeft: RW(4),
  },
  addItems: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingHorizontal: RW(5),
    paddingBottom: 10,
    paddingVertical: RH(2),
  },
  timeStamp: {
    color: 'black',
    fontSize: 11,
  },

  timeStyle: {
    flexDirection: 'row',
    position: 'absolute',
    right: RW(5),
    bottom: -3,
    marginLeft: RW(30),
    marginTop: 8,
  },

  receivertimeStamp: {
    color: 'black',
    fontSize: 11,
  },

  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nameReceiver: {
    color: Colors.red,
    fontSize: 14,
    marginTop: -6,
    marginBottom: 12,
  },

  moreReciever: {
    marginTop: -6,
    marginBottom: 12,
  },
  moreSender: {
    position: 'absolute',
    right: 2,
    marginTop: -8,
    marginBottom: 12,
  },

  receivertimeStyle: {
    flexDirection: 'row',
    position: 'absolute',
    left: RW(3),
    bottom: 0,
    marginLeft: RW(3),
    marginTop: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    paddingHorizontal: RW(5),
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    width: RW(100),
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    padding: 2,
  },
  inputField: {
    width: RW(78),
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: RW(2),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingTop: 18,
  },
  chatImage: {
    marginLeft: RW(1),
  },
  senderStyle: {
    backgroundColor: colors.mainColor,
    marginVertical: 6,
    padding: 12,
    marginLeft: RW(30),
    marginRight: RW(3),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  receiverStyle: {
    backgroundColor: colors.gray,
    marginVertical: 6,
    padding: 12,
    marginRight: RW(30),
    marginLeft: RW(3),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 1,
  },
  senderMsg: {
    color: 'white',
  },
  receiverMsg: {
    color: 'black',
  },
});

export default connect(mapStateToProps)(ChatPage);
