import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {
  AppHeader2,
  Box,
  Textview,
  CustomButton,
} from '../../components/components';
import Colors from '../../helpers/colors';
import {Body, ListItem, List, Left, Right, Thumbnail, Icon} from 'native-base';
import Speech from '../../../assets/images/speech.svg';
import Event from '../../../assets/images/event.svg';
import Faq from '../../../assets/images/faq.svg';
import Map from '../../../assets/images/map.svg';
import Prayer from '../../../assets/images/prayer.svg';
import Bell from '../../../assets/images/bell.svg';
import Stream from '../../../assets/images/stream.svg';
import colors from '../../helpers/colors';
import {AuthContext} from '../../navigation/AuthProvider';
import {useContext} from 'react';
import {connect} from 'react-redux';
import {video} from '../../helpers/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setDuration, setRecurring} from '../../redux/actions/mode.action';
import {
  setOfferingType,
  setChurchDestination,
  setOfferingAmount,
  setCardNumber,
  setPaymentPlan,
} from '../../redux/actions/offering.action';
import {setUserDetails, setUserToken} from '../../redux/actions/users.action';
import {RH, RW} from '../../helpers/resize';

const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = {
  setOfferingType,
  setChurchDestination,
  setOfferingAmount,
  setCardNumber,
  setPaymentPlan,
  setUserDetails,
  setUserToken,
};

function More({
  navigation,
  user: {userDetails},
  setOfferingType,
  setChurchDestination,
  setOfferingAmount,
  setCardNumber,
  setPaymentPlan,
  setUserDetails,
  setUserToken,
}) {
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    setDuration('1');
    setRecurring('Weekly');
    setOfferingType('');
    setChurchDestination(null);
    setOfferingAmount('');
    setCardNumber('');
    setPaymentPlan('');
    setUserDetails(null);
    setUserToken(null);
    logout();
  };
  return (
    <>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <AppHeader2 title="More" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Box block>
          <List>
            <Box paddingHorizontal={16} style={styles.Underline} marginTop={20}>
              <ListItem thumbnail noBorder>
                <CustomButton onPress={() => navigation.push('Profile')}>
                  <Left>
                    {userDetails.img && (
                      <Thumbnail source={{uri: video.url + userDetails.img}} />
                    )}
                  </Left>
                </CustomButton>
                <Body onPress={() => navigation.push('Profile')}>
                  <Textview onPress={() => navigation.push('Profile')}>
                    {userDetails
                      ? `${userDetails.firstName} ${userDetails.lastName}`
                      : ''}
                  </Textview>
                  <View style={{width: '90%'}}>
                    <Textview style={{color: colors.gray}}>
                      {userDetails ? userDetails.email : ''}
                    </Textview>
                  </View>
                </Body>

                <TouchableOpacity
                  style={{
                    height: RH(5),
                    width: RW(25),
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.red,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.push('Profile')}>
                  <Text style={{color: Colors.red}}>View Profile</Text>
                </TouchableOpacity>
              </ListItem>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Notifications')}>
                  <Left>
                    <Bell />
                  </Left>
                  <Body>
                    <Textview>Notifications</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            </Box>

            <Box paddingHorizontal={20} style={styles.Underline}>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Thread')}>
                  <Left>
                    <Prayer />
                  </Left>
                  <Body>
                    <Textview>Prayer Request</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>

              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Events')}>
                  <Left>
                    <Event />
                  </Left>
                  <Body>
                    <Textview>Church Event</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Resources')}>
                  <Left>
                    <Speech />
                  </Left>
                  <Body>
                    <Textview>Podcasts</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Locator')}>
                  <Left>
                    <Map />
                  </Left>
                  <Body>
                    <Textview>Church Locator</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Live Stream')}>
                  <Left>
                    <Stream />
                  </Left>
                  <Body>
                    <Textview>Live Stream</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            </Box>

            <Box paddingHorizontal={20}>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => navigation.navigate('Faq')}>
                  <Left>
                    <Faq />
                  </Left>
                  <Body>
                    <Textview>Faq</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
              <ListItem thumbnail noBorder>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => handleLogout()}>
                  <Left>
                    <MaterialCommunityIcons
                      name="logout"
                      size={30}
                      color={colors.mainColor}
                    />
                  </Left>
                  <Body>
                    <Textview>Logout</Textview>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            </Box>
          </List>
        </Box>
      </ScrollView>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(More);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  Underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
