import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {H1, Touch} from '../../helpers/components';
import {RH, RF, RW} from '../../helpers/resize';
import Colors from '../../helpers/colors';
import {elevationShadowStyle} from '../../helpers/utils';

const {width} = Dimensions.get('window');

const BiblePopUp = (props) => (
  <>
    <View style={styles.bottomSheet}>
      <View style={styles.popUp} />
      <H1 style={styles.addTxt}>
        {props.bookName}
        {` `}
        {props.bookChapter}:{props.verseClicked}
      </H1>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bottomContainer}>
        <Touch onPress={props.copyText} style={styles.cardBtn}>
          <H1 style={styles.cardTxt}>COPY</H1>
        </Touch>
        <Touch onPress={props.shareText} style={styles.cardBtn}>
          <H1 style={styles.cardTxt}>SHARE</H1>
        </Touch>
        <Touch onPress={props.addNote} style={styles.cardBtn}>
          <H1 style={styles.cardTxt}>NOTE</H1>
        </Touch>

        <Touch onPress={props.addBookMark} style={styles.cardBtn}>
          <H1 style={styles.cardTxt}>BOOKMARK</H1>
        </Touch>
      </ScrollView>
    </View>
  </>
);
export default BiblePopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: -RH(2),
    width: width,
    // height: RH(30),
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 10,
    marginLeft: RW(-4.5),

    // alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    marginTop: RH(2),
    alignItems: 'center',
  },
  addTxt: {
    fontSize: RF(35),
    // fontWeight: "bold",
    paddingLeft: 12,
  },

  cardBtn: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    // height: RH(7),
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: 'center',
    ...elevationShadowStyle(5),
    marginLeft: RW(3),
  },
  cardTxt: {
    // fontWeight: "bold",
    fontSize: RF(28),
  },

  popUp: {
    backgroundColor: Colors.popup,
    height: 10,
    width: 90,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: RH(1.5),
  },
  colorBtn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    marginLeft: RW(6),
    marginTop: RH(2),
  },
});
