import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, disabled = false, iconName }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Text style={[styles.text, disabled && styles.disableText]}>{title}</Text>
        <View style={styles.iconContainer}>
            {
              iconName && 
              <MaterialIcons 
                name={iconName}
                size={20} 
                color="black" 
                style={[styles.icon, disabled && styles.disableIcon]} />
            }
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
    borderColor: '#a0a0a0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  disableIcon:{
    color: '#a0a0a0',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  disableText: {
    color: '#a0a0a0',
  },

  iconContainer: {
    marginLeft: 10
  }
});

export default CustomButton;
