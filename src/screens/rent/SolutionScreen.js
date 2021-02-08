import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import {
    ScrollView,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Portal, Button, Dialog, Paragraph } from "react-native-paper";
import cardApi from "../../api/cartApi";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SolutionScreen = () => {
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const user = useContext(UserContext);

    let isoDate = new Date(user.date);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    isoDate = isoDate.toLocaleDateString("th", options);

    let timeTitle = "";
    if (user.time == "morning") {
        timeTitle = "9.30-12.30";
    }
    if (user.time == "afternoon") {
        timeTitle = "13.30-16.30";
    }

    const doBack = () => {
        navigation.goBack();
    };

    const doNext = () => {
        showModal();
    };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const doSubmit = async () => {
        try {
            const response = await cardApi.post(
                "/create",
                {
                    sessionId: user.sessionId,
                    seats: user.seat,
                    teacherId:user.teacherId
                },
                {
                    headers: {
                        Authorization: user.token,
                    },
                }
            );

            if(response.data.success){
                hideModal()
                navigation.navigate('SuccessScreen')
            }
        } catch {}
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
                    <ScrollView>
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
                            <Text style={styles.textDetail}>{user.room}</Text>
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
                            <View style={styles.column}>
                                <Text
                                    style={[
                                        styles.textDetail,
                                        { color: "#b7b7b7" },
                                    ]}
                                >
                                    {isoDate}
                                </Text>
                                <Text style={styles.textDetail}>
                                    {timeTitle}
                                </Text>
                            </View>
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
                            <Text style={styles.textDetail}>{user.seat}</Text>
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
                                {user.teacherName}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.editBottom}
                            onPress={doBack}
                        >
                            <FeatherIcon
                                name="arrow-left"
                                size={24}
                                style={styles.iconArrowLeft}
                            />
                            <Text
                                style={[
                                    styles.textButton,
                                    { color: "#2ec4b6" },
                                ]}
                            >
                                แก้ไขการจอง
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={doNext}
                        >
                            <Text style={styles.textButton}>ยืนยันการจอง</Text>
                            <FeatherIcon
                                name="arrow-right"
                                size={24}
                                style={styles.iconArrowRight}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={hideModal}
                        style={styles.dialogBox}
                    >
                        <Dialog.Title style={styles.dialogHeader}>
                            คุณยืนยันการจองห้อง{"\n"}ประเภทนี้ ใช่หรือไม่?
                        </Dialog.Title>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[
                                    styles.editBottom,
                                    {
                                        width: WIDTH / 3,
                                        height: HEIGHT / 20,
                                        borderRadius: 6,
                                        width: WIDTH / 3,
                                        height: HEIGHT / 20,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                ]}
                                onPress={hideModal}
                            >
                                <Text
                                    style={[
                                        styles.modalText,
                                        { color: "#2ec4b6" },
                                    ]}
                                >
                                    ยกเลิก
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.sumbit}
                                onPress={doSubmit}
                            >
                                <Text
                                    style={[
                                        styles.modalText,
                                        { color: "white" },
                                    ]}
                                >
                                    ยืนยัน
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Dialog>
                </Portal>
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
    rowView: {
        flexDirection: "row",
        marginVertical: 20,
        alignItems: "center",
        marginHorizontal: 30,
    },
    viewDetails: {
        backgroundColor: "#f4e7f4",
        padding: 8,
        width: WIDTH / 8,
        height: HEIGHT / 18,
    },
    textDetail: {
        fontFamily: "kanitRegular",
        fontSize: 18,
        marginLeft: 18,
    },
    dentalChair: {
        width: WIDTH / 15,
        height: HEIGHT / 30,
        alignSelf: "center",
        justifyContent: "center",
    },
    column: {
        flexDirection: "column",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
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
    dialogHeader: {
        fontFamily: "kanitRegular",
        textAlign: "center",
    },
    dialogBox: {
        borderRadius: 12,
        height: HEIGHT / 4.3,
    },
    modalText: {
        fontFamily: "kanitRegular",
        fontSize: 18,
    },
    sumbit: {
        borderRadius: 6,
        width: WIDTH / 3,
        height: HEIGHT / 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2ec4b6",
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
});

export default SolutionScreen;
