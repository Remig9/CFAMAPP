import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Box, Textview, CustomButton} from '../../components/components';
import Colors from '../../helpers/colors';
import {Menu, Provider} from 'react-native-paper';
import {RW, RH, RF} from '../../helpers/resize';
import {config} from '../../helpers/config';
import axios from 'axios';
import Snackbar from '../../helpers/Snackbar';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from '../../components';
import BookDropdown from '../../components/BookDropdown';
import VersionDropdown from '../../components/VersionDropdown';
import ChapterDropdown from '../../components/ChapterDropdown';

const OldTestament = () => {
  const navigation = useNavigation();

  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  //bible data
  const [listOfBooks, setListOfBooks] = useState([]);
  const [listOfVersions, setListOfVersions] = useState([]);
  const [listOfChapters, setListOfChapters] = useState([]);

  //for android
  const [showVersion, setShowVersion] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [listOfBooksAndroid, setListOfBooksAndroid] = useState([]);
  const [listOfVersionsAndroid, setListOfVersionsAndroid] = useState([]);
  const [listOfChaptersAndroid, setListOfChaptersAndroid] = useState([]);

  const [bookId, setBookId] = useState('1');

  //placeholder
  const [bookPlaceholder, setBookPlaceholder] = useState('Genesis');
  const [bookName, setBookName] = useState('Genesis');

  const [versionPlaceholder, setVersionPlaceholder] = useState('NKJ');
  const [chapterPlaceholder, setChapterPlaceholder] = useState('1');

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    getListOfBooks();
    getListOfVersions();
    getListOfChapters('1');
  }, [refreshing]);

  useEffect(() => {
    getListOfBooks();
    getListOfVersions();
    getListOfChapters('1');
  }, []);

  //get list of books
  const getListOfBooks = async () => {
    setLoading(true);
    await axios({
      method: 'get',
      url: config.listOfBooks,
    })
      .then(({data}) => {
        setLoading(false);
        // console.log('bokk', data);
        setListOfBooksAndroid(data);
        let firstTestament;
        data ? (firstTestament = data.slice(0, 39)) : null;
        const sort = [];
        firstTestament.forEach((element) => {
          sort.push({label: element.name, value: element.bookId});
        });
        setRefreshing(false);
        setListOfBooks(sort);
        console.warn('list books', sort);
      })
      .catch((err) => {
        setLoading(false);
        setRefreshing(false);
        console.warn(err);
        setVisible(true);
        setMsg('Error loading data, please reload page or try again');
        setType('w');
      });
  };

  //get list of versions
  const getListOfVersions = async () => {
    await axios({
      method: 'get',
      url: config.bibleVersions,
    })
      .then(({data}) => {
        setListOfVersionsAndroid(data);
        const sort = [];
        data.forEach((element) => {
          sort.push({label: element.key, value: element.key});
        });
        setListOfVersions(sort);
        // console.log('versions', sort);
      })
      .catch((err) => {
        console.log('version', err);
      });
    // this.getListOfVersions();
  };

  // get list of chapters
  const getListOfChapters = async (id) => {
    // setLoading(true);
    await axios({
      method: 'get',
      url: config.chaptersOfBible + id,
    })
      .then(({data}) => {
        console.log('chapters', data);
        setListOfChaptersAndroid(data);
        setLoading(false);
        const sort = [];
        data.forEach((element) => {
          sort.push({
            label: String(element.number),
            value: String(element.number),
          });
        });
        setListOfChapters(sort);
        console.log('chatpters', sort);
      })
      .catch((err) => {
        setLoading(false);
        // setRefreshing(false);
        console.warn(err.response);
      });
  };

  const handleBookChange = (id, name) => {
    console.log(id);
    setBookPlaceholder(id);
    setBookName(name);
    setBookId(id);
    getListOfChapters(id);
  };

  const handleReadBible = () => {
    const book = listOfBooks.filter((val, index) => val.value === bookId);
    console.log('boook', book);
    Platform.OS == 'ios'
      ? navigation.navigate('BibleRead', {
          bookId: bookId,
          bookName: book[0].label,
          number: chapterPlaceholder,
          currentversion: versionPlaceholder,
        })
      : navigation.navigate('BibleRead', {
          bookId: bookId,
          bookName: bookPlaceholder,
          number: chapterPlaceholder,
          currentversion: versionPlaceholder,
        });
  };

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  //android functions
  const handleShowVersion = () => {
    setShowVersion(true);
  };
  const handleCloseVersion = () => {
    setShowVersion(false);
  };
  const handleVersionPicked = (key) => {
    setShowVersion(false);
    setVersionPlaceholder(key);
  };

  const handleShowBooks = () => {
    setShowBooks(true);
  };
  const handleCloseBooks = () => {
    setShowBooks(false);
  };
  const handleBookPicked = (name, id) => {
    console.log(id);
    setShowBooks(false);
    setBookPlaceholder(name);
    getListOfChapters(id);
  };

  const handleShowChapter = () => {
    setShowChapters(true);
  };
  const handleCloseChapter = () => {
    setShowChapters(false);
  };
  const handleChapterPicked = (number) => {
    setShowChapters(false);
    setChapterPlaceholder(number);
  };

  return (
    <Provider>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}>
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />

        {loading && (
          <ActivityIndicator
            color={Colors.mainColor}
            style={{flex: 1}}
            size="large"
          />
        )}

        {Platform.OS == 'android' ? (
          <VersionDropdown
            handleShowItems={handleShowVersion}
            visible={showVersion}
            onBackdropPress={handleCloseVersion}
            onBackButtonPress={handleCloseVersion}
            data={listOfVersionsAndroid}
            handleItemPicked={handleVersionPicked}
            placeholder={versionPlaceholder}
          />
        ) : (
          <>
            <Dropdown
              value={versionPlaceholder}
              items={listOfVersions}
              labelRoot={{width: 0}}
              viewContainer={{width: '100%'}}
              handleValue={(version) => setVersionPlaceholder(version)}
            />
            <View style={{height: RH(2)}} />
          </>
        )}

        {Platform.OS == 'android' ? (
          <BookDropdown
            handleShowItems={handleShowBooks}
            visible={showBooks}
            onBackdropPress={handleCloseBooks}
            onBackButtonPress={handleCloseBooks}
            data={listOfBooksAndroid}
            handleItemPicked={handleBookPicked}
            placeholder={bookPlaceholder}
          />
        ) : (
          <>
            <Dropdown
              value={bookPlaceholder}
              items={listOfBooks}
              labelRoot={{width: 100}}
              viewContainer={{width: '100%'}}
              handleValue={(book) => handleBookChange(book)}
            />

            <View style={{height: RH(2)}} />
          </>
        )}

        {Platform.OS == 'android' ? (
          <ChapterDropdown
            handleShowItems={handleShowChapter}
            visible={showChapters}
            onBackdropPress={handleCloseChapter}
            onBackButtonPress={handleCloseChapter}
            data={listOfChaptersAndroid}
            handleItemPicked={handleChapterPicked}
            placeholder={chapterPlaceholder}
          />
        ) : (
          <>
            <Dropdown
              value={chapterPlaceholder}
              items={listOfChapters}
              labelRoot={{width: 70}}
              viewContainer={{width: '100%'}}
              handleValue={(version) => setChapterPlaceholder(version)}
            />

            <View style={{height: RH(2)}} />
          </>
        )}

        <Box center marginBottom={10} marginTop={50}>
          <CustomButton
            onPress={handleReadBible}
            color={Colors.red}
            padding={10}
            shadow
            width={RW(88)}
            height={RH(6)}
            middle
            centered
            borderRadius={8}>
            <Textview h6 center size={16} color="white">
              {' '}
              READ BIBLE{' '}
            </Textview>
          </CustomButton>
        </Box>

        <Snackbar
          visible={visible}
          handleClose={handleClose}
          msg={msg}
          type={type}
        />
      </ScrollView>
    </Provider>
  );
};

export default OldTestament;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
    height: RH(100),
  },
});
