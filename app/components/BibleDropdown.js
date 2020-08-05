import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../helpers/colors';

const BibleDropdown = ({
  TextFieldProps,
  label,
  labelRoot,
  value,
  items,
  viewContainer,
  handleValue,
  rootStyle,
}) => {
  return (
    <View style={[classes.root, rootStyle]}>
      <View style={[classes.labelRoot, labelRoot]}>
        <Subheading style={classes.label}>{label}</Subheading>
      </View>
      <View style={classes.container}>
        <RNPickerSelect
          placeholder={{}}
          items={items}
          value={value}
          onValueChange={(value) => {
            handleValue(value);
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          useNativeAndroidPickerStyle={false}
          textInputProps={{underlineColor: 'yellow'}}
          Icon={() => {
            return <Icon name="menu-down" size={24} color="gray" />;
          }}
        />
      </View>
    </View>
  );
};

export default BibleDropdown;

const classes = StyleSheet.create({
  root: {
    // width: '100%',
  },
  labelRoot: {
    marginBottom: -12,
    backgroundColor: 'white',
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
    height: 28,
  },

  icon: {
    opacity: 0.39,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
