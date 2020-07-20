import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProjectItem from './project_item';

export default function ProjectList({ data = [] }) {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProjectItem
              id={item.id}
              title={item.name}
              description={item.description}
              createAt={item.created}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Entypo name='folder' size={150} color='#44BBA4' />
          <Text style={{ color: 'gray', fontSize: 20 }}>
            No se encontraron proyectos!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
