import config from 'config';
import { authHeader } from '../_helpers';

export const detailsService = {
    getAll,
};

function getAll(id) {
    console.log(Promise.resolve(JSON.parse(JSON.stringify(program))))
    return Promise.resolve(JSON.parse(JSON.stringify(program)))

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };
    // console.log(fetch(`${config.apiUrl}/programs`, requestOptions).then(handleResponse))
    // return fetch(`${config.apiUrl}/programs`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
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


const program = {
    program_id: 1,
    name: "Program 1",
    image: "https://i.ibb.co/SrCfTwt/image.png",
    description: "Un program foarte bun de facut muschi mari",
    createdByUser: [
        {
        id: 18,
        first_name: "User1",
        last_name: "User1L",
        email: "user@mail.com",
        password: "123456",
        age: 12,
        gender: "M",
        height: 123,
        weight: 123,
        purpose: "M",
        admin: 0,
        token: null
        }
    ],
    exercises:[
        {
            exercise_id: 1,
            name: 'Flotari',
            description: 'Se fac multe flotari ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/tsTsgT7v6wy5hYXI9U/giphy.gif',
            duration: 7,
            points: 10
        },
        {
            exercise_id: 2,
            name: 'Front Lunge',
            description: 'Se fac multe exerciitii asdasadadada dsada0pk dsa ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/SwgkfECuO4XylhLNuN/giphy.gif',
            duration: 8,
            points: 5
        },
        {
            exercise_id: 3,
            name: 'Abdomene',
            description: 'Se fac multe exerciitii asdasadadada dsada0pk dsa ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/SwgkfECuO4XylhLNuN/giphy.gif',
            duration: 54,
            points: 5
        },
        {
            exercise_id: 4,
            name: 'Front Lunge',
            description: 'Se fac multe exerciitii asdasadadada dsada0pk dsa ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/a3rQFFgqKDXWw/giphy.gif',
            duration: 21,
            points: 5
        },
        {
            exercise_id: 5,
            name: 'Front Lunge',
            description: 'Se fac multe exerciitii asdasadadada dsada0pk dsa ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/tsTsgT7v6wy5hYXI9U/giphy.gif',
            duration: 25,
            points: 5
        },
        {
            exercise_id: 6,
            name: 'Front Lunge',
            description: 'Se fac multe exerciitii asdasadadada dsada0pk dsa ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/l3q2Q3sUEkEyDvfPO/giphy.gif',
            duration: 25,
            points: 5
        },
        {
            exercise_id: 7,
            name: 'Front Lunge',
            description: 'Se fac multe exerciitii asdasadadada dsada0pk dsa ca sunt bune pentru brate si vrei sa ai muschi la brate si alte chestii scrise aici ca e text lung',
            video: 'https://media.giphy.com/media/l3q2Q3sUEkEyDvfPO/giphy.gif',
            duration: 25,
            points: 5
        }
    ]
}