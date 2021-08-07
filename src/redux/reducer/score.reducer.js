import { UPDATE_SCORE } from "../actions/score.actions";
import {findIndex} from 'lodash';
import socket, { WS_ACTIONS } from "../../ws";

// const initialState = {
//     scores: [],
// };

const initialState = { // FIXME remove hardcode
    scores: [
        {
            "name": "haha",
            "score": 10
        },
        {
            "name": "hehe",
            "score": 15
        }
    ]
}

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SCORE:
            return updateScoreByName(action, state);

        default:
            return initialState;
    }
};

function updateScoreByName(action, state) {
    socket.emit(WS_ACTIONS.UPDATE_SCORE, action);
    const { name, diff } = action;
    const playerIndex = findIndex(state.scores, { name: action.name });
    const newScores = [...state.scores];
    const newScoreValueForPlayer = state.scores[playerIndex].score + diff;
    const newScoreRecordForPlayer = { name, score: newScoreValueForPlayer }
    newScores.splice(playerIndex, 1, newScoreRecordForPlayer);
    return {
        ...initialState,
        scores: newScores
    };
};

export default scoreReducer;