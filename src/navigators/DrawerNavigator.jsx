import React, {useState} from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Button} from "react-native";
import Profile from "../screens/Profile";
import {Settings} from "../screens/Settings";
import {signOut} from "firebase/auth";
import {auth} from "../../firebaseConfig";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <Button
                title="Sair"
                color="red"
                onPress={async () => {
                    setIsLoading(true)
                    await signOut(auth)
                    setIsLoading(false)
                    props.navigation.navigate('Login')
                }}
            />
        </DrawerContentScrollView>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Perfil" component={Profile}/>
            <Drawer.Screen name="Configurações" component={Settings}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;