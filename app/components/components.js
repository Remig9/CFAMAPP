import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Header, Left, Body, Right, Title, Button, Icon} from 'native-base';
import colors from '../helpers/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Bell from '../../assets/images/bell.svg';
import {RH, RW} from '../helpers/resize';
import {H1} from '../helpers/components';

export const elevationShadowStyle = (elevation) => {
  return {
    elevation,
    shadowColor: '#0001',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.1,
    shadowRadius: 0.2 * elevation,
  };
};
export const capitalize = (val) => val.replace(/\b\w/g, (l) => l.toUpperCase());

export const cleanInteger = (val) => val.replace(/\,/g, '');

const b_styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export const CustomButton = ({
  block,
  margin,
  marginHorizontal,
  marginTop,
  marginBottom,
  padding,
  width,
  height,
  border,
  borderWidth,
  borderColor,
  borderRadius,
  color,
  fontSize,
  textColor,
  style,
  textStyle,
  centered,
  middle,
  children,
  shadow,
  ...props
}) => {
  const buttonstyle = [
    block && b_styles.block,
    margin && {margin},
    marginTop && {marginTop},
    marginBottom && {marginBottom},
    marginHorizontal && {marginHorizontal},
    padding && {padding},
    width && {width},
    height && {height},
    border && {borderWidth: 1, borderColor: 'gray'},
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    borderRadius && {borderRadius},
    color && {backgroundColor: color},
    centered && {justifyContent: 'center'},
    middle && {alignItems: 'center'},
    shadow && {
      shadowOpacity: 0.25,
      shadowRadius: 15,
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: {height: 0, width: 2},
    },
    style,
  ];
  const styleText = [
    fontSize && {fontSize},
    textColor && {color: textColor},
    textStyle,
  ];

  if (typeof children == 'string') {
    return (
      <TouchableOpacity style={buttonstyle} {...props}>
        <Text style={styleText}>{children}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={buttonstyle} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export const CustomInput = ({
  margin,
  marginTop,
  marginBottom,
  padding,
  value,
  border,
  radius,
  onTextChange,
  secureTextEntry,
  style,
  placeholder,
  fontSize, // fontSize
  ...props
}) => {
  const inputStyle = [
    marginTop && {marginTop},
    marginBottom && {marginBottom},
    margin && {margin},
    padding && {padding},
    border && {borderWidth: 1, borderColor: '#ccc'},
    radius && {borderRadius: 10},
    fontSize && {fontSize},
    style,
  ];
  return (
    <TextInput
      style={inputStyle}
      value={value}
      placeholder={placeholder}
      onChangeText={onTextChange}
      {...props}
    />
  );
};

export const Textview = ({
  margin,
  padding,
  paddingHorizontal,
  bgColor,
  color,
  size,
  bold,
  center,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  style,
  children,

  ...props
}) => {
  const styleComponent = [
    {fontSize: 14}, // default h6
    margin && {margin},
    padding && {padding},
    paddingHorizontal && {paddingHorizontal},
    bgColor && {backgroundColor: bgColor},
    color && {color},
    size && {fontSize: size},
    bold && {fontWeight: 'bold'},
    h1 && {fontSize: 44, fontWeight: 'bold'},
    h2 && {fontSize: 38, fontWeight: 'bold'},
    h3 && {fontSize: 32, fontWeight: 'bold'},
    h4 && {fontSize: 28, fontWeight: 'bold'},
    h5 && {fontSize: 22, fontWeight: 'bold'},
    h6 && {fontSize: 18, fontWeight: 'bold'},
    center && {textAlign: 'center'},
    style,
  ];
  return (
    <Text style={styleComponent} {...props}>
      {children}
    </Text>
  );
};

const box_styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export const Box = ({
  block,
  flex,
  margin,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  marginHorizontal,
  marginVertical,
  padding,
  paddingHorizontal,
  paddingVertical,
  width,
  height,
  border,
  borderWidth,
  borderColor,
  centered,
  color,
  style,
  direction,
  middle,
  children,
  justifyContent,
  borderRadius,
  shadow,
  ...props
}) => {
  const boxStyle = [
    block && box_styles.block,
    margin && {margin},
    flex && {flex},
    marginTop && {marginTop},
    marginLeft && {marginLeft},
    marginRight && {marginRight},
    marginBottom && {marginBottom},
    marginHorizontal && {marginHorizontal},
    marginVertical && {marginVertical},
    padding && {padding},
    width && {width},
    height && {height},
    border && {borderWidth: 1, borderColor: 'gray'},
    borderWidth && {borderWidth},
    borderColor && {borderColor},
    color && {backgroundColor: color},
    centered && {justifyContent: 'center'},
    justifyContent && {justifyContent},
    direction && {flexDirection: direction},
    paddingVertical && {paddingVertical},
    paddingHorizontal && {paddingHorizontal},
    middle && {alignItems: 'center'},
    borderRadius && {borderRadius},
    shadow && {
      shadowOpacity: 0.5,
      shadowRadius: 1,
      shadowColor: 'gray',
      shadowOffset: {height: 1, width: 1},
      backgroundColor: '#fff',
      elevation: 3,
    },
    style,
  ];
  return (
    <View style={boxStyle} {...props}>
      {children}
    </View>
  );
};

export const AppHeader = (props) => {
  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity style={styles.backIcon} onPress={props.backPress}>
        <MaterialIcons name={props.rightIcon} size={32} color={colors.white} />
      </TouchableOpacity>
      <H1 style={styles.titleTxt}>{props.title}</H1>
      <View style={styles.otherStyle}>
        <TouchableOpacity onPress={props.otherPress}>
          <Textview style={styles.otherTxt}>{props.otherTxt}</Textview>
        </TouchableOpacity>

        <TouchableOpacity style={props.style2} onPress={props.otherPress2}>
          <MaterialIcons
            size={30}
            name={props.righticon}
            color={colors.white}
            style={props.icon2Style}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AppHeader2 = (props) => (
  <Header
    androidStatusBarColor={colors.mainColor}
    style={{backgroundColor: colors.mainColor}}>
    <Box onPress={props.onBack}>
      <Button style={styles.backIcon} onPress={props.onBack} transparent>
        <MaterialIcons
          style={styles.leftIcon}
          name={props.lefticon}
          color="white"
          size={30}
        />
      </Button>
    </Box>
    <Body style={{textAlign: 'center', alignSelf: 'center'}}>
      <Title style={{color: 'white'}}>{props.title}</Title>
    </Body>
    <Box>
      <Button onPress={props.onRightPress} transparent style={styles.leftIcon}>
        <Feather name={props.righticon} size={24} color="white" />
      </Button>
    </Box>
  </Header>
);

export const AppHeaderLight = (props) => (
  <Header androidStatusBarColor="black" style={{backgroundColor: 'white'}}>
    <Body style={{textAlign: 'center', alignSelf: 'center'}}>
      <Textview h5 style={{color: 'black'}}>
        {props.title}
      </Textview>
    </Body>
    <Box>
      <Button transparent>
        <Bell />
      </Button>
    </Box>
  </Header>
);

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'android' ? RH(8) : RH(12),
    backgroundColor: colors.mainColor,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? RH(1) : RH(5),
  },
  titleTxt: {
    color: 'white',
    fontSize: 22,
    marginLeft: RW(10),
  },
  otherStyle: {
    position: 'absolute',
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 20,
  },
  iconStyle: {
    paddingRight: RW(4),
    marginTop: Platform.OS === 'android' ? RH(1) : RH(5),
  },
  leftIcon: {
    marginTop: Platform.OS === 'android' ? RH(1) : RH(0.1),
    marginRight: Platform.OS === 'android' ? RW(2) : null,
  },

  backIcon: {
    marginTop: Platform.OS === 'android' ? RH(0.5) : RH(0.1),
    marginRight: Platform.OS === 'android' ? RW(2) : null,
  },
  otherTxt: {
    color: colors.white,
    fontSize: 20,
    marginRight: 12,
    marginTop: 4,
    marginTop: Platform.OS === 'android' ? RH(0.1) : RH(5),
  },
});
