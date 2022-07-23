const initialState = {
    userData: []
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_USER":
            return {
                ...state,
                userData: [...state.userData, action.payload]
            };
        case "EDIT_USER":
            const editId = action.payload._id;
            const data = state?.userData?.map(item => item._id === editId ? action.payload : item);
            return {
                ...state,
                userData: data
            };
        case "DELETE_USER":
            const deleteId = action.payload._id;
            const updatedData = state?.userData?.filter(item => item._id !== deleteId);
            return {
                ...state,
                userData: updatedData
            };
        default:
            return state
    }
};
