import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Text } from "react-native-paper";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CartCard = ({
    name,
    id,
    teacherName,
    roomType,
    date,
    seat,
    time,
    state,
}) => {
    let formatDate = new Date(date);
    formatDate = formatDate.toLocaleDateString("th");

    let timeTitle;
    if (time === "morning") {
        timeTitle = "9.30-12.30";
    }
    if (time === "afternoon") {
        timeTitle = "13.30-16.30";
    }

    let colorHeader = "";
    if (state == "waiting") {
        colorHeader = "#fed27b";
    }
    if (state == "success") {
        colorHeader = "#51a7a1";
    }
    return (
        <Card style={styles.card}>
            <Card.Content style={[styles.headerCard, {backgroundColor:colorHeader}]}>
                <Text style={styles.textHeaderCard}>{name}</Text>
                <Text style={styles.textHeaderCard}>ID : {id}</Text>
            </Card.Content>
            <Card.Content style={styles.rowOnly}>
                <View style={styles.viewDetails}>
                    <Image
                        source={require("../../../assets/Icons/grid.png")}
                        style={[styles.dentalChair, { tintColor: "#80277f" }]}
                        resizeMode="stretch"
                    />
                </View>
                <Text style={styles.textDetail}>{roomType}</Text>
                <View style={[styles.viewDetails, {marginLeft:30}]}>
                    <Image
                        source={require("../../../assets/Icons/dentist-chair.png")}
                        style={[styles.dentalChair, { tintColor: "#80277f" }]}
                        resizeMode="stretch"
                    />
                </View>
                <Text style={styles.textDetail}>{seat}</Text>
            </Card.Content>
            <Card.Content style={styles.rowOnly}>
                <View style={styles.viewDetails}>
                    <Image
                        source={require("../../../assets/Icons/calendar.png")}
                        style={[styles.dentalChair, { tintColor: "#80277f" }]}
                        resizeMode="stretch"
                    />
                </View>
                <Text style={styles.textDetail}>{formatDate}</Text>
                <View style={[styles.viewDetails, {marginLeft:30}]}>
                    <Image
                        source={require("../../../assets/Icons/clock.png")}
                        style={[styles.dentalChair, { tintColor: "#80277f" }]}
                        resizeMode="stretch"
                    />
                </View>
                <Text style={styles.textDetail}>{timeTitle}</Text>
            </Card.Content>

            <Card.Content style={styles.rowOnly}>
                <View style={styles.viewDetails}>
                    <Image
                        source={require("../../../assets/Icons/user.png")}
                        style={[styles.dentalChair, { tintColor: "#80277f" }]}
                        resizeMode="stretch"
                    />
                </View>
                <Text style={styles.textDetail}>{teacherName}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    textHeaderCard: {
        fontFamily: "kanitRegular",
    },
    headerCard: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingBottom: 10,
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
    rowOnly: {
        flexDirection: "row",
        alignItems:'center',
        marginVertical:12,
    },
    card: {
        borderColor: "#e8e8e8",
        borderWidth: 1,
    },
});

export default CartCard;
