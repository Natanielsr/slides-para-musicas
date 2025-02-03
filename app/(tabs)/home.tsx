import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { MusicItem } from '@/components/MusicItem';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.musicWrapper}>
        <ThemedText style={styles.title} type='title'>Adicionar Músicas</ThemedText>
        <View style={styles.items}>
          <MusicItem title='title' description='desc'></MusicItem>
          <MusicItem title='title' description='desc'></MusicItem>
          <MusicItem title='title' description='desc'></MusicItem>
          <MusicItem title='title' description='desc'></MusicItem>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'write a task'}/>
        <TouchableOpacity>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 75,
    marginLeft: 30,
    marginRight: 30
  },
  musicWrapper:{

  },
  title: {
    marginBottom: 20
  },
  items:{
    
  },
  writeTaskWrapper : {
    width: '100%',
  },
  input: {
    color: '#000',
    backgroundColor: '#c0c0c0'
  },
  addWrapper:{
    backgroundColor: '#fff'
  },
  addText:{

  }

});
