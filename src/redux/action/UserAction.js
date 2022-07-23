export const createAction = (Data) => {
    return async (dispatch) => {
        try {
            Data._id = Date.now();
            dispatch({
                type: "CREATE_USER",
                payload: Data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const EditAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "EDIT_USER",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const DeleteAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "DELETE_USER",
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
};
