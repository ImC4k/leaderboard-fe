import axios from 'axios';

const BACKEND_ENDPOINT = 'http://localhost:8082';

const instance = axios.create({
    baseURL: BACKEND_ENDPOINT
});

// instance.interceptors.request.use(
// 	(req) => {
// 		const { userToken, backendAccess } = store.getState().userReducer;
// 		if (
// 			(!isNil(backendAccess) || req.url === '/api/users/self') &&
// 			userToken
// 			) {
// 				req.headers.Authorization = `Bearer ${userToken}`;
// 				return req;
// 			} else {
// 				throw new axios.Cancel('missing token');
// 			}
// 		},
// 		function (error) {
// 		return Promise.reject(error);
// 	}
// );

export default instance;