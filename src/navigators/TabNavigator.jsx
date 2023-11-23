import Feed from "../screens/Feed";
import {FontAwesome} from "@expo/vector-icons";
import Post from "../screens/Post";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DrawerNavigator from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Screen name="Feed" component={Feed} options={{
            tabBarIcon: ({focused, color, size}) => (
                <FontAwesome name="list" size={size} color={color}/>
            )
        }}/>
        <Tab.Screen name="Post" component={Post} options={{
            tabBarIcon: ({focused, color, size}) => (
                <FontAwesome name="plus" size={size} color={color}/>
            )
        }}/>
        <Tab.Screen name="Usuário" component={DrawerNavigator} options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
                <FontAwesome name="user" size={size} color={color}/>
            )
        }}/>
    </Tab.Navigator>
}