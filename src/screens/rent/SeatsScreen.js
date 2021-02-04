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
    FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import FeatherIcon from "react-native-vector-icons/Feather";
import sessionApi from "../../api/sessionApi";
import SeatCard from "../../shared/components/SeatCard";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SeatsScreen = (props) => {
    const id = props.route.params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [seatsData, setSeatsData] = useState([]);
    const [selectSeat, setSeatSelect] = useState();
    const [selected, setSelected] = useState();

    const navigation = useNavigation();

    const user = useContext(UserContext);

    const getSeats = async () => {
        const response = await sessionApi.get(`/sessions/session/${id}`, {
            headers: {
                Authorization: user.token,
            },
        });

        if (response.data.success) {
            const data = response.data.message;
            setSeatsData(data.seats);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getSeats();
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

    const renderSeat = ({ item }) => {
        if (item.empty) {
            return null;
        }

        if (item[Object.keys(item)] == 1) {
            return (
                <View
                    style={styles.renderView}
                    onPress={() => clickSeats(item)}
                >
                    <SeatCard
                        title={Object.keys(item)}
                        selected={selected === item}
                        isFull={true}
                    />
                </View>
            );
        }

        return (
            <TouchableOpacity
                style={styles.renderView}
                onPress={() => clickSeats(item)}
            >
                <SeatCard
                    title={Object.keys(item)}
                    selected={selected === item}
                    isFull={false}
                />
            </TouchableOpacity>
        );
    };

    const clickSeats = (item) => {
        setSelected(item);
    };

    const doNext = () => {
        navigation.navigate('RentTeacherScreen')
    };

    const numCardColumns = 4;
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
                    <Text style={styles.textHeader}>ที่นั่ง (ยูนิต)</Text>
                </View>
                <View style={styles.contentBg}>
                    <View style={styles.row}>
                        <View style={styles.guide}>
                            <View
                                style={[
                                    styles.imgHeader,
                                    { backgroundColor: "#ffffff" },
                                ]}
                            >
                                <Image
                                    source={require("../../../assets/Icons/dentist-chair.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#c4c4c4" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textGuide}>ว่าง</Text>
                        </View>
                        <View style={styles.guide}>
                            <View
                                style={[
                                    styles.imgHeader,
                                    { backgroundColor: "#f18b60" },
                                ]}
                            >
                                <Image
                                    source={require("../../../assets/Icons/dentist-chair.png")}
                                    style={[
                                        styles.dentalChair,
                                        { tintColor: "#ffffff" },
                                    ]}
                                    resizeMode="stretch"
                                />
                            </View>
                            <Text style={styles.textGuide}>ไม่พร้อมใช้งาน</Text>
                        </View>
                    </View>
                    <View style={styles.emptyView}></View>

                    <FlatList
                        data={formatDataList(seatsData, numCardColumns)}
                        keyExtractor={(item) => Object.keys(item)}
                        numColumns={numCardColumns}
                        renderItem={renderSeat}
                    />

                    {selected ? (
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
                    ) : null}
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
    row: {
        flexDirection: "row",
        position: "absolute",
        right: 30,
        top: -30,
    },
    dentalChair: {
        width: WIDTH / 15,
        height: HEIGHT / 30,
        alignSelf: "center",
        justifyContent: "center",
    },
    imgHeader: {
        padding: 10,
        borderRadius: 6,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
    },
    guide: {
        alignItems: "center",
        paddingHorizontal: 10,
    },
    textGuide: {
        fontFamily: "kanitRegular",
        fontSize: 12,
        paddingTop: 8,
    },
    renderView: {
        padding: 6,
    },
    emptyView: {
        height: HEIGHT / 15,
    },
});

export default SeatsScreen;
