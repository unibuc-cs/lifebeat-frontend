import config from 'config';
import { authHeader } from '../_helpers';


export const leaderboardService = {
    getStreakLeaderboard,
    getLevelLeaderboard
};


function getStreakLeaderboard(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/leaderboard`, requestOptions).then(handleResponse);
}

function getLevelLeaderboard(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/leaderboard-level`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        // return JSON.parse(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}