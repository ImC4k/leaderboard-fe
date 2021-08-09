import { INIT_SCORE, UPDATE_SCORE } from "../actions/score.actions";
import {findIndex} from 'lodash';
import { wsUpdateScore } from '../../ws';

const initialState = {
    scores: [],
};

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_SCORE:
            return initScores(action, state);
        case UPDATE_SCORE:
            return updateScoreByName(action, state);

        default:
            return state;
    }
};

function initScores(action, state) {
    const { scores } = action;
    return { ...state, scores: scores };
}

function updateScoreByName(action, state) {
    const { name, diff, isFromUi } = action;
    if (isFromUi) {
        wsUpdateScore(action);
        return state;
    }
    else {
        const playerIndex = findIndex(state.scores, { name: action.name });
        const newScores = [...state.scores];
        const newScoreValueForPlayer = state.scores[playerIndex].score + diff;
        const newScoreRecordForPlayer = { name, score: newScoreValueForPlayer }
        newScores.splice(playerIndex, 1, newScoreRecordForPlayer);
        return {
            ...initialState,
            scores: newScores
        };
    }
};

export default scoreReducer;