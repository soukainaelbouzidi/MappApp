import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importer l'icône FontAwesome5

const Home = () => {
  const navigation = useNavigation();

  const handleAuthentication = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./WhatsAp2.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Image
            source={require('./logodemap-removebg-preview.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Bienvenue sur SchoolMap</Text>
          <Text style={styles.subtitle}>
            Une app de navigation avancée pour votre faculté.
          </Text>
          <TouchableOpacity onPress={handleAuthentication} style={styles.exploreButton}>
            <Text style={styles.buttonText}>Explorer</Text>
            <FontAwesome5 name="chevron-right" size={16} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  exploreButton: {
    backgroundColor: '#e28743',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  icon: {
    marginLeft: 5,
  },
});

export default Home;