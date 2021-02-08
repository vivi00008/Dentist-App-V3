import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");
    const [room, setRoom] = useState("");
    const [time, setTime] = useState();
    const [date, setDate] = useState("");
    const [sessionId, setSessionId] = useState()
    const [seat, setSeat] = useState([]);
    const [teacherName, setTeacherName] = useState();
    const [teacherId, setTeacherId] = useState();

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isAuth,
                setIsAuth,
                token,
                setToken,
                room,
                setRoom,
                time,
                setTime,
                date,
                setDate,
                sessionId,
                setSessionId,
                seat,
                setSeat,
                teacherName,
                setTeacherName,
                teacherId,
                setTeacherId,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
