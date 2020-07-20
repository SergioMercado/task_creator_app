import { Formik } from 'formik';
import * as React from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { httpClient } from '../../utils/axios_instance';
import Button from '../button';
import Input from '../input';

function useCreateTask({ setTasks, projectId }) {
  const onCreateTask = async (
    values,
    { setErrors, resetForm, setSubmitting },
  ) => {
    try {
      const { data } = await httpClient.post('/tasks/', {
        ...values,
        project: projectId,
      });

      setTasks('/tasks/', data);
      Alert.alert(
        'Buen trabajo!',
        `La tarea ${data.name} ha sido creado satisfactoriamente.`,
      );

      resetForm();
    } catch ({ response }) {
      setErrors(response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return { onCreateTask };
}
export default function FormTask({ onCancel, setTasks, projectId }) {
  const { onCreateTask } = useCreateTask({ setTasks, projectId });
  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      onSubmit={onCreateTask}
    >
      {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
        <>
          <View style={styles.container}>
            <Input
              placeholder='Ingresa nombre de la tarea'
              onChangeText={handleChange('name')}
              value={values.name}
              error={errors.name}
            />

            <Input
              placeholder='Descripcion...'
              multiline
              numberOfLines={5}
              onChangeText={handleChange('description')}
              value={values.description}
            />

            <View style={styles.btnGroup}>
              {isSubmitting ? (
                <ActivityIndicator size='large' color='#44BBA4' />
              ) : (
                <>
                  <Button onPress={handleSubmit} title='Guardar' />

                  <Button
                    onPress={onCancel}
                    title='Cancelar'
                    styles={styles.btnCancel}
                  />
                </>
              )}
            </View>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: 'row-reverse',
  },
  btnCancel: { backgroundColor: '#E7E5DF', color: '#393E41', marginRight: 10 },
  logo: {
    resizeMode: 'contain',
    height: 70,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
