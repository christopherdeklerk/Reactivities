import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';

// CDK20241007 - Generic Sleeper. Made this function so he could await it in async / await. The promise that is being resolved is waiting for the timeout.
const sleep = (delay: number) => {
    return new Promise((resolveMe) => {
        setTimeout(resolveMe, delay)
    })
};

// CDK20241007 - setup a baseUrl for our API
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    // CDK20241023 - Destructure the response object and redirect based on the status, sometimes displaying the error information, sometimes setting state
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            // CDK20241024 If the method is a GET and there are errors associated with the id
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            toast.error('not found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;        
    }    
    return Promise.reject(error); // CDK20241023 - This will pass the error back to the calling component
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
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;