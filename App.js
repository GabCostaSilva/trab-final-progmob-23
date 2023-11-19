import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
