import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {H1, LargeText, RegularText} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {connect} from 'react-redux';
import {AppHeader2} from '../../components/components';

const mapStateToProps = (state) => ({
  user: state.user,
});

const InboxDetails = ({route, navigation, user}) => {
  const {
    body,
    time,

    prayFor,
  } = route.params;

  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
        title={`${prayFor.substr(0, 26)}...`}
      />
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Colors.mainColor}
          barStyle="light-content"
        />

        <View style={styles.inbox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <LargeText style={styles.nameTxt}>{prayFor} </LargeText>
            </View>
            <H1 style={styles.timeTxt}>{time}</H1>
          </View>

          <RegularText style={styles.emailTxt}>{body}</RegularText>
        </View>
      </View>
    </>
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
    fontSize: 16,
    // fontWeight: "bold",
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
