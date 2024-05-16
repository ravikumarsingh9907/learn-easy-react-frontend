import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:3300';

export const postData = async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
        },
        body: data,
    });

    return await response.json();
}

export const postDataMultiPartData = async (endpoint, data) => {
    console.log(data);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: data,
    });

    return await response.json();
}

export const getData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
    });

    return await response.json();
}

export const deleteData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
    });

    return await response.json();
}

export const updateData = async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: data,
    });

    return await response.json();
}