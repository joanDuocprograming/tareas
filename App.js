// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './Navigation';  // Asegúrate de que el archivo Navigation.js esté en la misma carpeta

export default function App() {
  return <Navigation />;
}


/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>aqui tenemos la home principal</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf9c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/