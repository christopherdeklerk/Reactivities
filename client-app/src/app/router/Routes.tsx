import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

// CDK20241015 - Define the routes we want to export. The first is our Root Route - the top of the tree.
// CDK20241015 - This can essentially take the place of App in main.tsx as it is the root element now - the root component.
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm key='create' />},    
            {path: 'manage/:id', element: <ActivityForm key='manage' />}, // CDK20241016 - Regardless of which route we choose, we are still loading the same component. So we need a key, like we use in lists.
            {path: 'errors', element: <TestErrors />}, // CDK20241016 - Regardless of which route we choose, we are still loading the same component. So we need a key, like we use in lists.
            {path: 'not-found', element: <NotFound />}, 
            {path: 'server-error', element: <ServerError />}, 
            {path: '*', element: <Navigate replace to='/not-found' />} // CDK20241023 - If the user types in any url that doesn't exist this will just redirect them to the not found component we setup.
        ]
    }
]

// CDK20241015 - Pass the routes to createBrowserRouter
export const router = createBrowserRouter(routes)