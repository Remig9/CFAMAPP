import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {H1, Touch, PageHeaderContainer, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import Feather from 'react-native-vector-icons/Feather';

const Reply = ({route, navigation}) => {
  const [showAnswered, setShowAnswered] = useState(false);
  const [showArchive, setShowArchive] = useState(true);

  return (
    <View style={styles.container}>
      <PageHeaderContainer
        title={`Reply`}
        back="md-arrow-back"
        icon1="paperclip"
        icon2="more-vertical"
        icon2Size={30}
        iconSize={25}
        backPress={() => navigation.goBack(null)}
        // otherPress2={() => navigation.navigate("RequestInput")}
      />

      <View style={styles.inbox}>
        <View style={styles.replyView}>
          <H1 style={styles.fromTxt}>From</H1>
          <H1 style={styles.emailTxt}>0.adeniran@techonesystem.com</H1>
        </View>

        <View style={styles.replyView}>
          <H1 style={styles.fromTxt}>To</H1>

          <Touch
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: RW(8),
              borderWidth: 1,
              borderColor: Colors.gray,
              borderRadius: 36,
              padding: 6,
            }}>
            <H1 style={styles.sendmailTxt}>wale@exaltchurch.com</H1>
          </Touch>
        </View>

        <View style={styles.composeView}>
          <TextInput style={styles.messageTxt} placeholder="Compose message" />
        </View>

        <View>
          <Feather
            style={{marginLeft: 20}}
            size={30}
            name="more-horizontal"
            color={Colors.black}
          />
        </View>
        <Button
          name="Send"
          backgroundColor={Colors.red}
          color="white"
          style={{
            width: RW(30),
            height: RH(6.2),
            alignContent: 'center',
            position: 'absolute',
            bottom: 20,
            right: 20,
            borderWidth: 0,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inbox: {
    flex: 1,
    // padding: 24,
    marginTop: RH(0.6),
    backgroundColor: 'white',
  },
  labelstyle: {
    // fontWeight: 'bold',
    fontSize: 18,
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
  nameTxt: {
    fontSize: RF(30),
    // fontWeight: "bold",
    color: Colors.mainColor,
  },
  archiveIcon: {
    height: 20,
    width: 20,
  },
  emailTxt: {
    fontSize: RF(38),
    marginLeft: RW(7),
  },

  sendmailTxt: {
    fontSize: 14,
  },

  emailTime: {
    // position: 'absolute',
    right: 4,
    color: Colors.gray,
  },
  emailIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: 'center',
    marginRight: 10,
    padding: 3,
    justifyContent: 'center',
    marginLeft: RW(-1.4),
  },
  fromTxt: {
    color: Colors.gray,
    fontSize: RF(30),
  },
  messageTxt: {
    color: Colors.black,
    fontSize: RF(30),
    // height: RH(30),
    flex: 1,
  },
  replyView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    padding: 20,
  },

  composeView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
});

export default Reply;
