import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {Textview} from './components';
import {RH, RW} from '../helpers/resize';
import Colors from '../helpers/colors';

export default function ChurchModal({
  handleShowItems,
  visible,
  onBackButtonPress,
  onBackdropPress,
  handleItemPicked,
  placeholder,
  data,
}) {
  return (
    <View>
      <TouchableOpacity onPress={handleShowItems} style={styles.bookStyle}>
        <Textview style={styles.placeholderTxt}>{placeholder}</Textview>
        <MaterialCommunityIcons
          style={styles.boxIcon}
          name="menu-down"
          size={30}
        />
      </TouchableOpacity>
      <Modal
        style={{marginTop: RH(15)}}
        isVisible={visible}
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackButtonPress}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => handleItemPicked(item.name, item._id)}
                style={styles.listView}>
                <Textview size={18}>{item.name}</Textview>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bookStyle: {
    borderWidth: 1,
    width: RW(45),
    height: RH(6),
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RH(3),
  },

  placeholderTxt: {
    paddingHorizontal: 12,
  },
  listView: {
    paddingVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
});
