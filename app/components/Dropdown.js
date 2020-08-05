import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../helpers/colors';
import {RH} from '../helpers/resize';

const Dropdown = ({
  TextFieldProps,
  label,
  labelRoot,
  value,
  items,
  viewContainer,
  handleValue,
  rootStyle,
  onDonePress,
}) => {
  return (
    <View style={[classes.root, rootStyle]}>
      <View style={[classes.labelRoot, labelRoot]}>
        <Subheading style={classes.label}>{label}</Subheading>
      </View>
      <View style={classes.container}>
        <RNPickerSelect
          placeholder={'Select'}
          items={items}
          value={value}
          onDonePress={onDonePress}
          onValueChange={(value) => {
            handleValue(value);
          }}
          style={{
            viewContainer: {
              alignContent: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
              justifyContent: 'space-between',
              ...viewContainer,
            },
            inputIOS: {
              width: '100%',
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderColor: 'red',
              borderRadius: 4,
              color: colors.black,
              paddingRight: 30, // to ensure the text is never behind the icon
            },
            inputAndroid: {
              fontSize: 16,
              paddingHorizontal: 10,
              // paddingVertical: 8,
              width: 600,
              // borderWidth: 0.5,
              // borderColor: '#D9D9D9',
              // flex: 0.9,
              // borderRadius: 8,
              color: colors.black,
              paddingRight: 30, // to ensure the text is never behind the icon
            },
          }}
          // Icon={() => {
          //   return (
          //     <View style={classes.iconRoot}>
          //       <Icon name="menu-down" size={25} style={classes.icon} />
          //     </View>
          //   );
          // }}
        />
      </View>
    </View>
  );
};

export default Dropdown;

const classes = StyleSheet.create({
  root: {
    // width: '100%',
  },
  labelRoot: {
    marginBottom: -12,
    backgroundColor: 'transparent',
    zIndex: 1,
    width: 70,
  },
  label: {
    fontSize: 14,
    padding: 0,
    margin: 0,
    fontWeight: '500',
  },
  container: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 3,
    height: 48,
    // marginTop: Platform.OS == 'android' ? RH(-1) : null,
  },
  iconRoot: {
    alignContent: 'center',
    justifyContent: 'center',
    // width: '100%',
    flex: 0.1,
    marginHorizontal: 5,
    marginTop: 10,
  },
  icon: {
    opacity: 0.39,
  },
});

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    // width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    // flex: 0.9
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // width: 300,
    // width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius: 4,
    color: '#2AC940',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // width: 300,
    // borderWidth: 0.5,
    // borderColor: '#D9D9D9',
    // flex: 0.9,
    // borderRadius: 8,
    color: '#2AC940',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
