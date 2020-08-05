import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  Share,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {config, publicToken} from '../../helpers/config';
import {H1, Touch, Button} from '../../helpers/components';
import {RF, RW, RH} from '../../helpers/resize';
import Colors from '../../helpers/colors';
import {Menu, Provider, Caption, Paragraph} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {elevationShadowStyle} from '../../helpers/utils';
import BiblePopUp from './BiblePopUp';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import Snackbar from '../../helpers/Snackbar';
import colors from '../../helpers/colors';
import Clipboard from '@react-native-community/clipboard';
import {Dropdown} from '../../components';
import BibleDropdown from '../../components/BibleDropdown';

class BibleRead extends Component {
  state = {
    chapter: '',
    listOfChapters: '',
    visible: false,
    version: false,
    bibleVersion: '',
    bookId: '',
    bibleId: '',
    versesList: [],
    number: '',
    biblePopup: false,
    clickedText: '',
    showPanel: false,
    showNote: false,
    renderDone: false,
    chapterList: '1',
    showChapters: false,
    showVersion: false,
    chapterNumber: this.props.route.params.number,
    versionType: this.props.route.params.currentversion,
    verseClicked: '',
    usertoken: null,
    snackType: '',
    snackMsg: '',
    snackVisible: false,
    loading: false,
    pageLoading: false,
    refreshing: false,
  };

  componentDidMount() {
    const {bookId} = this.props.route.params;
    this.setState({
      bookId,
    });
    this.getListOfChapters();
    this.getListOfVersions();
    this.getVerses();
    this.getToken();
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    this.setState({
      usertoken: token,
    });
  };

  getListOfChapters = async () => {
    const {listOfChapters} = this.state;
    const {bookId} = this.props.route.params;
    this.setState({
      pageLoading: true,
    });
    await axios({
      method: 'get',
      url: config.chaptersOfBible + bookId,
    })
      .then(({data}) => {
        this.setState({listOfChapters: data, pageLoading: false});

        console.warn('first', this.state.listOfChapters);
        console.log('newww', this.state.listOfChapters);
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
        });
        console.warn('chapters', err.response);
        this.getListOfChapters();
      });
  };

  getListOfVersions = async () => {
    this.setState({
      pageLoading: true,
    });
    await axios({
      method: 'get',
      url: config.bibleVersions,
    })
      .then(({data}) => {
        this.setState({bibleVersion: data, pageLoading: false});
        console.log('versions', data);
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
        });
        console.log('version', err);
      });
    // this.getListOfVersions();
  };

  getVerses = async () => {
    this.setState({
      pageLoading: true,
    });
    const {number, bookId} = this.props.route.params;
    const {versionType} = this.state;
    await axios({
      method: 'get',
      url: `${config.bibleVersions}/chapters?bibleId=${versionType}&bookId=${bookId}&number=${number}`,
    })
      .then(({data}) => {
        this.setState({
          versesList: data.verse,
          pageLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
          snackMsg:
            'Error loading data, please check your internet connection and try again!',
          snackVisible: true,
          snackType: 'w',
        });
        console.warn('verses', err);
        this.getVerses();
      });
  };

  handleVersionChange = async (id, key) => {
    this.setState({
      versionType: key,
      showVersion: false,
      pageLoading: true,
    });
    const {bookId} = this.props.route.params;
    await axios({
      method: 'get',
      url: `${config.bibleVersions}/chapters?bibleId=${key}&bookId=${bookId}&number=${this.state.chapterNumber}`,
    })
      .then(({data}) => {
        this.setState({
          versesList: data.verse,
          pageLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
          snackMsg: 'Error loading data, please refresh the page or try again!',
          snackVisible: true,
          snackType: 'w',
        });
        console.warn(err);
      });
    // this.handleVersionChange();
  };

  handleChapterChange = async (id, number) => {
    this.setState({
      chapterNumber: number,
      showChapters: false,
      pageLoading: true,
    });

    const {bookId} = this.props.route.params;

    await axios({
      method: 'get',
      url: `${config.bibleVersions}/chapters?bibleId=${this.state.versionType}&bookId=${bookId}&number=${number}`,
    })
      .then(({data}) => {
        console.warn('call again', data);
        this.setState({
          versesList: data.verse,
          pageLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
          snackMsg: 'Error loading data, please refresh the page or try again!',
          snackVisible: true,
          snackType: 'w',
        });
        console.warn(err);
      });
  };

  handlePageRefresh = async () => {
    const {bookId} = this.props.route.params;
    const {chapterNumber} = this.state;
    this.setState({
      pageLoading: true,
    });
    await axios({
      method: 'get',
      url: `${config.bibleVersions}/chapters?bibleId=${this.state.versionType}&bookId=${bookId}&number=${chapterNumber}`,
    })
      .then(({data}) => {
        console.warn('call again', data);
        this.setState({
          versesList: data.verse,
          refreshing: false,
          pageLoading: false,
        });
      })
      .catch((err) => {
        console.warn(err);
        this.setState({
          refreshing: false,
          pageLoading: false,
          snackMsg: 'Error loading data, please refresh the page or try again!',
          snackVisible: true,
          snackType: 'w',
        });
      });
  };

  _closeChapters = () => this.setState({showChapters: false});

  _closeVersion = () => this.setState({showVersion: false});

  handleClickedItem = async (text, number) => {
    this.setState({
      biblePopup: !this.state.biblePopup,
      clickedText: text,
      verseClicked: number,
    });
  };

  gotoBookmark = async () => {};

  copyText = async () => {
    this.cancelModal();
    setTimeout(() => Alert.alert('Successful', 'Text Copied!'), 1000);
    await Clipboard.setString(
      `${this.props.route.params.bookName} ${this.state.chapterNumber}:${this.state.verseClicked} - ${this.state.clickedText}`,
    );
  };

  cancelModal = () => {
    this.setState({
      biblePopup: false,
      showPanel: false,
      showNote: false,
    });
  };
  cancelNote = () => {
    this.setState({
      showNote: false,
    });
  };

  panelShow = () => {
    this.setState({
      showPanel: !this.state.showPanel,
    });
  };

  addBookMark = async () => {
    const {
      usertoken,
      versionType,
      bookId,
      chapterNumber,
      verseClicked,
      clickedText,
    } = this.state;
    // this.cancelModal();
    await axios
      .post(
        config.getBookmarks,
        {
          bibleId: versionType,
          book: this.props.route.params.bookName,
          bookId: bookId,
          chapterId: chapterNumber,
          verseId: verseClicked,
          verse: clickedText,
        },
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': usertoken,
          },
        },
      )
      .then((res) => {
        const {bookName} = this.props.route.params;
        console.warn(res);
        this.cancelModal();
        Alert.alert(
          'Successful!',
          `${bookName} ${chapterNumber}:${verseClicked} has been added to your Bookmarks!`,
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Go to Bookmarks',
              onPress: () => this.props.navigation.navigate('Bookmarks'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch((err) => {
        console.warn(err);
        Alert.alert(
          'Error!',
          `Please try again later`,
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        this.cancelModal();
      });
  };

  addNote = () => {
    this.setState({
      showNote: true,
      biblePopup: false,
    });
    console.warn('hfhfhf');
  };

  handleAddNote = () => {
    const {noteTitle, noteBody} = this.state;
    if (!noteTitle) {
      alert('title can not be empty');
    } else if (!noteBody) {
      alert('Note body can not be empty');
    } else {
      this.postNote();
    }
  };

  postNote = async () => {
    const {
      noteTitle,
      noteBody,
      versionType,
      bookId,
      chapterNumber,
      verseClicked,
      clickedText,
      usertoken,
    } = this.state;

    this.setState({
      loading: true,
    });
    await axios
      .post(
        config.getNotes,
        {
          title: noteTitle,
          body: noteBody,
          bibleId: versionType,
          book: this.props.route.params.bookName,
          bookId: bookId,
          chapterId: chapterNumber,
          verseId: verseClicked,
          verse: clickedText,
        },
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': usertoken,
          },
        },
      )
      .then((res) => {
        const {bookName} = this.props.route.params;
        console.warn(res.data);
        this.cancelModal();
        this.setState({
          loading: false,
          noteTitle: '',
          noteBody: '',
        });
        Alert.alert(
          'Successful!',
          `${bookName} ${chapterNumber}:${verseClicked} has been added to your notes!`,
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Go to Notes',
              onPress: () => this.props.navigation.navigate('Notes'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch((err) => {
        this.cancelModal();
        this.setState({
          loading: false,
        });
        Alert.alert(
          'Error!',
          `Please try again later`,
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        console.warn(err);
      });

    this.setState({
      showNote: false,
    });
  };

  showChapterList = () => {
    this.setState({
      showChapters: !this.state.showChapters,
    });
  };

  showVersionList = () => {
    this.setState({
      showVersion: !this.state.showVersion,
    });
  };

  shareText = async () => {
    this.cancelModal();
    try {
      const result = await Share.share({
        message: `${this.props.route.params.bookName} ${this.state.chapterNumber}:${this.state.verseClicked} - ${this.state.clickedText}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handleClose = () => {
    this.setState({
      snackMsg: '',
      snackType: '',
      snackVisible: false,
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.handlePageRefresh();
  };

  render() {
    const {
      listOfChapters,
      bibleVersion,
      versesList,
      snackMsg,
      snackType,
      snackVisible,
      pageLoading,
      refreshing,
    } = this.state;
    const {bookId, bookName} = this.props.route.params;
    return (
      <Provider>
        <View style={[styles.container]}>
          <StatusBar backgroundColor={colors.mainColor} />
          <View style={styles.pageHeader}>
            <View>
              <Touch onPress={() => this.props.navigation.goBack(null)}>
                <Ionicons
                  style={{marginLeft: RW(4)}}
                  name="md-arrow-back"
                  size={28}
                  color={Colors.white}
                />
              </Touch>
            </View>
            <View style={styles.menuStyle}>
              <Menu
                visible={this.state.showChapters}
                onDismiss={this._closeChapters}
                anchor={
                  <Touch
                    onPress={this.showChapterList}
                    style={styles.inputStyle}>
                    <MaterialIcons
                      name="arrow-drop-down-circle"
                      size={24}
                      color="white"
                    />
                    <H1 style={{color: Colors.white}}>
                      {' '}
                      {` ${bookName} ${this.state.chapterNumber}`}
                    </H1>
                  </Touch>
                }>
                {listOfChapters &&
                  listOfChapters.map((item) => {
                    return (
                      <Menu.Item
                        onPress={() =>
                          this.handleChapterChange(item._id, item.number)
                        }
                        title={`${bookName} ${item.number}`}
                      />
                    );
                  })}
              </Menu>

              <Menu
                visible={this.state.showVersion}
                onDismiss={this._closeVersion}
                anchor={
                  <Touch
                    onPress={this.showVersionList}
                    style={styles.versionStyle}>
                    <MaterialIcons
                      style={{marginRight: 3}}
                      name="arrow-drop-down-circle"
                      size={24}
                      color="white"
                      onPress={this.showVersionList}
                    />
                    <H1 style={{color: Colors.white}}>
                      {`${this.state.versionType}`}
                    </H1>
                  </Touch>
                }>
                {bibleVersion &&
                  bibleVersion.map((item) => {
                    return (
                      <Menu.Item
                        onPress={() =>
                          this.handleVersionChange(item._id, item.key)
                        }
                        title={`${item.key}`}
                      />
                    );
                  })}
              </Menu>
            </View>
          </View>
          <View style={{padding: 10}}>
            {pageLoading && (
              <ActivityIndicator
                color={Colors.mainColor}
                style={{flex: 1}}
                size="large"
              />
            )}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              data={versesList}
              renderItem={({item}) => {
                return (
                  <View style={styles.listNumber}>
                    <Paragraph
                      onPress={() =>
                        this.handleClickedItem(item.body, item.number)
                      }
                      style={styles.bibleText}>
                      <Caption>{item.number + ' '}</Caption>
                      {item.body + '\n'}
                    </Paragraph>
                  </View>
                );
              }}
              keyExtractor={(item) => item.text}
            />
            <View style={{height: RH(14)}} />

            <Modal
              onBackdropPress={this.cancelModal}
              onBackButtonPress={this.cancelModal}
              isVisible={this.state.biblePopup}>
              <BiblePopUp
                bookId={this.state.bookId}
                bookName={bookName}
                verseClicked={this.state.verseClicked}
                bookChapter={this.state.chapterNumber}
                addBookMark={() => this.addBookMark()}
                addNote={() => this.addNote()}
                copyText={this.copyText}
                shareText={this.shareText}
                onPress={() => this._panel.hide()}
              />
            </Modal>

            <Modal
              hasBackdrop={false}
              onBackdropPress={this.cancelNote}
              onBackButtonPress={this.cancelModal}
              isVisible={this.state.showNote}>
              <View style={styles.noteModal}>
                <H1 style={styles.addText}>Add Notes</H1>
                <TextInput
                  placeholder="Title"
                  value={this.state.noteTitle}
                  onChangeText={(text) => this.setState({noteTitle: text})}
                  style={styles.addInput}
                />

                <TextInput
                  placeholder="Notes"
                  multiline={true}
                  value={this.state.noteBody}
                  onChangeText={(text) => this.setState({noteBody: text})}
                  style={[
                    styles.addInput,
                    {height: 100, textAlignVertical: 'top', marginTop: 6},
                  ]}
                />

                <Button
                  isLoading={this.state.loading}
                  onPress={this.handleAddNote}
                  style={styles.addBtn}
                  backgroundColor={Colors.red}
                  color="white"
                  name="Submit"
                />
              </View>
            </Modal>
          </View>
        </View>
        <View style={{height: RH(10)}} />
        <Snackbar
          visible={snackVisible}
          handleClose={this.handleClose}
          msg={snackMsg}
          type={snackType}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listNumber: {
    padding: 5,

    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    height: RH(12),
    paddingTop: RH(5),
  },
  menuStyle: {
    position: 'absolute',
    right: RW(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteModal: {
    backgroundColor: 'white',

    width: RW(80),
    padding: RW(4),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
  },
  addText: {
    fontSize: RF(48),
  },
  addBtn: {
    height: 40,
    // width: 80,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: RW(60),
    marginVertical: 14,
  },
  inputStyle: {
    // borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: RH(5),

    padding: 10,
    alignItems: 'center',
    width: RW(35),
  },
  versionStyle: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    width: RW(22),
    paddingTop: RH(1),
    height: RH(6),
    marginTop: RH(5),
  },
  bibleText: {
    fontSize: 15,
    marginBottom: -20,
  },
});

export default BibleRead;
