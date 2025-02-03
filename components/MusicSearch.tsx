import { Shimmer } from '@/animations/shimmer';
import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';
import ButtonGPT from '@/components/ButtonGPT'


interface Props {
  title: string;
  link: string;
  onPressAdd: (title: string, link: string, event: GestureResponderEvent) => void;
  onPress: (title: string, link : string, event: GestureResponderEvent) => void;
  isLoading? : boolean;
}

export const MusicSearch: React.FC<Props> = ({ title, link, onPress, onPressAdd, isLoading }) => {

  const handlePress = (event: GestureResponderEvent) => {
    onPress(title, link, event);
  };

  const handlePressAdd = (event : GestureResponderEvent) =>{
    onPressAdd(title, link, event);
  }

  return (
    <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
             
              
              <View style={styles.containerText}>
                  { isLoading ?
                    <Shimmer style={{ marginBottom: 10 }}/> :
                    <Text style={styles.title}>{title}</Text>
                  }
                  { isLoading ?
                    <Shimmer/> :
                    <Text style={styles.description}>{link}</Text>
                  }
                  
              </View>
            
            <View style={styles.containerButton}>
                {
                  isLoading ?
                  <ButtonGPT title=' ' onPress={()=>{}} /> :
                  <ButtonGPT title='Add' onPress={handlePressAdd} iconName='add'/>
                }
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
    width: '70%'
  },
  containerButton: {
    //backgroundColor: 'green',
    width: '30%',
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
});

