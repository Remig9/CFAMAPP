import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {
  AppHeader,
  Box,
  Textview,
  CustomButton,
  CustomInput,
} from '../../components/components';
import Colors from '../../helpers/colors';
import RNPickerSelect from 'react-native-picker-select';
import {
  Card,
  CardItem,
  Body,
  ListItem,
  Content,
  Container,
  Left,
  Icon,
  Button,
  Form,
  Item,
  Picker,
} from 'native-base';

import Plus from '../../../assets/images/plus.svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

const offeringType = [
  {label: 'Offering', value: 'offering'},
  {label: 'Tithe', value: 'tithe'},
  {label: 'First Fruit', value: 'first fruit'},
  {label: 'Seed', value: 'seed'},
  {label: 'Others', value: 'others'},
];

const FREQUENCY = [
  {label: 'Daily', value: 'daily'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Monthly', value: 'monthly'},
  {label: 'Quarterly', value: 'quarterly'},
];

const FREQUENCY_NUM = [
  {label: '10', value: '10'},
  {label: '20', value: '20'},
  {label: '30', value: '30'},
  {label: '40', value: '40'},
];

export default function Offering({navigation}) {
  const [select2, setSelect2] = useState('undefined');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <AppHeader
        title="Offerings"
        righticon="md-more"
        lefticon="md-arrow-back"
        onBack={() => navigation.goBack()}
      />
      <ScrollView block margin={20} showsVerticalScrollIndicator={false}>
        <Box direction="row" middle>
          <Box width={SCREEN_WIDTH / 2 - 30}>
            <Textview paddingHorizontal={20} size={16}>
              Offering
            </Textview>
            <Box border marginTop={10} borderRadius={10} borderColor="#ccc">
              <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={offeringType}
                placeholder={{}}
                style={{
                  ...pickerSelectStyles2,
                  iconContainer: {top: 10, right: 1},
                }}
              />
            </Box>
          </Box>
          <Box width={SCREEN_WIDTH / 2 - 50}>
            <Textview paddingHorizontal={20} size={16}>
              Offering
            </Textview>
            <Box
              marginTop={10}
              border
              borderRadius={10}
              marginLeft={10}
              borderColor="#ccc">
              <TextInput style={styles.amount} placeholder="0.00" />
            </Box>
          </Box>
          <Box style={styles.plusIcon}>
            <Plus />
          </Box>
        </Box>

        <Box>
          <Box marginVertical={30}>
            <Textview paddingHorizontal={20} size={16}>
              Offering
            </Textview>
            <Box direction="row">
              <Box
                marginTop={10}
                width={SCREEN_WIDTH / 2 - 30}
                marginRight={15}>
                <CustomButton
                  color="white"
                  padding={12}
                  borderColor={Colors.red}
                  borderWidth={2}
                  borderRadius={8}>
                  <Textview center h6 color="gray">
                    Once Off
                  </Textview>
                </CustomButton>
              </Box>

              <Box marginTop={10} width={SCREEN_WIDTH / 2 - 25}>
                <CustomButton
                  color="white"
                  padding={12}
                  borderColor={Colors.red}
                  borderWidth={2}
                  borderRadius={8}>
                  <Textview center h6 color="gray">
                    Recurring
                  </Textview>
                </CustomButton>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box direction="row" marginBottom={30}>
              <Box border marginTop={10} borderRadius={10} borderColor="#ccc">
                <RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  items={FREQUENCY}
                  placeholder={{}}
                  style={{
                    ...pickerSelectStyles2,
                    iconContainer: {top: 10, right: 1},
                  }}
                />
              </Box>
              <Box
                border
                marginTop={10}
                marginHorizontal={10}
                borderRadius={10}
                borderColor="#ccc">
                <RNPickerSelect
                  onValueChange={(value) => console.log(value)}
                  items={FREQUENCY_NUM}
                  placeholder={{}}
                  style={{
                    ...pickerSelectStyles2,
                    iconContainer: {top: 10, right: 1},
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box marginBottom={10}>
            <Textview size={16}>Destination</Textview>
          </Box>
          <Box
            border
            borderWidth={2}
            borderColor={Colors.red}
            borderRadius={10}
            padding={15}>
            <Textview bold>Exalt Church, Lekki Phase 1 </Textview>
            <ListItem icon noBorder>
              <Left>
                <Icon style={styles.iconStyle} name="md-pin" />
              </Left>
              <Body>
                <Textview>Freedom Way, Lekki Phase 1 Lagos</Textview>
              </Body>
            </ListItem>
            <ListItem icon noBorder>
              <Left>
                <Icon style={styles.iconStyle} active name="md-person" />
              </Left>
              <Body>
                <Textview>Pastor Kolade</Textview>
              </Body>
            </ListItem>
          </Box>
          <Box padding={12} justifyContent="flex-end" direction="row">
            <Box>
              <CustomButton
                onPress={() => navigation.navigate('AddChurch')}
                color="white"
                padding={8}
                shadow
                borderRadius={8}
                width={130}
                direction="row">
                <Textview center h6 color="gray">
                  {' '}
                  <Icon name="md-add" style={styles.icon2Style} /> Add New{' '}
                </Textview>
              </CustomButton>
            </Box>
          </Box>

          <Box
            direction="row"
            margin={10}
            justifyContent="flex-end"
            centered
            middle
            marginVertical={40}>
            <Textview paddingHorizontal={20} color="gray">
              Total Amount
            </Textview>
            <Textview bold h6>
              N140,000
            </Textview>
          </Box>
          <Box marginBottom={10}>
            <CustomButton
              onPress={() => navigation.navigate('Summary')}
              color={Colors.red}
              padding={10}
              shadow
              borderRadius={8}>
              <Textview center h6 color="white">
                {' '}
                MAKE PAYMENT{' '}
              </Textview>
            </CustomButton>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  amount: {
    width: 150,
    padding: 10,
  },
  shadow: {
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {height: 2, width: 2},
    backgroundColor: '#0000',
    elevation: 5,
  },

  plusIcon: {
    marginTop: 25,
  },
  iconStyle: {
    color: Colors.red,
  },
  icon2Style: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 46,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    width: 100,
    borderColor: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 46,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    borderRadius: 8,
    color: 'black',
    width: SCREEN_WIDTH / 2 - 28,
  },
});
