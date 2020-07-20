import { Formik } from 'formik';
import * as React from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { httpClient } from '../../utils/axios_instance';
import Button from '../button';
import Input from '../input';

function useCreateProject({ setProjects }) {
  const onCreateProject = async (
    values,
    { setErrors, resetForm, setSubmitting },
  ) => {
    try {
      const { data } = await httpClient.post('/projects/', values);

      setProjects('/projects/', data);
      Alert.alert(
        'Buen trabajo!',
        `El proyecto ${data.name} ha sido creado satisfactoriamente.`,
      );
      resetForm();
    } catch ({ response }) {
      setErrors(response.data);
    } finally {
      setSubmitting(false);
    }
  };

  return { onCreateProject };
}

export default function FormProject({ onCancel, setProjects }) {
  const { onCreateProject } = useCreateProject({ setProjects });
  return (
    <View>
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={onCreateProject}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View style={styles.container}>
            <Input
              placeholder='Ingresa nombre de proyecto'
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
                  <Button
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                    title='Guardar'
                  />

                  <Button
                    disabled={isSubmitting}
                    onPress={onCancel}
                    title='Cancelar'
                    styles={styles.btnCancel}
                  />
                </>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
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
