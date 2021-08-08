export const SET_SECRET = 'SET_SECRET';

export const setSecret = (secret) => {
    return {
        type: SET_SECRET,
        secret: secret
    };
};