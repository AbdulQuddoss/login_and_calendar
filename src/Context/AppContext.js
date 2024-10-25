import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../Reducer/AppReducer';
const AppContext = createContext();

const getLocalStorageData = (key) => {
    let data = localStorage.getItem(key);
    if(!data || data.length === 0) {
        return [];
    } else {
        return JSON.parse(data);
    }
}

let initialState = {
    user: getLocalStorageData('user'),
    meetings: getLocalStorageData('meetings')
};

export const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const submitSignup = (user) => {
        if(user) {
            dispatch({type: "ADD_USER_SIGNUP", payload: user});
        } else {
            console.error("user is undefined")
        }
    }

    const addMeeting = (meeting) => {
        dispatch({ type: "ADD_MEETING", payload: meeting });
    };

    const updateMeeting = (updatedMeeting) => {
        dispatch({ type: "UPDATE_MEETING", payload: updatedMeeting });
    };

    const removeMeeting = (meetingId) => {
        console.log(meetingId);
        
        dispatch({ type: "REMOVE_MEETING", payload: meetingId });
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user])

    useEffect(() => {
        localStorage.setItem('meetings', JSON.stringify(state.meetings));
    }, [state.meetings])

    return <AppContext.Provider value={{...state, submitSignup, addMeeting, updateMeeting, removeMeeting}} >{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}