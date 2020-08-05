import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  H1,
  Touch,
  PageHeaderContainer,
  Button,
  LargeText,
  RegularTextBold,
  RegularText,
} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';

const mapStateToProps = (state) => ({
  user: state.user,
});

const InboxDetails = ({route, navigation, user}) => {
  const [showAnswered, setShowAnswered] = useState(false);
  const [showArchive, setShowArchive] = useState(true);
  const {
    body,
    time,
    id,
    readStatus,
    prayFor,
    churchEmail,
    pastorName,
  } = route.params;

  useEffect(() => {
    markAsRead();
    getToken();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    markAsRead(token);
  };

  const markAsRead = async () => {
    readStatus === 'unread'
      ? await axios
          .put(
            config.markAsRead + id,
            {},
            {
              headers: {
                publicToken: publicToken.token,
                'x-auth-token': user.userToken,
              },
            },
          )
          .then((res) => {
            console.warn(res);
          })
          .catch((err) => {
            console.warn(err.response);
          })
      : console.warn('null');
  };
  return (
    <View style={styles.container}>
      <AppHeader2
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
        title={`${prayFor.substr(0, 26)}...`}
      />
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />

      <View style={styles.inbox}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.emailIcon}>
            <H1 style={{fontSize: RF(49)}}>{pastorName.substr(0, 1)}</H1>
          </View>
          <View>
            <LargeText style={styles.nameTxt}>{pastorName}</LargeText>
            <H1 style={{color: Colors.gray}}>to me</H1>
          </View>
          <H1 style={styles.timeTxt}>{time}</H1>
        </View>

        <RegularText style={styles.emailTxt}>{body}</RegularText>
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
    padding: 16,
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
    fontSize: RF(40),
    color: Colors.mainColor,
    textTransform: 'capitalize',
    width: RW(50),
  },
  archiveIcon: {
    height: 20,
    width: 20,
  },
  emailTxt: {
    fontSize: RF(43),
    padding: 1,
    marginTop: RH(2),
    lineHeight: 36,
  },

  emailAdress: {
    color: Colors.gray,
    fontSize: RF(18),
  },
  emailHeader: {
    fontSize: RF(30),
    // fontWeight: "bold",
  },
  emailTime: {
    // position: 'absolute',
    right: 4,
    color: Colors.gray,
  },
  emailIcon: {
    height: 34,
    width: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: 'center',
    marginRight: 20,
    padding: 3,
    justifyContent: 'center',
  },
  timeTxt: {
    position: 'absolute',
    right: 10,
    color: Colors.gray,
    fontSize: RF(35),
  },
});

export default connect(mapStateToProps)(InboxDetails);
