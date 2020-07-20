import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskItem from './task_item';

export default function TaskList({ data = [] }) {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TaskItem
              id={item.id}
              title={item.name}
              description={item.description}
              createAt={item.created}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome name='tasks' size={150} color='#44BBA4' />
          <Text style={{ color: 'gray', fontSize: 20 }}>
            No se encontraron tareas!
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
