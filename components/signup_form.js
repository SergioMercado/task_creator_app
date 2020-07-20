import { Formik } from 'formik';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { httpClient } from '../utils/axios_instance';
import Button from './button';
import Input from './input';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(50, 'Demasiado largo!')
    .required('Este campo es requerido'),
  first_name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(50, 'Demasiado largo!'),
  password: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(50, 'Demasiado largo!')
    .required('Este campo es requerido'),
  last_name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(50, 'Demasiado largo!'),
  email: Yup.string().email('Este correo no es valido'),
});
export default function SignUpForm({ onActiveSignUp }) {
  const onSaveUser = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data } = await httpClient.post('/users/', values);
      Alert.alert(
        'Buen trabajo!',
        `El usuario ${data.first_name} ${data.last_name} fue creado satisfactoriamente!`,
      );
      resetForm();
      onActiveSignUp();
    } catch ({ response }) {
      setSubmitting(false);
      Alert.alert('Ooops!', response.data);
    }
  };

  return (
    <View style={styles.signUpContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />

      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          first_name: '',
          last_name: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={onSaveUser}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <>
            <Input
              style={styles.borderStyle}
              placeholder='Ingresa tu usuario'
              onChangeText={handleChange('username')}
              value={values.username}
              error={errors.username}
            />

            <Input
              style={styles.borderStyle}
              placeholder='Ingresa tu nombre'
              onChangeText={handleChange('first_name')}
              value={values.first_name}
              error={errors.first_name}
            />

            <Input
              style={styles.borderStyle}
              placeholder='Ingresa tu apellido'
              onChangeText={handleChange('last_name')}
              value={values.last_name}
              error={errors.last_name}
            />

            <Input
              style={styles.borderStyle}
              placeholder='Ingresa tu correo'
              onChangeText={handleChange('email')}
              value={values.email}
              error={errors.email}
            />

            <Input
              style={styles.borderStyle}
              secureTextEntry
              placeholder='Ingresa tu contraseña'
              onChangeText={handleChange('password')}
              value={values.password}
              error={errors.password}
            />

            {isSubmitting ? (
              <ActivityIndicator size='large' color='#44BBA4' />
            ) : (
              <>
                <Button
                  style={styles.createUser}
                  onPress={handleSubmit}
                  title='Crear usuario'
                />

                <TouchableOpacity>
                  <Text style={styles.btnLogin} onPress={onActiveSignUp}>
                    Regresar al login
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    paddingVertical: 30,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  borderStyle: {
    borderColor: 'black',
    borderWidth: 1,
  },
  createUser: {
    backgroundColor: '#44BBA4',
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
  },
  btnLogin: {
    marginTop: 40,
    textAlign: 'center',
    color: '#D3D0CB',
    fontWeight: 'bold',
  },
  logo: {
    resizeMode: 'contain',
    height: 70,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
