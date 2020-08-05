import React, {useContext} from 'react';
import {View, StyleSheet, Button, Image, StatusBar} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import {Box, Textview, CustomButton} from '../../components/components';
import Colors from '../../helpers/colors';

export default function Login({navigation}) {
  const {login} = useContext(AuthContext);
  return (
    <Box block centered>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <Box block centered middle>
        <Image
          style={{height: 200, width: 200}}
          source={require('../../../assets/images/logo.png')}
        />
        <Box middle>
          <Textview h3 style={styles.headerStyle}>
            Welcome to CAFAM
          </Textview>
        </Box>
      </Box>
      <Box block centered middle>
        <CustomButton
          onPress={() => navigation.navigate('Signup')}
          borderRadius={10}
          shadow
          width="80%"
          color={Colors.red}
          padding={15}
          marginBottom={15}>
          <Textview center h6 color="#fff">
            Sign Up
          </Textview>
        </CustomButton>
        <CustomButton
          onPress={() => navigation.navigate('Login')}
          borderRadius={10}
          // shadow
          width="80%"
          padding={15}
          borderWidth={2}
          borderColor={Colors.red}>
          <Textview center h6 color={Colors.red}>
            Login
          </Textview>
        </CustomButton>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 120,
    marginBottom: 25,
  },
  headerStyle: {
    // fontFamily: 'GastromondRegular',
    textAlign: 'center',
  },
});
