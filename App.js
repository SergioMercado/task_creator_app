import React from 'react';
import AuthenticationProvider from './components/authentication';
import MainScreen from './screens/main';

export default function App() {
  return (
    <AuthenticationProvider>
      <MainScreen />
    </AuthenticationProvider>
  );
}
