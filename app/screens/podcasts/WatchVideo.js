import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {video} from '../../helpers/config';
import {connect} from 'react-redux';
import {setPauseAudio} from '../../redux/actions/podcast.action';

const mapDispatchToProps = {
  setPauseAudio,
};

const mapStateToProps = ({user, podcast}) => ({
  user,
  podcast,
});

function WatchVideo({navigation, route, setPauseAudio, podcast}) {
  const {url} = route.params;

  useEffect(() => {
    pauseAudio();
  }, []);

  const pauseAudio = () => {
    setPauseAudio(true);
  };

  const displayErrorMsg = () => {
    alert('error playing podcast, please try again');
  };
  return (
    <View style={{flex: 1}}>
      <VideoPlayer
        source={{uri: `${video.url}${url}`}}
        navigator={navigation}
        onBack={() => navigation.goBack(null)}
        onError={displayErrorMsg}
        disableFocus={false}
      />
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchVideo);
