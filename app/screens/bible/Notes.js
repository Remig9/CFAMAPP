//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
import {H1, Touch, RegularTextBold} from '../../helpers/components';
import {RF, RW, RH} from '../../helpers/resize';
import Colors from '../../helpers/colors';
import Snackbar from '../../helpers/Snackbar';
import moment from 'moment';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';

const mapStateToProps = ({user}) => ({
  user,
});

const Notes = ({route, navigation, user: {userToken}}) => {
  const [listOfNotes, setListOfNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getListOfNotes();
  }, []);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    getListOfNotes();
  }, [refreshing]);

  const getListOfNotes = async () => {
    setLoading(true);
    await axios
      .get(config.getNotes, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setLoading(false);
        setListOfNotes(res.data);
        console.warn(res);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(true);
        setMsg('Error loading data, please reload page or try again');
        setType('w');
        console.warn(err.response);
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  return (
    <View style={styles.container}>
      <AppHeader2
        onBack={() => navigation.goBack(null)}
        lefticon="arrow-back"
        title="Notes"
      />
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      {listOfNotes.length == 0 && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <H1 style={styles.verseList}>You don't have any saved notes</H1>
        </View>
      )}
      {loading && (
        <ActivityIndicator
          color={Colors.mainColor}
          style={{flex: 1}}
          size="large"
        />
      )}
      <FlatList
        data={listOfNotes}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => {
          return (
            <View style={styles.listNumber}>
              <Touch
                onPress={() =>
                  navigation.navigate('NoteList', {
                    title: item.title,
                    body: item.body,
                    book: item.book,
                    chapterId: item.chapterId,
                    verseId: item.verseId,
                    time: moment(item.createdAt).fromNow(),
                    verse: item.verse,
                  })
                }
                style={styles.firstView}>
                <View>
                  <RegularTextBold style={styles.title}>
                    {item.title}
                  </RegularTextBold>
                  <H1 style={styles.bookStyle}>
                    {item.book} {item.chapterId}:{item.verseId} {item.bibleId}
                  </H1>
                </View>
                <H1 style={styles.time}>{moment(item.createdAt).fromNow()}</H1>
              </Touch>
              {/* <H1 style={styles.verseList}>{item.verse} </H1> */}
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: RW(90),
  },
  listNumber: {
    padding: 20,
    // justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  bookList: {
    fontSize: RF(30),
    // color: colors.gray,
    // fontWeight: "bold",
  },
  chapters: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkgray,
  },
  verseList: {
    fontSize: RF(38),
    marginTop: RH(2),
    lineHeight: 20,
  },
  time: {
    fontSize: RF(30),
  },

  bookmarksHeader: {
    fontSize: RF(30),
    // fontWeight: "bold",
    marginLeft: 12,
  },
  bookmarks: {
    borderBottomWidth: 1,
    padding: 5,
    borderBottomColor: 'gray',
  },
  title: {
    fontWeight: 'bold',
    fontSize: RF(40),
    textTransform: 'capitalize',
    width: RW(70),
  },
  bookStyle: {fontSize: RF(40), color: Colors.realgray},
});

//make this component available to the app
export default connect(mapStateToProps)(Notes);
