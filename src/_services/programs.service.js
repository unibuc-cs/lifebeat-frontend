import config from 'config';
import { authHeader } from '../_helpers';

export const programsService = {
    getAll,
    getAllExercises,
    createProgram,
    getAllCreatedByUser,
    deleteProgram
};

function getAll(purpose) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if(purpose != 'admin'){
        return fetch(`${config.apiUrl}/programs/all/${purpose}`, requestOptions).then(handleResponse); 
    }else{
        return fetch(`${config.apiUrl}/programs`, requestOptions).then(handleResponse);
    }
}

function getAllCreatedByUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/programs/createdbyuser/${id}`, requestOptions).then(handleResponse);
}

function deleteProgram(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('delete program - ' + id);
    // return fetch(`${config.apiUrl}/programs/all/${purpose}`, requestOptions).then(handleResponse);
}

function getAllExercises(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/exercises`, requestOptions).then(handleResponse);
}

function createProgram(programDetails){

    programDetails.program.image = images[Math.floor(Math.random() * images.length)];

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programDetails)
    };
    console.log(programDetails)
    // console.log(fetch(`${config.apiUrl}/users/streak`, requestOptions).then(handleResponse))
    fetch(`${config.apiUrl}/programs/create-with-exercises`, requestOptions).then(this.handleResponse)
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

const programs = [
    {
        program_id: 1,
        name: "Program 1",
        image: "https://i.ibb.co/3YfKGK3/image.png",
        createdByUser: {
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
    },
    {
        program_id: 2,
        name: "Program 2",
        image: "https://i.ibb.co/SrCfTwt/image.png",
        createdByUser: {
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
    },
    {
        program_id: 3,
        name: "Program 3",
        image: "https://i.ibb.co/3YfKGK3/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 4,
        name: "Program 4",
        image: "https://i.ibb.co/6nSTWKP/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 5,
        name: "Program 5",
        image: "https://i.ibb.co/jrsWT8m/image.png",
        createdByUser: {
            id: 11,
            first_name: "Gica",
            last_name: "Petru",
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
    },
    {
        program_id: 6,
        name: "Program 6",
        image: "https://i.ibb.co/3YfKGK3/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 7,
        name: "Program 7",
        image: "https://i.ibb.co/SrCfTwt/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 8,
        name: "Program 8",
        image: "https://i.ibb.co/6nSTWKP/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 9,
        name: "Program 9",
        image: "https://i.ibb.co/3YfKGK3/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 10,
        name: "Program 10",
        image: "https://i.ibb.co/jrsWT8m/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 11,
        name: "Program 11",
        image: "https://i.ibb.co/jrsWT8m/image.png",
        createdByUser: {
            id: 22,
            first_name: "Atlet",
            last_name: "Talentat",
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
    },
    {
        program_id: 12,
        name: "Program 12",
        image: "https://i.ibb.co/SrCfTwt/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 13,
        name: "Program 13",
        image: "https://i.ibb.co/3YfKGK3/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
    {
        program_id: 14,
        name: "Program 14",
        image: "https://i.ibb.co/jrsWT8m/image.png",
        createdByUser: {
            id: 10,
            first_name: "Ion",
            last_name: "Barbu",
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
    },
]


const images = [
    'https://i.imgur.com/uFxOkvV.jpeg',
    'https://i.imgur.com/dnd7XNa.jpeg',
    'https://i.imgur.com/5zlvwHJ.jpeg',
    'https://i.imgur.com/eHASXO0.jpeg',
    'https://i.imgur.com/ogJhvOs.jpg',
    'https://i.imgur.com/xrSbKwd.jpg',
    'https://i.imgur.com/xXQwnN6.png',
    'https://i.imgur.com/cKqfIRO.png',
    'https://i.imgur.com/rMjVON6.png',
    'https://i.imgur.com/cddjH1l.png',
    'https://i.imgur.com/qGrPYms.png',
    'https://i.imgur.com/6DrZ0tH.png',
    'https://i.imgur.com/Bo6V4tQ.png',
    'https://i.imgur.com/VR9Cn5B.png',
    'https://i.imgur.com/LT4tSe1.png',
    'https://i.imgur.com/IbWRGAx.png',
    'https://i.imgur.com/lgn09FX.png',
    'https://i.imgur.com/70P12oq.png',
    'https://i.imgur.com/sCQFS70.png',
]
