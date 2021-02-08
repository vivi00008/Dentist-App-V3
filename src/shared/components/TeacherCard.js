import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Avatar, Divider } from "react-native-paper";

const TeacherCard = ({ name, selected }) => {
    const label = name.substr(name.indexOf("."));
    return (
            <View
                style={[
                    styles.card,
                    selected && { backgroundColor: "#f5a81e" },
                ]}
            >
                <Avatar.Text
                    size={60}
                    style={styles.center}
                    label={label[1]}
                    labelStyle={[styles.label]}
                />
                <Text style={[styles.text, selected && {color:'white'}]}>{name}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    center: {
        alignSelf: "center",
        marginVertical: 20,
        backgroundColor: "#f4e7f4",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ececec",
        flex:1
    },
    text: {
        fontFamily: "kanitRegular",
        fontSize: 18,
        color:'black'
    },
    label:{
        fontFamily: "kanitSemiBold",
        color: "#9b559a",
    }
});

export default TeacherCard;
