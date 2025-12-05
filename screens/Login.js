import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'; 
import { useState, useEffect, useRef } from 'react';
import AuthServices from '../Utils/Auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [serverReady, setServerReady] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    const serverAwake = async () => {
      try {
        const isAwake = await AuthServices.checkServerStatus();
        if (mountedRef.current) setServerReady(isAwake);
      } catch {
        if (mountedRef.current) setServerReady(false);
      }
    };
    serverAwake();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Porfavor, llene todos los campos. Gracias');
      return;
    }

    setLoading(true);
    setProgress({ current: 0, total: 12 });

    try {
      console.log('Iniciando login...'); 

      const userData = await AuthServices.login(
        email,
        password,
        (current, total) => {
          if (mountedRef.current) setProgress({ current, total });
        }
      );

      console.log('Login exitoso, navegando...');

      if (!mountedRef.current) return;

      navigation.navigate('Default');
    } catch (error) {
      console.log('Error en login:', error); 
      if (mountedRef.current) {
        Alert.alert('Error', error.message || 'Credenciales incorrectas');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setProgress(null);
      }
    }
  };

  if (!serverReady && !loading) {
    return <Text>Cargando el servidor</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>LPals!</Text>
      </View>
      <View>
        <Text style={styles.inputHeader}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none" 
        />
        <Text style={styles.inputHeader}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (Tus estilos están bien, se mantienen igual)
  signUpButton: {
    backgroundColor: '#92B0E9',
    borderWidth: 2,
    borderColor: '#72A3FF',
    marginHorizontal: 40,
    height: 40,
    marginTop: 40,
    borderRadius: 15,
    width: 120,
    alignSelf: 'center',
    alignContent: 'center',
  },
  inputHeader: {
    textAlign: 'center',
    color: '#72A3FF',
    paddingTop: 10,
    fontSize: 25,
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    marginHorizontal: 40,
    borderRadius: 15,
    height: 40,
    borderColor: '#72A3FF',
    borderWidth: 2,
    paddingLeft: 10,
  },
  header: {
    backgroundColor: '#72A3FF',
    width: '100%',
    height: 70,
    justifyContent: 'flex-end',
    paddingBottom: 5,
    paddingHorizontal: 20,
    paddingTop: 0,
    marginBottom: 35,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#11111', // Ojo: Hex debe ser 6 digitos (#111111) o 3 (#111), tienes 5.
    padding: 0,
  },
  headerText: {
    marginTop: 100,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
