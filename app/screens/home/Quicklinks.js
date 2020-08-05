import React, {useContext} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Box, Textview} from '../../components/components';
import {Surface} from 'react-native-paper';
import Speech from '../../../assets/images/speech2.svg';
import Map from '../../../assets/images/map2.svg';
import Live from '../../../assets/images/live.svg';
import {AuthContext} from '../../navigation/AuthProvider';
import {RW} from '../../helpers/resize';

export default function Quicklinks({navigation}) {
  const handleLiveStream = async () => {};
  const {logout} = useContext(AuthContext);
  return (
    <Box padding={20}>
      <Box>
        <Box marginVertical={10}>
          <Textview size={18} bold>
            {' '}
            Quick Links{' '}
          </Textview>
        </Box>

        <Box>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Live Stream')}>
              <Surface
                style={styles.surface}
                justifyContent="space-around"
                marginBottom={20}>
                <Live width={50} height={50} />
                <Textview>Live Stream</Textview>
              </Surface>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Resources')}>
              <Surface style={styles.surface}>
                <Speech width={50} height={50} />
                <Textview>Podcasts</Textview>
              </Surface>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Locator')}>
              <Surface style={styles.surface}>
                <Map width={50} height={50} />
                <Textview>Church Locator</Textview>
              </Surface>
            </TouchableOpacity>
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 4,
    marginRight: 20,
    borderRadius: 8,
  },
});
