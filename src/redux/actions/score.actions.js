export const UPDATE_SCORE = "UPDATE_SCORE";

export const updateScore = ({name, diff}) => {
    return {
        type: UPDATE_SCORE,
        name,
        diff
    };
}