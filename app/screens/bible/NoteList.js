//import liraries
import React, {useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
import {H1, Touch, PageHeaderContainer} from '../../helpers/components';
import {RF, RH, RW} from '../../helpers/resize';
import Colors from '../../helpers/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {AppHeader2} from '../../components/components';

// create a component
const Notes = ({route, navigation}) => {
  const {title, body, chapterId, verseId, book, time, verse} = route.params;

  return (
    <View style={styles.container}>
      <AppHeader2
        onBack={() => navigation.goBack(null)}
        lefticon="arrow-back"
        title={title}
      />
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />

      <View style={styles.listNumber}>
        <View style={styles.firstView}>
          <H1 style={styles.bookList}>
            You added a note on{' '}
            <H1 style={{fontWeight: 'bold', fontSize: RF(30)}}>
              {book} {chapterId}:{verseId}{' '}
            </H1>
          </H1>
          <H1 style={styles.time}>{time}</H1>
        </View>
        <H1 style={styles.verseList}>{verse} </H1>

        <Touch style={styles.noteContainer}>
          <H1 style={styles.noteTitle}>{title}</H1>
          <H1>{body}</H1>
        </Touch>
      </View>
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
    fontSize: RF(35),
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
  noteContainer: {
    backgroundColor: Colors.darkgray,
    marginTop: RH(3),
    padding: 6,
    borderRadius: 4,
  },
  noteTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

//make this component available to the app
export default Notes;
