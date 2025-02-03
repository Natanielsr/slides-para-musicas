import React from 'react';
import { TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0;
  
   // Condição para o caso da aplicação estar sendo executada na Web
   const isWeb = Platform.OS === 'web';

  return (
    <TouchableOpacity 
        style={[
            styles.button,
            {
                top: isWeb ? 10 : statusBarHeight + 10
            }
        ]} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}>

        <MaterialIcons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1000
  },
});

export default BackButton;