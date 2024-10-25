const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_USER_SIGNUP":
            return {
            ...state,
            user: [...state.user, action.payload],
            }

        case "ADD_MEETING":
            return {
                ...state,
                meetings: [...state.meetings, action.payload]
            }
            
        case "UPDATE_MEETING":
            return {
                ...state,
                meetings: state.meetings.map((meeting) => meeting.Id === action.payload.Id ? action.payload : meeting),
            };

        case "REMOVE_MEETING":
            let filteredMeetings = state.meetings.filter((meeting) => meeting.Id !== action.payload);
            return {
                ...state,
                meetings: filteredMeetings
            };

        default:
            return state;
    }
}

export default reducer;