import React from "react";
import { View, Text, Image, StyleSheet , Dimensions} from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SeatCard = ({title, selected, isFull}) => {

    return (
        <View style={styles.guide}>
            <View
                style={[
                    styles.imgHeader,
                    selected && { backgroundColor: '#2ec4b6' },
                    isFull && {backgroundColor: '#f18b60'}
                ]}
            >
                <Image
                    source={require("../../../assets/Icons/dentist-chair.png")}
                    style={[
                        styles.dentalChair,
                        selected && { tintColor: '#ffffff' },
                        isFull && {tintColor:'#ffffff'}
                    ]}
                    resizeMode="stretch"
                />
            </View>
            <Text style={styles.textGuide}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    dentalChair: {
        width: WIDTH / 10,
        height: HEIGHT / 20,
        alignSelf: "center",
        justifyContent: "center",
        tintColor:'#c4c4c4'
    },
    imgHeader: {
        padding: 10,
        borderRadius: 6,
        shadowColor: "#c4c4c4",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
        backgroundColor:'white'
    },
    guide: {
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius:8,
    },
    textGuide: {
        fontFamily: "kanitRegular",
        fontSize: 16,
        paddingTop: 8,
    },
});

export default SeatCard;
