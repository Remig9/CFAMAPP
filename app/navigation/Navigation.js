import React, {useState, useEffect, useContext} from 'react';

//navigation
import {NavigationContainer} from '@react-navigation/native';

// screens
import Loading from './Loading';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './AuthProvider';

//app navigator
import {AppTabs} from './AppTabs';
import {AuthStack} from './AuthStack';
import {HomeStack} from './HomeStack';
import {OnboardStack} from './OnboardStack';

export const Navigation = () => {
  const {user, login, onboarding, loggingout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((userString) => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : onboarding ? <OnboardStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
