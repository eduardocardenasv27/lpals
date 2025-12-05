import { StyleSheet, Text, View, Button, TouchableOpacity, Header, TextInput, Alert} from 'react-native';
import { useState, useEffect, useRef } from 'react'; 
import AuthServices from '../Utils/Auth'


export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [serverReady, setServerReady] = useState(false); 
  const mountedRef = useRef(true);
  
  useEffect(() => {
    const initalize = async () => {
      try {
        const isAwake = await AuthServices.checkServerStatus(); 
        if (mountedRef.current) setServerReady(isAwake); 
      } catch {
        if (mountedRef.current) setServerReady(false); 
      }
    }; 
    initalize(); 

    return () => { mountedRef.current = false; };
  }, []); 

  const validEmail = (email) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const handleSignUp = async () => {
    if (!username || !email || !password){
      Alert.alert('Error', "Porfavor, llene todos los campos");
      return; 
    }

    if (!validEmail(email)) {
      Alert.alert('Error', "Porfavor, ingrese un email valido");
      return; 
    }
    if (password.length < 8){
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres'); 
      return; 
    }
    setLoading(true); 
    setProgress({ current: 0, total: 12 })
    try {
      await AuthServices.signUp(username, email, password, (current, total) => {
        if (mountedRef.current) setProgress({ current, total });
      }); 
      if (!mountedRef.current) return; 
      Alert.alert('Cuenta creada exitosamente');
    } catch (err) {
      if (mountedRef.current) {
        Alert.alert(err, 'Error al crear la cuenta');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false); 
        setProgress(null); 
      }
    }
  };
   
   if (!serverReady && !loading){
     return (
       <Text>
          Cargando el servidor :P
       </Text>
     );
   }
   if (loading) {
     return (
      <View>
        Creando cuenta 
      </View>
     )
   } 


  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.headerText}>
          LPals! 
        </Text>
      </View>
      <View>
      <Text style={styles.inputHeader}>
      Username
      </Text>
      <TextInput style={styles.input}
      value ={username}
      onChangeText={setUsername}/>
      <Text style={styles.inputHeader}>
      E-mail
      </Text>
      <TextInput style={styles.input}
      value ={email}
      onChangeText={setEmail}/>
      <Text style={styles.inputHeader}>
      Password
      </Text>
      <TextInput style={styles.input}
      value ={password}
      onChangeText={setPassword}/>
      </View>

      <TouchableOpacity style={styles.signUpButton}
      onPress={handleSignUp}>
        <Text style={styles.buttonText}>
        Sign Up!
        </Text>
      </TouchableOpacity>
      <Text style={styles.link}>
      Already a pal? Log-In
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    textAlign: "center", 
    color: "#A1A1A1",
    marginTop: 50, 
  },
  signUpButton: {
    backgroundColor: "#92B0E9",
    borderWidth: 2, 
    borderColor: '#72A3FF', 
    marginHorizontal: 40, 
    height: 40, 
    marginTop: 40, 
    borderRadius: 15,
    width: 120, 
    alignSelf: 'center',
    alignContent: 'center'
  },  
  inputHeader: {
    textAlign: 'center',
    color: '#72A3FF',
    paddingTop: 10, 
    fontSize: 25, 
  },
  input: {
    backgroundColor: "#FFFFFF", 
    marginTop: 15, 
    marginHorizontal: 40, 
    borderRadius: 15, 
    height: 40, 
    borderColor: '#72A3FF',
    borderWidth: 2, 
    paddingLeft: 10

  },

  header: {
    backgroundColor: "#72A3FF", 
    width: '100%',
    height: 70, 
    justifyContent: 'flex-end', 
    paddingBottom: 5, 
    paddingHorizontal: 20, 
    paddingTop: 0, 
    marginBottom: 35, 
  },
  buttonText: {
    color: "#FFFFFF", 
    textAlign: 'center', 
    textAlignVertical: 'center',
    fontSize: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#11111',
    padding: 0,
  },
  headerText: {
    marginTop: 100,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },

});