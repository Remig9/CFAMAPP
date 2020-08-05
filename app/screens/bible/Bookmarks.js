import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
import Snackbar from '../../helpers/Snackbar';
import {H1} from '../../helpers/components';
import {RF, RW, RH} from '../../helpers/resize';
import Colors from '../../helpers/colors';
import moment from 'moment';
import colors from '../../helpers/colors';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';

const mapStateToProps = ({user}) => ({
  user,
});

const Bookmarks = ({navigation, user: {userToken}}) => {
  const [listOfBookmarks, setListOfBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    getListOfBookmarks();
  }, [refreshing]);

  const getListOfBookmarks = async () => {
    setLoading(true);

    await axios
      .get(config.getBookmarks, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        setLoading(false);
        setRefreshing(false);
        setListOfBookmarks(res.data);
        console.warn(res);
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
        setVisible(true);
        setMsg('Error loading data, please reload page or try again');
        setType('w');
        console.warn(err.response);
      });
  };

  useEffect(() => {
    getListOfBookmarks();
  }, []);

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
        title="Bookmarks"
      />
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      {listOfBookmarks.length == 0 && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <H1 style={styles.verseList}>You don't have any saved bookmarks</H1>
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
        data={listOfBookmarks}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => {
          return (
            <View style={styles.listNumber}>
              <View style={styles.firstView}>
                <H1 style={styles.bookList}>
                  You bookmarked{' '}
                  <H1 style={{fontWeight: 'bold', fontSize: RF(30)}}>
                    {item.book} {item.chapterId}:{item.verseId}{' '}
                  </H1>
                </H1>
                <H1 style={styles.time}>{moment(item.createdAt).fromNow()}</H1>
              </View>
              <H1 style={styles.verseList}>{item.verse} </H1>
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
    borderBottomColor: colors.gray,
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
});

export default connect(mapStateToProps)(Bookmarks);
