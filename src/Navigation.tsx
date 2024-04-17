import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, StatusBar, View, useColorScheme, Text } from "react-native";
import Auth from "./app/auth/Auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "./app/components/ui/Icon";
import { useRecoilValue } from "recoil";
import { cartAtom, userAtom } from "./state/RecoilState";
import Catalog from "./app/catalog/Catalog";
import Cart from "./app/cart/Cart";
import Order from "./app/order/Order";
import Profile from "./app/profile/Profile";
import UserOrders from "./app/profile/UserOrders";

const createStack =
    Platform.OS === 'ios' ? createStackNavigator : createNativeStackNavigator
const RootStack = createStack()
const AuthStack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    const cart = useRecoilValue(cartAtom)

    return (
        <BottomTab.Navigator
            initialRouteName="Catalog"
            screenOptions={{
                tabBarActiveTintColor: 'gray',
            }}
        >
            <BottomTab.Screen
                name="Catalog"
                component={Catalog}
                options={{
                    title: 'Catalog',
                    headerShown: false,
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <Icon name="mobile-phone" color={color} style={{ marginBottom: -3 }} size={30} />,
                }}
            />
            <BottomTab.Screen
                name="Cart"
                component={Cart}
                options={(navigation) => ({
                    tabBarIcon: ({ color }) =>
                        <View>
                            <Icon name="shopping-cart" color={color} style={{ marginBottom: -3 }} size={30} />
                            <View style={{ display: cart.length == 0 ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', position: "absolute", width: 14, height: 14, borderRadius: 50, backgroundColor: 'red', borderWidth: 1, borderColor: 'gray', }}>
                                <Text style={{ fontSize: 10, fontWeight: '500', color: 'white', textAlign: 'center' }}>
                                    {cart.length}
                                </Text>
                            </View>
                        </View>,
                    headerShown: false,
                })}
            />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#f2f2f2'
                    },
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <Icon name="user" color={color} style={{ marginBottom: -3 }} size={30} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

const RootStackNavigation = () => {
    return (
        <RootStack.Navigator
            screenOptions={({ }) => ({
                headerShown: true,
                headerShadowVisible: false,
                headerBackTitle: ' ',
                headerTintColor: 'black',
                headerBackVisible: false,
                headerTitleStyle: {
                    color: 'black',
                },
                headerTitleAlign: 'center',
            })}>
            <RootStack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="OrderScreen"
                component={Order}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Order',
                    headerBackVisible: true,
                }}
            />
            <RootStack.Screen
                name="Orders"
                component={UserOrders}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'My Orders',
                    headerBackVisible: true,
                }}
            />
        </RootStack.Navigator>
    )
}

const AuthNavigation = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Auth"
                component={Auth}
                options={{
                    headerShown: true,
                    title: '',
                    headerShadowVisible: false,
                    headerBackTitle: ' ',
                    headerTintColor: 'black',
                    headerBackVisible: false,
                    headerTitleAlign: 'center',
                }}
            />
        </AuthStack.Navigator>
    )
}

export function Navigation() {
    const user = useRecoilValue(userAtom);

    if (!user.signed) {
        return (
            <NavigationContainer>
                <StatusBar hidden />
                <AuthNavigation />
            </NavigationContainer>
        )
    }

    else {
        return (
            <NavigationContainer>
                <StatusBar hidden />
                <RootStackNavigation />
            </NavigationContainer>
        )
    }

}
