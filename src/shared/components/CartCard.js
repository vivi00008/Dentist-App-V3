import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Text } from "react-native-paper";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CartCard = ({ name, id, teacherName }) => {
    return (
        <Card>
            <Card.Content style={styles.headerCard}>
                <Text>{name}</Text>
                <Text>ID : {id}</Text>
            </Card.Content>
            <Card.Content>
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
                    <Text style={styles.textDetail}>2. เลือกวันที่และเวลา</Text>
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
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    textHeaderCard: {
        fontFamily: "kanitRegular",
    },
    headerCard: {
        backgroundColor: "#fed27b",
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingBottom:10
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
});

export default CartCard;
