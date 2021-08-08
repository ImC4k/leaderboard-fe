import { SET_SECRET } from "../actions/secret.actions";

const initialState = {
    secret: undefined,
};

const secretReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECRET:
            const { secret } = action;
            console.log(`updated secret: ${secret}`);
            return {...state, secret: secret};
        default:
            return state
    }
};

export default secretReducer;