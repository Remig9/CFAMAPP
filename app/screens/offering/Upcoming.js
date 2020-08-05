import React from 'react';
import {Image, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Box, Textview} from '../../components/components';
import moment from 'moment';
import {RW} from '../../helpers/resize';

export default function Upcoming({events, url, navigation}) {
  return (
    <Box padding={20}>
      <Box marginVertical={10}>
        <Textview size={18} bold>
          Upcoming Events
        </Textview>
      </Box>

      <FlatList
        data={events}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Church Events', {
                  title: item.title,
                  text: item.body,
                  address: item.address,
                  image: item.imgx400,
                  startDate: item.startDate,
                  endtDate: item.endDate,
                  host: item.host,
                  id: item._id,
                  attending: item.attendance,
                })
              }>
              <Box width={RW(70)} block direction="row" marginRight={30}>
                <Box marginRight={RW(8)} flex={1}>
                  <Image
                    source={{uri: `${url}${item.imgx150}`}}
                    style={styles.thumbimage}
                  />
                </Box>
                <Box justifyContent={'space-evenly'} flex={2}>
                  <Textview size={14} bold>
                    {item.title}
                  </Textview>
                  <Textview size={12} bold>
                    Host: {item.host}
                  </Textview>
                  <Textview size={12} color="gray">
                    {item.address}
                  </Textview>
                  <Textview size={12} color="gray">
                    {moment(item.startDate).format('DD-MM-YYYY')} -{' '}
                    {moment(item.endDate).format('DD-MM-YYYY')}
                  </Textview>
                </Box>
              </Box>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  thumbimage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
