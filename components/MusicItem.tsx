import React from 'react';
import { View, Text, StyleSheet, Button, GestureResponderEvent, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  description: string;
  lyric: string;
  itemIndex: number;
  onPress: (title: string, link: string, lyric: string, event: GestureResponderEvent) => void;
  onDelete: (event: GestureResponderEvent) => void;
  onMove: (index: number, direction: number, event: GestureResponderEvent) => void;
}

export const MusicItem: React.FC<Props> = ({ title, description, lyric, itemIndex, onPress, onDelete, onMove }) => {

  const handlePress = (event: GestureResponderEvent) => {
      onPress(title, description, lyric ?? "", event);
    };

  const handlePressonMove = ()=> {

  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
          <View style={styles.containerText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.containerButton}>
              <View style={styles.containerOrder}>
                <TouchableOpacity style={[styles.buttonOrder, styles.buttonOrderLeft]} onPress={(event) => onMove(itemIndex, -1, event)}>
                  <Text style={styles.buttonOrderText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonOrder, styles.buttonOrderRight]} onPress={(event) => onMove(itemIndex, 1, event)}>
                  <Text style={styles.buttonOrderText}>-</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                  style={[styles.buttonDelete, { backgroundColor: 'red' }]}
                  onPress={onDelete}
                >
                  <Text style={styles.buttonDeleteText}>Remover</Text>
              </TouchableOpacity>
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
    marginBottom: 10,
    flexDirection: 'row',

  },
  containerText: {
    //backgroundColor: 'red',
    width: '60%'
  },
  containerButton: {
    //backgroundColor: 'green',
    width: '40%',
    justifyContent: 'center'
  },

  button :{

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
  containerOrder:{
    flexDirection: 'row',
  },
  buttonOrder:{
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
  },
  buttonOrderText:{
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    //backgroundColor: 'red',
    paddingBottom: 5,
    position: 'absolute'
  },
  buttonOrderLeft:{
    marginRight: 2
  },
  buttonOrderRight:{
    marginLeft: 2
  },

  buttonDelete: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
  },

  buttonDeleteText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    //backgroundColor: 'red',
    paddingBottom: 5
  }
});

