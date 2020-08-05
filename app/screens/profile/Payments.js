import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {PageHeaderContainer, H1, Button, Touch} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RW, RH} from '../../helpers/resize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import NewCard from './AddCard';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Snackbar from '../../helpers/Snackbar';
import {
  setCardNumber,
  setPaymentPlan,
} from '../../redux/actions/offering.action';
import {ActivityIndicator} from 'react-native-paper';
import {AppHeader2} from '../../components/components';
import colors from '../../helpers/colors';
import Mastercard from '../../../assets/images/Visa-logo.svg';

const mapStateToProps = (state) => ({
  user: state.user,
  offering: state.offering,
});

const mapDispatchToProps = {
  setCardNumber,
  setPaymentPlan,
};

const {width, height} = Dimensions.get('window');

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSavedCards: [],
      newCardVisible: false,
      message: '',
      cardNumber: '',

      snackVisible: false,
      snackMsg: '',
      snackType: '',
      refreshing: false,
      pageLoading: false,
      lastDigits: '',
    };
  }

  componentDidMount() {
    this.loadUserCards();
    this.unsubscribe();
  }

  unsubscribe = () => {
    this.props.navigation.addListener('focus', () => {
      this.loadUserCards();
      // this.getDestination();
    });
  };
  componentWillUnmount() {
    this.unsubscribe();
  }

  loadUserCards = async () => {
    console.warn('load card token', this.props.user.userToken);
    this.setState({
      pageLoading: true,
    });
    await axios
      .get(config.loadUserCards, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': this.props.user.userToken,
        },
      })
      .then((res) => {
        this.setState({
          userSavedCards: res.data,
          pageLoading: false,
          refreshing: false,
        });
        console.warn('res', this.state.userSavedCards);
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
          refreshing: false,
          snackMsg:
            'Failed to load user cards, please refresh the page or try again later',
          snackType: 'w',
          snackVisible: true,
        });
        console.warn(err.response);
      });
  };

  toggleNewCard = () => {
    this.setState({
      newCardVisible: false,
    });
    this.loadUserCards();
  };

  showNewCard = () => {
    this.setState({
      newCardVisible: true,
    });
  };

  onRefresh = () => {
    this.loadUserCards();
  };

  handleClose = () => {
    this.setState({
      snackMsg: '',
      snackType: '',
      snackVisible: false,
    });
  };

  handleRemoveCard = async (id) => {
    this.setState({
      pageLoading: true,
    });
    await axios
      .delete(config.loadUserCards + '/' + id, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': this.props.user.userToken,
        },
      })
      .then(({data}) => {
        this.loadUserCards();
        console.log('remove card', data);
        this.setState({
          pageLoading: false,
          refreshing: false,
          snackMsg: 'Card has been successfully removed!',
          snackType: 'w',
          snackVisible: true,
        });
      })
      .catch((err) => {
        this.setState({
          pageLoading: false,
          refreshing: false,
          // snackMsg: 'Failed to remove card, please try again later',
          // snackType: 'w',
          // snackVisible: true,
        });
        console.log(err.response);
      });
  };

  render() {
    const {
      userSavedCards,

      pageLoading,
      snackMsg,
      snackType,
      snackVisible,
      refreshing,
    } = this.state;

    return (
      <>
        <AppHeader2
          lefticon="arrow-back"
          title="Payment"
          onBack={() => this.props.navigation.goBack(null)}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          style={styles.container}>
          {pageLoading && (
            <ActivityIndicator
              color={Colors.mainColor}
              style={{flex: 1}}
              size="large"
            />
          )}

          <View style={{padding: 12, marginLeft: RW(2)}}>
            <H1 style={styles.cardTxt}>Add card for payment</H1>
            <View style={{flexDirection: 'row'}}>
              <Touch onPress={() => this.showNewCard()} style={styles.addStyle}>
                <Image
                  source={require('../../../assets/images/plusblack.png')}
                />
              </Touch>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.state.userSavedCards &&
                  userSavedCards.map((card) => {
                    if (card.brand === 'visa') {
                      return (
                        <Touch style={styles.cardStyle}>
                          <View style={styles.iconStyle}>
                            <Image
                              style={{marginTop: 12}}
                              source={require('../../../assets/images/visaIcon.png')}
                            />
                            <TouchableOpacity
                              onPress={() => this.handleRemoveCard(card._id)}>
                              <MaterialIcons
                                name="remove-circle"
                                size={30}
                                color="red"
                              />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.chipStyle}>
                            <Image
                              style={styles.chipIcon}
                              source={require('../../../assets/images/chips.jpg')}
                            />

                            <View>
                              <H1>{card.memberId.fullName}</H1>
                              <H1
                                style={{
                                  fontSize: RF(36),
                                  // fontWeight: "bold"
                                }}>
                                **** **** **** {card.last4digits}
                              </H1>
                            </View>
                          </View>
                        </Touch>
                      );
                    } else if (card.brand === 'verve') {
                      return (
                        <Touch style={styles.vervecardStyle}>
                          <View style={styles.iconStyle}>
                            <Image
                              style={{height: 50, width: 120}}
                              source={require('../../../assets/images/verve.png')}
                            />
                            <MaterialIcons
                              name="remove-circle"
                              size={24}
                              color="red"
                            />
                          </View>

                          <View style={styles.vervechipStyle}>
                            <Image
                              style={styles.chipIcon}
                              source={require('../../../assets/images/chips.jpg')}
                            />

                            <View>
                              <H1
                                style={{
                                  fontSize: RF(37),
                                  color: colors.white,
                                }}>
                                {card.memberId.fullName}
                              </H1>
                              <H1
                                style={{
                                  fontSize: RF(37),
                                  color: colors.white,
                                }}>
                                **** **** **** {card.last4digits}
                              </H1>
                            </View>
                          </View>
                        </Touch>
                      );
                    } else {
                      return (
                        <LinearGradient
                          start={{x: 1, y: 0}}
                          end={{x: 0, y: 0}}
                          colors={['#07174B', '#3A57B9']}
                          style={styles.linearGradient}>
                          <Touch>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Image
                                style={{marginTop: 12}}
                                source={require('../../../assets/images/masterIcon.png')}
                              />

                              <MaterialIcons
                                name="remove-circle"
                                size={24}
                                color="red"
                              />
                            </View>

                            <View
                              style={{
                                marginTop: RH(10),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Image
                                style={styles.chipIcon}
                                source={require('../../../assets/images/chips.jpg')}
                              />

                              <View>
                                <H1 style={{color: 'white'}}>
                                  {card.memberId.fullName}
                                </H1>
                                <H1
                                  style={{
                                    fontSize: RF(30),
                                    // fontWeight: "bold",
                                    color: 'white',
                                  }}>
                                  **** **** **** {card.last4digits}
                                </H1>
                              </View>
                            </View>
                          </Touch>
                        </LinearGradient>
                      );
                    }
                  })}
              </ScrollView>

              <Modal
                onBackdropPress={this.toggleNewCard}
                isVisible={this.state.newCardVisible}>
                <NewCard closeCard={this.toggleNewCard} />
              </Modal>
            </View>
          </View>

          <View style={styles.groupImage}>
            <Image
              style={styles.cardImages}
              source={require('../../../assets/images/mastercard-logo.png')}
            />
            <Image
              style={styles.cardImages}
              source={require('../../../assets/images/visa-logo.png')}
            />
            <Image
              style={styles.cardImages}
              source={require('../../../assets/images/verve-logo.png')}
            />
          </View>

          <Snackbar
            visible={snackVisible}
            handleClose={this.handleClose}
            msg={snackMsg}
            type={snackType}
          />
        </ScrollView>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    height: 100,
  },
  amountStyle: {
    padding: 19,
    borderBottomColor: Colors.lightgray,
    borderBottomWidth: 2,
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupImage: {
    marginLeft: RW(3),
    marginTop: RH(35),
    width: RW(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImages: {
    width: 80,

    height: 80,
    resizeMode: 'contain',
    marginRight: 50,
  },
  chipStyle: {
    marginTop: RH(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vervechipStyle: {
    marginTop: RH(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountTxt: {
    color: Colors.mainColor,
    // fontWeight: "bold",
    fontSize: RF(48),
  },
  emailTxt: {
    color: Colors.gray,
  },
  addStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    width: RW(15),
    height: RH(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RH(2),
  },
  addTxt: {
    fontSize: RF(100),
  },
  cardStyle: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: '#F2F3F5',
    width: RW(55),
    height: RH(25),
    padding: RH(1.5),
    marginLeft: RW(3),
    marginTop: RH(1),
  },
  vervecardStyle: {
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: 'black',
    width: RW(65),
    height: RH(25),
    padding: RH(1.5),
    marginLeft: RW(3),
    marginTop: RH(1),
  },
  chipIcon: {
    height: 30,
    width: 30,
    // marginTop: RH(3),
    marginRight: 4,
  },
  linearGradient: {
    flex: 1,
    padding: RH(1.5),
    marginTop: RH(1),
    borderRadius: 16,
    width: 200,
    marginLeft: RW(5),
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: RH(50),
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 10,

    // alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: RH(2),
    alignItems: 'center',
  },
  addTxt: {
    fontSize: RF(35),
    // fontWeight: "bold",
  },
  addBtn: {
    width: RW(85),
    alignSelf: 'center',
  },
  cardNumber: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    height: RH(7),
    width: RW(90),
    marginTop: 10,
    fontSize: RF(30),
  },
  cardTxt: {
    fontWeight: 'bold',
    fontSize: RF(45),
  },
  cardCVV: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    height: RH(7),
    width: RW(42.3),
    marginTop: 10,

    fontSize: 20,
  },
  cardValid: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    height: RH(7),
    width: RW(42.3),
    marginLeft: RW(4),
    marginTop: 10,
    fontSize: RF(30),
  },
  popUp: {
    backgroundColor: Colors.popup,
    height: 10,
    width: 90,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: RH(1.5),
  },
  allowModal: {
    backgroundColor: 'white',
    height: RH(25),
    width: RW(80),
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  acceptBtn: {
    width: RW(35),
    height: RH(5),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    backgroundColor: Colors.green,
    marginTop: RH(2),
    borderRadius: 6,
  },
  allowMessage: {
    marginTop: RH(4),
    fontSize: RF(32),
    // fontWeight: "bold",
  },
};
