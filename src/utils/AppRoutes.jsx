import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import {Navigate} from 'react-router-dom'
import AdminGuard from './AdminGuard'
import UserGuard from './UserGuard'
import CreateRequest from '../components/request/CreateRequest'
import ViewRequest from '../components/request/ViewRequest'
import  Users from '../components/users/User'
import ViewUsers from '../components/users/ViewUser'
import CreateUsers from '../components/users/ViewUser'
import Request from '../components/Request'
import PublicDashboard from '../components/request/PublicDashboard'

const AppRoutes = [
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/dashboard",
        element:<UserGuard><Dashboard/></UserGuard>
            /* if given user is check fist admin or not */
    },
    {
        path:"/request/:srno",
        element:<UserGuard><Request/></UserGuard>
            /* if given user is check fist admin or not */
    }, 
    {
        path:"/public-dashboard",
        element:<PublicDashboard/>
    }, 
    {
        path:"/request",
        element:<CreateRequest/>
    },
    {
        path:"/request-status",
        element:<ViewRequest/>
    },
    {
        path:"/user",
        element:<AdminGuard><Users/></AdminGuard>
    },
    {
        path:"/user/:id",
        element:<AdminGuard><ViewUsers/></AdminGuard>
    },
    {
        path:"/user/create",
        element:<AdminGuard><CreateUsers/></AdminGuard>
    },
    {
        path:"*",
        element:<Navigate to='/login'/>
    }
]


/* This AppRoutes import in app.jsx file and it recieve the data with createBrowserprovider and RouterProvider hit the path, return the element file */
export default AppRoutes