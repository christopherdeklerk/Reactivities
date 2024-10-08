import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

// CDK20241007 - Generic Sleeper. Made this function so he could await it in async / await. The promise that is being resolved is waiting for the timeout.
const sleep = (delay: number) => {
    return new Promise((resolveMe) => {
        setTimeout(resolveMe, delay)
    })
};

// CDK20241007 - setup a baseUrl for our API
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {        
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

// CDK20241007 - Just make an easy access for the response - instead of having to say response.data all the time, we can just get the responseBody.
// CDK20241007 - Without this, in the `requests` constant, you would just be returning .then()
// CDK20241007 - Also in here, we are using a new generic type T
const responseBody = <GenericType>(response: AxiosResponse<GenericType>) => response.data;

// CDK20241007 - Setup some generic requests. I have gone all out to describe the GenericType as such - normally this would be <T> or something similar.
const requests = {
    get: <GenericType>(url: string) => axios.get<GenericType>(url).then(responseBody),
    post: <Generic>(url: string, body: {}) => axios.post<Generic>(url, body).then(responseBody),
    put: <x>(url: string, body: {}) => axios.put<x>(url, body).then(responseBody),
    del: <y>(url: string) => axios.delete<y>(url).then(responseBody),
}

// CDK20241007 - Create an object to store our requests for our Activities
const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id:  string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;