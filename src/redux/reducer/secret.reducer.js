import { SET_SECRET } from "../actions/secret.actions";

const initialState = {
    secret: localStorage.getItem('leaderboard_secret'),
};

const secretReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECRET:
            const { secret } = action;
            console.log(`updated secret: ${secret}`);
            localStorage.setItem('leaderboard_secret', secret);
            return {...state, secret: secret};
        default:
            return state
    }
};

export default secretReducer;