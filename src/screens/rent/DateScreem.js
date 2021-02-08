import React, { useState, useEffect, useContext} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import sessionApi from "../../api/sessionApi";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import FloorCard from "../../shared/components/FloorCard";
import FeatherIcon from "react-native-vector-icons/Feather";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const DateScreen = (props) => {
    const id = props.route.params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [markedDates, setMarkedDates] = useState();
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [allSession, setAllSession] = useState([]);
    const [dateData, setDateData] = useState();
    const [selectTimeCard, setSelectTimeCard] = useState();
    const [textShow, setTextShow] = useState()

    const navigation = useNavigation();
    const user = useContext(UserContext);


    const doBack = () => {
        navigation.goBack();
    };

    LocaleConfig.locales["th"] = {
        monthNames: [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฏาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
        ],
        monthNamesShort: [
            "มกรา",
            "กุมภา",
            "มีนา",
            "เมษา",
            "พฤษภา",
            "มิถุ",
            "กรกฏา",
            "สิงหา",
            "กันยา",
            "ตุลา",
            "พฤศจิ",
            "ธันวา",
        ],
        dayNames: [
            "อาทิตย์",
            "จันทร์",
            "อังคาร",
            "พุธ",
            "พฤหัสบดี",
            "ศุกร์",
            "เสาร์",
        ],
        dayNamesShort: ["อา.", "จ.", "อ.", "พุธ.", "พฤ.", "ศ.", "เสา."],
    };
    LocaleConfig.defaultLocale = "th";

    const formatDataList = (dataList, numberColumns) => {
        const totalRows = Math.floor(dataList.length / numberColumns);
        let totalLastRow = dataList.length - totalRows * numberColumns;

        while (totalLastRow !== 0 && totalLastRow !== numberColumns) {
            dataList.push({ id: "blank", empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    const getSelectedDayEvents = (date) => {
        setDateData([]);
        setSelectTimeCard("");
        let markedDates = {};
        markedDates[date] = {
            selected: true,
            selectedColor: "#2ec4b6",
            textColor: "#FFFFFF",
        };
        let serviceDate = moment(date);
        serviceDate = serviceDate.format("YYYY-MM-DD");
        setMarkedDates(markedDates);

        let sessionData = allSession.filter((session) => session.date == date);
        sessionData.forEach((inList) => setDateData(inList.details));
        setIsSelectedDate(true);
        if(sessionData.length > 0){
            setTextShow('เลือกช่วงเวลา')
        }

        if(sessionData.length == 0){
            setTextShow('ไม่พบช่วงเวลาที่เปิดให้จอง')
        }
        
    };

    const getSession = async () => {
        const response = await sessionApi.get(`/sessions/${id}`, {
            headers: {
                Authorization: user.token,
            },
        });
        if (response.data.success) {
            const data = response.data.message;
            setAllSession(data);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    const chooseCard = (item) => {
        setSelectTimeCard(item);
    };

    const renderFloorCard = ({ item }) => {
        if (item.empty) {
            return null;
        }

        let timeTitle = "";
        let label ="";
        if (item.sessionInDay == "morning") {
            timeTitle = "9.30-12.30";
            label ="เช้า"
        }
        if (item.sessionInDay == "afternoon") {
            timeTitle = "13.30-16.30";
            label="บ่าย"
        }

        return (
            <TouchableOpacity
                style={styles.cardStyle}
                onPress={() => chooseCard(item)}
            >
                <FloorCard
                    title={timeTitle}
                    selected={selectTimeCard === item}
                    label={label}
                />
            </TouchableOpacity>
        );
    };

    const doNext = () => {
        user.setDate(selectTimeCard.date)
        user.setTime(selectTimeCard.sessionInDay)
        user.setSessionId(selectTimeCard.id)
        navigation.navigate('SeatsScreen', {id:selectTimeCard.id})
    };
    const numCardColumns = 2;
    return isLoading ? (
        <ScrollView showsVerticalScrollIndicator={false} >
        <LinearGradient
            colors={["#872f86", "#b565b4", "#ffffff"]}
            style={styles.root}
        >
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={doBack}>
                        <AntIcon name="arrowleft" size={36} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>วันที่ และ ช่วงเวลา</Text>
                </View>
                <View style={styles.contentBg}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Calendar
                            current={Date.now()}
                            onDayPress={(date) =>
                                getSelectedDayEvents(date.dateString)
                            }
                            markedDates={markedDates}
                        />
                        {isSelectedDate ? (
                            <View style={styles.timeSelect}>
                                <Text style={styles.textTimeSelect}>{textShow}</Text>
                                <FlatList
                                    data={formatDataList(
                                        dateData,
                                        numCardColumns
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={renderFloorCard}
                                    numColumns={numCardColumns}
                                    scrollEnabled={false}
                                />
                            </View>
                        ) : null}
                        {selectTimeCard ? (
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
                    </ScrollView>
                </View>
            </SafeAreaView>
        </LinearGradient>
        </ScrollView>
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
        height: HEIGHT / 1.2,
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
        width: WIDTH / 10,
    },
    timeCard: {
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
    row: {
        flexDirection: "row",
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
    textTimeSelect: {
        fontFamily: "kanitRegular",
        fontSize: 18,
        alignSelf: "center",
    },
    timeSelect: {
        paddingTop: 24,
    },
});

export default DateScreen;
