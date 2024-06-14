import React,{useEffect,useState} from 'react'
import TopBar from '../TopBar'
import {useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import useLogout from '../../hooks/useLogout'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import {Table,Spinner }from 'react-bootstrap';
import Message from '../../utils/message'
import './user.css'

function ViewUser() {
  let {id} = useParams()
  const [loading, setLoading] = useState(false);
  let [data,setData]= useState([])
  let logout = useLogout()

  let getData = async()=>{
    setLoading(true)
    try {
      let res = await AxiosService.get(`${ApiRoutes.USERS.path}/${id}`,{
        authenticate:ApiRoutes.USERS.authenticate // check authenticate is true  or false
      })
      console.log(res)
      if(res.status===200)
      {
          setData(res.data.user)
          setLoading(false)     
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message)
      if(error.response?.status===402)
        logout()
    }
  }
  useEffect(()=>{
    if(id){
      getData()
    }
    else{
      logout()
    }
  },[])

console.log(data,id)
  return <>
   <TopBar/>
   {loading ? ( 
       <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" role="status" className="white-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : ( 
<div className='ViewBodyUser'>
 <div className='wrapper d-flex justify-content-center'>
 <Table striped hover bordered  className='fw-bolder container object-fit-sm-contain rounded-4 shadow-lg p-3 mt-5 bg-body-tertiary rounded border border-info-subtle w-50 p-3'>
  <thead>
    <tr>
      <th className=" bg-primary text-white">Key</th>
      <th className=" bg-primary text-white">Value</th>
    </tr>
  </thead>
  <tbody>
    {
      Object.keys(data).map((e,i)=>{
        return <tr key={i}>
          <td>{Message[e]}</td>
          <td>{e==='status'?data[e]?"Active":"Inactive":data[e]}</td>
        </tr>
      })
    }
  </tbody>
 </Table>
 </div>
 </div>
      )}
  
  </>
}

export default ViewUser