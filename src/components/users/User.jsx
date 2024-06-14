import React, { useEffect, useState } from 'react'
import TopBar from '../TopBar'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import toast from 'react-hot-toast'
import useLogout from '../../hooks/useLogout'
import Table from 'react-bootstrap/Table';
import { Button,Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './user.css'

function User() {

  let [data,setData] = useState([])
  const [loading, setLoading] = useState(true);
  // get all data in array 
  let navigate = useNavigate()
 
  let logout = useLogout()
  // call the useLogout function 

  const getData = async()=>{
    setLoading(false)
    try {
      let res = await AxiosService.get(`${ApiRoutes.USERS.path}`,{
        authenticate:ApiRoutes.USERS.authenticate // check authenticate is true  or false
      })
      console.log(res)
      if(res.status===200)
      {
        setData(res.data.users)
        setLoading(false) 
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message)
      if(error.response?.status===402)
        logout()
    }
  }

useEffect(()=>{
  getData()
},[])

  return <>
  <div className='ViewBodyUser'> 
   <TopBar/>
   {loading ? ( 
       <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" role="status" className="white-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : ( 
        <div className='wrapper tableviewRequest table-responsive-lg'>
        <Table striped bordered hover className='fw-bolder table container object-fit-sm-contain rounded-4 shadow-lg p-3 mt-5 bg-body-tertiary rounded border border-info-subtle '>
           <thead className="text-center ">
             <tr >
               <th className=" bg-primary text-white">#</th>
               <th className=" bg-primary text-white">Name</th>
               <th className=" bg-primary text-white">Email</th>
               <th className=" bg-primary text-white">Role</th>
               <th className=" bg-primary text-white">Status</th>
               <th className=" bg-primary text-white">Created Date</th>
               <th className=" bg-primary text-white">Actions</th>
             </tr>
           </thead>
           <tbody>
             {
               data.map((e,i)=>{
                 return <tr key={i}>
                   <td>{i+1}</td>
                   <td>{e.name}</td>
                   <td>{e.email}</td>
                   <td>{e.role}</td>
                   <td>{e.status?"Active":"InActive"}</td>
                   <td>{e.createdAt}</td>
                   <td><Button onClick={()=>navigate(`/user/${e._id}`)}>View</Button></td>
                 </tr>
               })
             }
           </tbody>
         </Table>
        </div>
      )}
  
   </div>
  </>
}

export default User