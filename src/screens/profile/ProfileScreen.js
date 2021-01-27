import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {UserContext} from '../../context/UserContext'

const ProfileScreen = () => {
    const user = useContext(UserContext)
    const doLogout = () => {
        user.setIsAuth(false)
    }
    return (
        <View>
            <TouchableOpacity onPress={doLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
