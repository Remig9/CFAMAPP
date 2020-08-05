import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {H1, Touch, Button, PageHeaderContainer} from '../../helpers/components';
import Colors from '../../helpers/colors';
import MapView, {Marker} from 'react-native-maps';
import {RH, RW} from '../../helpers/resize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../navigation/AuthProvider';

const SelectChurch = ({route, navigation}) => {
  const {name, address} = route.params;
  const {login} = useContext(AuthContext);

  const [region, setRegion] = useState({
    latitude: 6.458985,
    longitude: 3.601521,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <PageHeaderContainer title="Join Congregaton" />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(region) => setRegion(region)}>
          <Marker coordinate={{latitude: 6.458985, longitude: 3.601521}} />
        </MapView>
      </View>

      <View style={[styles.cardStyle]}>
        <H1 style={styles.churchName}>{name}</H1>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="location-on"
            size={16}
            color={Colors.red}
            style={{marginTop: RH(1)}}
          />
          <H1 style={styles.churchTxt}>{address}</H1>
        </View>

        <View style={{flexDirection: 'row'}}>
          <FontAwesome5
            name="user-alt"
            size={16}
            color={Colors.red}
            style={{marginTop: RH(1)}}
          />
          <H1 style={styles.churchTxt}> Pastor Kolade</H1>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Touch onPress={() => navigation.goBack(null)} style={styles.backBtn}>
            <AntDesign name="arrowleft" size={24} color={Colors.red} />
          </Touch>

          <Button
            onPress={() => login()}
            name="CONFIRM"
            backgroundColor={Colors.red}
            color="white"
            style={styles.confirmBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    padding: 24,
    marginTop: 40,
  },
  labelstyle: {
    // fontWeight: 'bold',
    fontSize: 18,
  },
  forgotTxt: {
    color: Colors.red,
    fontSize: 16,
    position: 'absolute',
    right: 6,
    marginTop: 30,
  },
  signupWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  signupTxt: {
    color: Colors.green,
    // fontWeight: "bold",
    fontSize: 18,
  },
  signupInfo: {
    // color: Colors.green,
    // fontWeight: "bold",
    fontSize: 18,
  },
  mapContainer: {
    height: RH(60),
  },
  map: {
    flex: 1,
    height: RH(50),
  },
  cardStyle: {
    padding: 20,
    // borderWidth: 2,
    borderColor: Colors.gray,
    marginTop: RH(-4),
    borderRadius: 12,
    width: RW(85),
    marginBottom: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  churchName: {
    fontSize: 17,
    // fontWeight: "bold",
    marginBottom: 8,
  },
  churchTxt: {
    fontSize: 12,
    marginBottom: 4,
    marginTop: RH(1),
    marginLeft: RW(1.2),
  },
  confirmBtn: {
    width: RW(50),
    marginLeft: 8,
    borderWidth: 0,
    // height: RH(6),
  },
  backBtn: {
    width: RW(20),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: RH(6),
    marginTop: RH(3),
  },
});

export default SelectChurch;
