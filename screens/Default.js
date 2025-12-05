import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert} from 'react-native';
import lpImg from "../assets/lp.png";


export default function Default({ navigation }) {
  
  const nav = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.rowContainer}>
        <Text style={styles.paragraph}>
          LPals!
        </Text>
        <Image 
          source={lpImg}
          style={styles.logo}
        />
      </View>

      <Text style={styles.subtitle}>
        Making Online Buddies :D
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => nav('Login')}>
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => nav('SignUp')}>
        <Text style={styles.buttonText}> Join Now!! </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 40, 
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingBottom: 8, 
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "#72A3FF", 
    textAlign: 'center', 
    textAlignVertical: 'center',
    fontSize: 40
  },
  subtitle: {
    margin: 24,
    marginTop: 0, 
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#72A3FF',
    padding: 8,
  },
  paragraph: {
    margin: 10,
    fontSize: 70,
    textAlign: 'center',
    color: '#FFFFFF'
  },
});