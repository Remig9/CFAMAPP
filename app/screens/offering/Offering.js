import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {H1, Touch, Button, RegularTextBold} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RH, RW, RF} from '../../helpers/resize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MultipleOffering from './MultipleOffering';
import {config, publicToken} from '../../helpers/config';
import axios from 'axios';
import {connect} from 'react-redux';
import Snackbar from '../../helpers/Snackbar';
import {CheckBox} from 'react-native-elements';
import {
  setChurchDestination,
  setOfferingAmount,
  setOfferingSwitch,
  setOfferingType,
  setTransactionCost,
} from '../../redux/actions/offering.action';
import Modal from 'react-native-modal';
import colors from '../../helpers/colors';
import {Card, ActivityIndicator} from 'react-native-paper';

const mapStateToProps = (state) => ({
  offering: state.offering,
  user: state.user,
});

const mapDispatchToProps = {
  setOfferingAmount,
  setOfferingSwitch,
  setOfferingType,
  setChurchDestination,
  setTransactionCost,
};

const offeringType = [
  {label: 'Tithe', value: 'tithe'},
  {label: 'Offering', value: 'offering'},
  {label: 'Seed', value: 'seed'},
];

const currencyType = [
  {label: 'NGN', value: 'ngn', symbol: '₦'},
  {label: 'USD', value: 'usd', symbol: '$'},
  {label: 'EUR', value: 'eur', symbol: '€'},
  {label: 'GBP', value: 'gbp', symbol: '£'},
];

const options = [
  {label: 'Once Off', value: 'onceoff'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Monthly', value: 'monthly'},
];

class Offering extends Component {
  state = {
    chooseDestination: false,

    seedMoney: '',
    offeringType: '',
    recurringDuration: Number('1'),
    multiple: [MultipleOffering],
    multipleData: [
      {
        walletId: '',
        amount: 0,
      },
    ],
    wallet: [],
    destination: '',
    churchName: '',
    churchAddress: '',
    churchPastor: '',
    churchId: '',
    pastorName: '',
    snackType: '',
    snackMsg: '',
    snackVisible: '',
    currencyVisible: false,
    currencyplaceholder: 'NGN',
    loading: false,
    pageLoading: false,
    walletVisible: false,
    walletPlaceholder: '',
    refreshing: false,
    transactionCost: false,
    currencySymbol: '₦',
    transactionPercent: '',
    newAmount: '',
  };

  handleOnceOff = () => {
    this.setState({
      chooseOnceOff: !this.state.chooseOnceOff,
    });
    this.setState({
      chooseRecurring: false,
    });
  };

  handleRecurring = () => {
    this.setState({
      chooseRecurring: !this.state.chooseRecurring,
    });
    this.setState({
      chooseOnceOff: false,
    });
  };

  handleDestination = () => {
    this.setState({
      chooseDestination: !this.state.chooseDestination,
    });
  };

  handleAdd = () => {
    const {multiple, multipleData} = this.state;

    if (multiple.length >= 10) return;

    multiple.push(MultipleOffering);
    multipleData.push({
      amount: 0,
      walletId: '',
    });

    this.setState({
      multiple,
    });
  };

  handleRemove = (index) => {
    const {multiple, multipleData} = this.state;

    multiple.splice(index, 1);
    multipleData.splice(index, 1);

    this.setState({
      multiple,
    });
  };

  handleValue = (index, key, value) => {
    const {multipleData} = this.state;

    console.log('claaed', index, key, value);

    multipleData[index][key] = value;

    this.setState({
      multipleData,
    });
    console.warn(index, value, key);
  };

  getAllWallets = async () => {
    this.setState({
      pageLoading: true,
    });
    console.warn('wall', this.props.offering.destinationDetails._id);
    try {
      const wallets = await axios.get(
        config.getWallet + this.props.offering.destinationDetails._id,
        {
          headers: {
            publicToken: publicToken.token,
            'x-auth-token': this.props.user.userToken,
          },
        },
      );

      console.warn('wallets 214', wallets);

      // const val = [];
      // wallets.data.forEach((element) => {
      //   val.push({
      //     label: element.name,
      //     value: element._id,
      //   });
      // });
      this.setState({
        wallet: wallets.data,
        pageLoading: false,
        refreshing: false,
        walletPlaceholder: wallets.data[0].name,
      });
      console.warn('wallets', this.state.wallet);
      this.props.setOfferingType(this.state.wallet[0]._id);
    } catch (error) {
      console.log('walet', error);
      // this.getAllWallets();
      this.setState({
        pageLoading: false,
        refreshing: false,
        snackMsg:
          'Failed to load offering type, please refresh the page or try again later',
        snackType: 'w',
        snackVisible: true,
      });
      console.log(error.response);
    }
  };

  getTransactionCost = async () => {
    await axios
      .get(config.transactionCost, {
        headers: {
          publicToken: publicToken.token,
          'x-auth-token': this.props.user.userToken,
        },
      })
      .then((res) => {
        console.warn('res card', res.data);
        this.setState({
          transactionPercent: res.data.transCost,
        });
      })
      .catch((err) => {
        console.warn(err.response);
      });
  };

  componentDidMount() {
    this.getAllWallets();
    this.getTransactionCost();
    this.unsubscribe();
    this.props.setOfferingSwitch('onceoff');
    this.props.setOfferingAmount('');
    console.log(this.state.transactionCost);
  }

  unsubscribe = () => {
    this.props.navigation.addListener('focus', () => {
      this.getAllWallets();
      // this.getDestination();
    });
  };
  componentWillUnmount() {
    this.unsubscribe();
  }

  handleOfferingType = (name, value) => {
    this.props.setOfferingType(value);
    this.setState({
      walletPlaceholder: name,
      walletVisible: false,
    });
    console.warn('hello', value);
  };

  handleSwitchOffering = (value) => {
    this.props.setOfferingSwitch(value);
  };

  handleProceedSummary = () => {
    const {walletPlaceholder, currencySymbol, transactionCost} = this.state;
    if (this.props.offering.offeringAmount) {
      setTimeout(() => {
        this.props.setTransactionCost(transactionCost);
        this.props.navigation.navigate('Summary', {
          type: walletPlaceholder,
          currency: currencySymbol,
        });
      }, 1000);
    } else {
      this.setState({
        snackMsg: 'Please Enter Amount ',
        snackType: 'w',
        snackVisible: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      snackMsg: '',
      snackType: '',
      snackVisible: false,
    });
  };

  toggleCurrency = () => {
    this.setState({
      currencyVisible: !this.state.currencyVisible,
    });
  };
  closeCurrency = () => {
    this.setState({
      currencyVisible: false,
    });
  };

  handlePickedCurrency = (txt, symbol) => {
    this.setState({
      currencyplaceholder: txt,
      currencyVisible: false,
      currencySymbol: symbol,
    });
  };

  handleWalletVisible = () => {
    this.setState({
      walletVisible: true,
    });
  };

  closeWallet = () => {
    this.setState({
      walletVisible: false,
    });
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.getAllWallets();
  };

  handleAmount = (txt) => {
    this.props.setOfferingAmount(txt);
    this.setState({
      newAmount: txt,
    });
  };
  handleCheckBox = (value) => () => {
    const {offeringAmount} = this.props.offering;
    const {transactionPercent, transactionCost, newAmount} = this.state;
    console.log(transactionCost);

    console.log((transactionPercent / 100) * Number(offeringAmount));

    if (value) {
      let addedCost =
        (transactionPercent / 100) * Number(offeringAmount) +
        Number(offeringAmount);
      console.log(newAmount);
      this.props.setOfferingAmount(JSON.stringify(addedCost));
    } else {
      this.props.setOfferingAmount(newAmount);
    }

    this.setState({
      transactionCost: value,
    });
  };

  render() {
    const {
      snackMsg,
      snackType,
      snackVisible,
      multiple,
      multipleData,
      destination,
      currencyVisible,
      currencyplaceholder,
      loading,
      pageLoading,
      walletPlaceholder,
      refreshing,
      transactionCost,
    } = this.state;

    const {selectRecurring} = this.props.user;

    const {destinationDetails} = this.props.offering;

    const forms = multiple.map((Element, index) => {
      return (
        <Element
          key={index}
          total={multiple.length}
          value={multipleData[index]}
          index={index}
          wallet={this.state.wallet}
          handleValue={this.handleValue}
          handleRemove={this.handleRemove}
        />
      );
    });
    let total = this.state.multipleData.reduce(
      (a, b) => parseFloat(a) + parseFloat(Number(b.amount)),
      0,
    );

    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor={colors.mainColor} />
        {pageLoading && (
          <ActivityIndicator
            color={colors.mainColor}
            style={{flex: 1}}
            size="large"
          />
        )}
        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />

        <ScrollView>
          <View style={styles.amountContainer}>
            <View>
              <RegularTextBold>Currency</RegularTextBold>
              <View>
                <Touch
                  onPress={this.toggleCurrency}
                  style={styles.currencyStyle}>
                  <H1 style={{fontSize: RF(45)}}>{currencyplaceholder}</H1>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={24}
                    color="black"
                  />
                </Touch>
              </View>

              <Modal
                style={styles.currencyModal}
                onBackdropPress={() => this.closeCurrency()}
                visible={currencyVisible}
                // visible={true}
                backdropColor={'black'}
                backdropOpacity={1}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}>
                <View>
                  {currencyType.map((currency) => {
                    return (
                      <Touch
                        key={currency.label}
                        onPress={() =>
                          this.handlePickedCurrency(
                            currency.label,
                            currency.symbol,
                          )
                        }>
                        <H1 style={{marginTop: 12, fontSize: RF(45)}}>
                          {currency.label}
                        </H1>
                      </Touch>
                    );
                  })}
                </View>
              </Modal>
            </View>

            <View>
              <RegularTextBold style={styles.amountTxt}>Amount</RegularTextBold>
              <TextInput
                style={styles.inputAmount}
                placeholder="0.00"
                placeholderTextColor={colors.black}
                value={this.props.offering.offeringAmount}
                onChangeText={(txt) => this.handleAmount(txt)}
              />
            </View>
          </View>

          <View style={{padding: 12}}>
            <Text style={{fontWeight: 'bold', marginTop: 5, marginLeft: 4}}>
              Offering Type
            </Text>
          </View>

          <Touch
            onPress={this.handleWalletVisible}
            style={styles.offeringTypeView}>
            <H1 style={{fontSize: 17, marginLeft: 6}}>{walletPlaceholder}</H1>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </Touch>

          <Modal
            style={{
              flex: 0,
              backgroundColor: 'white',
              marginTop: RH(30),
            }}
            visible={this.state.walletVisible}
            onBackdropPress={this.closeWallet}>
            <Card style={{padding: 12}}>
              {this.state.wallet !== undefined &&
                this.state.wallet.map((wallet) => {
                  return (
                    <Touch
                      onPress={() =>
                        this.handleOfferingType(wallet.name, wallet._id)
                      }
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <H1 style={{marginTop: 12}}>{wallet.name}</H1>
                    </Touch>
                  );
                })}
            </Card>
          </Modal>

          <RegularTextBold style={{marginLeft: 18, marginTop: 10}}>
            Frequency
          </RegularTextBold>

          <View style={styles.offeringSwitch}>
            <SwitchSelector
              borderRadius={6}
              options={options}
              initial={0}
              buttonColor={colors.red}
              onPress={(value) => this.handleSwitchOffering(value)}
            />
          </View>

          <View style={styles.offeringCheckbox}>
            {/* <View>
              <CheckBox
                style={styles.checkBox}
                onPress={this.handleCheckBox(!this.state.transactionCost)}
                checked={transactionCost}
                title={'I want to cover the transaction cost (Optional)'}
                uncheckedColor={Colors.mainColor}
                checkedColor={Colors.red}
              />
            </View> */}
            {/* <View style={{marginHorizontal: RW(6)}}>
              <Text>I want to cover the transaction cost(Optional)</Text>
            </View> */}
          </View>

          <View style={{marginTop: RH(1), marginHorizontal: RW(2)}}>
            <RegularTextBold style={styles.offeringTxt}>
              {' '}
              Destination
            </RegularTextBold>

            <View style={styles.modeBoxContainer}>
              <View>
                <Touch
                  onPress={this.handleDestination}
                  style={[styles.destinationBox]}>
                  <H1 style={styles.churchName}>
                    {destinationDetails != null
                      ? destinationDetails.name
                      : destination.name}
                  </H1>

                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color={Colors.red}
                      style={{marginTop: RH(1)}}
                    />
                    <H1 style={styles.churchTxt}>
                      {destinationDetails
                        ? destinationDetails.address
                        : destination.address}
                    </H1>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <FontAwesome5
                      name="user-alt"
                      size={16}
                      color={Colors.red}
                      style={{marginTop: RH(1)}}
                    />
                    <H1 style={styles.churchTxt}>
                      {' '}
                      {destinationDetails
                        ? destinationDetails.pastor
                        : destination.pastor}
                    </H1>
                  </View>
                </Touch>
              </View>
            </View>
            <View style={{marginBottom: RH(10)}}>
              <Card style={styles.addNewBtn}>
                <Touch
                  onPress={() => this.props.navigation.navigate('AddChurch')}>
                  <RegularTextBold style={[styles.modeTxt]}>
                    {' '}
                    + Add new
                  </RegularTextBold>
                </Touch>
              </Card>
            </View>
          </View>

          <Button
            isLoading={loading}
            onPress={this.handleProceedSummary}
            style={{
              width: RW(90),
              borderWidth: 0,
              alignSelf: 'center',
              marginTop: 1,
            }}
            backgroundColor={colors.red}
            color="white"
            name="PROCEED"
          />
          <View style={{height: RH(4)}} />
        </ScrollView>
        <Snackbar
          visible={snackVisible}
          handleClose={this.handleClose}
          msg={snackMsg}
          type={snackType}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    width: RW(80),
    alignSelf: 'center',
    // padding: 18,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 1,
  },
  modalItem: {
    padding: 20,
    // marginVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencyStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RW(2),
    justifyContent: 'space-between',
    marginTop: RH(1),
    borderWidth: 1.4,
    borderColor: colors.gray,
    width: RW(45),
    borderRadius: 3,
    // height: RH(6),
  },
  offeringSwitch: {
    marginHorizontal: RW(4),
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  offeringTypeView: {
    marginHorizontal: RW(4),
    // marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
  },
  inputAmount: {
    borderWidth: 1.4,
    borderColor: colors.gray,
    padding: RW(2),
    marginLeft: RW(2),
    width: RW(45),
    borderRadius: 3,
    height: 42,
    marginTop: RH(1),
    color: colors.black,
  },
  amountTxt: {
    textAlign: 'center',
    marginRight: RW(30),
  },
  amountContainer: {
    flexDirection: 'row',
    paddingHorizontal: RW(4),
    marginTop: RH(1),
    justifyContent: 'space-between',
  },
  currencyModal: {
    height: RH(18),
    backgroundColor: colors.white,
    paddingHorizontal: RW(3),
    paddingVertical: RH(3),
    width: RW(80),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    borderRadius: 4,
    marginTop: RH(30),
  },
  offeringTxt: {
    fontSize: RF(40),
    marginLeft: 8,
    marginBottom: 12,
  },
  offeringCheckbox: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: RW(2),
  },
  moneyTxt: {
    fontSize: RF(28),
    // fontWeight: "bold",
    marginBottom: RH(1),
    marginLeft: RW(3),
  },

  modeBoxContainer: {
    // marginHorizontal: RW(10),
    alignItems: 'center',
  },
  modeTxt: {
    fontSize: RF(38),
    textAlign: 'center',
  },
  churchName: {
    fontWeight: 'bold',
    fontSize: RF(37),
    // marginBottom: RH(1),
    marginLeft: RW(1.2),
  },
  destinationContainer: {
    paddingHorizontal: RW(1),
    paddingVertical: RH(1),
    flex: 1,
    flexDirection: 'row',
  },
  destinationBox: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: colors.red,
    padding: 12,
    width: RW(92),
    marginHorizontal: RW(1),
    justifyContent: 'center',
  },
  churchTxt: {
    fontSize: 12,
    marginBottom: 4,
    marginLeft: RW(1.2),
    marginTop: RH(1),
  },

  addnewTxt: {
    alignItems: 'center',
    height: 20,
    width: RW(30),
    // borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RW(4),
    marginTop: RH(1),
  },
  totalAmount: {
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
    marginTop: RH(2),
    alignItems: 'center',
  },
  totalContainer: {
    borderTopWidth: 0.5,
    marginTop: RH(2),
    borderColor: 'gray',
  },
  totalTxt: {
    fontSize: RF(38),
    // fontWeight: "bold",
    marginLeft: RW(3),
  },

  nairaTxt: {
    fontSize: RF(70),
    marginTop: RH(-6.8),
    marginLeft: RW(2),
  },

  addNewBtn: {
    padding: RW(4),
    borderRadius: 8,
    marginLeft: 10,
    width: RW(30),
    marginTop: 6,
    position: 'absolute',
    right: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Offering);
