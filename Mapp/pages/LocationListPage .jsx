import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importer l'icône FontAwesome5

const LocationList = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([
    { name: "Administration"},
    { name: "Bibliothèque"},
    { name: "Parking"},
    { name: "Garage" },
    { name: "Entrée Parking"},
    { name: "Atelier"},
    { name: "Entrée Etudiant" },
    { name: "Entrée Principale" },
    { name: "Amphi 1 Al Farabi" },
    { name: "Amphi 2 Al Bayrouni" },
    { name: "Amphi 3 Ibno Haitam"},
    { name: "Cafétéria des enseignants"},
    { name: "Amphi Ibno Nafiss" },
    { name: "Affichage"},
    { name: "Bloc B"},
    { name: "Bloc A"},
    { name: "Bloc C"},
    { name: "Bloc D"},
    { name: "Toilette"},
    { name: "Cafétéria des Etudiants"},
    { name: "Amphi Ibn Younes"},
    { name: "Département de biologie"},
    { name: "Département de chimie"},
    { name: "Animalerie"},
    { name: "Toilette" },
    { name: "Département de Physique / Géologie" },
    { name: "Département de Mathématique" },
    { name: "Département de Géologie"},
    { name: "Département Informatique"},
    { name: "Bibliothèque" },
  ]);


  // Trier les données par ordre alphabétique
  const sortedLocations = locations.sort((a, b) => a.name.localeCompare(b.name));

  // Fonction pour obtenir la première lettre de chaque nom
  const getFirstLetter = (location) => {
    return location.name.charAt(0).toUpperCase();
  };

  // Fonction pour gérer la navigation vers la page CustomMap
  const handleNavigateToMap = () => {
    navigation.navigate('SchoolMap');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.school}>School</Text>
        <Text style={styles.map}>Map</Text>
      </Text>
      
      <FlatList
        data={sortedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            {index === 0 || getFirstLetter(sortedLocations[index - 1]) !== getFirstLetter(item) ? (
              <Text style={styles.header}>{getFirstLetter(item)}</Text>
            ) : null}
            <TouchableOpacity style={styles.locationItem}>
              <Text style={styles.locationName}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleNavigateToMap}>
        <FontAwesome5 name="map-marked-alt" size={24} color="white" />
        <Text style={styles.buttonText}>Afficher sur la carte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  locationName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f4a811', // Nouvelle couleur de fond pour le bouton
    flexDirection: 'row', // Pour aligner l'icône et le texte horizontalement
    justifyContent: 'center', // Pour centrer l'icône et le texte horizontalement
    alignItems: 'center', // Pour centrer l'icône et le texte verticalement
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Espacement entre l'icône et le texte
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    textAlign: 'center',
  },
  school: {
    color: '#403e56', // Couleur des 5 premières lettres
    fontSize: 30,
  },
  map: {
    color: '#f4a811', // Couleur des autres lettres
    fontSize: 30,
  },
});

export default LocationList;
