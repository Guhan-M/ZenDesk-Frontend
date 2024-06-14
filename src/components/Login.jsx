import React,{useEffect,useState} from "react";
import {Spinner} from 'react-bootstrap';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService'
import ApiRoutes from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login(){
const navigate = useNavigate()
const [loading, setLoading] = useState(true);

useEffect(()=>{
    sessionStorage.clear()
},[])

const handleLogin = async (e)=>{
    e.preventDefault()
    try{
       setLoading(false);
        let formData= new FormData(e.target)
        let data= Object.fromEntries(formData)
        console.log(data)
        if(data.email && data.password){
            let res = await AxiosService.post(ApiRoutes.LOGIN.path,data,{
                authenticate:ApiRoutes.LOGIN.authenticate
            })
            if(res.status==200){
                console.log(res)
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('role',res.data.role)
                sessionStorage.setItem('name',res.data.name)
                sessionStorage.setItem('id',res.data.id)
                toast.success(res.data.message)
                if(res.data.role==='admin' || res.data.role==='superAdmin')
                navigate('/dashboard')
            }
        }
        else{
            toast.error("Input Email and Password")
            setLoading(true)
        }
    }
    catch(error){
        toast.error(error.response.data.message || error.message)
        setLoading(true)
    }
}

return <>
  <form class="login-container" onSubmit={handleLogin}>
    <div class="containerlg d-grid">
        <h3 class="content-header">Login <i class="fa-solid fa-key"></i></h3>
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput"  name='email' placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" name='password' placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div> 
          {loading ? ( 
       <>
             <button class="btn btn-primary sumbitbtn" type="submit">Submit</button>
       </>
      ) : ( 
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
          
      </div>
    </form>
</>

}

export default Login 