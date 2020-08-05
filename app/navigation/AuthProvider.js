import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [onboarding, setOnboading] = useState(null);
  const [loggingout, setLoggingout] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        onboarding,
        loggingout,
        login: () => {
          const fakeUser = {username: 'tobi'};
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
        },
        onboard: () => {
          setUser(null);
          setOnboading('onboarding');
          AsyncStorage.removeItem('user');
        },
        logout: () => {
          setUser(null);
          setOnboading(null);
          AsyncStorage.removeItem('userToken');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
