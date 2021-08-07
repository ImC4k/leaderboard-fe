export const UPDATE_SCORE = 'UPDATE_SCORE';
export const INIT_SCORE = 'INIT_SCORE';

export const initScore = (scores) => {
    return {
        type: INIT_SCORE,
        scores: scores
    };
};

export const updateScore = ({name, diff, isFromUi = false}) => {
    return {
        type: UPDATE_SCORE,
        name,
        diff,
        isFromUi
    };
};