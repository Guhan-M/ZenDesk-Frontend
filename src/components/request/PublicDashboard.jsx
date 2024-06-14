import React from 'react'
import "./PublicDashboard.css"
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PublicDashboard() {
    let navigate = useNavigate()
  return <>
  <div className='publicDashboard'>
    <div className='dashboardchild'>
        <h1 className='dashboardHeading'>Welcome to ZenDesk</h1>
        <div className='ButtonHeading'>
        <Button className='ButtonHead1 btn btn-secondary btn-lg' onClick={()=>navigate('/request')}>New Request</Button>        
        <Button className='ButtonHead2 btn btn-secondary btn-lg' onClick={()=>navigate('/request-status')}>Trak Request</Button>   
        </div>
    </div>
  
  </div>
  </>
}

export default PublicDashboard