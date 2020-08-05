import React, {useState} from 'react';
import {StyleSheet, View, RefreshControl} from 'react-native';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import OldTestament from '../bible/OldTestament';
import Newestament from '../bible/NewTestament';
import {AppHeader2} from '../../components/components';
import Modal from 'react-native-modal';
import {RH, RW} from '../../helpers/resize';
import {Touch, H1} from '../../helpers/components';
import Colors from '../../helpers/colors';

export default function Bible({navigation}) {
  const [showPanel, setShowPanel] = useState(false);

  const panelShow = () => {
    setShowPanel(!showPanel);
  };
  const cancelModal = () => {
    setShowPanel(false);
  };

  const handleBookmark = () => {
    setShowPanel(false);
    navigation.navigate('Bookmarks');
  };

  const handleNotes = () => {
    setShowPanel(false);
    navigation.navigate('Notes');
  };
  return (
    <Container>
      <AppHeader2
        title="Holy Bible"
        righticon="more-vertical"
        onRightPress={panelShow}
      />

      <View style={{flex: 1}}>
        <Tabs tabBarUnderlineStyle={{backgroundColor: Colors.red}}>
          <Tab
            tabStyle={{backgroundColor: '#fff'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            heading="Old Testament"
            textStyle={{backgroundColor: '#fff'}}
            activeTextStyle={{backgroundColor: '#fff'}}>
            <OldTestament />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#fff'}}
            activeTabStyle={{backgroundColor: '#fff'}}
            textStyle={{backgroundColor: '#fff'}}
            activeTextStyle={{backgroundColor: '#fff'}}
            heading="New Testament">
            <Newestament />
          </Tab>
        </Tabs>
      </View>
      <Modal
        onBackdropPress={cancelModal}
        onBackButtonPress={cancelModal}
        isVisible={showPanel}>
        <View style={styles.popModal}>
          <Touch onPress={handleNotes} style={styles.popItem}>
            <H1 style={styles.popText}>Notes</H1>
          </Touch>

          <Touch
            onPress={handleBookmark}
            style={[styles.popItem, {marginTop: RH(2)}]}>
            <H1 style={styles.popText}>Bookmarks</H1>
          </Touch>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  tabStyle: {
    backgroundColor: 'white',
  },
  popModal: {
    backgroundColor: 'white',
    height: RH(12),
    width: RW(40),
    padding: RW(4),
    position: 'absolute',
    top: RH(6),
    right: 4,
    borderRadius: 12,
  },
  popItem: {
    flexDirection: 'row',
  },
  popText: {
    marginLeft: 10,
  },
});
