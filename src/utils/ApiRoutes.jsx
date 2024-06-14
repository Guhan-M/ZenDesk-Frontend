const ApiRoutes ={
    LOGIN:{
        path:"/user/login",
        authenticate:false
    },
    USERS:{
        path:"/user",
        authenticate:true
    },
    USERS_CREATE:{
        path:"/user/create",
        authenticate:true
    },
    REQUEST_OPEN:{
        path:"/request",
        authenticate:false
    },
    REQUEST_CLOSED:{
        path:"/request",
        authenticate:true
    },
    REQUEST_COUNT:{
        path:'/request/count',
        authenticate: true
    },
    REQUEST_CLOSE:{
        path:'/request/close',
        authenticate: true
    },
    REQUEST_ASSIGN:{
        path:'/request/assign',
        authenticate: true
    }
}

// it is next of the axiosService link plus add the path if need, mention same way authenticate 

export default ApiRoutes 