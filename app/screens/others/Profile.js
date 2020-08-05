import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import {
  AppHeader,
  Box,
  Textview,
  CustomButton,
  CustomInput,
} from '../../components/components';
import Colors from '../../helpers/colors';
import Payment from '../../../assets/images/credit-card2.svg';
import Feather1 from '../../../assets/images/feather-file.svg';
import Feather2 from '../../../assets/images/feather-list.svg';
import Lock from '../../../assets/images/lock.svg';
import {connect} from 'react-redux';
import {video} from '../../helpers/config';
import {RH, RW} from '../../helpers/resize';

const mapStateToProps = ({user}) => ({
  user,
});
const SCREEN_WIDTH = Dimensions.get('window').width;

function Profile({navigation, user: {userDetails}}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />

      <AppHeader
        title="Profile"
        otherTxt="Edit"
        lefticon="arrow-back"
        backPress={() => navigation.goBack()}
        otherPress={() => navigation.navigate('EditProfile')}
      />
      <Box block padding={20}>
        <Box flex={1} marginTop={30} centered middle>
          <Box middle>
            <Box
              style={styles.imageBox}
              color={Colors.red}
              width={120}
              height={120}
              borderRadius={100}>
              {userDetails.img && (
                <Image
                  style={styles.imageStyle}
                  source={{uri: video.url + userDetails.img}}
                />
              )}
            </Box>
            <Textview h6>
              {userDetails
                ? `${userDetails.firstName} ${userDetails.lastName}`
                : ''}
            </Textview>
            <Text
              style={{marginVertical: 16, textAlign: 'center', width: RW(100)}}>
              {userDetails ? userDetails.email : ''}{' '}
            </Text>
          </Box>
        </Box>

        <Box marginTop={RH(2)} flex={2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomButton
              onPress={() => navigation.navigate('ChangePassword')}
              border
              borderRadius={10}
              marginBottom={15}>
              <Box direction="row" middle padding={10}>
                <Box marginRight={10}>
                  <Lock />
                </Box>
                <Textview>Change Password</Textview>
              </Box>
            </CustomButton>

            <CustomButton
              onPress={() => navigation.navigate('History')}
              border
              borderRadius={10}
              marginBottom={15}>
              <Box direction="row" middle padding={10}>
                <Box marginRight={10}>
                  <Feather2 />
                </Box>
                <Textview>Transaction History</Textview>
              </Box>
            </CustomButton>

            <CustomButton
              onPress={() => navigation.navigate('Notes')}
              border
              borderRadius={10}
              marginBottom={15}>
              <Box direction="row" middle padding={10}>
                <Box marginRight={10}>
                  <Feather1 />
                </Box>
                <Textview>Notes</Textview>
              </Box>
            </CustomButton>

            <CustomButton
              onPress={() => navigation.navigate('Bookmarks')}
              border
              borderRadius={10}
              marginBottom={15}>
              <Box direction="row" middle padding={10}>
                <Box marginRight={10}>
                  <Feather1 />
                </Box>
                <Textview>Bookmarks</Textview>
              </Box>
            </CustomButton>

            <CustomButton
              onPress={() => navigation.navigate('Payments')}
              border
              borderRadius={10}
              marginBottom={15}>
              <Box direction="row" middle padding={10}>
                <Box marginRight={10}>
                  <Feather1 />
                </Box>
                <Textview>Payment</Textview>
              </Box>
            </CustomButton>

            <CustomButton
              onPress={() => navigation.navigate('Support')}
              border
              borderRadius={10}
              marginBottom={15}>
              <Box direction="row" middle padding={10}>
                <Box marginRight={10}>
                  <Image
                    style={styles.iconStyle}
                    source={require('../../../assets/images/awesome-headset.png')}
                  />
                </Box>
                <Textview>Support</Textview>
              </Box>
            </CustomButton>
          </ScrollView>
        </Box>
      </Box>
    </View>
  );
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  imageStyle: {
    flex: 1,
    height: null,
    width: null,
  },
  imageBox: {
    overflow: 'hidden',
  },
  iconStyle: {
    height: 14,
    width: 14,
  },
});
