import React from 'react';
import {AuthProvider} from './AuthProvider';
import {Navigation} from './Navigation';

export default function Providers() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
