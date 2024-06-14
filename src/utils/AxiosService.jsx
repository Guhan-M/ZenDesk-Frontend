import axios from 'axios'

const AxiosService = axios.create({
    baseURL:"https://zendesk-backend-2p90.onrender.com",
    headers:{
        "Content-Type":"application/json"
    }
})
// common url for backend - axios service

AxiosService.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem("token")
    if(config.authenticate && token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
// it is like a middleware, it works request and response 

export default AxiosService