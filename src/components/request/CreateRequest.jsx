import React,{ useState }  from 'react'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import toast from 'react-hot-toast'
import useLogout from '../../hooks/useLogout'
import {Button,  Row, Col,Spinner} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import "./CreateRequest.css"
import { useNavigate } from 'react-router-dom'

function CreateRequest() {
  let navigate = useNavigate()
  let logout =useLogout()
  let [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false);
  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [typeOfService,setTypeOfService]=useState("")
  let [title,setTitle]=useState("")
  let [description,setDescription]=useState("")

  let finalData = {
    name:name,
    email:email,
    type:typeOfService,
    title:title,
    description:description
  }
  const getData = async (event) => {
    try {
      event.preventDefault()
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.stopPropagation()
      } else {
        setLoading(true)
        let res = await AxiosService.post(`${ApiRoutes.REQUEST_OPEN.path}`, finalData, {
          authenticate: ApiRoutes.REQUEST_OPEN.authenticate
        })
        if (res.status === 201) {
            setLoading(false)
            toast.success("Request created")
            alert(`Your SR NUMBER IS ${res.data.srno}`)
            setName("")
            setEmail("")
            setTitle("")
            setTypeOfService("")
            setDescription("")
            form.reset()
            navigate('/public-dashboard')
        }
      }
      setValidated(true)
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || error.message)
      if (error.response.status === 402)
        logout()
    }
  }

  return <>
  <div className='CreateRequestStyle'>
  <h2 style={{textAlign:"center",marginTop:"2%",color:"white"}}>Create Your Request in this form</h2>
  <div style={{display:'flex',justifyContent:"center", marginTop:"2%"}}>
   <Form className="createformstyle" noValidate  validated={validated} onSubmit={getData}>
   <Row className="mb-3" >
      <Form.Group as={Col} className="mb-3" style={{ display:"flex" ,flexWrap:"wrap"}} controlId="validationCustom02">
            <Form.Label><b>Name</b></Form.Label>
            <Form.Control required type="text"  placeholder="Enter your Name"  onChange={(e)=>setName(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} className="mb-3"   controlId="exampleForm.ControlInput1" >
            <Form.Label><b>Email</b></Form.Label>
            <Form.Control required type="email" placeholder="Enter your Email"  onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>
      </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label><b>Type Of Service</b></Form.Label>
            <Form.Control type="text" placeholder="Enter your type of service" required onChange={(e)=>setTypeOfService(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label><b>Title</b></Form.Label>
            <Form.Control type="text" placeholder="Enter your Title" required onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label><b>Description</b></Form.Label>
            <Form.Control as="textarea" placeholder="Enter your Description" required  onChange={(e)=>setDescription(e.target.value)} style={{ height: '100px' }}/>
          </Form.Group>
          {loading ? (
          <div className="loadingSpinnerCreate">
            <Spinner animation="border" role="status" className="purble-spinner">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : <Button className="createButton" type='submit' >Submit</Button>}
          
      </Form>
      </div>
</div>
</>
}

export default CreateRequest