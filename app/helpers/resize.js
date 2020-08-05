import React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const RW = (num) => {
  return (num / 100) * width;
};

export const RH = (num) => {
  return (num / 100) * height;
};

export const RF = (num) => {
  return (num / width) * 150;
};
