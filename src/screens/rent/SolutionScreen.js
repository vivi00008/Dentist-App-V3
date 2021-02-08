import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import FeatherIcon from "react-native-vector-icons/Feather";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SolutionScreen = () => {
    const navigation = useNavigation()

    const doBack = () => {
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={["#872f86", "#b565b4", "#ffffff"]}
            style={styles.root}
        >
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={doBack}>
                        <AntIcon name="arrowleft" size={36} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>สรุปข้อมูลการจอง</Text>
                </View>
                <View style={styles.contentBg}>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        margin: 24,
    }, 
    textHeader: {
        fontFamily: "kanitRegular",
        color: "white",
        fontSize: 32,
    },
    contentBg: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: 28,
        padding: 12,
        height: HEIGHT / 1.3,
    },
});

export default SolutionScreen;
