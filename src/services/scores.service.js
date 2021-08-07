import instance from './api';
import store from '../redux/store';
import { initScore } from '../redux/actions/score.actions';

const path = '/api/scores';

export const getInitialScores = async () => {
    try {
        const { data } = await instance.get(`${path}/initial-scores`);
        console.log(`axios received data: ${JSON.stringify(data, null, 4)}`);
        store.dispatch(initScore(data));
        return data;
    }
    catch({response}) {
        console.error(`oops, got error: ${JSON.stringify(response, null, 4)}`);
    }
}