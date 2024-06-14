import React, { useEffect, useState} from 'react'
import TopBar from './TopBar'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import {Card,Table,Button,Container,Row,Col,Spinner} from 'react-bootstrap'
import './dashboard.css'

function Dashboard() {
  let [countData,setCountData] = useState([])
  const [loading, setLoading] = useState(true);
  let [selectedStatus,setSelectedStatus] = useState("Open")
  let [requests,setRequests] = useState([])
  // get all data in array 
  let navigate = useNavigate()
  let logout = useLogout()
  // call the useLogout function 

  const getData = async()=>{
    setLoading(true)
    try {
      let res = await AxiosService.get(`${ApiRoutes.REQUEST_COUNT.path}`,{
        authenticate:ApiRoutes.REQUEST_COUNT.authenticate // check authenticate is true  or false
      })
      if(res.status===200)
      {
        setCountData(res.data)
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      if(error.response.status===402)
        logout()
    }
  }

  const getDataByStatus = async()=>{
    try {
      let res = await AxiosService.get(`${ApiRoutes.REQUEST_CLOSED.path}?status=${selectedStatus}`,{
        // send query params "?status="open"""
        authenticate:ApiRoutes.REQUEST_CLOSED.authenticate
      })
      if(res.status===200)
      {
        setRequests(res.data?.request)
      }
    } catch (error) {
      toast.error(error.respons?.data?.message || error.message)
      if(error.response.status===402)
        logout()
    } 
  }
  
  useEffect(()=>{
      getData()
  },[])

  useEffect(()=>{
    getDataByStatus()
},[selectedStatus])

  return <>
  <TopBar/>
  <div className='dashboardstylebody'>
  <div className='wrapper dashboardstyle'> 
  
  {loading ? ( 
       <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner animation="border" role="status" className="white-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        
      ) : ( 
        <div>
        <div  style={{marginTop:"25px",marginBottom:"25px"}}>
         <Container>
    <Row>
      <Col>
        <Card className='dashboardCardstyle'  onClick={()=>setSelectedStatus("Open")}>
          <Card.Title style={{textAlign:"center",marginTop:"12px"}}>Open {countData.Open?countData.Open:0}</Card.Title>
        </Card>
      </Col>
      <Col>
        <Card  className='dashboardCardstyle' onClick={()=>setSelectedStatus("Assigned")}>
          <Card.Title style={{textAlign:"center",marginTop:"12px"}}>Assigned {countData.Assigned?countData.Assigned:0}</Card.Title>
        </Card>
      </Col>
      <Col>
        <Card className='dashboardCardstyle'  onClick={()=>setSelectedStatus("Closed")}>
          <Card.Title style={{textAlign:"center",marginTop:"12px"}}>Closed {countData.Closed?countData.Closed:0}</Card.Title>
        </Card>
      </Col>
    </Row>
    </Container>
    </div>
    {/* striped bordered hover */}
    <div className=" table-responsive-sm p-2 ">
    <Table  striped bordered hover className=' table overflow-auto tableStyles fw-bolder container object-fit-sm-contain  shadow-lg p-3 mb-2 bg-body-tertiary rounded border border-info-subtle w-80 p-3 '  responsive="sm">
      <thead >
        <tr>
          <th  className=" bg-primary text-white">SR No</th>
          <th  className=" bg-primary text-white">Type</th>
          <th  className=" bg-primary text-white">Title</th>
          <th  className=" bg-primary text-white">Status</th>
          <th  className=" bg-primary text-white">Created Date</th>
          <th  className=" bg-primary text-white">Assigned To</th>
          <th  className=" bg-primary text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          requests.map((e,i)=>{
            return <tr key={i}>
              <td>{e.srno}</td>
              <td>{e.type}</td>
              <td>{e.title}</td>
              <td>{e.status}</td>
              <td>{e.createdAt}</td>
              <td>{e.assignedTo?e.assignedTo:"-"}</td>

              <td><Button onClick={()=>navigate(`/request/${e.srno}`)}>View</Button></td>
            </tr>
          })
        }
      </tbody>
    </Table>
       </div>
       </div>
      )}
   
  </div>
  </div>
  </>
}

export default Dashboard