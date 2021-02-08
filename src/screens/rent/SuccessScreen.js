import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import {useNavigation} from '@react-navigation/native'

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SuccessScreen = () => {

    const navigation = useNavigation()

    const doFollow = () => {
        navigation.navigate('StatusStack', {
            screen:'StatusScreen'
        })
    }
    
    const doBack =() => {
        navigation.navigate('Rent')
    }

    return (
        <LinearGradient
            colors={["#a34f9f", "#b772a5", "#e5c2bf", "#fffffe"]}
            style={styles.root}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Text style={styles.textHeader}>จองสำเร็จ !!</Text>
                            <Text style={styles.subHeader}>
                                รออาจารย์อนุมัติผล
                            </Text>
                        </View>
                        <View style={styles.circle}>
                            <Image
                                source={require("../../../assets/picture/dentist.png")}
                                resizeMethod="auto"
                                resizeMode="contain"
                                style={styles.img}
                            />
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.loginButton} onPress={doBack}>
                        <Text style={styles.textButton}>กลับหน้าหลัก</Text>
                        <FeatherIcon
                            name="arrow-right"
                            size={24}
                            style={styles.iconArrowRight}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    textHeader: {
        color: "white",
        fontSize: 32,
        fontFamily: "kanitRegular",
    },
    subHeader: {
        color: "white",
        fontSize: 28,
        fontFamily: "kanitRegular",
    },
    header: {
        alignItems: "center",
        marginVertical: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingBottom: 20,
    },
    img: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: WIDTH / 2,
        height: HEIGHT / 7.5,
    },
    circle: {
        borderRadius:
            Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,
        width: WIDTH * 0.5,
        height: WIDTH * 0.5,
        backgroundColor: "#a7dfd9",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderColor: "#ffffff",
        borderWidth: 10,
    },
    container: {
        alignItems: "center",
        flex: 1,
        marginHorizontal: 24,
    },
    loginButton: {
        flexDirection: "row",
        backgroundColor: "rgb(46,196,182)",
        width: WIDTH / 1.3,
        height: HEIGHT / 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
    },
    iconArrowRight: {
        color: "white",
        right: 30,
        position: "absolute",
    },
    textButton: {
        fontSize: 18,
        fontFamily: "kanitRegular",
        color: "white",
    },
    editBottom: {
        flexDirection: "row",
        backgroundColor: "white",
        width: WIDTH / 1.3,
        height: HEIGHT / 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 18,
        borderColor: "#2ec4b6",
        borderWidth: 2,
    },
    iconArrowLeft: {
        color: "#2ec4b6",
        left: 30,
        position: "absolute",
    },
    bottom: {
        bottom: 50,
        position: "absolute",
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        top:40,
        flex: 1,
    },
});

export default SuccessScreen;
