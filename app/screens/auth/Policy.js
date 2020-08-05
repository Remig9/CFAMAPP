import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../helpers/colors';
import {RegularTextBold, RegularText} from '../../helpers/components';
import Entypo from 'react-native-vector-icons/Entypo';
import {RH} from '../../helpers/resize';

export default function Policy({cancel}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={cancel} style={styles.cancelPolicy}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
        <RegularTextBold style={styles.header}>Privacy Policy</RegularTextBold>
        <View>
          <RegularText style={styles.policyTxt}>
            Exalt Application Limited built the CAFAM app as a Free app. This
            SERVICE is provided by Exalt Application Limited at no cost and is
            intended for use as is.
          </RegularText>
          <RegularText style={styles.policyTxt}>
            This page is used to inform visitors regarding our policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use our Service.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            If you choose to use our Service, then you agree to the collection
            and use of information in relation to this policy. The Personal
            Information that we collect is used for providing and improving the
            Service. We will not use or share your information with anyone
            except as described in this Privacy Policy.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at CAFAM unless
            otherwise defined in this Privacy Policy.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            {' '}
            Information Collection and Use
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information. The
            information that we request will be retained by us and used as
            described in this privacy policy.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            The app does use third-party services that may collect information
            used to identify you.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            Link to the privacy policy of third party service providers used by
            the app
          </RegularText>
          <RegularText style={styles.policyTxt}>
            * [Google Play Services](https://policies.google.com/terms)
          </RegularText>
          <RegularTextBold style={styles.policyHeader}>
            {' '}
            Log Data
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            We want to inform you that whenever you use our Service, in a case
            of an error in the app we collect data and information (through
            third party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing our Service, the time and date of your use of
            the Service, and other statistics.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>Cookies</RegularTextBold>

          <RegularText style={styles.policyTxt}>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal
            memory.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            This Service does not use these “cookies” explicitly. However, the
            app may use third party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            Service Providers
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            We may employ third-party companies and individuals due to the
            following reasons:
          </RegularText>

          <RegularText style={styles.policyTxt}>
            * To facilitate our Service;
          </RegularText>

          <RegularText style={styles.policyTxt}>
            * To provide the Service on our behalf;
          </RegularText>

          <RegularText style={styles.policyTxt}>
            * To perform Service-related services; or
          </RegularText>
          <RegularText style={styles.policyTxt}>
            * To assist us in analyzing how our Service is used.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            We want to inform users of this Service that these third parties
            have access to your Personal Information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            Security
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            We value your trust in providing us with your Personal Information,
            thus we are striving to use commercially acceptable means of
            protecting it. But remember that no method of transmission over the
            internet, or method of electronic storage is 100% secure and
            reliable, and we cannot guarantee its absolute security.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            Links to Other Sites
          </RegularTextBold>
          <RegularText style={styles.policyTxt}>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            Children’s Privacy
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13\. In the case we discover that a child under 13 has
            provided us with personal information, we immediately delete this
            from our servers. If you are a parent or guardian and you are aware
            that your child has provided us with personal information, please
            contact us so that we will be able to do necessary actions.
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            Changes to This Privacy
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page.
          </RegularText>

          <RegularText style={styles.policyTxt}>
            This policy is effective as of 2020-07-26
          </RegularText>

          <RegularTextBold style={styles.policyHeader}>
            Contact Us
          </RegularTextBold>

          <RegularText style={styles.policyTxt}>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at support@exaltchurches.com.
          </RegularText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 6,
    padding: 12,
  },
  header: {
    alignSelf: 'center',
    fontSize: 28,
    marginTop: RH(5),
  },
  policyTxt: {
    lineHeight: 26,
  },
  policyHeader: {
    fontSize: 17,
    marginVertical: 12,
  },
  cancelPolicy: {
    backgroundColor: colors.gray,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
});
