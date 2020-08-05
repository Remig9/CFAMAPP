import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {RH, RW, RF} from './resize';
import AppColors from './colors';
import {elevationShadowStyle} from './utils';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../helpers/fonts';

export const H1 = (props) => (
  <Text
    style={[
      {color: AppColors.black, fontFamily: Fonts.RegularText},
      props.style,
    ]}>
    {props.children}
  </Text>
);

export const LargeText = (props) => (
  <Text
    style={[
      {fontFamily: Fonts.LargeTextBold, fontSize: Fonts.size26},
      props.style,
    ]}>
    {props.children}
  </Text>
);

export const RegularText = (props) => (
  <Text style={[{fontFamily: Fonts.RegularText}, props.style]}>
    {props.children}
  </Text>
);

export const RegularTextBold = (props) => (
  <Text style={[{fontFamily: Fonts.RegularTextBold}, props.style]}>
    {props.children}
  </Text>
);

export const H2 = (props) => (
  <Text style={[{}, props.style]} numberOfLines={props.numberOfLines}>
    {props.children}
  </Text>
);

export const Logo = (props) => (
  <View style={{alignItems: 'center'}}>
    <Image
      style={[styles.image, {...props.imageStyle}]}
      source={require('../../assets/images/dove.png')}
    />
    <View style={[styles.topRed, {...props.topRed}]} />
    <H1 style={[styles.splashTxt, {...props.nameStyle}]}>{props.name}</H1>
    <View style={[styles.bottomRed, {...props.bottomRed}]} />
  </View>
);

export const ContentPadding = (props) => (
  <View style={[{flex: 1, marginTop: RH(2)}, props.style]}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: RH(0)}}>
      {props.children}
      <View style={{paddingBottom: RH(15)}} />
    </ScrollView>
  </View>
);

export const ContentPaddingPullToRefresh = (props) => (
  <View style={[{flex: 1, marginTop: RH(2)}, props.style]}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: RH(0)}}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }>
      {props.children}
      <View style={{paddingBottom: RH(15)}} />
    </ScrollView>
  </View>
);

export const Touch = (props) => (
  <TouchableOpacity
    onLongPress={props.onLongPress}
    disabled={props.disabled}
    activeOpacity={0.7}
    shadowOffset={{height: 10}}
    shadowColor="black"
    shadowOpacity={0.5}
    style={props.style}
    onPress={props.onPress}>
    {props.children}
  </TouchableOpacity>
);

export const InputLabel = (props) => (
  <View style={styles.inputLabel}>
    <TextInput
      value={props.value}
      style={[styles.input, {...props.input}]}
      keyboardType={props.type}
      onChangeText={props.onChangeText}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      onBlur={props.onBlur}
      editable={props.editable}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <Touch onPress={props.showPassword} style={{right: 10}}>
      {props.inputIcon}
    </Touch>
  </View>
);

export const InputTextLabel = (props) => (
  <View>
    <H1 style={styles.labelText}>{props.label}</H1>
    <TextInput
      value={props.value}
      style={[styles.input, {...props.input}]}
      keyboardType={props.type}
      onChangeText={props.onChangeText}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      onBlur={props.onBlur}
      editable={props.editable}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <Touch onPress={props.showPassword} style={{right: 10}}>
      {props.inputIcon}
    </Touch>
  </View>
);

export const CardLabel = (props) => (
  <View>
    <H1 style={styles.labelText}>{props.label}</H1>
    <TextInput
      value={props.value}
      style={[styles.cardInput, {...props.input}]}
      keyboardType={props.type}
      onChangeText={props.onChangeText}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      onBlur={props.onBlur}
      editable={props.editable}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <Touch onPress={props.showPassword} style={{right: 10}}>
      {props.inputIcon}
    </Touch>
  </View>
);

export const LargeInputTextLabel = (props) => (
  <View>
    <H1 style={styles.labelText}>{props.label}</H1>
    <TextInput
      value={props.value}
      style={[styles.largeInput, {...props.input}]}
      keyboardType={props.type}
      onChangeText={props.onChangeText}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      onBlur={props.onBlur}
      editable={props.editable}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
    />
    <Touch onPress={props.showPassword} style={{right: 10}}>
      {props.inputIcon}
    </Touch>
  </View>
);

export const Button = (props) => {
  if (props.isLoading == undefined || props.isLoading == false) {
    return (
      <Touch
        disabled={props.disabled}
        style={[
          {
            width: '100%',
            padding: RH(2),
            backgroundColor: props.backgroundColor,
            borderRadius: 8,
            marginTop: RH(3),
            alignItems: 'center',
            borderColor: props.borderColor,
            borderWidth: 1,
            ...elevationShadowStyle(3),
          },
          props.style,
        ]}
        onPress={props.onPress}>
        <H1
          style={{
            color: props.color,
            fontWeight: 'bold',
            fontSize: RF(45),
            textAlign: 'center',
          }}>
          {props.name}
        </H1>
      </Touch>
    );
  } else {
    return (
      <ActivityIndicator
        size="large"
        color={AppColors.mainColor}
        style={{marginTop: RH(3)}}
      />
    );
  }
};

export const BottomToTopModal = (props) => (
  <View style={styles.bottomToTopModal}>
    <SlideUp vfrom={400} vto={0}>
      <View style={styles.bottomToTopModalView}>{props.children}</View>
    </SlideUp>
  </View>
);

export const Alerts = (msg) => Alert.alert('Exalt Church', msg);

export const HeaderContainer = (props) => {
  return (
    <View style={styles.headContainer}>
      <H1 style={styles.headTxt}>{props.children}</H1>
    </View>
  );
};

export const SmallHeaderContainer = (props) => {
  return <View style={styles.smallContainer}>{props.children}</View>;
};

export const PageHeaderContainer = (props) => {
  return (
    <View style={styles.pageContainer}>
      <Touch onPress={props.backPress}>
        <Ionicons
          style={{marginLeft: RW(4)}}
          name={props.back}
          size={32}
          color={AppColors.white}
        />
      </Touch>

      <Touch
        style={{
          marginLeft: RW(1),
          marginTop: RH(0.5),
        }}
        onPress={props.menuPress}>
        <Ionicons
          style={[props.menuStyle]}
          size={32}
          name={props.menu}
          color={AppColors.white}
        />
      </Touch>

      <H1 style={styles.titleTxt}>{props.title}</H1>

      <View style={styles.otherStyle}>
        <Touch onPress={props.otherPress}>
          <Feather
            style={props.icon1Style}
            size={props.iconSize}
            name={props.icon1}
            color={AppColors.white}
          />
        </Touch>

        <Touch style={props.style2} onPress={props.otherPress2}>
          <Feather
            size={props.icon2Size}
            name={props.icon2}
            color={AppColors.white}
            style={props.icon2Style}
          />
          <View style={props.redDot} />
        </Touch>

        <Touch onPress={props.otherPress3}>
          <FontAwesome5Icon
            style={{marginLeft: 20}}
            size={props.icon3Size}
            name={props.icon3}
            color={AppColors.white}
          />
        </Touch>
      </View>
    </View>
  );
};

export const HomeCard = (props) => {
  return (
    <Touch onPress={props.onPress}>
      <CardView
        style={styles.cardStyle}
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={12}>
        <View style={[styles.numberContainer, {...props.numberStyle}]}>
          <H1 style={styles.number}>{props.number}</H1>
        </View>
        <Image style={props.imageStyle} source={props.image} />
        <H1 style={styles.cardTxt}>{props.name}</H1>
      </CardView>
    </Touch>
  );
};

export const ContainerCard = (props) => {
  return (
    <Touch onPress={props.onPress}>
      <CardView
        style={styles.containerCardStyle}
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={2}>
        {props.children}
      </CardView>
    </Touch>
  );
};

export const Container = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.lowerContainer, {...props.containerStyle}]}>
      {props.children}
    </ScrollView>
  );
};

export const ModalContainer = (props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <Modal isVisible={showSuccess}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalItem}>
            <Image
              style={styles.modalImage}
              source={require('../../assets/images/congrats.png')}
            />
            <H1 style={[styles.successTxt]}>
              Your message has been received and we will be contacting you
              shortly to follow up. If you would like to speak to someone
              immediately feel free to call 090830000090
            </H1>
          </View>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              style={styles.modalTouch}
              onPress={() => setShowSuccess(false)}>
              <Text style={[styles.creditDetails]}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const AuthInput = (props) => (
  <View style={styles.authLabel}>
    <TextInput
      value={props.value}
      style={[styles.authInput, {...props.input}]}
      keyboardType={props.type}
      onChangeText={props.onChangeText}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      onBlur={props.onBlur}
      editable={props.editable}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      autoCapitalize={'none'}
      autoCorrect={false}
      placeholderTextColor={AppColors.gray}
    />
    <Touch onPress={props.showPassword} style={{right: 10}}>
      {props.inputIcon}
    </Touch>
  </View>
);

const styles = StyleSheet.create({
  authLabel: {
    padding: RH(0.5),
    borderRadius: RH(0.5),
    marginTop: RH(2.3),
    fontWeight: 'normal',
    flex: 1,
    width: RW(92),
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#c1c1c1',
    justifyContent: 'center',
  },
  authInput: {
    flex: 1,
    fontSize: RF(50),
    alignItems: 'center',
    height: 45,
    paddingHorizontal: RW(2),
    paddingVertical: 10,
    textAlign: 'center',
    color: AppColors.black,
  },
  input: {
    fontSize: RF(35),
    padding: RH(2),
    marginTop: RH(1),
    fontWeight: 'normal',
    flex: 1,
    width: RW(85),
    borderWidth: 1,
    borderColor: AppColors.gray,
    borderRadius: RH(0.3),
    color: AppColors.black,
  },
  reddot: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 1,
  },
  cardInput: {
    fontSize: RF(26),
    padding: RH(2),
    borderRadius: RH(1),
    marginTop: RH(1),
    fontWeight: 'normal',
    flex: 1,
    width: RW(90),
    color: AppColors.black,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: AppColors.gray,
  },

  largeInput: {
    fontSize: RF(40),
    padding: RH(2),
    borderRadius: RH(1),
    marginTop: RH(1),
    fontWeight: 'normal',
    flex: 1,
    width: RW(90),
    height: RH(20),
    borderRadius: RH(0.3),
    borderWidth: 1,
    borderColor: AppColors.gray,
    textAlignVertical: 'top',
    color: AppColors.black,
  },

  addBtn: {
    backgroundColor: AppColors.mainColor,
    height: RH(8),
    width: RH(8),
    position: 'absolute',
    bottom: RW(5),
    right: RW(0),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RH(9),
    ...elevationShadowStyle(5),
  },
  bottomToTopModal: {
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: RH(100),
    backgroundColor: '#0006',
  },
  otherStyle: {
    position: 'absolute',
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 20,
  },
  bottomToTopModalView: {
    width: '100%',
    backgroundColor: '#fff',
    height: RH(95),
    borderTopRightRadius: RH(5),
    borderTopLeftRadius: RH(5),
    padding: RW(6),
    paddingBottom: RH(6),
  },
  linearGradient: {
    width: '100%',
    alignItems: 'center',
    padding: RH(5),

    height: 150,
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  icon: {
    height: RH(3.5),
    width: RH(3.5),
  },
  footerText: {
    marginTop: -RH(0.3),
    fontSize: RF(21),
    color: '#3A3A3A',
  },
  headContainer: {
    height: RH(30),
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: AppColors.red,
    borderBottomColor: AppColors.red,
    borderBottomWidth: 3,
    borderTopWidth: 1,
    ...elevationShadowStyle(15),
  },
  headTxt: {
    color: 'white',
    fontSize: 26,
  },

  smallContainer: {
    height: RH(12),
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    // borderBottomWidth: 3,

    ...elevationShadowStyle(15),
    flexDirection: 'row',
    // marginTop: RH(2),
  },
  smallTxt: {
    color: 'white',
    fontSize: 26,
  },
  cardStyle: {
    padding: RW(1),
    width: RW(38),
    alignItems: 'center',
    height: RH(20),
  },

  containerCardStyle: {
    padding: 20,
    width: RW(100),
    // height: RH(15),
  },
  cardTxt: {
    fontWeight: 'bold',
    color: 'brown',
    fontSize: RF(22),
    marginTop: RH(2),
  },
  number: {
    fontSize: 16,
    color: AppColors.red,
    fontWeight: 'bold',
  },
  numberContainer: {
    // padding: 4,
    position: 'absolute',
    right: 16,
    top: 20,
  },
  pageContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'android' ? RH(8) : RH(12),
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? RH(1) : RH(5),
  },
  titleTxt: {
    color: 'white',
    fontSize: 22,
    marginLeft: RW(10),
    // marginTop: RH(4.5),
  },
  backIcon: {
    height: 25,
    width: 25,
    marginLeft: 18,
    // marginTop: RH(5),
  },
  otherIcon: {
    height: 25,
    width: 28,
    marginLeft: 18,
    alignSelf: 'center',
    marginBottom: 12,
    // marginTop: RH(2),
  },
  iconContainer: {
    // backgroundColor: AppColors.white,
    padding: 3,
    borderRadius: 4,
    position: 'absolute',
    bottom: 6,
    right: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  modalView: {
    backgroundColor: AppColors.white,
    borderRadius: 6,
  },
  modalItem: {
    padding: 12,
    marginVertical: 30,
    alignItems: 'center',
  },
  modalImage: {
    height: 80,
    width: 80,
  },
  successTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalTouch: {
    position: 'absolute',
    right: 15,
    bottom: 2,
  },
  creditDetails: {
    fontWeight: 'bold',

    fontSize: 18,
    color: AppColors.red,
  },
  inputLabel: {
    marginTop: RH(2),
    alignItems: 'center',
    flexDirection: 'row',
    width: RW(90),
    ...elevationShadowStyle(3),
    backgroundColor: '#fff',
    borderRadius: RH(1),
  },

  labelText: {
    fontSize: RF(40),
    paddingLeft: RW(1),
    fontWeight: 'bold',
    marginTop: 20,
  },
  splashTxt: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  topRed: {
    height: 60,
    width: 25,
    backgroundColor: AppColors.red,
  },
  bottomRed: {
    height: 120,
    width: 25,
    backgroundColor: AppColors.red,
  },
  image: {
    marginLeft: RW(25),
  },
  lowerContainer: {
    backgroundColor: AppColors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 40,
    marginBottom: 22,
    padding: 18,
    // flex: 1,
    // height: RH(100)
  },
});
