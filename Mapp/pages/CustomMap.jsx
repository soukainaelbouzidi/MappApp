import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert, TextInput } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const facultyCoordinates = {
  latitude: 33.2258,
  longitude: -8.4867,
};

const GOOGLE_MAPS_APIKEY ='AIzaSyCaAH2_7LOjvp4eIiB9xNhjX9beGezmnTI';

export default function SchoolMap() {
  const [mapType, setMapType] = useState("standard");
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState('');
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const mapViewRef = useRef(null);

  useEffect(() => {
    const fetchMarkersData = async () => {
      try {
        const markersCollectionRef = collection(db, 'local');
        const markersSnapshot = await getDocs(markersCollectionRef);
        const markersList = markersSnapshot.docs.map(doc => doc.data());
        setMarkersData(markersList);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchMarkersData();
  }, []);

  useEffect(() => {
    const checkUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'L\'application a besoin de la permission pour accéder à votre position.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setUserLocation(location.coords);
      } else {
        Alert.alert('Position non disponible', 'Impossible de récupérer votre position pour le moment.');
      }
    };

    checkUserLocation();

    return () => {
      // Nettoyer les écouteurs lorsque le composant est démonté
      Location.stopLocationUpdatesAsync('locationListener');
    };
  }, []);

  const toggleMapType = () => {
    setMapType((prevMapType) =>
      prevMapType === "standard" ? "satellite" : "standard"
    );
  };

  // const getDestinationCoordinates = () => {
  //   try {
  //     const destinationLocation = markersData.find(loc => loc.name === destination);
  //     if (destinationLocation) {
  //       setDestinationCoordinates(destinationLocation.coordinates);
  //     } else {
  //       Alert.alert('Destination invalide', 'Veuillez sélectionner une destination valide parmi les options disponibles.');
  //     }
  //   } catch (error) {
  //     console.error('Erreur de géocodage de la destination:', error);
  //   }
  // };
  const getDestinationCoordinates = () => {
    try {
      // Convertir la destination en minuscules et supprimer les accents
      const lowerCaseDestination = destination.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
      // Recherche de la destination dans la liste des lieux
      const destinationLocation = markersData.find(
        loc => {
          // Convertir le nom du lieu en minuscules et supprimer les accents
          const lowerCaseLocationName = loc.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          // Comparaison des noms de lieux
          return lowerCaseLocationName === lowerCaseDestination;
        }
      );
  
      if (destinationLocation) {
        setDestinationCoordinates(destinationLocation.coordinates);
      } else {
        Alert.alert('Destination invalide', 'Veuillez sélectionner une destination valide parmi les options disponibles.');
      }
    } catch (error) {
      Alert.alert('Veuillez sélectionner une destination' )    }
  };

  useEffect(() => {
    if (destinationCoordinates && userLocation.latitude !== 0 && userLocation.longitude !== 0) {
      mapViewRef.current.fitToCoordinates([userLocation, destinationCoordinates], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [destinationCoordinates, userLocation]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        minZoomLevel={17}
        maxZoomLevel={20}
        mapType={mapType}
        style={styles.map}
        initialRegion={{
          ...facultyCoordinates,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={facultyCoordinates}
          title="Faculté des Sciences el jadida "
          description="El jadida, Maroc"
        >
          <Callout>
            <Text>Faculté des Sciences</Text>
          </Callout>
        </Marker>

        {markersData.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.coordinates}
            title={item.name}
          >
            <Callout>
              <Text>{item.name}</Text>
            </Callout>
          </Marker>
        ))}

        {userLocation.latitude !== 0 && userLocation.longitude !== 0 && (
          <Marker
            coordinate={userLocation}
            title="Votre position"
            pinColor="blue"
          />
        )}

        {destinationCoordinates && userLocation.latitude !== 0 && userLocation.longitude !== 0 && (
          <MapViewDirections
          origin={userLocation}
          destination={destinationCoordinates}
          apikey={'AIzaSyCaAH2_7LOjvp4eIiB9xNhjX9beGezmnTI'}
          strokeWidth={5} // Épaisseur de la ligne
          strokeColor="#1e81b0" // Couleur de la ligne
          mode="WALKING"
          lineDashPattern={[10, 5]} // Motif de pointillé
          lineCap="round" // Forme des extrémités de la ligne
        />
        
        )}

        {destinationCoordinates && (
          <Marker
            coordinate={destinationCoordinates}
            title="Destination"
          />
        )}
      </MapView>

      <TextInput
        style={styles.destinationInput}
        value={destination}
        onChangeText={setDestination}
        placeholder="Entrez votre destination"
      />

      <TouchableOpacity style={styles.getDirectionsButton} onPress={getDestinationCoordinates}>
        <Text style={styles.getDirectionsButtonText}>Trouver les chemins</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
        <Text style={styles.mapTypeButtonText}>
          {mapType === "standard"
            ? "Bascules au satellite"
            : "Par défaut"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  destinationInput: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 116,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    elevation: 2,
    zIndex: 1,
  },
  getDirectionsButton: {
    position: "absolute",
    bottom: 48,
    right: 2,
    backgroundColor: "#e28743",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
    zIndex: 1,
  },
  getDirectionsButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  mapTypeButton: {
    position: "absolute",
    top: 600,
    left: 230,
    backgroundColor: "#e28743",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
    zIndex: 1,
  },
  mapTypeButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
