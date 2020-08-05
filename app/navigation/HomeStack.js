import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabs} from './AppTabs';

//livestream
import LiveStream from '../screens/liveservice/LiveStream';
import Nostream from '../screens/liveservice/Nostream';
import BranchStream from '../screens/liveservice/BranchStream';
import NoBranchStream from '../screens/liveservice/NoBranchStream';

//events
import CheckEvent from '../screens/events/CheckEvent';
//podcasts
import WatchVideo from '../screens/podcasts/WatchVideo';
import Podcasts from '../screens/podcasts/Podcasts';
//bible
import BibleRead from '../screens/bible/BibleRead';
import AddChurch from '../screens/offering/AddChurch';
import Notes from '../screens/bible/Notes';
import NoteList from '../screens/bible/NoteList';
import Bookmarks from '../screens/bible/Bookmarks';

//Offering
import Summary from '../screens/offering/Summary';
import Payment from '../screens/offering/Payment';
import PaymentSuccessful from '../screens/offering/PaymentSuccessful';

//prayer request
import InboxDetails from '../screens/prayerrequest/InboxDetails';
import RequestDetails from '../screens/prayerrequest/RequestDetails';
import UserInbox from '../screens/prayerrequest/UserInbox';
import Thread from '../screens/prayerrequest/Thread';
import RequestSuccess from '../screens/prayerrequest/RequestSuccess';
import PrayerRequestInput from '../screens/prayerrequest/PrayerRequestInput';
//events
import Events from '../screens/events/Events';
//faq
import Faq from '../screens/faq/Faq';
//profile
import Profile from '../screens/others/Profile';
import ChangePassword from '../screens/profile/ChangePassword';
import History from '../screens/profile/History';
import Support from '../screens/profile/Support';
import EditProfile from '../screens/profile/EditProfile';
import Payments from '../screens/profile/Payments';

//locator
import Locator from '../screens/locator/Locator';
import PlaceInput from '../screens/locator/PlaceInput';

//chatboard
import ChatBoard from '../screens/chat/ChatBoard';
//Notifications
import Notifications from '../screens/others/Notifications';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CAFAM Church" component={AppTabs} />
      <Stack.Screen name="Church Events" component={CheckEvent} />
      <Stack.Screen name="Live Stream" component={LiveStream} />
      <Stack.Screen name="Nostream" component={Nostream} />
      <Stack.Screen name="Branch Stream" component={BranchStream} />
      <Stack.Screen name="NoBranchStream" component={NoBranchStream} />

      <Stack.Screen name="Video Podcast" component={WatchVideo} />
      <Stack.Screen name="Resources" component={Podcasts} />

      <Stack.Screen name="AddChurch" component={AddChurch} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen
        name="PaymentSuccessful"
        options={{
          gestureEnabled: false,
        }}
        component={PaymentSuccessful}
      />

      {/* Bible */}
      <Stack.Screen name="BibleRead" component={BibleRead} />
      <Stack.Screen name="Bookmarks" component={Bookmarks} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="NoteList" component={NoteList} />

      {/* Prayer request */}
      <Stack.Screen name="Thread" component={Thread} />
      <Stack.Screen name="UserInbox" component={UserInbox} />
      <Stack.Screen name="InboxDetails" component={InboxDetails} />
      <Stack.Screen name="RequestSuccess" component={RequestSuccess} />
      <Stack.Screen name="RequestDetails" component={RequestDetails} />
      <Stack.Screen name="RequestInput" component={PrayerRequestInput} />

      {/* Events */}
      <Stack.Screen name="Events" component={Events} />

      {/* Faq */}
      <Stack.Screen name="Faq" component={Faq} />

      {/* profile */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Payments" component={Payments} />

      {/* Locator */}
      <Stack.Screen name="Locator" component={Locator} />
      <Stack.Screen name="PlaceInput" component={PlaceInput} />

      {/* Chat */}
      <Stack.Screen name="ChatBoard" component={ChatBoard} />

      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};
