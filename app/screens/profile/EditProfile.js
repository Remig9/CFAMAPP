import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {RegularTextBold, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import ImagePicker from 'react-native-image-picker';
import {Left, Body, Right} from 'native-base';
import colors from '../../helpers/colors';
import axios from 'axios';
import {connect} from 'react-redux';
import {config, publicToken, video} from '../../helpers/config';
import {ActivityIndicator} from 'react-native-paper';
import Snackbar from '../../helpers/Snackbar';
import {setUserDetails} from '../../redux/actions/users.action';
import {AppHeader2} from '../../components/components';

const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = {
  setUserDetails,
};

const Profile = ({navigation, route, user: {userToken}, setUserDetails}) => {
  const [userAvatar, setUserAvatar] = useState('');
  const [userDetails, setUsersDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // const {avatar} = route.params;

  useEffect(() => {
    getUserDetails();
  }, []);
  const options = {
    title: 'Change Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onRefresh = React.useCallback(() => {
    getUserDetails();
  }, [refreshing]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    await axios
      .put(
        config.updateProfile,
        {
          firstName: firstName ? firstName : userDetails.firstName,
          lastName: lastName ? lastName : userDetails.lastName,
        },
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': userToken,
          },
        },
      )
      .then((res) => {
        setLoading(false);

        console.warn('res', res);
        getUserDetails();
        setVisible(true);
        setMsg('Profile successfully updated!');
        setType('w');
      })
      .catch((err) => {
        setLoading(false);

        console.warn('error', err.response.data);
        setVisible(true);
        setMsg('Error updating profile, please try again!');
        setType('w');
      });
  };

  const getUserDetails = async () => {
    setPageLoading(true);
    await axios
      .get(config.signup, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        console.warn('my id', res.data);
        setPageLoading(false);
        setRefreshing(false);
        setUsersDetails(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        setPageLoading(false);
        setRefreshing(false);

        console.warn('home error', err);
        getUserDetails();
        setVisible(true);
        setMsg('Error loading profile, please refresh the page or try again');
        setType('w');
      });
  };

  const handleChangeImage = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setVisible(true);
        setMsg('Upload image cancelled');
        setType('w');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setVisible(true);
        setMsg(
          'You denied this app permission to your Camera and Gallery, go to your settings and give access.',
        );
        setType('w');
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setUserAvatar(source);
        let formData = new FormData();
        formData.append('img', {
          uri: response.uri,
          type: 'image/jpeg',
          name: 'profile-picture',
        });
        console.warn('formData', formData);
        setPageLoading(true);
        axios({
          url: config.changeProfilePicture,
          method: 'PUT',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            publicToken: publicToken.token,
            'x-auth-token': userToken,
          },
        })
          .then((res) => {
            getUserDetails();

            console.warn('res', res);
            setPageLoading(false);
            setVisible(true);
            setMsg('Profile picture successfully uploaded!');
            setType('w');
          })
          .catch((err) => {
            console.warn('error', err);
            setPageLoading(false);
            setVisible(true);
            setMsg('Error updating profile, please try again');
            setType('w');
          });
      }
    });
  };

  const handleRemoveImage = async () => {
    setPageLoading(true);
    await axios
      .delete(config.removeImage, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        console.warn('my id', res.data);
        setVisible(true);
        setMsg('Image successfuly removed!');
        setType('w');
        setPageLoading(false);
        setRefreshing(false);
        getUserDetails();
      })
      .catch((err) => {
        setPageLoading(false);
        setRefreshing(false);
        console.warn('home error', err);
        getUserDetails();
        setVisible(true);
        setMsg('Error removing image, please try again');
        setType('w');
      });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };
  return (
    <>
      <AppHeader2
        title="Edit Profile"
        lefticon="arrow-back"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar
          backgroundColor={Colors.mainColor}
          barStyle="light-content"
        />
        {pageLoading && (
          <ActivityIndicator
            color={colors.mainColor}
            style={{flex: 1}}
            size="large"
          />
        )}
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

        <View style={styles.bStyle}>
          <View>
            <Image
              style={styles.avatarStyle}
              source={{uri: `${video.url}${userDetails.img}`}}
            />
          </View>
          <Body style={styles.bodyStyle}>
            <View style={styles.rowStyle}>
              <View>
                <Button
                  name="CHANGE IMAGE"
                  color={Colors.red}
                  onPress={handleChangeImage}
                  style={[styles.profileChange]}
                />
              </View>

              <View style={{marginLeft: RW(2)}}>
                <Button
                  onPress={handleRemoveImage}
                  name="REMOVE IMAGE"
                  color="white"
                  style={styles.removeBtn}
                />
              </View>
            </View>
          </Body>
        </View>

        <View style={{padding: 14}}>
          <RegularTextBold style={styles.labelstyle}>
            First Name
          </RegularTextBold>
          <TextInput
            autoCorrect={false}
            defaultValue={userDetails.firstName}
            onChangeText={(txt) => setFirstName(txt)}
            style={styles.inputStyle}
          />

          <RegularTextBold style={styles.labelstyle}>Last Name</RegularTextBold>
          <TextInput
            autoCorrect={false}
            defaultValue={userDetails.lastName}
            onChangeText={(txt) => setLastName(txt)}
            style={styles.inputStyle}
          />

          <RegularTextBold style={styles.labelstyle}>
            Email Address
          </RegularTextBold>
          <TextInput
            editable={false}
            defaultValue={userDetails.email}
            style={[styles.inputStyle, {color: 'gray'}]}
          />

          <RegularTextBold style={styles.labelstyle}>Phone</RegularTextBold>
          <TextInput
            editable={false}
            defaultValue={
              userDetails &&
              `+${userDetails.countryCode}${userDetails.phoneNumber}`
            }
            onChangeText={(txt) => setPhoneNumber(txt)}
            style={[styles.inputStyle, {color: 'gray'}]}
          />
        </View>

        <Button
          isLoading={loading}
          name="UPDATE PROFILE"
          color="white"
          onPress={handleUpdateProfile}
          style={styles.updateBtn}
        />
        <Snackbar
          visible={visible}
          handleClose={handleClose}
          msg={msg}
          type={type}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whitesmoke,
  },

  bStyle: {
    flexDirection: 'row',
    padding: 20,
    // width: RW(100),
  },

  updateButton: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  removeTxt: {
    fontWeight: 'bold',
    color: '#fff',
  },
  removeBtn: {
    padding: 9,
    borderWidth: 2,
    marginTop: RH(1),
    borderColor: Colors.red,
    borderRadius: 9,
    backgroundColor: colors.red,
    width: RW(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyStyle: {
    justifyContent: 'flex-start',
  },

  avatarStyle: {
    height: 65,
    width: 65,
    borderRadius: 35,
  },

  rowStyle: {flexDirection: 'row'},

  boldStyle: {fontWeight: 'bold'},

  labelstyle: {
    // fontWeight: "bold",
    fontSize: RF(32),
    marginTop: RH(3),
  },
  nameTxt: {
    fontSize: RF(28),
    // fontWeight: "bold",
  },
  detailstyle: {
    fontSize: RF(28),
    color: Colors.gray,
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RH(3),
    paddingHorizontal: RW(8),
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.gray,
    marginTop: RH(3),
  },
  profileBtn: {
    width: RW(30),
    padding: 14,
    borderWidth: 0,
    marginTop: RH(1),
    borderRadius: 9,
  },
  updateBtn: {
    width: RW(92),
    padding: 14,
    borderWidth: 0,
    marginTop: RH(2),
    alignSelf: 'center',
    borderRadius: 9,
    justifyContent: 'center',
    backgroundColor: colors.red,
  },

  profileChange: {
    width: RW(30),
    padding: 9,
    borderWidth: 2,
    marginTop: RH(1),
    borderColor: Colors.red,
    borderRadius: 9,
    backgroundColor: colors.white,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.gray,
    width: RW(92),
    marginTop: RH(1),
    height: RH(6),
    color: Colors.black,
    padding: 6,
    fontSize: RF(45),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
