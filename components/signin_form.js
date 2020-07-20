import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { authHttpClient } from '../utils/axios_instance';
import { useAuthenticationDispatch } from './authentication';
import Button from './button';
import Input from './input';

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Este campo es requerido'),
  password: Yup.string().required('Este campo es requerido'),
});

function useSignIn() {
  const dispatch = useAuthenticationDispatch();

  const onSubmit = async (values) => {
    dispatch({ type: 'REQUEST' });

    try {
      const response = await authHttpClient.post('/token/', values);
      dispatch({ type: 'LOGIN', payload: response.data });
      const { access, refresh, user } = response.data;

      await AsyncStorage.multiSet([
        ['@user', JSON.stringify(user)],
        ['@token', access],
        ['@refreshToken', refresh],
      ]);
    } catch ({ response }) {
      dispatch({
        type: 'LOGIN_FAILED',
        payload: { error: response.data.detail },
      });
      Alert.alert(
        'Se ha producido un error!',
        'No se encontro una cuenta activada con las credenciales dadas',
      );
    }
  };

  return { onSignIn: onSubmit };
}

export default function SignInForm({ onActiveSignUp }) {
  const { onSignIn } = useSignIn();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSignIn}
      validationSchema={SignInSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.loginContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Input
            style={styles.borderStyle}
            onChangeText={handleChange('username')}
            placeholder='Ingresa tu usuario'
            value={values.username}
            error={errors.username}
          />
          <Input
            style={styles.borderStyle}
            secureTextEntry
            onChangeText={handleChange('password')}
            placeholder='Ingresa tu contraseña'
            value={values.password}
            error={errors.password}
          />

          <Button
            style={styles.btnLogin}
            onPress={handleSubmit}
            title='Iniciar sesion'
          />

          <TouchableOpacity>
            <Text style={styles.createUser} onPress={onActiveSignUp}>
              Crear usuario
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    paddingVertical: 30,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  borderStyle: {
    borderColor: 'black',
    borderWidth: 1,
  },
  btnLogin: {
    backgroundColor: '#44BBA4',
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
  },
  createUser: {
    textAlign: 'center',
    color: '#D3D0CB',
    fontWeight: 'bold',
    marginTop: 40,
  },
  logo: {
    resizeMode: 'contain',
    height: 70,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
