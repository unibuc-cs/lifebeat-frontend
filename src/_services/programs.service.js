import config from 'config';
import { authHeader } from '../_helpers';

export const programsService = {
    getAll,
};

function getAll() {
    const programs = [
            {
                id: 1,
                name: "Program 1",
                user: "User 1",
                imageUrl: "https://i.ibb.co/3YfKGK3/image.png"
            },
            {
                id: 2,
                name: "Program 2",
                user: "User 2",
                imageUrl: "https://i.ibb.co/3YfKGK3/image.png"
            },
            {
                id: 3,
                name: "Program 3",
                user: "User 3",
                imageUrl: "https://i.ibb.co/3YfKGK3/image.png"
            },
            {
                id: 4,
                name: "Program 4",
                user: "User 4",
                imageUrl: "https://i.ibb.co/3YfKGK3/image.png"
            },
            {
                id: 5,
                name: "Program 5",
                user: "User 5",
                imageUrl: "https://i.ibb.co/3YfKGK3/image.png"
            },
            {
                id: 6,
                name: "Program 6",
                user: "User 6",
                imageUrl: "https://i.ibb.co/3YfKGK3/image.png"
            }
        ]
    
    return Promise.resolve(programs)

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // return fetch(`${config.apiUrl}/programs`, requestOptions).then(handleResponse);
}