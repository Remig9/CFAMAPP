//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {H1, Button} from '../../helpers/components';
import {RF, RW, RH} from '../../helpers/resize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../helpers/colors';
import {video, config, publicToken} from '../../helpers/config';
import moment from 'moment';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Snackbar from '../../helpers/Snackbar';
import {AppHeader2} from '../../components/components';
import {Card} from 'react-native-paper';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// create a component
const EventDetails = ({route, navigation, user}) => {
  const [maybe, setMaybe] = useState(false);
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titles, setTitle] = useState('');

  useEffect(() => {
    console.log('people attending', attending);
    const token = AsyncStorage.getItem('userToken');
    getDetails();
    getSingleEvent();
  }, []);

  const handleEvent = () => {
    console.warn(title);
    setTitle(title);
    AddCalendarEvent.presentEventCreatingDialog({
      title: title,
      startDate: startDate,
      endDate: endDate,
      location: address,
      // and other options
    })
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          console.warn(JSON.stringify(eventInfo.action));
          eventInfo.action == 'SAVED'
            ? alert('Events Saved!')
            : alert('Reminder Canceled!');
        },
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

  const handleMaybe = async () => {
    setLoading(true);
    await axios
      .put(
        config.attendance + id,
        {},
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': user.userToken,
          },
        },
      )
      .then((res) => {
        console.log('maybe', res.data);
        getDetails();
        setMaybe(true);
        setVisible(true);
        setLoading(false);
        setMsg(res.data);
        setType('w');
      })
      .catch((err) => {
        console.warn('handle maybe', err.response.data);
        setVisible(true);
        setLoading(false);

        setMsg(err.response.data);
        setType('w');
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
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
        getSingleEvent(res.data._id);
        setLoading(false);

        // console.warn(maybe);
      })
      .catch((err) => {
        console.warn('get details ', err.response);

        setLoading(false);
      });
  };

  const getSingleEvent = async (userId) => {
    setLoading(true);

    await axios
      .get(config.singleEvent + id, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': user.userToken,
        },
      })
      .then((res) => {
        console.warn('single event', res.data);
        {
          res.data.attendance.includes(userId)
            ? setMaybe(true)
            : setMaybe(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('single event', err.response.data);
        setLoading(false);
      });
  };

  const {
    host,
    text,
    address,
    image,
    startDate,
    endDate,
    title,
    id,
    attending,
  } = route.params;

  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        title="Church Event"
        onBack={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator
          style={{flex: 1}}
          size="large"
          color={colors.mainColor}
        />
      ) : null}
      <ScrollView style={styles.container}>
        <View style={styles.eventContainer}>
          <View style={styles.eventStyle}>
            <Image
              style={{
                width: RW(95),
                height: 400,
                resizeMode: 'cover',
                alignSelf: 'center',
                borderRadius: 12,
              }}
              source={{uri: `${video.url}${image}`}}
            />
            <H1 style={styles.topicTxt}>{title}</H1>
            <H1 style={styles.pastorTxt}>by {host} </H1>
          </View>
        </View>

        <ScrollView>
          <View style={styles.calendarTime}>
            <MaterialCommunityIcons
              name="calendar-month"
              size={38}
              color={colors.realgray}
            />

            <View style={{marginLeft: RW(4)}}>
              <H1 style={styles.datendTime}>Date and Time</H1>
              <H1 style={styles.dateStyle}>
                {moment(startDate).format('DD-MM-YYYY')} -{' '}
                {moment(endDate).format('DD-MM-YYYY')}
              </H1>
              <H1 style={styles.dateStyle}>
                {moment(startDate).format('hh:mm A')}
              </H1>
            </View>
          </View>

          <View style={styles.calendarTime}>
            <MaterialCommunityIcons
              name="script-text-outline"
              size={38}
              color={colors.realgray}
            />

            <View style={styles.eventDetails}>
              <H1 style={styles.dateStyle}>{text}</H1>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.bottomView}>
        {maybe ? (
          <Card style={styles.cardAttendance}>
            <TouchableOpacity
              style={styles.markAttendance}
              onPress={handleMaybe}>
              <H1>ATTENDING</H1>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card onPress={handleMaybe} style={styles.cardAttendance}>
            <TouchableOpacity
              style={styles.markAttendance}
              onPress={handleMaybe}>
              <H1>MAYBE</H1>
            </TouchableOpacity>
          </Card>
        )}

        <Button
          onPress={handleEvent}
          name="SET REMINDER"
          backgroundColor={colors.red}
          color="white"
          style={styles.reminderBtn}
        />
      </View>
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventContainer: {},
  eventStyle: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 12,
  },
  topicTxt: {
    // fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 12,
    marginVertical: 6,
  },
  pastorTxt: {
    fontSize: 14,
    paddingLeft: 12,
    color: colors.gray,
  },
  calendarTime: {
    flexDirection: 'row',
    paddingLeft: 12,
    marginVertical: 12,
  },
  dateStyle: {
    color: colors.realgray,
    fontSize: 12,
  },
  datendTime: {
    // fontWeight: "bold",
    fontSize: 12,
  },
  eventDetails: {
    marginLeft: RW(4),
    paddingRight: RW(10),
    width: RW(90),
  },

  reminderBtn: {
    width: RW(50),
    marginLeft: 8,
    borderWidth: 0,

    height: RH(7),
    justifyContent: 'center',
  },
  maybeBtn: {
    width: RW(36),
    marginLeft: 8,
    borderWidth: 0,
    height: RH(7),
    justifyContent: 'center',
  },
  bottomView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingRight: 12,
    height: RH(12),
    marginBottom: 12,
    justifyContent: 'space-around',
  },
  markAttendance: {
    // padding: RH(2),
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: RH(2.5),
    width: RW(30),
    alignItems: 'center',
    justifyContent: 'center',
    // height: RH(7),
  },
  cardAttendance: {
    height: RH(7),
    marginTop: RH(3),
    marginRight: RW(5),
    borderRadius: 8,
    justifyContent: 'center',
  },
});

//make this component available to the app
export default connect(mapStateToProps)(EventDetails);
