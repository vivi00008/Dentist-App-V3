import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import FeatherIcon from "react-native-vector-icons/Feather";
import userApi from '../../api/userApi'
import TeacherCard from '../../shared/components/TeacherCard'

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const RentTeacherScreen = () =>{
    const [selectTeacher, setSelectTeacher] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [teacherData, setTeacherData] = useState([])
    const navigation = useNavigation()
    const user = useContext(UserContext)

    const doBack = () => {
        navigation.goBack();
    };

    const chooseTeacher = (item) =>{
        setSelectTeacher(item)
    }


    const renderTeacher = ({item}) => {
        return (
            <TouchableOpacity style={styles.teacherCard} onPress={() => chooseTeacher(item)}>
                <TeacherCard name={item.name} selected={selectTeacher === item}/>
            </TouchableOpacity>
        )
    }

    const doNext =() =>{
        user.setTeacherName(selectTeacher.name)
        user.setTeacherId(selectTeacher.id)
        navigation.navigate('SolutionScreen')
    }

    const getTeacher = async () => {
        const response = await userApi.get("/teachers", {
            headers: {
                Authorization: user.token,
            },
        });
        if (response.data.success) {
            const data = response.data.message;
            setTeacherData(data)
            setIsLoading(true)
        }
    };

    useEffect(() => {
        getTeacher();
    }, []);


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
                    <Text style={styles.textHeader}>อาจารย์ที่ปรึกษา</Text>
                </View>
                <View style={styles.contentBg}>
                    <FlatList 
                        data={teacherData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderTeacher}
                        showsVerticalScrollIndicator={false}
                    />
                    {selectTeacher ? (
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
}

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
    teacherCard:{
        padding:10
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
})

export default RentTeacherScreen