import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    ImageBackground,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Ionicon from "react-native-vector-icons/Ionicons";
import {useNavigation} from '@react-navigation/native'

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const RentScreen = () => {
    const navigation = useNavigation()
    const createRent = () =>{
        navigation.navigate('RoomTypeScreen')
    }
    return (
        <ImageBackground
            source={require("../../../assets/picture/mainBg.png")}
            style={styles.root}
        >
                <SafeAreaView style={styles.bgContainer}>
                    <Text style={styles.textHeader}>มาจองห้องทันตะ</Text>
                    <Text style={styles.textHeader}>ทำการรักษากันเถอะ</Text>
                </SafeAreaView>
                <View style={styles.contentBg}>
                    <View style={styles.container}>
                        <Avatar.Image
                            size={108}
                            source={require("../../../assets/picture/dental-care.png")}
                            style={styles.iconContent}
                        />
                        <Text style={styles.textHeaderContent}>
                            วิธีการจองห้อง
                        </Text>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}>
                                <Image
                                    source={require("../../../assets/Icons/grid.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#80277f" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textDetail}>
                                1. เลือกประเภทห้องทันตกรรม
                            </Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}>
                                <Image
                                    source={require("../../../assets/Icons/calendar.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#80277f" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textDetail}>
                                2. เลือกวันที่และเวลา
                            </Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}>
                                <Image
                                    source={require("../../../assets/Icons/dentist-chair.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#80277f" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textDetail}>
                                3. เลือกที่นั่ง (ยูนิต)
                            </Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}>
                                <Image
                                    source={require("../../../assets/Icons/user.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#80277f" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textDetail}>
                                4. เลือกอาจารย์ที่ปรึกษา
                            </Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}>
                                <Image
                                    source={require("../../../assets/Icons/task.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#80277f" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textDetail}>
                                5. กรอกชื่อและเบอร์โทรศัพท์คนไข้
                            </Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}>
                                <Image
                                    source={require("../../../assets/Icons/check.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#80277f" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textDetail}>
                                6. ยืนยันการจอง
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={createRent}>
                        <Ionicon name="add" size={30} color="white" />
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
        flex: 1,
        flexDirection: "column",
    },
    textHeader: {
        color: "white",
        fontSize: 30,
        fontFamily: "kanitRegular",
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
    iconContent: {
        top: -50,
        backgroundColor: "#4bd295",
        right: 20,
        position: "absolute",
    },
    textHeaderContent: {
        marginTop: 36,
        fontFamily: "kanitSemiBold",
        fontSize: 24,
    },
    rowView: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
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
    button: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: "#4bd295",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight:28,
        marginBottom:20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
    },
});

export default RentScreen;
