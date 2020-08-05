import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {Box, Textview} from '../../components/components';
import {Card, CardItem} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../helpers/colors';
import {video} from '../../helpers/config';

export default function Recents({
  events,
  url,
  navigation,
  podcast,
  livestream,
}) {
  return (
    <Box>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {podcast && (
          <Card style={styles.imgCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Video Podcast', {
                  url: podcast.file,
                })
              }>
              <ImageBackground
                source={{uri: `${url}${podcast.imgx400}`}}
                style={styles.ImageStyle}>
                <Feather name="play-circle" size={38} color="white" />
              </ImageBackground>
            </TouchableOpacity>
          </Card>
        )}
        {podcast && (
          <Card style={styles.imgCard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Live Stream')}>
              <ImageBackground
                source={
                  livestream == null
                    ? require('../../../assets/images/livestream.png')
                    : {uri: `'${video.url}${livestream.img}'`}
                }
                style={styles.ImageStyle}>
                <Feather name="play-circle" size={38} color="white" />
                {livestream ? (
                  <Box style={styles.livestreamBox} color="red">
                    <Textview color={colors.white} center size={16} bold>
                      {' '}
                      Live
                    </Textview>
                  </Box>
                ) : (
                  <Box style={styles.livestreamBox} color="red">
                    <Textview color={colors.white} center size={16} bold>
                      {' '}
                      Offline
                    </Textview>
                  </Box>
                )}
              </ImageBackground>
            </TouchableOpacity>
          </Card>
        )}

        {events && (
          <Card style={styles.imgCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Church Events', {
                  title: events.title,
                  text: events.body,
                  address: events.address,
                  image: events.imgx400,
                  startDate: events.startDate,
                  endtDate: events.endDate,
                  host: events.host,
                  id: events._id,
                  attending: events.attendance,
                })
              }>
              <ImageBackground
                source={{
                  uri: `${url}${events.imgx400}`,
                }}
                style={styles.ImageStyle}>
                <Textview
                  style={styles.imageTxt}
                  color={colors.white}
                  size={16}>
                  Trending Event
                </Textview>
              </ImageBackground>
            </TouchableOpacity>

            <Box color="white">
              <Textview center size={16} bold>
                {' '}
                First Fruit{' '}
              </Textview>
            </Box>
          </Card>
        )}
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCard: {
    width: 280,
    height: 150,
    marginRight: 15,
    borderRadius: 7,
    overflow: 'hidden',
  },
  imageTxt: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontFamily: 'Noteworthy',
  },
  livestreamBox: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    padding: 3,
  },
});
