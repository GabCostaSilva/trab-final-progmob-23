import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Feed from "../screens/Feed";
import {Button} from "react-native";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <Button
                title="Sair"
                color="red"
                onPress={() => {
                    // Navigate using the `navigation` prop that you received
                    navigation.navigate('SomeScreen');
                }}
            />
        </DrawerContentScrollView>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Perfil" component={Feed}/>
            <Drawer.Screen name="Configurações" component={Feed}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;