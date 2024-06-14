import React, { useState } from "react";
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Button, Table,Spinner  } from "react-bootstrap";
import Message from "../../utils/message";
import Form from "react-bootstrap/Form";
import "./ViewRequest.css";

function ViewRequest() {
  let [srno, setSrno] = useState(""); 
  let [loading, setLoading] = useState(false)
  let [request, setRequest] = useState("");

  const getData = async () => {
    setLoading(true)
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
           setLoading(false)
        
      }
    } catch (error) {
      toast.error(error.respons?.data?.message || error.message);
      if (error.response.status === 402) toast.error("Enter Valid SR Number");
    }
  };

  return (
    <>
      <div className="ViewBodyRequest">
        <div className="ViewBodyRequest1">
          <h2 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>
            Track your Status Here!
          </h2>
          <div className="loginWrapper">
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "3%",
              }}
            >
              <Form.Group className="mb-3">
                {/* <Form.Label style={{color:"white",fontWeight:"bolder"}}></Form.Label> */}
                <Form.Control
                  style={{ textAlign: "center" }}
                  type="text"
                  placeholder="Enter SR NO"
                  autofocus
                  onChange={(e) => setSrno(e.target.value)}
                />
              </Form.Group>
              <Button className="viewRequestButton" onClick={() => getData()}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
        {loading ? (
          <div className="loadingSpinner">
            <Spinner animation="border" role="status" className="white-spinner">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : request.srno ? (
          <div className="table-responsive-sm p-2">
          <Table
            striped
            hover
            bordered
            responsive="sm"
            className=" fw-bolder table  overflow-auto container object-fit-sm-contain rounded-4 shadow-lg p-3 mt-5 mb-5 bg-body-tertiary rounded border border-info-subtle w-50  p-3"
          >
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ViewRequest;
