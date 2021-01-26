import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Provider as PaperProvider } from "react-native-paper"
import RentScreen from './screens/rent/RentScreen'
import StatusScreen from './screens/status/StatusScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import FeatherIcon from 'react-native-vector-icons/Feather'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const RentStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Rent'
            screenOptions={{
                headerStyle: { backgroundColor: "#AA52A9" },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "kanitRegular",
                },
            }}>
            <Stack.Screen
                name='Rent'
                component={RentScreen}
                options={{ title: "หน้าหลัก", headerShown:false}}
            />
        </Stack.Navigator>
    )
}

const StatusStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Status'
            screenOptions={{
                headerStyle: { backgroundColor: "#AA52A9" },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "kanitRegular",
                },
            }}>
            <Stack.Screen
                name='Status'
                component={StatusScreen}
                options={{ title: "สถานะ" }}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerStyle: { backgroundColor: "#AA52A9" },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "kanitRegular",
                },
            }}>
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{ title: "โปรไฟล์" }}
            />
        </Stack.Navigator>
    )
}

const MainApp = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='Feed'
                    tabBarOptions={{
                        activeTintColor: "#DE71C0",
                    }}>
                    
                    <Tab.Screen
                        name='StatusStack'
                        component={StatusStack}
                        options={{
                            tabBarLabel: "ติดตามสถานะ",
                            tabBarIcon: ({ color, size }) => (
                                <FeatherIcon
                                    name='layers'
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name='RentStack'
                        component={RentStack}
                        options={{
                            tabBarLabel: "หน้าหลัก",
                            tabBarIcon: ({ color, size }) => (
                                <FeatherIcon
                                    name='home'
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name='Profile'
                        component={ProfileStack}
                        options={{
                            tabBarLabel: "โปรไฟล์",
                            tabBarIcon: ({ color, size }) => (
                                <FeatherIcon
                                    name='user'
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default MainApp