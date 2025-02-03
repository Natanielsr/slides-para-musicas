import React from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';


const StatusBarSpacing: React.FC = () => {

  const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0;
  
   // Condição para o caso da aplicação estar sendo executada na Web
   const isWeb = Platform.OS === 'web';

  return (
    <View style={[styles.container, {
      marginTop: isWeb ? 10 : statusBarHeight + 10
  }]}/>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default StatusBarSpacing;