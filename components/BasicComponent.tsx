import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  description: string;
}

export const BasicComponent: React.FC<Props> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
});

