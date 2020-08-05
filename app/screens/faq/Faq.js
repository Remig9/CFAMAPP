import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Image, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {H1, Touch, PageHeaderContainer} from '../../helpers/components';
import Colors from '../../helpers/colors';
import {RF, RH, RW} from '../../helpers/resize';
import {AppHeader2} from '../../components/components';

const Faq = ({navigation}) => {
  const [showMore, setShowMore] = useState(false);
  // const [showMore1, setShowMore1] = useState(false);
  // const [showMore2, setShowMore2] = useState(false);
  // const [showMore3, setShowMore3] = useState(false);
  // const [showMore4, setShowMore4] = useState(false);

  const toggleMore = () => {
    faqs.forEach(function (elem) {
      handleShowMore(elem);
    });
  };

  const handleShowMore = (elem) => {
    setShowMore(!showMore);
  };

  const faqs = [
    {
      question: 'How do I register a new account',
      answer: `1   Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum

          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum`,
    },

    {
      question: 'How do I login to my  account',
      answer: `2   Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
  
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus`,
    },

    {
      question: 'How do I pay my offering',
      answer: `22  Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
  
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus`,
    },
  ];
  return (
    <>
      <AppHeader2
        lefticon="arrow-back"
        title="FAQ"
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={faqs}
        renderItem={({item}) => {
          return (
            <View style={{flex: 1}}>
              <View style={styles.videoHeader}>
                <View style={{width: RW(80)}}>
                  <H1 style={styles.videoTitle}>{item.question}</H1>
                </View>
                <Touch onPress={(item) => toggleMore(item.answer)}>
                  {showMore ? (
                    <MaterialCommunityIcons
                      name="arrow-up-drop-circle"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons
                      name="arrow-drop-down-circle"
                      size={24}
                      color="black"
                    />
                  )}
                </Touch>
              </View>
              {showMore ? (
                <ScrollView>
                  <H1 selectable={true} style={styles.otherTxt}>
                    {item.answer}
                  </H1>
                </ScrollView>
              ) : null}
            </View>
          );
        }}
        keyExtractor={(item) => item.question}
      />
    </>
  );
};

export default Faq;

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
  },
  videoWatch: {
    color: Colors.gray,
  },
  videoTitle: {
    fontSize: 17,
    // fontWeight: "bold",
  },
  liveImage: {
    height: RH(10),
    width: RW(32),
  },
  liveTxt: {
    // fontWeight: "bold",
    fontSize: RF(26),
  },
  liveWatchers: {
    position: 'absolute',
    bottom: 1,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.7,
  },
  watchersTxt: {
    color: Colors.gray,
    // fontWeight: "bold",
  },
  otherTxt: {
    paddingHorizontal: 28,
    includeFontPadding: true,
    paddingVertical: 30,
    fontSize: RF(25),
    lineHeight: 24,
  },
});
