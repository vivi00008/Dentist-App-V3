import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import floorApi from "../../api/floorApi";
import { UserContext } from "../../context/UserContext";
import FloorCard from "../../shared/components/FloorCard";
import FeatherIcon from "react-native-vector-icons/Feather";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const RoomTypeScreen = () => {
    const user = useContext(UserContext);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [floorData, setFloorData] = useState([]);
    const [selected, setSelected] = useState(false);

    const getFloor = async () => {
        const response = await floorApi.get("/floors", {
            headers: {
                Authorization: user.token,
            },
        });
        if (response.data.success) {
            const data = response.data.message;
            let newFloorData = floorData;
            for (let i = 0; i < data.length; i++) {
                newFloorData.push(data[i]);
            }
            setFloorData(newFloorData);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getFloor();
    }, []);

    const doBack = () => {
        navigation.goBack();
    };

    const formatDataList = (dataList, numberColumns) => {
        const totalRows = Math.floor(dataList.length / numberColumns);
        let totalLastRow = dataList.length - totalRows * numberColumns;

        while (totalLastRow !== 0 && totalLastRow !== numberColumns) {
            dataList.push({ id: "blank", empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    const chooseCard = (item) => {
        setSelected(item);
    };

    const renderFloorCard = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cardStyle}
                onPress={() => chooseCard(item)}
            >
                <FloorCard title={item.name} selected={selected === item} />
            </TouchableOpacity>
        );
    };

    const doNext = () => {
        if (selected) {
            navigation.navigate("DateScreen", { id: selected.id });
        }
    };

    const numCardColumns = 2;
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
                    <Text style={styles.textHeader}>ประเภทห้องทันตะ</Text>
                </View>
                <View style={styles.contentBg}>
                    <FlatList
                        data={formatDataList(floorData, numCardColumns)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderFloorCard}
                        numColumns={numCardColumns}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={doNext}
                    >
                        <Text style={styles.textButton}>ถัดไป</Text>
                        <FeatherIcon
                            name="arrow-right"
                            size={24}
                            style={styles.iconArrow}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    ) : (
        <View>
            <Text>Loading data ... Please wait</Text>
        </View>
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
    textButton: {
        fontSize: 18,
        fontFamily: "kanitRegular",
        color: "white",
    },
});

export default RoomTypeScreen;
