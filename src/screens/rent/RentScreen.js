import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const RentScreen = () => {
    return (
        <ImageBackground
            source={require("../../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <ScrollView>
                <SafeAreaView style={styles.bgContainer}>
                    <Text style={styles.textHeader}>มาจองห้องทันตะ</Text>
                    <Text style={styles.textHeader}>ทำการรักษากันเถอะ</Text>
                </SafeAreaView>
                <View style={styles.contentBg}>
                    <View style={styles.container}>
                        <Avatar.Image
                            size={108}
                            source={require("../../../assets/picture/dental-care.png")}
                            style={styles.iconContent}
                        />
                        <Text style={styles.textHeaderContent}>วิธีการจองห้อง</Text>
                        <View style={styles.rowView}>
                        <View style={styles.viewDetails}><Image source={require('../../../assets/Icons/grid.png')} style={[styles.dentalChair,{tintColor:'#80277f'}]} resizeMode='stretch'/></View>
                            <Text style={styles.textDetail}>1. เลือกประเภทห้องทันตกรรม</Text>
                        </View>
                        <View style={styles.rowView}>
                        <View style={styles.viewDetails}><Image source={require('../../../assets/Icons/calendar.png')} style={[styles.dentalChair,{tintColor:'#80277f'}]} resizeMode='stretch'/></View>
                            <Text style={styles.textDetail}>2. เลือกวันที่และเวลา</Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.viewDetails}><Image source={require('../../../assets/Icons/dentist-chair.png')} style={[styles.dentalChair,{tintColor:'#80277f'}]} resizeMode='stretch'/></View>
                            <Text style={styles.textDetail}>3. เลือกที่นั่ง (ยูนิต)</Text>
                        </View>
                        <View style={styles.rowView}>
                        <View style={styles.viewDetails}><Image source={require('../../../assets/Icons/user.png')} style={[styles.dentalChair,{tintColor:'#80277f'}]} resizeMode='stretch'/></View>
                            <Text style={styles.textDetail}>4. เลือกอาจารย์ที่ปรึกษา</Text>
                        </View>
                        <View style={styles.rowView}>
                        <View style={styles.viewDetails}><Image source={require('../../../assets/Icons/task.png')} style={[styles.dentalChair,{tintColor:'#80277f'}]} resizeMode='stretch'/></View>
                            <Text style={styles.textDetail}>5. กรอกชื่อและเบอร์โทรศัพท์คนไข้</Text>
                        </View>
                        <View style={styles.rowView}>
                        <View style={styles.viewDetails}><Image source={require('../../../assets/Icons/check.png')} style={[styles.dentalChair,{tintColor:'#80277f'}]} resizeMode='stretch'/></View>
                            <Text style={styles.textDetail}>6. ยืนยันการจอง</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    bgContainer: {
        margin: 30,
        marginTop: 30,
    },
    container: {
        marginHorizontal: 24,
    },
    textHeader: {
        color: "white",
        fontSize: 30,
        fontFamily: "kanitRegular",
    },
    contentBg: {
        backgroundColor: "white",
        flex: 1,
        borderRadius:12,
        marginTop: 48,
        padding:12,
        height:HEIGHT/1.3
    },
    iconContent: {
        top: -50,
        backgroundColor: "#4bd295",
        right: 20,
        position: "absolute",
    },
    textHeaderContent: {
        marginTop: 36,
        fontFamily: "kanitSemiBold",
        fontSize: 24,
    },
    rowView:{
        flexDirection:'row',
        marginVertical:10,
        alignItems:'center'
    },
    viewDetails:{
        backgroundColor:'#f4e7f4',
        padding:8,
        width:WIDTH/8,
        height:HEIGHT/18
    },
    textDetail:{
        fontFamily:'kanitRegular',
        fontSize:14,
        marginLeft:18
    },
    dentalChair:{
        width:WIDTH/15,
        height:HEIGHT/30,
        alignSelf:'center',
        justifyContent:'center'
    },
    iconStyle:{

    }
});

export default RentScreen;
