import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function ProjectItem({ id, title, description, createAt }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProjectDetails', { projectId: id, title });
      }}
    >
      <View style={styles.container}>
        <View style={styles.container_text}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.createdAt}>
            {moment(createAt).locale('es').format('LLL')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 16,
    color: '#0B1E1A',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  description: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  createdAt: {
    backgroundColor: '#C3EAE2',
    alignSelf: 'flex-start',
    borderRadius: 5,
    color: '#0B1E1A',
    padding: 2,
    paddingHorizontal: 4,
  },
});
