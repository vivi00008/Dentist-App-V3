import React, { useEffect, useState, useContext, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import cartApi from "../../api/cartApi";
import { UserContext } from "../../context/UserContext";
import { Avatar } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CartCard from "../../shared/components/CartCard";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const StatusScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState();
    const [status, setStatus] = useState("All");
    const [filter, setFilter] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const user = useContext(UserContext);

    const wait = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const getCard = async () => {
        const response = await cartApi.get("/carts", {
            headers: {
                Authorization: user.token,
            },
        });
        if (response.data.success) {
            setCartData(response.data.message);
            setFilter(response.data.message);
            setIsLoading(true);
            console.log(cartData)
        }
    };

    useEffect(() => {
        getCard();
    }, []);

    const listTab = [
        {
            status: "All",
            text: "ทั้งหมด",
        },
        {
            status: "waiting",
            text: "กำลังรอ",
        },
        {
            status: "success",
            text: "สำเร็จ",
        },
    ];

    const chooseStatus = (status) => {
        if (status !== "All") {
            setFilter([...cartData.filter((e) => e.state === status)]);
            console.log(filter);
        } else {
            setFilter(cartData);
        }
        setStatus(status);
    };

    const renderCart = ({ item }) => {
        return (
            <View style={styles.renderCart}>
                <CartCard teacherName={item.teacherName} name={user?.user?.name} id={user?.user?.username}/>
            </View>
        );
    };

    return isLoading ? (
        <ImageBackground
            source={require("../../../assets/picture/mainBg.png")}
            style={styles.root}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView style={styles.bgContainer}>
                    <Text style={styles.textHeader}>
                        ติดตามสถานะ{"\n"}การจองห้อง
                    </Text>
                </SafeAreaView>
                <View style={styles.contentBg}>
                    <Avatar.Image
                        size={108}
                        source={require("../../../assets/picture/appointment.png")}
                        style={styles.iconContent}
                    />
                    <View style={styles.listTab}>
                        {listTab.map((e) => (
                            <TouchableOpacity
                                style={[
                                    styles.btnTap,
                                    status === e.status && styles.btnActive,
                                ]}
                                onPress={() => chooseStatus(e.status)}
                            >
                                <Text style={styles.textTap}>{e.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <FlatList
                        data={filter}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCart}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    ) : (
        <Text>Loading ...</Text>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    bgContainer: {
        margin: 20,
    },
    textHeader: {
        color: "white",
        fontSize: 30,
        fontFamily: "kanitRegular",
    },
    contentBg: {
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: 18,
        padding: 12,
        height: HEIGHT / 1.3,
    },
    listTab: {
        backgroundColor: "#fff",
        padding: 15,
        flexDirection: "row",
        marginTop: 60,
    },
    btnTap: {
        width: WIDTH / 3.5,
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "#EBEBEB",
        padding: 10,
        justifyContent: "center",
    },
    textTap: {
        fontSize: 16,
        fontFamily: "kanitRegular",
    },
    btnActive: {
        backgroundColor: "#f5a81e",
    },
    iconContent: {
        top: -40,
        backgroundColor: "#c577c4",
        position: "absolute",
        alignSelf: "flex-end",
        right: 50,
    },
    renderCart:{
        paddingVertical:10,
    }
});

export default StatusScreen;
