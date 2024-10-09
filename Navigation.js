import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, Button, Image, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Componente del recuadro
const Box = ({ children, style, image }) => {
  return (
    <View style={[styles.box, style]}>
      {image && <Image source={{ uri: image }} style={styles.boxImage} />}
      <Text style={styles.boxText}>{children}</Text>
    </View>
  );
};

// Pantallas de ejemplo vacías
const Screen = ({ title }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [textInput, setTextInput] = useState(''); // Estado para texto
  const [selectedImage, setSelectedImage] = useState(null); // Estado para imagen
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('es-ES', options)); // Formato en español
  }, []);

  const pickImage = async () => {
    // Pide permisos para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Se necesitan permisos para acceder a la galería!");
      return;
    }

    // Abre la galería y espera a que el usuario seleccione una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Guarda la URI de la imagen seleccionada
      setModalVisible(false); // Cierra el modal
    }
  };

  const handleAddText = () => {
    // Guarda el texto y cierra el modal
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {title === "Pantalla de Mi Vida" && (
        <>
          <Box style={styles.boxTopLeft} image={null}>{currentDate}</Box>
          <Box style={styles.boxTopRight} image={null}>Filtros</Box>
          <Box style={styles.boxCentered} image={selectedImage}>
            <Text style={styles.boxText}>{textInput}</Text>
          </Box>
          <Box style={styles.boxCentered} image={'https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg'}></Box>
          <Box style={styles.boxCentered} image={'https://images.pexels.com/photos/2528985/pexels-photo-2528985.jpeg?cs=srgb&dl=pexels-eugene-bolshem-2528985.jpg&fm=jpg'}></Box>

          {/* Botón para abrir el modal */}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={30} color="#856b1e" />
          </TouchableOpacity>

          {/* Modal para seleccionar opciones */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona una opción</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu texto aquí"
                  value={textInput}
                  onChangeText={setTextInput}
                />
                <Button title="Guardar Texto" onPress={handleAddText} />
                <Button title="Seleccionar imagen" onPress={pickImage} />
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator();

// Componente personalizado para el header con círculo e icono
const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.circle}>
        <Ionicons name="person" size={50} color="white" />
      </View>
    </View>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Inicio') {
              iconName = 'home';
            } else if (route.name === 'Testigos') {
              iconName = 'person';
            } else if (route.name === 'Mi vida') {
              iconName = 'book';
            } else if (route.name === 'Perfil') {
              iconName = 'person-circle';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e6c373',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { 
            backgroundColor: '#ffffff',
            borderTopWidth: 4,
            borderTopColor: '#856b1e',
          },
          tabBarLabelStyle: { fontSize: 12 },
          headerStyle: {
            backgroundColor: '#fffff5',
            height: 100,
            borderBottomWidth: 4,
            borderBottomColor: '#856b1e',
          },
          headerTitle: () => <CustomHeader />,
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Inicio" children={() => <Screen title="Pantalla de Inicio" />} />
        <Tab.Screen name="Testigos" children={() => <Screen title="Pantalla de Testigos" />} />
        <Tab.Screen name="Mi vida" children={() => <Screen title="Pantalla de Mi Vida" />} />
        <Tab.Screen name="Perfil" children={() => <Screen title="Pantalla de Perfil" />} />
      </Tab.Navigator>
    </NavigationContainer>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6e6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e6c373',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#856b1e',
    marginTop: 80,
  },
  box: {
    padding: 7,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#856b1e',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTopLeft: {
    position: 'absolute',
    top: 5,
    left: 2,
  },
  boxTopRight: {
    position: 'absolute',
    top: 5,
    right: 2,
  },
  boxCentered: {
    marginTop: 50,
    alignSelf: 'center',
    alignItems: 'center', // Alinea los elementos en el centro
  },
  boxText: {
    color: '#856b1e',
    fontSize: 12,
  },
  boxImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5, // Espacio entre la imagen y el texto
  },
  input: {
    height: 40,
    borderColor: '#856b1e',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%', // Ancho del input
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e6c373',
    borderRadius: 30,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Navigation;
