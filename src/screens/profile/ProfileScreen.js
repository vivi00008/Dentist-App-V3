import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { Avatar } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const ProfileScreen = () => {
    const user = useContext(UserContext);

    const doLogout = () => {
        user.setIsAuth(false);
    };

    return (
        <ImageBackground
            source={require("../../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <SafeAreaView style={styles.bgContainer}>
                <Text style={styles.textHeader}>บัญชีผู้ใช้</Text>
            </SafeAreaView>
            <View style={styles.contentBg}>
                <View style={styles.container}>
                    <Avatar.Icon
                        icon={require("../../../assets/Icons/user.png")}
                        size={108}
                        style={styles.iconContent}
                        color="#80277f"
                    />
                    <Text style={styles.nameText}>{user?.user?.name}</Text>
                    <Text style={[styles.nameText, { color: "#90428f" }]}>
                        ID : {user?.user?.username}
                    </Text>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.viewDetails}>
                        <Image
                            source={require("../../../assets/Icons/envelope.png")}
                            style={[
                                styles.dentalChair,
                                { tintColor: "#80277f" },
                            ]}
                            resizeMode="stretch"
                        />
                    </View>
                    <Text style={styles.textDetail}>{user?.user?.email}</Text>
                </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={doLogout}
                    >
                        <Text style={styles.textButton}>ออกจากระบบ</Text>
                        <MaterialIcons
                            name="logout"
                            size={24}
                            style={styles.iconArrowRight}
                        />
                    </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    bgContainer: {
        margin: 30,
        marginTop: 30,
    },
    container: {
        marginHorizontal: 24,
        flexDirection: "column",
        alignItems: "center",
    },
    textHeader: {
        color: "white",
        fontSize: 30,
        fontFamily: "kanitRegular",
    },
    contentBg: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: 48,
        padding: 12,
        height: HEIGHT / 1.3,
    },
    iconContent: {
        top: -50,
        backgroundColor: "#fed27b",
        position: "relative",
        alignSelf: "center",
    },
    nameText: {
        fontFamily: "kanitRegular",
        fontSize: 24,
    },
    rowView: {
        flexDirection: "row",
        marginVertical: 30,
        alignItems: "center",
        alignSelf: "center",
    },
    viewDetails: {
        backgroundColor: "#f4e7f4",
        padding: 8,
        width: WIDTH / 8,
        height: HEIGHT / 18,
    },
    textDetail: {
        fontFamily: "kanitRegular",
        fontSize: 14,
        marginLeft: 18,
    },
    dentalChair: {
        width: WIDTH / 15,
        height: HEIGHT / 30,
        alignSelf: "center",
        justifyContent: "center",
    },
    bottom: {
        bottom: 50,
        position: "absolute",
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
        bottom:80,
        position:'absolute'
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
});

export default ProfileScreen;
