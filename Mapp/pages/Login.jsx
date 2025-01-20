import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons'; // Importer l'icône FontAwesome5

const Login = ({ setIsAuth }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuth(true);
      navigation.navigate('LocationList');
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.school}>School</Text>
        <Text style={styles.map}>Map</Text>
      </Text>
      <View style={styles.loginPage}>
        <Text style={styles.connectTitle}>Connectez-vous</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={20} color="#403e56" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={20} color="#403e56" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: '',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    flexDirection: 'row',
  },
  school: {
    color: '#403e56',
    fontSize: 30,
  },
  map: {
    color: '#f4a811',
    fontSize: 30,
  },
  loginPage: {
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  connectTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#403e56',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f4a811',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
