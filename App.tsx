import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebaseConfig";
import firebase from "firebase/compat";
import User = firebase.User;
import PasswordRecovery from "./src/screens/PasswordRecovery";

const Stack = createNativeStackNavigator();
const InternalStack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user: User) => {
            setUser(user);
        })
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"PhotoGram"}>
                {user
                    ? <InternalStack.Screen name="Home" component={TabNavigator} options={{headerShown: false}}/>
                    : <Stack.Group navigationKey={user ? 'user' : 'guest'}>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Registro" component={Signup}/>
                        <Stack.Screen name="Recuperar senha" component={PasswordRecovery}/>
                    </Stack.Group>}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
