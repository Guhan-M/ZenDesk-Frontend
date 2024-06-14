import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import useLogout from "../hooks/useLogout";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Message from "../utils/message";
import Form from 'react-bootstrap/Form';
import './request.css'
function Request() {
  let { srno } = useParams();
  let logout = useLogout();
  let [request, setRequest] = useState("");
  let [resolution,setResolution]=useState("")

  const getData = async () => {
    try {
      let res = await AxiosService.get(
        `${ApiRoutes.REQUEST_CLOSED.path}/${srno}`,
        {
          // send query params "?status="open"""
          authenticate: ApiRoutes.REQUEST_CLOSED.authenticate,
        }
      );
      if (res.status === 200) {
        setRequest(res.data?.request);
      }
    } catch (error) {
      toast.error(error.respons?.data?.message || error.message);
      if (error.response.status === 402) logout();
    }
  };

  const AssignedToMe = async () => {
    try {
      let res = await AxiosService.put( `${ApiRoutes.REQUEST_ASSIGN.path}/${srno}`,undefined,
        {
          // send query params "?status="open"""
          authenticate: ApiRoutes.REQUEST_ASSIGN.authenticate,
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message)
        getData();
      }
    } catch (error) {
      toast.error(error.respons?.data?.message || error.message);
      if (error.response.status === 402) logout();
    }
  };

  const ClosedRequest = async () => {
    try {
        if(resolution){
            let res = await AxiosService.put( `${ApiRoutes.REQUEST_CLOSE.path}/${srno}`,{resolution:resolution},
        {
          // send query params "?status="open"""
          authenticate: ApiRoutes.REQUEST_CLOSE.authenticate,
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message)
        getData();
      }
        }
        else{
          toast.error("Required Resolution")  
        }
        
    } catch (error) {
      toast.error(error.respons?.data?.message || error.message);
      if (error.response.status === 402) logout();
    }
  };

  useEffect(() => {
    if (srno) {
      getData();
    } else {
      logout();
    }
  }, []);

  return (
    <>
      <TopBar />
      <div className="requestTable  d-flex flex-column justify-content-center ">
      <Table  hover bordered responsive="sm" className=" fw-bolder container object-fit-sm-contain rounded-4 shadow-lg p-3 mt-5 bg-body-tertiary rounded border border-info-subtle w-100 p-3">
        <thead className="text-center ">
          <tr>
            <th className=" bg-primary text-white">Key</th>
            <th className=" bg-primary text-white">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(request).map((e, i) => { 
            return (
              <tr key={i}>
                <td>{Message[e]}</td>
                <td>{request[e] ? request[e] : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div style={{textAlign:"center"}} className='loginWrapper'>
        {request.status === "Open" ? (
          <Button onClick={() => AssignedToMe()} >Assigned</Button>
        ) : request.status === "Assigned" ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><h3 style={{color:"white"}}>Resolution :</h3></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Resolution"
                onChange={(e) => setResolution(e.target.value)}
              />
            </Form.Group>
            <Button onClick={() => ClosedRequest()}>Submit</Button>
          </Form>
        ) : (
          <></>
        )}
      </div>
      </div>
    </>
  );
}

export default Request;
