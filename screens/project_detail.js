import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FormTask from '../components/tasks/form_task';
import TaskList from '../components/tasks/task_list';
import { useRequest, useToggle } from '../hooks/index';

function useTitle(navigation, title) {
  useEffect(() => {
    navigation.setOptions({ title });
  }, []);
}
export default function ProjectDetailScreen({ route, navigation }) {
  const { projectId, title } = route.params;
  const [modalVisible, setModalVisible] = useToggle();
  const [query, setQuery] = useState('');
  const { data, isLoading, mutate } = useRequest(
    `/tasks/?project__id=${projectId}&search=${query}`,
  );

  useTitle(navigation, title);

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        hasBackdrop
        transparent
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Crear Tarea</Text>
            <FormTask
              onCancel={setModalVisible}
              setTasks={mutate}
              projectId={projectId}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.headerForm}>
        <TextInput
          style={styles.input}
          placeholder='Buscar tareas...'
          onChangeText={setQuery}
          value={query}
        />

        <TouchableOpacity>
          <Text style={styles.createProject} onPress={setModalVisible}>
            Crear tarea
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{}}>
          <ActivityIndicator size='large' color='#44BBA4' />
        </View>
      ) : (
        <TaskList data={data} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  title: { marginRight: 16 },
  headerForm: {
    paddingVertical: 16,
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#dbdbe2',
    borderWidth: 0.5,
  },
  createProject: {
    backgroundColor: '#44BBA4',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
    color: '#44BBA4',
    fontWeight: 'bold',
  },
});
