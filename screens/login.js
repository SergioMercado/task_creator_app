import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuthenticationState } from '../components/authentication';
import SignInForm from '../components/signin_form';
import SignUpForm from '../components/signup_form';
import { useToggle } from '../hooks/';

export default function LoginScreen() {
  const [signUpActive, setSignUpActive] = useToggle();
  const { isLoading } = useAuthenticationState();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#44BBA4' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {signUpActive ? (
        <SignUpForm onActiveSignUp={setSignUpActive} />
      ) : (
        <SignInForm onActiveSignUp={setSignUpActive} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});
