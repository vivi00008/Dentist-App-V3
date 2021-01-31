import React, {useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";


const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const DateScreen = (props) =>{
    const id = props.route.params.id
    const [isLoading, setIsLoading] = useState(true);

    const doBack = () => {
        navigation.goBack();
    };

    return isLoading ? (
        <LinearGradient
            colors={["#872f86", "#b565b4", "#ffffff"]}
            style={styles.root}
        >
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={doBack}>
                        <AntIcon name="arrowleft" size={36} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>วันที่ และ ช่วงเวลา</Text>
                </View>
                <View style={styles.contentBg}>
                    
                </View>
            </SafeAreaView>
        </LinearGradient>
    ) : (
        <View>
            <Text>Loading data ... Please wait</Text>
        </View>
    );
}

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
    cardStyle: {
        margin: 15,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    loginButton: {
        flexDirection: "row",
        backgroundColor: "rgb(46,196,182)",
        width: WIDTH / 1.8,
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
    },
    iconArrow: {
        color: "white",
        right: 10,
        position: "absolute",
    },
})

export default DateScreen