import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {H1, Touch, PageHeaderContainer, Button} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {config, publicToken} from '../../helpers/config';
import Snackbar from '../../helpers/Snackbar';
import axios from 'axios';
import {Searchbar} from 'react-native-paper';
import moment from 'moment';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from 'native-base';
import {connect} from 'react-redux';
import colors from '../../helpers/colors';

const mapStateToProps = ({user}) => ({
  user,
});

const History = ({navigation, user: {userToken}}) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [listOfFilteredHistory, setListOfFilteredHistory] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadTransactions();
  }, [refreshing]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleClose = () => {
    setVisible(false);
    setMsg('');
    setType('');
  };

  loadTransactions = async () => {
    setPageLoading(true);
    await axios
      .get(config.transactionHistory, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': userToken,
        },
      })
      .then((res) => {
        console.warn('res', res);
        setHistory(res['data']);
        setRefreshing(false);
        setPageLoading(false);
        // console.warn("djdd", history);
      })
      .catch((err) => {
        console.warn('error', err);
        setRefreshing(false);
        setPageLoading(false);
        setVisible(true);
        setMsg('Error loading data, please refresh the page or try again');
        setType('w');
      });
  };

  const onChangeSearch = (query) => {
    let filteredData = history.filter(function (item) {
      const itemData = item.description
        ? item.description.toUpperCase()
        : ''.toUpperCase();
      const textData = query.toUpperCase();
      return itemData.includes(textData);
    });
    setListOfFilteredHistory(filteredData);
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
      <PageHeaderContainer
        title="Transaction History"
        back="md-arrow-back"
        backPress={() => navigation.goBack()}
      />

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {pageLoading && (
        <ActivityIndicator
          color={Colors.mainColor}
          style={{flex: 1}}
          size="large"
        />
      )}
      <FlatList
        data={
          listOfFilteredHistory && listOfFilteredHistory.length > 0
            ? listOfFilteredHistory
            : history
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => {
          return (
            <List>
              <ListItem avatar>
                <Left>
                  <View style={styles.logo}>
                    <H1 style={{textTransform: 'capitalize'}}>
                      {item.status.substr(0, 1)}
                    </H1>
                  </View>
                </Left>
                <Body>
                  <H1 style={styles.detailstyle}>{item.status}</H1>
                  <H1 style={styles.labelstyle}>{item.description}</H1>
                </Body>
                <Right>
                  <H1 style={styles.itemstyle}>
                    {moment(item.updatedAt).format('LL')}
                  </H1>
                  <H1 style={[styles.amountStyle]}>
                    {item.currency}
                    {item.amount}
                  </H1>
                </Right>
              </ListItem>
            </List>
          );
        }}
        keyExtractor={(item) => item._id}
      />

      <Snackbar
        visible={visible}
        handleClose={handleClose}
        msg={msg}
        type={type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  labelstyle: {
    // fontWeight: 'bold',
    fontSize: RF(38),
  },
  nameTxt: {
    fontSize: RF(28),
    // fontWeight: "bold",
  },
  detailstyle: {
    fontSize: RF(36),
    color: Colors.gray,
    textTransform: 'capitalize',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RH(2),
    paddingHorizontal: RW(5),
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.gray,
    // marginTop: RH(3),
  },
  amountStyle: {
    color: colors.blue,
    fontWeight: 'bold',
    marginTop: RH(1),
  },
  logo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RW(-1),
  },
});

export default connect(mapStateToProps)(History);
