import React from "react";
import { Card, Text, Avatar } from "react-native-paper";
import { StyleSheet, Dimensions, View, Platform, TouchableOpacity} from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const FloorCard = ({ title, selected, label}) => {
    return (
        <View style={[styles.card, selected && { backgroundColor:'#f1b261'}]}>
            <Avatar.Text
                label={label}
                style={styles.center}
                size={100}
                labelStyle={{color:'#9b559a', fontFamily:'kanitRegular'}}
            />
            <Text style={[styles.textContent, selected&& {color:'white'}]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        alignSelf: "center",
        marginVertical: 20,
        backgroundColor:'#f4e7f4',
        justifyContent:'center',
        alignItems:'center'
    },
    card: {
        height: (Platform.OS === 'ios') ? HEIGHT * 0.22 :HEIGHT * 0.26,
        width: WIDTH * 0.4,
        borderWidth: 1,
        alignItems: "center",
        borderColor: "#ebebeb",
        flex: 1,
        borderRadius: 12,
    },
    textContent: {
        fontFamily: "kanitRegular",
        fontSize: 16,
        bottom: 0,
    },
});

export default FloorCard;
