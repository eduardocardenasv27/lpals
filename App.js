import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './Screens/SignUp'
import Login from './Screens/Login'
import Default from './Screens/Default'

const Stack = createNativeStackNavigator(); 

export default function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Default">
        <Stack.Screen name = "Default" component={Default}/>
        <Stack.Screen name = "SignUp" component={SignUp}/>
        <Stack.Screen name = "Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}