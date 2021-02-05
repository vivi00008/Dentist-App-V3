import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntIcon from "react-native-vector-icons/AntDesign";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import FeatherIcon from "react-native-vector-icons/Feather";
import userApi from '../../api/userApi'
import TeacherCard from '../../shared/components/TeacherCard'

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const RentTeacherScreen = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [teacherData, setTeacherData] = useState([])
    const navigation = useNavigation()
    const user = useContext(UserContext)

    const doBack = () => {
        navigation.goBack();
    };

    const getTeacher = async() => {
        const respose = await userApi.get('/teachers', {
            headers: {
                Authorization: user.token,
            },
        })

        if (respose.data.success){
            const data = respose.data.message
            setTeacherData(data)
            console.log(respose.data.message)
            setIsLoading(true)
            console.log(teacherData)
        }
    }

    useEffect(() => {
        getTeacher()
    }, [])

    const renderTeacher = ({item}) => {
        return (
            <TouchableOpacity>
                <TeacherCard title={item.id}/>
            </TouchableOpacity>
        )
    }

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
                        render={renderTeacher}
                    />
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
})

export default RentTeacherScreen