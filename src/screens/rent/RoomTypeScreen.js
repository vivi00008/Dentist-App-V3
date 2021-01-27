import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
const RoomTypeScreen = () => {
    const navigation = useNavigation();
    const doBack = () => {
        navigation.goBack();
    };
    return (
        <LinearGradient
            colors={["#872f86", "#b565b4", "#ffffff"]}
            style={styles.root}
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <TouchableOpacity onPress={doBack}>
                        <AntIcon name="arrowleft" size={36} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>ประเภทห้องทันตะ</Text>
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
        margin: 36,
    },
    textHeader:{
        fontFamily:'kanitRegular',
        color:'white',
        fontSize:32
    },
    contentBg: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        marginTop: 48,
        padding: 12,
        height: HEIGHT / 1.3,
    },
});

export default RoomTypeScreen;
