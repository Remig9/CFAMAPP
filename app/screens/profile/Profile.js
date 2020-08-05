import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {H1, Touch, PageHeaderContainer, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {config, publicToken, video} from '../../helpers/config';
import {connect} from 'react-redux';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';

const mapStateToProps = (state) => ({
  user: state.user,
});

function Profile({navigation, user}) {
  const [userDetails, setUserDetails] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserDetails();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserDetails();
  }, [refreshing]);

  const getUserDetails = async () => {
    setPageLoading(true);
    await axios
      .get(config.signup, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': user.userToken,
        },
      })
      .then((res) => {
        setPageLoading(false);
        setRefreshing(false);
        console.warn('my id', res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        setPageLoading(false);
        setRefreshing(false);

        console.warn('home error', err);
        setVisible(true);
        setMsg('Error loading profile, please refresh the page or try again');
        setType('w');
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  return (
    <View style={styles.container}>
      <PageHeaderContainer
        title="Profile"
        menu="md-menu"
        menuPress={() => navigation.toggleDrawer()}
      />
      <ScrollView>
        {pageLoading && (
          <ActivityIndicator
            color={Colors.mainColor}
            style={{flex: 1}}
            size="large"
          />
        )}
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <View style={{flexDirection: 'row', padding: 20}}>
          <Image
            style={{height: 55, width: 55, borderRadius: 30}}
            source={{
              uri: `${video.url}${userDetails.img}`,
            }}
          />
          <View style={{marginLeft: RW(4)}}>
            <H1 style={styles.nameTxt}>
              {userDetails.firstName} {userDetails.lastName}
            </H1>
            <H1>{userDetails.email}</H1>
            <Button
              onPress={() =>
                navigation.navigate('Edit Profile', {
                  name: userDetails.fullName,
                  email: userDetails.email,
                  phone: userDetails.phoneNumber,
                  avatar: userDetails.avatar,
                  address: userDetails.address,
                })
              }
              name="EDIT PROFILE"
              style={{
                // width: RW(30),
                padding: 12,
                borderWidth: 0,
                marginTop: RH(1),
              }}
              backgroundColor={Colors.red}
              color={Colors.white}
            />
          </View>
        </View>

        <View>
          <View style={styles.profileDetails}>
            <H1 style={styles.detailstyle}>Full Name</H1>
            <View style={{width: RW(55)}}>
              <H1 style={styles.labelstyle}>
                {userDetails.firstName} {userDetails.lastName}
              </H1>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <H1 style={styles.detailstyle}>Email Adress</H1>
            <View style={{width: RW(55)}}>
              <H1 style={styles.labelstyle}>{userDetails.email}</H1>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <H1 style={styles.detailstyle}>Phone Number</H1>
            <View style={{width: RW(55)}}>
              <H1 style={styles.labelstyle}>{userDetails.phoneNumber}</H1>
            </View>
          </View>

          {/* <View style={styles.profileDetails}>
          <H1 style={styles.detailstyle}>Address</H1>
          <View style={{width: RW(55)}}>
            <H1 style={styles.labelstyle}>{userDetails.address}</H1>
          </View>
        </View> */}
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  labelstyle: {
    // fontWeight: "bold",
    fontSize: RF(38),
  },
  nameTxt: {
    fontSize: RF(35),
    // fontWeight: "bold",
    marginTop: RH(1),
  },
  detailstyle: {
    fontSize: RF(32),
    color: Colors.gray,
    marginRight: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RH(3),
    paddingHorizontal: RW(5),
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.gray,
    marginTop: RH(3),
  },
});

export default connect(mapStateToProps)(Profile);
