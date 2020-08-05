import React from 'react';
import {View, Text, StatusBar, FlatList, StyleSheet} from 'react-native';
import colors from '../../helpers/colors';
import {Touch, H1} from '../../helpers/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RH, RW, RF} from '../../helpers/resize';

const chats = [
  {
    name: 'Youth Bible Study Class',
    status: 'Public',
    chats: 20,
    id: '123ybsc',
  },

  {
    name: 'Prayer Meeting Chatrrom',
    status: 'Public',
    chats: 10,
    id: '123pmc',
  },
  {
    name: 'Job Offer Chatroom',
    status: 'Public',
    chats: 12,
    id: '123joc',
  },
  {
    name: 'Church Staff Chatroom',
    status: 'Public',
    chats: 15,
    id: '123csc',
  },
];

export default function Chatroom({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.mainColor} barStyle="light-content" />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        renderItem={({item}) => (
          <Touch
            onPress={() =>
              navigation.navigate('ChatBoard', {
                data: item,
              })
            }
            style={styles.chatContainer}>
            <View style={{width: RW(48)}}>
              <H1 style={styles.chatName}>{item.name}</H1>
            </View>
            <View style={{width: RW(35)}}>
              <H1 style={styles.chatStaus}>{item.status}</H1>
            </View>

            <View style={{width: RW(6)}}>
              <MaterialCommunityIcons
                name="chat-processing"
                size={24}
                color={colors.blue}
              />
            </View>
          </Touch>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RH(2),
    // paddingHorizontal: RW(4),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.6,
    paddingHorizontal: RW(4),
    borderBottomColor: colors.gray,
  },
  chatName: {
    fontWeight: '900',
    fontSize: RF(38),
  },
  chatStaus: {
    marginLeft: 12,
    // fontWeight: "bold",
  },
  chatNumber: {color: colors.blue},
});
