//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RH, RW, RF } from "../../helpers/resize";
import RNPickerSelect from "react-native-picker-select";
import { elevationShadowStyle } from "../../helpers/utils";
import Colors from "../../helpers/colors";
import {
  PageHeaderContainer,
  H1,
  InputTextLabel,
  Touch,
  Button,
} from "../../helpers/components";
import { church } from "../../helpers/churchdetails";
import { Card } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import Modal from "react-native-modal";

const MultipleOffering = (
  { index, handleValue, handleRemove, total, value, wallet },
  props
) => {
  const [showOffering, setOfferingList] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  const handleChanges = (key, value) => {
    console.warn("index, key, ", index, key, value);

    handleValue(index, key, value);
  };

  const closeOffering = () => {
    setOfferingList(false);
  };

  const showOfferingList = () => {
    setOfferingList(!showOffering);
  };

  const handleOfferingPress = () => {
    alert("d");
  };

  return (
    <View style={styles.offeringContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <H1 style={styles.offeringTxt}> Offering Type </H1>

          <Touch onPress={showOfferingList} style={styles.inputStyle}>
            <H1>{placeholder}</H1>
            <Ionicons name="md-arrow-dropdown" size={24} color={Colors.black} />
          </Touch>

          <View style={{ flex: 1 }}>
            <Modal
              fancy
              onBackdropPress={showOfferingList}
              visible={showOffering}
            >
              {wallet &&
                wallet.map((item) => {
                  return (
                    <View
                      style={{
                        flex: 0.05,
                        backgroundColor: "white",
                        // height: RH(15),
                        width: RW(80),
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Touch
                        onPress={(id) => {
                          handleChanges("walletId", item.value);
                          setPlaceholder(item.label);
                          setOfferingList(!showOffering);
                        }}
                      >
                        <H1 style={{ marginTop: 3 }}>{item.label}</H1>
                      </Touch>
                    </View>
                  );
                })}
            </Modal>
          </View>
        </View>

        <View>
          <H1
            style={[
              styles.offeringTxt,
              {
                marginLeft: RW(8),
              },
            ]}
          >
            Amount
          </H1>
          <View style={styles.amountInput}>
            <H1>₦</H1>
            <TextInput
              keyboardType={"numeric"}
              value={value.amount}
              onChangeText={(amount) =>
                handleChanges("amount", parseFloat(amount))
              }
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {total > 1 ? (
          <Card style={styles.addnewTxt}>
            <Touch onPress={() => handleRemove(index)}>
              <H1 style={{ fontSize: 30 }}>-</H1>
            </Touch>
          </Card>
        ) : (
          <Touch>
            <H1 style={{ fontSize: 30 }}></H1>
          </Touch>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  pickerInput: {
    marginTop: 12,
  },
  menuStyle: {
    backgroundColor: "white",
  },
  offeringContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RW(3),
    paddingVertical: RH(1.4),
  },
  removeBtn: {
    width: 54,
    height: 54,
    borderRadius: 30,
    padding: RH(2),
    marginTop: RH(3),
    // marginRight: RW(5),
    ...elevationShadowStyle(3),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: {
    fontSize: RF(50),
  },
  offeringTxt: {
    fontSize: RF(28),
    // fontWeight: "bold",
    marginBottom: RH(1),
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: RH(0.4),

    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: RW(35),
    height: RH(5.3),
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: 30,
    padding: RH(2),
    marginTop: RH(3),
    // marginRight: RW(5),
    ...elevationShadowStyle(3),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addnewTxt: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RW(4),
    marginTop: RH(2),
  },
  amountInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,

    fontSize: RF(26),
    height: RH(5.3),
    borderRadius: RH(0.4),
    fontWeight: "normal",
    width: RW(35),
    borderColor: "black",
    borderWidth: 1,

    color: "black",
    marginLeft: RW(8),
  },
});

//make this component available to the app
export default MultipleOffering;
